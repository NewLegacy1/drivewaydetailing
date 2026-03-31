-- Run this in the Supabase SQL Editor (Dashboard → SQL Editor)
-- Project: https://gxhsgqwkfaicuqlrssed.supabase.co
-- Main site modal / organic traffic ("showroom organic").

create table if not exists public.showroom_organic (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text not null,
  car_make_model text,
  service_notes text,
  created_at timestamptz not null default now()
);

alter table public.showroom_organic enable row level security;

create policy "Allow anonymous insert into showroom_organic"
  on public.showroom_organic for insert
  to anon
  with check (true);

create policy "Service role can do all on showroom_organic"
  on public.showroom_organic for all
  to service_role
  using (true)
  with check (true);

comment on table public.showroom_organic is 'Organic / main-site lead form submissions';
