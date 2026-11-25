-- Fix: the app inserts submitter_name, which the first migration never created.
alter table public.idea_submissions
  add column if not exists submitter_name text check (submitter_name is null or char_length(submitter_name) between 2 and 80),
  add column if not exists audience text check (audience is null or char_length(audience) <= 60),
  add column if not exists impact text check (impact is null or impact in ('Nice to have','Useful','Very important','Essential'));

-- Traveller survey (merged from the original IdeaLab prototype).
create table if not exists public.survey_responses (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  travel_frequency text check (char_length(travel_frequency) <= 60),
  travel_purpose text check (char_length(travel_purpose) <= 60),
  transport text[] not null default '{}' check (cardinality(transport) <= 10),
  problems text[] not null default '{}' check (cardinality(problems) <= 20),
  problem_frequency text check (char_length(problem_frequency) <= 60),
  severity text check (char_length(severity) <= 60),
  story text check (char_length(story) <= 3000),
  improvements text[] not null default '{}' check (cardinality(improvements) <= 5),
  missing text check (char_length(missing) <= 3000),
  age_range text check (char_length(age_range) <= 20),
  region text check (char_length(region) <= 80),
  email text check (char_length(email) <= 254),
  consent boolean not null check (consent = true)
);
create index if not exists survey_responses_created_at_idx on public.survey_responses (created_at desc);
alter table public.survey_responses enable row level security;
revoke all on public.survey_responses from anon, authenticated;
grant insert on public.survey_responses to anon, authenticated;
grant select on public.survey_responses to authenticated;
create policy "Anyone can submit a survey"
on public.survey_responses for insert to anon, authenticated with check (consent = true);
create policy "Only admins can view surveys"
on public.survey_responses for select to authenticated
using (exists (select 1 from public.idealab_admins a where a.user_id = (select auth.uid())));
