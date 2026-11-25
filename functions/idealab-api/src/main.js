import { Client, Account, TablesDB, ID, Query } from "node-appwrite";

const ADMIN_EMAILS = new Set((process.env.ADMIN_EMAILS || "").split(",").map(x => x.trim().toLowerCase()).filter(Boolean));
const DATABASE_ID = process.env.DATABASE_ID;
const IDEA_TABLE_ID = process.env.IDEA_TABLE_ID;
const SURVEY_TABLE_ID = process.env.SURVEY_TABLE_ID;

function clientWithKey(key) {
  return new Client().setEndpoint(process.env.APPWRITE_FUNCTION_API_ENDPOINT).setProject(process.env.APPWRITE_FUNCTION_PROJECT_ID).setKey(key);
}
function jsonBody(req) {
  if (req.bodyJson && typeof req.bodyJson === "object") return req.bodyJson;
  try { return JSON.parse(req.body || "{}"); } catch { return {}; }
}
function clean(v, max = 5000) { return typeof v === "string" ? v.trim().slice(0, max) : ""; }

export default async ({ req, res, log, error }) => {
  const key = req.headers["x-appwrite-key"];
  if (!key) return res.json({ ok: false, message: "Server execution key unavailable." }, 500);
  const db = new TablesDB(clientWithKey(key));
  const body = jsonBody(req);
  const action = body.action || req.query?.action || "";
  const fail = (message, status = 400) => res.json({ ok: false, message }, status);

  try {
    if (req.method === "POST" && action === "idea") {
      const name = clean(body.submitter_name, 80), category = clean(body.category, 64);
      const title = clean(body.title, 120), details = clean(body.details, 5000);
      if (name.length < 2 || title.length < 4 || details.length < 10 || !category) return fail("Please complete the required fields.");
      const consent = body.consent_device_data === true;
      const context = consent && body.device_context && typeof body.device_context === "object" ? JSON.stringify(body.device_context).slice(0, 4000) : "{}";
      const email = clean(body.email, 254) || null;
      if (email && !/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(email)) return fail("Please enter a valid email address.");
      const row = await db.createRow({ databaseId: DATABASE_ID, tableId: IDEA_TABLE_ID, rowId: ID.unique(), data: {
        submitter_name: name, category, title, details, email, consent_device_data: consent, device_context: context, status: "new", created_at: new Date().toISOString()
      }, permissions: [] });
      return res.json({ ok: true, id: row.$id });
    }

    if (req.method === "POST" && action === "survey") {
      if (body.consent !== true) return fail("Consent is required.");
      const arr = (v, maxItems, maxLen) => Array.isArray(v) ? v.slice(0, maxItems).map(x => clean(x, maxLen)).filter(Boolean) : [];
      const email = clean(body.email, 254) || null;
      if (email && !/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(email)) return fail("Please enter a valid email address.");
      const row = await db.createRow({ databaseId: DATABASE_ID, tableId: SURVEY_TABLE_ID, rowId: ID.unique(), data: {
        travel_frequency: clean(body.travel_frequency, 80) || null, travel_purpose: clean(body.travel_purpose, 100) || null,
        transport: arr(body.transport, 12, 100), problems: arr(body.problems, 20, 160),
        problem_frequency: clean(body.problem_frequency, 80) || null, severity: clean(body.severity, 100) || null,
        story: clean(body.story, 3000) || null, improvements: arr(body.improvements, 5, 160),
        missing: clean(body.missing, 3000) || null, age_range: clean(body.age_range, 40) || null,
        region: clean(body.region, 80) || null, email, consent: true, created_at: new Date().toISOString()
      }, permissions: [] });
      return res.json({ ok: true, id: row.$id });
    }

    const jwt = req.headers["x-appwrite-user-jwt"];
    if (!jwt) return fail("Please sign in to the private team workspace.", 401);
    const userClient = new Client().setEndpoint(process.env.APPWRITE_FUNCTION_API_ENDPOINT).setProject(process.env.APPWRITE_FUNCTION_PROJECT_ID).setJWT(jwt);
    const user = await new Account(userClient).get();
    const email = (user.email || "").toLowerCase();
    if (!ADMIN_EMAILS.has(email) || !(user.labels || []).includes("idealabadmin")) return fail("This account is not authorised for the private IdeaLab inbox.", 403);

    if (req.method === "GET" && action === "ideas") {
      const result = await db.listRows({ databaseId: DATABASE_ID, tableId: IDEA_TABLE_ID, queries: [Query.orderDesc("created_at"), Query.limit(300)] });
      return res.json({ ok: true, rows: result.rows });
    }
    if (req.method === "GET" && action === "surveys") {
      const result = await db.listRows({ databaseId: DATABASE_ID, tableId: SURVEY_TABLE_ID, queries: [Query.orderDesc("created_at"), Query.limit(1000)] });
      return res.json({ ok: true, rows: result.rows });
    }
    if (req.method === "PATCH" && action === "status") {
      const id = clean(body.id, 36), status = clean(body.status, 24);
      if (!id || !["new","reviewing","planned","resolved","declined"].includes(status)) return fail("Invalid status update.");
      const row = await db.updateRow({ databaseId: DATABASE_ID, tableId: IDEA_TABLE_ID, rowId: id, data: { status } });
      return res.json({ ok: true, row });
    }
    return fail("Unknown action.", 404);
  } catch (e) {
    error(String(e?.stack || e));
    return fail(e?.code === 401 ? "Please sign in again." : "The secure service could not complete this request.", e?.code === 401 ? 401 : 500);
  }
};
