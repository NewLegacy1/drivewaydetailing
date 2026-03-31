-- Regular (organic) vs ad funnel click / interaction analytics.
-- Project: https://gxhsgqwkfaicuqlrssed.supabase.co
-- Run in Supabase SQL Editor after deploying the `track-event` function.
-- The Edge Function writes to `showroom_organic_events` or `showroom_ads_events` from the request `path` (/ads/* → ads).

create table if not exists public.showroom_organic_events (
  id uuid primary key default gen_random_uuid(),
  event_name text not null,
  path text,
  meta jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists showroom_organic_events_event_name_idx
  on public.showroom_organic_events (event_name);
create index if not exists showroom_organic_events_created_at_idx
  on public.showroom_organic_events (created_at desc);

alter table public.showroom_organic_events enable row level security;

create policy "Service role full access to showroom_organic_events"
  on public.showroom_organic_events for all
  to service_role
  using (true)
  with check (true);

comment on table public.showroom_organic_events is 'Organic site UI events (main site / non-/ads paths) from track-event';

create table if not exists public.showroom_ads_events (
  id uuid primary key default gen_random_uuid(),
  event_name text not null,
  path text,
  meta jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists showroom_ads_events_event_name_idx
  on public.showroom_ads_events (event_name);
create index if not exists showroom_ads_events_created_at_idx
  on public.showroom_ads_events (created_at desc);

alter table public.showroom_ads_events enable row level security;

create policy "Service role full access to showroom_ads_events"
  on public.showroom_ads_events for all
  to service_role
  using (true)
  with check (true);

comment on table public.showroom_ads_events is 'Paid /ads/* funnel UI events from track-event';
