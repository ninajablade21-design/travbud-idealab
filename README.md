# TravBud IdeaLab

A private innovation and feedback space for shaping TravBud before launch. Visitors submit named ideas and travel challenges; only allowlisted IdeaLab admins can read and manage submissions.

## Run locally

1. Install Node.js 22 or newer.
2. Copy `.env.example` to `.env.local`.
3. Add the Supabase project URL and public publishable key.
4. Run `npm install`, then `npm run dev`.

## Supabase authentication setup

For the deployed GitHub Pages site, open [Supabase Auth URL Configuration](https://supabase.com/dashboard/project/rsnmwoxawgmpebiusuqr/auth/url-configuration) and set:

- **Site URL:** `https://ninajablade21-design.github.io/travbud-idealab/`
- **Redirect URLs:** add `https://ninajablade21-design.github.io/travbud-idealab/**`

The app sends admin magic links back to the deployed site and displays a clear recovery message if a link expires or has already been used. Request a fresh link rather than repeatedly opening an old email.

## Admin access

The database has a server-side allowlist rule for these exact addresses:

- `ninajablade21@gmail.com`
- `ashaharikrishna2019@gmail.com`

The second address is added automatically when its Supabase Auth account is created. Admin status does not bypass authentication: each admin must still complete a valid sign-in before viewing private submissions. Do not expose a service-role key in frontend code.

## Private data

Idea submissions are stored in `public.idea_submissions`. Row-level security keeps reads and updates restricted to authorised admins; anonymous visitors can only submit the fields allowed by the insert policy. The old review UI has been removed from the app experience.

## Two-hour report digest

The intended report cadence is **every 2 hours**, only when new submissions exist, with one deduplicated PDF digest sent to the two authorised recipients. Delivery is not active yet: a verified sender domain, email-provider API key, scheduled backend function and idempotent report checkpoint still need to be configured. Do not treat this README setting as evidence that emails are already being sent.

## GitHub Pages

The workflow in `.github/workflows/deploy.yml` builds and deploys on pushes to `main`. In repository **Settings → Pages → Build and deployment → Source**, select **GitHub Actions**.
