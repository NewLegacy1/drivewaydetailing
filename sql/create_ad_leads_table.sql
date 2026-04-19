-- Paid /ads/* landing pages only. Main site uses public.ddc_organic_leads.

create table if not exists public.ddc_ads_leads (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text not null,
  car_make_model text,
  service_notes text,
  created_at timestamptz not null default now()
);

alter table public.ddc_ads_leads enable row level security;

create policy "ddc_anon_insert_ads_leads"
  on public.ddc_ads_leads for insert
  to anon
  with check (true);

create policy "ddc_service_role_all_ads_leads"
  on public.ddc_ads_leads for all
  to service_role
  using (true)
  with check (true);

comment on table public.ddc_ads_leads is 'Paid landing page lead submissions';
