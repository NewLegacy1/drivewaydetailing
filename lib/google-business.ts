/**
 * Optional Google Business Profile (Maps) integration via Vite env.
 * Get URLs from: Google Maps → your business → Share.
 * Review link: Google Business Profile → Ask for reviews (share link).
 */

const profile = trimUrl(import.meta.env.VITE_GMB_PROFILE_URL);
const review = trimUrl(import.meta.env.VITE_GMB_REVIEW_URL);
const mapEmbed = trimUrl(import.meta.env.VITE_GMB_MAP_EMBED_SRC);

function trimUrl(v: unknown): string | undefined {
  if (typeof v !== 'string') return undefined;
  const s = v.trim();
  return s || undefined;
}

export const GMB_PROFILE_URL = profile;
export const GMB_REVIEW_URL = review;
export const GMB_MAP_EMBED_SRC = mapEmbed;

export function hasGoogleBusinessIntegration(): boolean {
  return Boolean(profile || review || mapEmbed);
}

/** Safe embed: only allow Google Maps embed origins. */
export function isAllowedMapEmbedSrc(src: string): boolean {
  try {
    const u = new URL(src);
    return (
      u.protocol === 'https:' &&
      (u.hostname === 'www.google.com' || u.hostname === 'maps.google.com') &&
      u.pathname.startsWith('/maps/embed')
    );
  } catch {
    return false;
  }
}
