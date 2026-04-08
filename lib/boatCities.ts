/**
 * Local hub slugs for /boat-ceramic-coating/:slug — keep in sync with lib/fleetCities.ts FLEET_CITY_SLUGS.
 */
export const BOAT_CITY_SLUGS = [
  'hamilton',
  'mississauga',
  'toronto',
  'burlington',
  'oakville',
  'ancaster',
] as const;

export type BoatCitySlug = (typeof BOAT_CITY_SLUGS)[number];

export const BOAT_CITY_NAMES: Record<BoatCitySlug, string> = {
  hamilton: 'Hamilton',
  mississauga: 'Mississauga',
  toronto: 'Toronto',
  burlington: 'Burlington',
  oakville: 'Oakville',
  ancaster: 'Ancaster',
};

export function isBoatCitySlug(s: string): s is BoatCitySlug {
  return (BOAT_CITY_SLUGS as readonly string[]).includes(s);
}

export function getBoatCityName(slug: string): string {
  return isBoatCitySlug(slug) ? BOAT_CITY_NAMES[slug] : slug;
}
