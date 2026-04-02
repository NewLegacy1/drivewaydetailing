import { supabase } from './supabase';
import type { SiteEventMeta } from './siteEvents';

/**
 * Records a UI event in Supabase (`showroom_organic_events` or `showroom_ads_events` from path) via `track-event`.
 * Fire-and-forget: does not block the UI; failures are only logged to the console.
 */
export function trackClientEvent(eventName: string, meta?: SiteEventMeta): void {
  if (typeof window === 'undefined' || !supabase) return;

  const path = `${window.location.pathname}${window.location.search}`.slice(0, 500);

  void (async () => {
    try {
      const { error } = await supabase.functions.invoke('track-event', {
        body: {
          event_name: eventName,
          path,
          meta: meta ?? {},
        },
      });
      if (error) console.warn('[track-event]', eventName, error.message);
    } catch (e) {
      console.warn('[track-event]', eventName, e);
    }
  })();
}
