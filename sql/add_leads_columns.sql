-- Only if your EXISTING public.ddc_organic_leads table is missing these columns
-- (adjust table name in this file if you have not migrated yet).

alter table public.ddc_organic_leads
  add column if not exists car_make_model text,
  add column if not exists service_notes text;
