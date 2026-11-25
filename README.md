# TravBud IdeaLab Pro

A responsive feedback and ideas portal for TravBud, built with Vite and Supabase.

## Run locally
1. Install Node.js 22 or newer.
2. Copy `.env.example` to `.env.local`.
3. Keep the Supabase project URL and public publishable key in that local file.
4. Run `npm install`, then `npm run dev`.

## Supabase
The SQL migration in `supabase/migrations/` creates the idea submissions table and admin allowlist with row-level security. It has already been applied to the TravBud IdeaLab Supabase project.

Enable email magic-link sign-in in Supabase Auth. Add your admin user's Auth UUID:
```sql
insert into public.idealab_admins (user_id)
values ('YOUR_AUTH_USER_UUID')
on conflict (user_id) do nothing;
```

## GitHub Pages
The workflow in `.github/workflows/deploy.yml` builds and deploys the site on pushes to `main`.

One-time setup: open repository **Settings → Pages → Build and deployment → Source**, then choose **GitHub Actions**. The workflow builds for the `/travbud-idealab/` project path and uses the configured Supabase URL and public publishable key.

Only a public Supabase publishable key is used by the frontend. Never add a Supabase service-role key to this repository.
