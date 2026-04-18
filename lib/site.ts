import { CITY_NAMES, CITY_SLUGS, type CitySlug } from './cities';

const trimTrailingSlash = (s: string) => s.replace(/\/$/, '');

/**
 * Live site origin (no trailing slash). Set `VITE_SITE_ORIGIN` in `.env` to your real domain.
 * Default is a neutral placeholder — replace in production.
 */
export const SITE_ORIGIN = trimTrailingSlash(
  (import.meta.env.VITE_SITE_ORIGIN as string | undefined)?.trim() || 'https://drivewaydetail.com'
);

export const BUSINESS = {
  /** Stable id for JSON-LD @id references */
  jsonLdId: `${SITE_ORIGIN}/#business`,
  name: 'Driveway Detail Co.',
  description:
    'Premium mobile car detailing, ceramic coating, and paint correction across Hamilton, Ancaster, Burlington, Oakville, Mississauga and the Greater Toronto Area. We come to you — request a quote online.',
} as const;

/** Cities named in copy and city landing routes (Ontario). */
export const AREA_SERVED = [
  'Hamilton',
  'Ancaster',
  'Burlington',
  'Oakville',
  'Mississauga',
  'Waterdown',
  'Caledonia',
  'Brantford',
] as const;

export const GEO = { latitude: 43.2557, longitude: -79.8711 } as const;

export const WEBSITE_JSONLD_ID = `${SITE_ORIGIN}/#website`;

export function normalizePath(pathname: string): string {
  const p = pathname.trim() || '/';
  if (p !== '/' && p.endsWith('/')) return p.slice(0, -1) || '/';
  return p;
}

export function canonicalUrl(pathname: string): string {
  const p = normalizePath(pathname);
  return p === '/' ? `${SITE_ORIGIN}/` : `${SITE_ORIGIN}${p}`;
}

function isCityPath(p: string): p is `/${CitySlug}` {
  if (!p.startsWith('/') || p === '/') return false;
  const slug = p.slice(1);
  return CITY_SLUGS.includes(slug as CitySlug);
}

export type PageWebMeta = { name: string; description: string; ogImage?: string };

const BRAND = 'Driveway Detail Co.';

export function pageWebMeta(pathname: string): PageWebMeta {
  const p = normalizePath(pathname);
  if (p === '/') {
    return {
      name: `Mobile Car Detailing Hamilton & GTA | ${BRAND}`,
      description:
        'Professional mobile detailing, ceramic coating & paint correction across Hamilton, Burlington, Oakville & Mississauga. We come to you. Request a quote.',
    };
  }
  if (isCityPath(p)) {
    const slug = p.slice(1) as CitySlug;
    const city = CITY_NAMES[slug];
    return {
      name: `Mobile Detailing ${city} | Ceramic Coating & Paint Correction | ${BRAND}`,
      description: `Mobile car detailing ${city}. We come to you for ceramic coating, paint correction & interior detailing. Premium mobile detailing ${city} and GTA. Request a quote.`,
    };
  }
  return {
    name: BRAND,
    description: BUSINESS.description,
  };
}

/** Visible + schema-aligned FAQs (homepage + city pages). */
export const HOME_FAQ = [
  {
    question: `What cities does ${BRAND} serve for mobile detailing?`,
    answer:
      'We provide mobile car detailing across Hamilton, Ancaster, Burlington, Oakville, Mississauga, and surrounding GTA communities. We come to your home or office.',
  },
  {
    question: 'Do you offer ceramic coating as a mobile service?',
    answer:
      'Yes. We apply nano ceramic coating on location with the same prep and finish standards as a fixed shop—wash, decontamination, paint correction where needed, then coating cure guidance.',
  },
  {
    question: 'How do I get a quote?',
    answer:
      'Use the quote request form on this site. Tell us your vehicle and location and we will respond with options.',
  },
  {
    question: 'What services do you offer?',
    answer:
      'We focus on premium mobile detailing: interior revival, exterior correction, ceramic coating, and protective finishes tailored to how you use your vehicle.',
  },
] as const;

/** Legacy exports — unused routes removed; kept so orphaned page files still typecheck. */
export const FLEET_FAQ = HOME_FAQ;
export const BOAT_CERAMIC_FAQ = HOME_FAQ;
export const JET_FAQ = HOME_FAQ;

export function buildDynamicJsonLd(pathname: string): Record<string, unknown> {
  const p = normalizePath(pathname);
  const url = canonicalUrl(p);
  const { name, description, ogImage } = pageWebMeta(p);
  const webpageId = `${url}#webpage`;

  const website: Record<string, unknown> = {
    '@type': 'WebSite',
    '@id': WEBSITE_JSONLD_ID,
    url: SITE_ORIGIN,
    name: BUSINESS.name,
    publisher: { '@id': BUSINESS.jsonLdId },
  };

  const webPage: Record<string, unknown> = {
    '@type': 'WebPage',
    '@id': webpageId,
    url,
    name,
    description,
    isPartOf: { '@id': WEBSITE_JSONLD_ID },
    about: { '@id': BUSINESS.jsonLdId },
  };

  if (ogImage) {
    webPage.primaryImageOfPage = {
      '@type': 'ImageObject',
      url: ogImage,
    };
  }

  const graph: Record<string, unknown>[] = [website, webPage];

  if (p === '/' || isCityPath(p)) {
    graph.push({
      '@type': 'FAQPage',
      '@id': `${url}#faq`,
      mainEntity: HOME_FAQ.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: item.answer,
        },
      })),
    });
  }

  const crumbs = breadcrumbItemsForPath(p);
  if (crumbs?.length) {
    graph.push({
      '@type': 'BreadcrumbList',
      '@id': `${url}#breadcrumb`,
      itemListElement: crumbs.map((c, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: c.name,
        item: canonicalUrl(c.path),
      })),
    });
  }

  return {
    '@context': 'https://schema.org',
    '@graph': graph,
  };
}

/** Breadcrumb trail for JSON-LD (city pages only). */
export function breadcrumbItemsForPath(pathname: string): { name: string; path: string }[] | null {
  const p = normalizePath(pathname);
  if (p === '/') return null;

  if (isCityPath(p)) {
    const slug = p.slice(1) as CitySlug;
    const city = CITY_NAMES[slug];
    return [
      { name: 'Home', path: '/' },
      { name: `Mobile detailing ${city}`, path: p },
    ];
  }

  return null;
}

/** @deprecated Blog routes removed; kept for unused blog components in repo. */
export function breadcrumbItemsForBlogPost(slug: string, title: string): { name: string; path: string }[] {
  const name = title.length > 44 ? `${title.slice(0, 41)}…` : title;
  return [
    { name: 'Home', path: '/' },
    { name: 'Blog', path: '/blog' },
    { name, path: `/blog/${slug}` },
  ];
}
