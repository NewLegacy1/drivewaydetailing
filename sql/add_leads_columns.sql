-- Only if your EXISTING public.showroom_organic table is missing these columns
-- (Edge Function error: unknown column). Skip if your CRM already has them.
-- Target: public.showroom_organic (rename table in this file if you still use public.leads).

alter table public.showroom_organic
  add column if not exists car_make_model text,
  add column if not exists service_notes text;
