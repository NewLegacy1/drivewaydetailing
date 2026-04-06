declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

/** SPA navigations after the first load (initial PageView is in index.html). */
export function trackMetaPageView(): void {
  if (typeof window === 'undefined' || typeof window.fbq !== 'function') return;
  window.fbq('track', 'PageView');
}

/** Standard event after a successful quote form submit. */
export function trackMetaLead(): void {
  if (typeof window === 'undefined' || typeof window.fbq !== 'function') return;
  window.fbq('track', 'Lead');
}
