-- Run this in Supabase SQL Editor if you get "Could not find the 'car_make_model' column"
-- This adds the missing columns to an existing public.leads table.

alter table public.leads
  add column if not exists car_make_model text,
  add column if not exists service_notes text;
