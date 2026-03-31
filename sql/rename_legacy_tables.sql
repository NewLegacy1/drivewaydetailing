-- One-time migration from `leads` / `ad_leads` / `site_events`.
--
-- Order:
-- 1) Run **BLOCK A** below.
-- 2) Run [create_site_events_table.sql](create_site_events_table.sql) (skip if those tables already exist).
-- 3) Run **BLOCK B** only if you still have `public.site_events` to migrate. If you never created
--    `site_events`, skip BLOCK B (nothing to copy). Then verify counts and optionally drop `site_events`.

-- ========== BLOCK A ==========
alter table if exists public.leads rename to showroom_organic;
alter table if exists public.ad_leads rename to showroom_ads;

-- ========== BLOCK B (only when public.site_events exists; uses EXECUTE so Postgres does not parse
--     `site_events` at compile time—plain INSERT inside IF still errors when the table is missing.) ==========
do $$
begin
  if exists (
    select 1 from information_schema.tables
    where table_schema = 'public' and table_name = 'site_events'
  ) then
    execute $m$
      insert into public.showroom_ads_events (id, event_name, path, meta, created_at)
      select id, event_name, path, meta, created_at
      from public.site_events
      where path is not null and split_part(path, '?', 1) like '/ads%'
      on conflict (id) do nothing
    $m$;

    execute $m$
      insert into public.showroom_organic_events (id, event_name, path, meta, created_at)
      select id, event_name, path, meta, created_at
      from public.site_events
      where path is null or split_part(path, '?', 1) not like '/ads%'
      on conflict (id) do nothing
    $m$;
  end if;
end $$;
