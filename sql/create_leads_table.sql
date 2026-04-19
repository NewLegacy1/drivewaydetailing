-- =============================================================================
-- Read before running
-- =============================================================================
-- Greenfield / empty project: run once when `public.ddc_organic_leads` does not exist yet.
-- If your database used different internal table names, rename those tables in
-- Supabase to `ddc_organic_leads` / `ddc_ads_leads` (and event tables per
-- create_site_events_table.sql) so they match the Edge Functions in this repo.
-- =============================================================================

-- Supabase SQL Editor → New query → Run once.

create table if not exists public.ddc_organic_leads (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text not null,
  car_make_model text,
  service_notes text,
  created_at timestamptz not null default now()
);

alter table public.ddc_organic_leads enable row level security;

create policy "ddc_anon_insert_organic_leads"
  on public.ddc_organic_leads for insert
  to anon
  with check (true);

create policy "ddc_service_role_all_organic_leads"
  on public.ddc_organic_leads for all
  to service_role
  using (true)
  with check (true);

comment on table public.ddc_organic_leads is 'Organic / main-site lead form submissions';
