-- UI analytics: track-event Edge Function writes here based on path (/ads/* → ads table).

create table if not exists public.ddc_organic_events (
  id uuid primary key default gen_random_uuid(),
  event_name text not null,
  path text,
  meta jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists ddc_organic_events_event_name_idx
  on public.ddc_organic_events (event_name);
create index if not exists ddc_organic_events_created_at_idx
  on public.ddc_organic_events (created_at desc);

alter table public.ddc_organic_events enable row level security;

create policy "ddc_service_role_all_organic_events"
  on public.ddc_organic_events for all
  to service_role
  using (true)
  with check (true);

comment on table public.ddc_organic_events is 'Main-site UI events from track-event';

create table if not exists public.ddc_ads_events (
  id uuid primary key default gen_random_uuid(),
  event_name text not null,
  path text,
  meta jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists ddc_ads_events_event_name_idx
  on public.ddc_ads_events (event_name);
create index if not exists ddc_ads_events_created_at_idx
  on public.ddc_ads_events (created_at desc);

alter table public.ddc_ads_events enable row level security;

create policy "ddc_service_role_all_ads_events"
  on public.ddc_ads_events for all
  to service_role
  using (true)
  with check (true);

comment on table public.ddc_ads_events is 'Paid /ads funnel UI events from track-event';
