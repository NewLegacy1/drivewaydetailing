export const FLEET_CITY_SLUGS = [
  'hamilton',
  'mississauga',
  'toronto',
  'burlington',
  'oakville',
  'ancaster',
] as const;

export type FleetCitySlug = (typeof FLEET_CITY_SLUGS)[number];

export const FLEET_CITY_NAMES: Record<FleetCitySlug, string> = {
  hamilton: 'Hamilton',
  mississauga: 'Mississauga',
  toronto: 'Toronto',
  burlington: 'Burlington',
  oakville: 'Oakville',
  ancaster: 'Ancaster',
};

export function isFleetCitySlug(s: string): s is FleetCitySlug {
  return (FLEET_CITY_SLUGS as readonly string[]).includes(s);
}

export function getFleetCityName(slug: string): string {
  return isFleetCitySlug(slug) ? FLEET_CITY_NAMES[slug] : slug;
}
