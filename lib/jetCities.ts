/**
 * Local hub slugs for /jetdetailing/:slug — keep in sync with lib/fleetCities.ts / lib/boatCities.ts.
 */
export const JET_CITY_SLUGS = [
  'hamilton',
  'mississauga',
  'toronto',
  'burlington',
  'oakville',
  'ancaster',
] as const;

export type JetCitySlug = (typeof JET_CITY_SLUGS)[number];

export const JET_CITY_NAMES: Record<JetCitySlug, string> = {
  hamilton: 'Hamilton',
  mississauga: 'Mississauga',
  toronto: 'Toronto',
  burlington: 'Burlington',
  oakville: 'Oakville',
  ancaster: 'Ancaster',
};

export function isJetCitySlug(s: string): s is JetCitySlug {
  return (JET_CITY_SLUGS as readonly string[]).includes(s);
}

export function getJetCityName(slug: string): string {
  return isJetCitySlug(slug) ? JET_CITY_NAMES[slug] : slug;
}
