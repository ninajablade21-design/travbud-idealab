create extension if not exists pgcrypto;

create table if not exists public.idealab_admins (
  user_id uuid primary key references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);
alter table public.idealab_admins enable row level security;
revoke all on public.idealab_admins from anon, authenticated;
grant select on public.idealab_admins to authenticated;
create policy "Admins can read own admin record"
on public.idealab_admins for select to authenticated
using ((select auth.uid()) = user_id);

create table if not exists public.idea_submissions (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  category text not null check (category in ('booking','mobility','accessibility','group-travel','payments','safety','other')),
  title text not null check (char_length(title) between 4 and 120),
  details text not null check (char_length(details) between 10 and 5000),
  email text,
  consent_device_data boolean not null default false,
  device_context jsonb not null default '{}'::jsonb,
  status text not null default 'new' check (status in ('new','reviewing','planned','resolved','declined'))
);
create index if not exists idea_submissions_created_at_idx on public.idea_submissions (created_at desc);
create index if not exists idea_submissions_status_idx on public.idea_submissions (status);
alter table public.idea_submissions enable row level security;
revoke all on public.idea_submissions from anon, authenticated;
grant insert on public.idea_submissions to anon, authenticated;
grant select, update on public.idea_submissions to authenticated;
create policy "Anyone can submit an idea"
on public.idea_submissions for insert to anon, authenticated
with check (
  char_length(title) between 4 and 120
  and char_length(details) between 10 and 5000
  and (consent_device_data = true or device_context = '{}'::jsonb)
);
create policy "Only admins can view submissions"
on public.idea_submissions for select to authenticated
using (exists (select 1 from public.idealab_admins a where a.user_id = (select auth.uid())));
create policy "Only admins can update submissions"
on public.idea_submissions for update to authenticated
using (exists (select 1 from public.idealab_admins a where a.user_id = (select auth.uid())))
with check (exists (select 1 from public.idealab_admins a where a.user_id = (select auth.uid())));