/** Google Ads-style landing + conversion URL (set this as Ads “thank you” page). */
export const MOBILEDETAILING_PATH = '/mobiledetailing';
export const MOBILEDETAILING_THANK_YOU_PATH = '/mobiledetailing/thank-you';

export function isMobileDetailingFunnelPath(pathname: string): boolean {
  const p = pathname.trim() || '/';
  return p === MOBILEDETAILING_PATH || p.startsWith(`${MOBILEDETAILING_PATH}/`);
}
