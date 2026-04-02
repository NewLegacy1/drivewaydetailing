-- Run in Supabase SQL Editor (same project as your Edge Function).
-- Paid /ads/* landing pages only ("showroom ads"). Main site uses public.showroom_organic.

create table if not exists public.showroom_ads (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text not null,
  car_make_model text,
  service_notes text,
  created_at timestamptz not null default now()
);

alter table public.showroom_ads enable row level security;

create policy "Allow anonymous insert into showroom_ads"
  on public.showroom_ads for insert
  to anon
  with check (true);

create policy "Service role can do all on showroom_ads"
  on public.showroom_ads for all
  to service_role
  using (true)
  with check (true);

comment on table public.showroom_ads is 'Google Ads / paid landing page lead submissions';
