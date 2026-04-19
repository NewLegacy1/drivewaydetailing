/** Rough IP-based location from a lightweight geo API (browser fetch). */

export type VisitorGeo = {
  country: string;
  countryCode: string;
  region: string;
  city: string;
};

const GTA_CITIES_LC = new Set(
  [
    'toronto',
    'north york',
    'scarborough',
    'etobicoke',
    'mississauga',
    'brampton',
    'markham',
    'vaughan',
    'richmond hill',
    'oakville',
    'burlington',
    'hamilton',
    'ajax',
    'pickering',
    'whitby',
    'oshawa',
    'milton',
    'georgetown',
    'ancaster',
    'dundas',
    'stoney creek',
    'waterdown',
    'bolton',
    'caledon',
    'newmarket',
    'aurora',
    'king city',
    'stouffville',
    'thornhill',
    'woodbridge',
    'concord',
    'york',
    'east york',
  ].map((s) => s.toLowerCase())
);

function normCity(c: string): string {
  return c.trim().toLowerCase();
}

export function isLikelyGtaCity(city: string): boolean {
  const c = normCity(city);
  if (!c) return false;
  if (GTA_CITIES_LC.has(c)) return true;
  for (const g of GTA_CITIES_LC) {
    if (c.includes(g) || g.includes(c)) return true;
  }
  return false;
}

/** Hero eyebrow — short, uppercase-friendly line. */
export function heroEyebrowFromGeo(geo: VisitorGeo | null): string {
  if (!geo?.city) return 'Mobile car detailing — GTA';
  const city = geo.city.trim();
  if (!city) return 'Mobile car detailing — GTA';
  if (geo.countryCode === 'CA' && geo.region.toLowerCase().includes('ontario')) {
    if (isLikelyGtaCity(city)) {
      return `Mobile car detailing — ${city} & GTA`;
    }
    return 'Mobile car detailing — Greater Toronto Area';
  }
  if (geo.countryCode === 'US') {
    return `Mobile car detailing — GTA · from ${city}`;
  }
  return `Mobile car detailing — GTA · Canada`;
}

export function serviceAreasHeadingFromGeo(geo: VisitorGeo | null): { lead: string; highlight: string } {
  if (!geo?.city) {
    return { lead: 'Proudly serving ', highlight: 'the GTA' };
  }
  const city = geo.city.trim();
  if (geo.countryCode === 'CA' && geo.region.toLowerCase().includes('ontario') && isLikelyGtaCity(city)) {
    return { lead: `Proudly serving ${city} & `, highlight: 'the GTA' };
  }
  return { lead: 'Proudly serving ', highlight: 'the GTA' };
}

export function serviceAreasSublineFromGeo(geo: VisitorGeo | null): string {
  if (!geo?.city) return 'Mobile detailing where you are';
  const city = geo.city.trim();
  const region = geo.region.trim();
  if (city && region) {
    return `Browsing from ${city}, ${region} — we come to you in the GTA`;
  }
  if (city) return `Browsing from ${city} — we come to you in the GTA`;
  return 'Mobile detailing where you are';
}
