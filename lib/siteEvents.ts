/**
 * Event names sent to Supabase tracking tables via the `track-event` Edge Function.
 * Use snake_case; must match /^[a-z][a-z0-9_]{1,63}$/.
 */
export const SITE_EVENT = {
  HEADER_GET_QUOTE: 'header_get_quote',
  HEADER_PHONE: 'header_phone_click',
  HERO_FAST_QUOTE: 'hero_fast_quote',
  HERO_BOOK_NOW: 'hero_book_now',
  AD_HERO_FAST_QUOTE: 'ad_hero_fast_quote',
  AD_HERO_BOOK_NOW: 'ad_hero_book_now',
  AD_HEADER_PHONE: 'ad_header_phone_click',
  AD_HEADER_FREE_QUOTE: 'ad_header_free_quote',
  AD_FOOTER_PHONE: 'ad_footer_phone_click',
  AD_FOOTER_QUOTE: 'ad_footer_quote_click',
  LEAD_SUBMIT_WEBSITE: 'lead_submit_website',
  LEAD_SUBMIT_ADS: 'lead_submit_ads',
} as const;

export type SiteEventMeta = Record<string, string | number | boolean | null>;
