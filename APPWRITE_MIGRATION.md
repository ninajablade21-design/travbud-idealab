# TravBud IdeaLab — Appwrite migration

This is a staged migration. **Do not delete or disable the existing Supabase project yet.** The live website still uses Supabase until the Appwrite project IDs, collections, permissions, and data migration have been verified.

## 1. Create the Appwrite project

1. Open https://cloud.appwrite.io/ and create a free account/project.
2. Create a project named **TravBud IdeaLab**.
3. In **Project → Platforms**, add a **Web** platform.
4. Set the hostname to `ninajablade21-design.github.io` (no path).
5. Copy the project's API endpoint and Project ID from the project settings.

## 2. Create the database and collections

Create a **DocumentsDB** database named `TravBud IdeaLab`, with ID `travbud_idealab`.

Create these collections (use the IDs exactly):

- `idea_submissions`
- `survey_responses`

DocumentsDB is schemaless; the app writes JSON documents. Keep collection permissions private until the server functions are installed. Do not grant `Role.any()` read, update, or delete access.

### Idea document fields

```json
{
  "submitter_name": "Required name",
  "category": "booking",
  "title": "Idea title",
  "details": "Idea description",
  "email": null,
  "consent_device_data": false,
  "device_context": {},
  "status": "new",
  "created_at": "ISO-8601 timestamp"
}
```

### Survey document fields

```json
{
  "travel_frequency": "Monthly",
  "travel_purpose": "Tourism / holidays",
  "transport": ["Bus", "Train"],
  "problems": ["Finding reliable routes"],
  "problem_frequency": "Sometimes",
  "severity": "3 — Moderate",
  "story": "",
  "improvements": ["Accurate journey planner"],
  "missing": "",
  "age_range": null,
  "region": null,
  "email": null,
  "consent": true,
  "created_at": "ISO-8601 timestamp"
}
```

## 3. Admin access rules

The only authorised admin emails are:

- `ninajablade21@gmail.com`
- `ashaharikrishna2019@gmail.com`

After the accounts are created, assign the Appwrite user label `idealab-admin` to those two user IDs only. The final collection rules will allow public submission through a server function, but allow reading and managing records only to users with this label. Never grant public read access.

## 4. Authentication and functions

The replacement will provide:
- Email + password sign-in for the two admins.
- Six-digit email OTP as a passwordless alternative.
- A server-side allowlist check for admin access.
- A private admin inbox and survey analytics.
- A scheduled function every 120 minutes to create and email a PDF digest only when new submissions exist, with deduplication.

Appwrite Email OTP uses a six-digit code. On the free plan, Appwrite's default email delivery may be used; custom SMTP configuration may require a paid plan. Scheduled Functions on the free plan support intervals of 60 minutes or longer, so 120 minutes is supported.

## 5. Migration safety

- Keep Supabase running while the new backend is built.
- Export and migrate existing idea and survey records before changing the website.
- Compare source and destination record counts.
- Test anonymous submission, non-admin denial, both admin accounts, status updates, exports, and OTP.
- Only after all tests pass should the frontend be switched and Supabase retired.

## 6. Details needed to finish the integration

Once the project and database are created, provide these non-secret values:

- Appwrite API endpoint (for example, `https://<region>.cloud.appwrite.io/v1`)
- Project ID
- Database ID
- `idea_submissions` collection ID
- `survey_responses` collection ID

**Never send an Appwrite API key, Supabase service-role key, password, or email App Password in chat or commit one to GitHub.** Server API keys belong only in Appwrite Function environment variables.
