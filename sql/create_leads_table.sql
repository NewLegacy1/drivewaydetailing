-- Run this in the Supabase SQL Editor (Dashboard → SQL Editor)
-- Project: https://gxhsgqwkfaicuqlrssed.supabase.co

create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text not null,
  car_make_model text,
  service_notes text,
  created_at timestamptz not null default now()
);

-- Optional: enable Row Level Security (RLS) and allow anonymous inserts for the form.
-- If you prefer to restrict inserts to your Edge Function only, use a service role key in the function and do not expose anon insert.
alter table public.leads enable row level security;

-- Allow anyone to insert (used when client inserts; if you only use Edge Function with service role, you can skip this policy)
create policy "Allow anonymous insert into leads"
  on public.leads for insert
  to anon
  with check (true);

-- Only service role can read all leads (dashboard uses service role)
create policy "Service role can do all"
  on public.leads for all
  to service_role
  using (true)
  with check (true);

comment on table public.leads is 'Lead form submissions from the website';
