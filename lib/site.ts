import { CITY_NAMES, CITY_SLUGS, type CitySlug } from './cities';
import { BOAT_CITY_NAMES, isBoatCitySlug, type BoatCitySlug } from './boatCities';
import { FLEET_CITY_NAMES, isFleetCitySlug, type FleetCitySlug } from './fleetCities';
import { JET_CITY_NAMES, isJetCitySlug, type JetCitySlug } from './jetCities';

/** Canonical marketing origin (matches index.html & robots.txt). */
export const SITE_ORIGIN = 'https://showroomautocare.ca';

/** DetailOps online booking for ShowRoom AutoCare (all “Book now” CTAs). */
export const BOOKING_URL = 'https://detailops.ca/book/showroom-autocare';

export const BUSINESS = {
  /** Stable id for JSON-LD @id references */
  jsonLdId: `${SITE_ORIGIN}/#business`,
  name: 'ShowRoom AutoCare',
  telephone: '+19053794820',
  email: 'contact@showroomautocare.ca',
  description:
    'Premium mobile car detailing, ceramic coating, and paint correction across Hamilton, Ancaster, Burlington, Oakville, Mississauga and the Greater Toronto Area. Commercial fleet and transport truck detailing, marine ceramic coating for boats, and private aircraft jet detailing where hangar or FBO access can be coordinated.',
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

function fleetPathSlug(p: string): FleetCitySlug | null {
  if (p === '/fleet-detailing') return null;
  if (!p.startsWith('/fleet-detailing/')) return null;
  const slug = p.slice('/fleet-detailing/'.length);
  return isFleetCitySlug(slug) ? slug : null;
}

function isFleetJsonLdPath(p: string): boolean {
  if (p === '/fleet-detailing') return true;
  return fleetPathSlug(p) !== null;
}

function boatPathSlug(p: string): BoatCitySlug | null {
  if (p === '/boat-ceramic-coating') return null;
  if (!p.startsWith('/boat-ceramic-coating/')) return null;
  const slug = p.slice('/boat-ceramic-coating/'.length);
  return isBoatCitySlug(slug) ? slug : null;
}

function isBoatCeramicJsonLdPath(p: string): boolean {
  if (p === '/boat-ceramic-coating') return true;
  return boatPathSlug(p) !== null;
}

function jetPathSlug(p: string): JetCitySlug | null {
  if (p === '/jetdetailing') return null;
  if (!p.startsWith('/jetdetailing/')) return null;
  const slug = p.slice('/jetdetailing/'.length);
  return isJetCitySlug(slug) ? slug : null;
}

function isJetJsonLdPath(p: string): boolean {
  if (p === '/jetdetailing') return true;
  return jetPathSlug(p) !== null;
}

export type PageWebMeta = { name: string; description: string; ogImage?: string };

export function pageWebMeta(pathname: string): PageWebMeta {
  const p = normalizePath(pathname);
  if (p === '/' || p === '/mobiledetailing') {
    return {
      name: 'Mobile Car Detailing Hamilton & GTA | ShowRoom AutoCare',
      description:
        'Professional mobile detailing, ceramic coating & paint correction across Hamilton, Burlington, Oakville & Mississauga. We come to you. Get a free quote.',
    };
  }
  if (p === '/mobiledetailing/thank-you') {
    return {
      name: 'Thank you | ShowRoom AutoCare',
      description: 'Your quote request was received. We will contact you shortly.',
    };
  }
  if (p.startsWith('/jetdetailing')) {
    const slug = jetPathSlug(p);
    const jetOg = `${SITE_ORIGIN}/jet-hero.png`;
    if (slug) {
      const city = JET_CITY_NAMES[slug];
      return {
        name: `Jet Detailing ${city} | Private Aircraft Cleaning | ShowRoom AutoCare`,
        description: `Luxury aircraft detailing in ${city} and the Golden Horseshoe: exterior wash and protection, cabin interior detailing, and brightwork polishing. Mobile service to hangars and FBOs. Request a quote.`,
        ogImage: jetOg,
      };
    }
    return {
      name: 'Jet Detailing Toronto & Hamilton | Luxury Aircraft Cleaning | ShowRoom AutoCare',
      description:
        'Discover premier jet detailing services in Toronto and Hamilton. We specialize in exterior cleaning, interior cabin detailing, and brightwork polishing for private jets and turboprops.',
      ogImage: jetOg,
    };
  }
  if (p === '/ceramic-coating') {
    return {
      name: 'Nano Ceramic Coating Hamilton & GTA | Mobile Application | ShowRoom AutoCare',
      description:
        'Professional mobile nano ceramic coating in Hamilton, Burlington, Oakville, Mississauga and the GTA. Prep, paint correction when needed, and coating at your location. Free quote.',
    };
  }
  if (p === '/blog') {
    return {
      name: 'Car Detailing & Ceramic Coating Blog | Hamilton, GTA | ShowRoom AutoCare',
      description:
        'Expert mobile detailing and ceramic coating articles for Hamilton, Ancaster, Burlington, Oakville, Mississauga and the GTA. Tips from ShowRoom AutoCare.',
    };
  }
  if (p === '/ads/mobile-detailing') {
    return {
      name: 'Mobile Car Detailing Hamilton & GTA | Free Quote | ShowRoom AutoCare',
      description:
        'Mobile car detailing at your home or office in Hamilton, Burlington, Oakville, Mississauga and the GTA. No drop-off. Request a free quote.',
    };
  }
  if (p === '/ads/ceramic-coating') {
    return {
      name: 'Mobile Ceramic Coating Hamilton & GTA | Free Quote | ShowRoom AutoCare',
      description:
        'Nano ceramic coating at your location in Hamilton and the GTA. Prep, correction when needed, professional application. Free quote.',
    };
  }
  if (p === '/ads/thank-you') {
    return {
      name: 'Thank you | ShowRoom AutoCare',
      description: 'Your quote request was received. We will contact you shortly.',
    };
  }
  if (p.startsWith('/fleet-detailing')) {
    const slug = fleetPathSlug(p);
    const fleetOg = `${SITE_ORIGIN}/fleet-hero.png`;
    if (slug) {
      const city = FLEET_CITY_NAMES[slug];
      return {
        name: `Fleet Detailing ${city} | Transport Trucks & Company Fleets | ShowRoom AutoCare`,
        description: `Commercial fleet detailing and transport truck cleaning in ${city}. Mobile semi cab & sleeper interior detailing, fleet washing, and contract plans for carriers and businesses. Free fleet quote.`,
        ogImage: fleetOg,
      };
    }
    return {
      name: 'Fleet Detailing Hamilton, Toronto & GTA | Transport Trucks | ShowRoom AutoCare',
      description:
        'Commercial fleet detailing, semi truck interior cleaning, and company fleet washing across Hamilton, Mississauga, Toronto, Burlington, and the GTA. Mobile on-site service. Build a contract plan and request a quote.',
      ogImage: fleetOg,
    };
  }
  if (p.startsWith('/boat-ceramic-coating')) {
    const slug = boatPathSlug(p);
    const boatOg = `${SITE_ORIGIN}/boat-hero.png`;
    if (slug) {
      const city = BOAT_CITY_NAMES[slug];
      return {
        name: `Boat Ceramic Coating ${city} | Marine Nano Ceramic | ShowRoom AutoCare`,
        description: `Marine ceramic coating and gelcoat protection in ${city}. Longer-lasting finish than yearly waxing—hull, deck, and topside options. Free boat coating quote.`,
        ogImage: boatOg,
      };
    }
    return {
      name: 'Boat Ceramic Coating Hamilton & GTA | Marine Gelcoat Protection | ShowRoom AutoCare',
      description:
        'Professional boat ceramic coating across Hamilton, Mississauga, Toronto, Burlington, and the GTA. Nano ceramic for gelcoat and topsides—less annual waxing, easier wash-downs. Plan your scope and request a quote.',
      ogImage: boatOg,
    };
  }
  if (isCityPath(p)) {
    const slug = p.slice(1) as CitySlug;
    const city = CITY_NAMES[slug];
    return {
      name: `Mobile Detailing ${city} | Ceramic Coating & Paint Correction | ShowRoom AutoCare`,
      description: `Mobile car detailing ${city}. We come to you for ceramic coating, paint correction & interior detailing. Premium mobile detailing ${city} and GTA. Free quote.`,
    };
  }
  return {
    name: 'ShowRoom AutoCare',
    description: BUSINESS.description,
  };
}

/** Visible + schema-aligned FAQs (homepage). */
export const HOME_FAQ = [
  {
    question: 'What cities does ShowRoom AutoCare serve for mobile detailing?',
    answer:
      'We provide mobile car detailing across Hamilton, Ancaster, Burlington, Oakville, Mississauga, and surrounding GTA communities. We come to your home, office, or hangar.',
  },
  {
    question: 'Do you offer ceramic coating as a mobile service?',
    answer:
      'Yes. We apply nano ceramic coating on location with the same prep and finish standards as a fixed shop—wash, decontamination, paint correction where needed, then coating cure guidance.',
  },
  {
    question: 'How do I get a quote?',
    answer:
      'Request a quote through our website form, call (905) 379-4820, or email contact@showroomautocare.ca. Tell us your vehicle and location and we will respond with options.',
  },
  {
    question: 'What services do you offer besides detailing?',
    answer:
      'We focus on premium mobile detailing: interior revival, exterior correction, ceramic coating, and specialty services such as jet detailing for private aircraft in select markets.',
  },
] as const;

/** Visible + schema-aligned FAQs (fleet detailing hub + city pages). */
export const FLEET_FAQ = [
  {
    question: 'Do you detail semi trucks, day cabs, and sleeper cabs?',
    answer:
      'Yes. We service transport trucks (day cab) and units with sleepers—interior cab and bunk refresh plus exterior washes sized for highway tractors, not tunnel washes.',
  },
  {
    question: 'Is fleet detailing mobile—do you come to our yard or terminal?',
    answer:
      'We operate as a mobile fleet detailing service in Hamilton, the GTA, and surrounding Golden Horseshoe communities. We coordinate on-site visits with your operations team.',
  },
  {
    question: 'How does contract pricing and frequency work?',
    answer:
      'Choose one-time for a single visit at list rate (plus fleet volume tiers), or pick a recurring frequency (weekly through bimonthly) with optional 6- or 12-month loyalty savings. The planner shows an indicative total; we confirm after a quick fleet walkthrough.',
  },
  {
    question: 'Can you handle mixed fleets—cars, vans, and pickups?',
    answer:
      'Yes. You can combine cars, SUVs, vans, and pickup trucks in one plan. Specialty or unique units can be flagged as “other” so we can price them manually.',
  },
  {
    question: 'How do I book or follow up after I send a fleet plan?',
    answer:
      'Submit the planner form and we will email you back, or call (905) 379-4820. For single-vehicle consumer detailing you can also use our online booking link.',
  },
] as const;

/** Visible + schema-aligned FAQs (boat ceramic hub + city pages). */
export const BOAT_CERAMIC_FAQ = [
  {
    question: 'Is boat ceramic coating better than waxing every year?',
    answer:
      'Ceramic coatings are designed to last much longer than traditional wax under normal fresh-water use and washing. You still wash the boat, but you typically reapply protection far less often than with seasonal wax—exact intervals depend on storage, UV exposure, and how you use the boat.',
  },
  {
    question: 'What surfaces can you coat?',
    answer:
      'Most projects focus on gelcoat hull sides and painted topsides. We can add deck and non-skid areas, rails, and metal brightwork as scoped add-ons. Inflatable tubes and soft trim are evaluated case by case.',
  },
  {
    question: 'Do you work at marinas or only at my home?',
    answer:
      'We coordinate on-site service where permitted—marina slips, launch ramps with staging, or your driveway with the boat on a trailer. Tell us your marina or storage location when you request a quote.',
  },
  {
    question: 'Will you polish oxidized gelcoat first?',
    answer:
      'Yes, when needed. Heavier oxidation requires more correction before coating—that is reflected in the prep tier you select in the planner and confirmed after inspection.',
  },
  {
    question: 'How do I get a firm price?',
    answer:
      'Use the quote planner for an indicative total, then we follow up after seeing the boat in person (or detailed photos) to lock scope and pricing. Call (905) 379-4820 anytime.',
  },
] as const;

/** Visible + schema-aligned FAQs (jet detailing hub + city pages). */
export const JET_FAQ = [
  {
    question: 'Which airports and regions do you serve for aircraft detailing?',
    answer:
      'We coordinate mobile jet detailing across the Greater Toronto Area, Hamilton, and nearby Golden Horseshoe airports—including major hubs and regional fields where hangar or FBO access can be arranged.',
  },
  {
    question: 'Are your products and methods appropriate for aircraft finishes and interiors?',
    answer:
      'We use aviation-conscious techniques and products suited to painted and composite exteriors, brightwork, and cabin materials. Scope and product selection are confirmed for your aircraft type before work begins.',
  },
  {
    question: 'Do you work on-site at hangars and FBOs?',
    answer:
      'Yes, when permitted by the facility. We bring equipment and coordinate with your operations team or FBO so you minimize downtime while exteriors, cabins, and brightwork are refreshed.',
  },
  {
    question: 'What is the difference between exterior, cabin, and brightwork services?',
    answer:
      'Exterior work focuses on safe cleaning and protection of airframe surfaces; cabin detailing covers upholstery, leather, panels, and touchpoints; brightwork addresses polished metal and alloy trim for gloss and corrosion resistance.',
  },
  {
    question: 'How do I request a quote for jet detailing?',
    answer:
      'Use the quote request on our site, email contact@showroomautocare.ca, or call (905) 379-4820 with aircraft type, location, and desired services—we follow up with scheduling and scope.',
  },
] as const;

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

  if (p === '/' || p === '/mobiledetailing') {
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
    return { '@context': 'https://schema.org', '@graph': graph };
  }

  if (isFleetJsonLdPath(p)) {
    graph.push({
      '@type': 'FAQPage',
      '@id': `${url}#faq`,
      mainEntity: FLEET_FAQ.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: item.answer,
        },
      })),
    });
  }

  if (isBoatCeramicJsonLdPath(p)) {
    graph.push({
      '@type': 'FAQPage',
      '@id': `${url}#faq`,
      mainEntity: BOAT_CERAMIC_FAQ.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: item.answer,
        },
      })),
    });
  }

  if (isJetJsonLdPath(p)) {
    graph.push({
      '@type': 'FAQPage',
      '@id': `${url}#faq`,
      mainEntity: JET_FAQ.map((item) => ({
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

/** Breadcrumb trail for JSON-LD (excludes home-only). */
export function breadcrumbItemsForPath(pathname: string): { name: string; path: string }[] | null {
  const p = normalizePath(pathname);
  if (p === '/' || p === '/blog') return null;

  if (p === '/jetdetailing') {
    return [
      { name: 'Home', path: '/' },
      { name: 'Jet detailing', path: '/jetdetailing' },
    ];
  }

  const jetSlug = jetPathSlug(p);
  if (jetSlug) {
    const city = JET_CITY_NAMES[jetSlug];
    return [
      { name: 'Home', path: '/' },
      { name: 'Jet detailing', path: '/jetdetailing' },
      { name: city, path: p },
    ];
  }

  if (p === '/ceramic-coating') {
    return [
      { name: 'Home', path: '/' },
      { name: 'Ceramic coating', path: '/ceramic-coating' },
    ];
  }

  if (p === '/mobiledetailing') {
    return [
      { name: 'Home', path: '/' },
      { name: 'Mobile detailing', path: '/mobiledetailing' },
    ];
  }

  if (p === '/mobiledetailing/thank-you') {
    return [
      { name: 'Home', path: '/' },
      { name: 'Mobile detailing', path: '/mobiledetailing' },
      { name: 'Thank you', path: '/mobiledetailing/thank-you' },
    ];
  }

  if (p === '/fleet-detailing') {
    return [
      { name: 'Home', path: '/' },
      { name: 'Fleet detailing', path: '/fleet-detailing' },
    ];
  }

  const fleetSlug = fleetPathSlug(p);
  if (fleetSlug) {
    const city = FLEET_CITY_NAMES[fleetSlug];
    return [
      { name: 'Home', path: '/' },
      { name: 'Fleet detailing', path: '/fleet-detailing' },
      { name: city, path: p },
    ];
  }

  if (p === '/boat-ceramic-coating') {
    return [
      { name: 'Home', path: '/' },
      { name: 'Boat ceramic coating', path: '/boat-ceramic-coating' },
    ];
  }

  const boatSlug = boatPathSlug(p);
  if (boatSlug) {
    const city = BOAT_CITY_NAMES[boatSlug];
    return [
      { name: 'Home', path: '/' },
      { name: 'Boat ceramic coating', path: '/boat-ceramic-coating' },
      { name: city, path: p },
    ];
  }

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

/** Blog article: Home → Blog → title (truncated for breadcrumb display). */
export function breadcrumbItemsForBlogPost(slug: string, title: string): { name: string; path: string }[] {
  const name = title.length > 44 ? `${title.slice(0, 41)}…` : title;
  return [
    { name: 'Home', path: '/' },
    { name: 'Blog', path: '/blog' },
    { name, path: `/blog/${slug}` },
  ];
}
