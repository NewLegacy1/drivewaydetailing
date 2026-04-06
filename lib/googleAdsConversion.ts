declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

/**
 * Fires a Google Ads conversion (gtag) when `VITE_GOOGLE_ADS_MOBILEDETAILING_SEND_TO` is set.
 * Value is the full "send_to" string from Google Ads → Goals → Conversion details (e.g. AW-16908239670/AbCdEfGhIjK).
 */
export function fireGoogleAdsMobileDetailingLeadConversion(): void {
  if (typeof window === 'undefined') return;
  const sendTo = import.meta.env.VITE_GOOGLE_ADS_MOBILEDETAILING_SEND_TO?.trim();
  if (!sendTo) return;
  if (typeof window.gtag !== 'function') return;
  window.gtag('event', 'conversion', { send_to: sendTo });
}
