export const CITY_SLUGS = ['ancaster', 'mississauga', 'hamilton', 'burlington', 'oakville'] as const;
export type CitySlug = (typeof CITY_SLUGS)[number];

export const CITY_NAMES: Record<CitySlug, string> = {
  ancaster: 'Ancaster',
  mississauga: 'Mississauga',
  hamilton: 'Hamilton',
  burlington: 'Burlington',
  oakville: 'Oakville',
};

export function isCitySlug(s: string): s is CitySlug {
  return CITY_SLUGS.includes(s as CitySlug);
}

export function getCityName(slug: string): string {
  return isCitySlug(slug) ? CITY_NAMES[slug] : slug;
}
