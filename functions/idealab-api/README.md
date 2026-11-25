# TravBud IdeaLab API Function

This function is designed for Appwrite project `6b072d6700272e0ab5fd`.

## Environment variables
- `DATABASE_ID=travbud_idealab`
- `IDEA_TABLE_ID=idea_submissions`
- `SURVEY_TABLE_ID=survey_responses`
- `ADMIN_EMAILS=ninajablade21@gmail.com,ashaharikrishna2019@gmail.com`

Appwrite automatically provides `APPWRITE_FUNCTION_API_ENDPOINT`, `APPWRITE_FUNCTION_PROJECT_ID`, and the per-execution key header.

## Routes
- `POST /` with `{"action":"idea", ...}` — public idea submission
- `POST /` with `{"action":"survey", ...}` — public survey submission
- `GET /?action=ideas` — admin-only inbox (send `x-appwrite-user-jwt`)
- `GET /?action=surveys` — admin-only survey rows (send `x-appwrite-user-jwt`)
- `PATCH /` with `{"action":"status","id":"...","status":"reviewing"}` — admin-only status update

Tables must have row security enabled and no public table permissions. The function creates rows with empty permissions, and verifies both the admin email allowlist and the `idealabadmin` Appwrite label for every admin operation.

## Deployment
Runtime: Node.js 22. Entrypoint: `src/main.js`. Build command: `npm install`.
