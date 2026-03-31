-- Run this in Supabase SQL Editor if you get "Could not find the 'car_make_model' column"
-- Target: public.showroom_organic. If you have not renamed yet, use public.leads instead.

alter table public.showroom_organic
  add column if not exists car_make_model text,
  add column if not exists service_notes text;
