import type { ReactNode } from 'react';

export type AdFaqItem = { q: string; a: string };

export type AdWhyItem = { title: string; body: string };

export type AdGalleryItem = { src: string; alt: string };

export type AdCampaignConfig = {
  id: 'ceramic' | 'detailing';
  headline: string;
  subheadline: string;
  includedTitle: string;
  includedBullets: string[];
  whyTitle: string;
  whyItems: AdWhyItem[];
  beforeAfter: {
    title: ReactNode;
    subtitle: string;
    beforeSrc: string;
    afterSrc: string;
    caption: string;
  };
  gallery: AdGalleryItem[];
  faqs: AdFaqItem[];
};

export const AD_CAMPAIGN_CERAMIC: AdCampaignConfig = {
  id: 'ceramic',
  headline: 'Mobile ceramic coating in Hamilton',
  subheadline:
    'We come to your home or office — no drop-off, no waiting in a shop. Pro prep, correction when needed, and coating applied where your car lives.',
  includedTitle: 'What your ceramic coating visit includes',
  includedBullets: [
    'Consultation on paint condition and realistic gloss/protection goals',
    'Safe wash and full decontamination (bonded fallout removed before coating)',
    'Paint correction when needed — defects addressed before the coating locks them in',
    'Panel-by-panel nano ceramic application with proper flash and cure guidance',
    'Aftercare rules for the first days and weeks so the coating performs long-term',
  ],
  whyTitle: 'Why ShowRoom AutoCare',
  whyItems: [
    { title: 'Truly mobile', body: 'We run a fully equipped van — water, power, and lighting — at your driveway or workplace across Hamilton & the GTA.' },
    { title: 'Fully insured', body: 'Professional service with clear expectations — no hype, just honest outcomes on daily drivers and weekend cars alike.' },
    { title: 'Pro products & process', body: 'Coating-grade prep and application standards — the same discipline we use on correction and interior work.' },
    { title: 'Hamilton-based', body: 'Local crew that knows Ontario seasons, salt, and sun — we tailor advice for how you actually use your vehicle.' },
  ],
  beforeAfter: {
    title: (
      <>
        Gloss you can <span className="text-brand-yellow">see</span>
      </>
    ),
    subtitle: 'Paint correction + coating — drag to compare',
    beforeSrc: '/images/before-after/interior-before.png',
    afterSrc: '/images/before-after/interior-after.png',
    caption: 'Real correction and finishing work — we bring the same eye for finish to your paint.',
  },
  gallery: [
    { src: '/images/gallery-08.png', alt: 'Red Porsche exterior — paint correction and coating shine' },
    { src: '/images/gallery-05.png', alt: 'Mercedes SUV — mobile detailing and finish work' },
    { src: '/images/gallery-03.png', alt: 'Mercedes G-Wagen — exterior mobile detailing Ontario' },
    { src: '/images/gallery-16.png', alt: 'Porsche 911 interior and exterior showroom standard' },
  ],
  faqs: [
    {
      q: 'How long does ceramic coating take?',
      a: 'It depends on vehicle size, paint condition, and whether correction is included. We give a realistic window with your quote — quality coating work is not a rushed “same hour” job.',
    },
    {
      q: 'Do you need access to water or power?',
      a: 'We bring our own water and power for mobile work. Covered space out of direct sun/wind helps during application — tell us about your setup when you request a quote.',
    },
    {
      q: 'What areas do you service?',
      a: 'Hamilton, Ancaster, Burlington, Oakville, Mississauga, and surrounding GTA. If you are unsure, ask in the form or call (905) 379-4820.',
    },
    {
      q: 'Is ceramic coating worth it on a daily driver?',
      a: 'If you want easier washing, stronger protection than wax, and a deeper gloss, it is often a great fit — especially with sensible maintenance washes afterward.',
    },
  ],
};

export const AD_CAMPAIGN_DETAILING: AdCampaignConfig = {
  id: 'detailing',
  headline: 'Mobile car detailing in Hamilton',
  subheadline:
    'Professional paint correction, ceramic coating, and full detailing — done at your door.',
  includedTitle: 'What a full mobile detail can include',
  includedBullets: [
    'Thorough vacuum, blow-out, and fabric/leather-safe cleaning where appropriate',
    'Interior plastics, vents, and glass brought to a crisp, streak-free finish',
    'Exterior safe wash, wheels & tires, and drying without swirl-inducing shortcuts',
    'Paint decontamination or light enhancement options when you want more pop',
    'Final walkthrough so you see the result before we pack up',
  ],
  whyTitle: 'Why ShowRoom AutoCare',
  whyItems: [
    { title: 'Mobile convenience', body: 'We meet you at home, work, or your job site — you keep your day while we work.' },
    { title: 'Self-contained van', body: 'De-ionized water and quiet power on board — we are not plugging into your house.' },
    { title: 'Trusted pros', body: 'Background-checked team trained for fine finishes on daily drivers and luxury vehicles.' },
    { title: 'Hamilton-grown', body: 'Locally owned since 2021 — we know local grime, salt, and what it takes to fix it.' },
  ],
  beforeAfter: {
    title: (
      <>
        See the <span className="text-brand-yellow">transformation</span>
      </>
    ),
    subtitle: 'Drag the line — interior revival, real customer cars',
    beforeSrc: '/images/before-after/interior-before.png',
    afterSrc: '/images/before-after/interior-after.png',
    caption: 'Audi RS 6 interior — from heavy wear to showroom finish',
  },
  gallery: [
    { src: '/images/gallery-01.png', alt: 'Cadillac Escalade interior — leather and carpet revival' },
    { src: '/images/gallery-17.png', alt: 'Mobile detailing result — Hamilton Burlington GTA' },
    { src: '/images/gallery-09.png', alt: 'Luxury sedan snow foam wash — mobile at your location' },
    { src: '/images/gallery-10.png', alt: 'ShowRoom AutoCare mobile van — professional detailing' },
  ],
  faqs: [
    {
      q: 'How long does a detail take?',
      a: 'A full interior and exterior detail typically takes several hours depending on size and condition. We will quote a realistic window for your vehicle.',
    },
    {
      q: 'Do you need my water or electricity?',
      a: 'No — we bring water and power. Just provide access to the vehicle and a safe place to work.',
    },
    {
      q: 'What areas do you service?',
      a: 'Hamilton, Ancaster, Burlington, Oakville, Mississauga, and the wider GTA. Call (905) 379-4820 if your city is not listed.',
    },
    {
      q: 'How do I book?',
      a: 'Request a free quote on this page or call us. We follow up by phone or email — no third-party booking widget.',
    },
  ],
};
