/**
 * Shared hero imagery (same pools as homepage Hero).
 * Mobile: A/B — Porsche + truck, or team washing Porsche.
 * Desktop: rotates hero.png / hero2.png / hero3.png.
 */

export const HERO_MOBILE_IMAGES = ['/hero-mobile.png', '/images/showroom-switch.png'] as const;

export const HERO_DESKTOP_IMAGES = ['/hero.png', '/hero2.png', '/hero3.png'] as const;

export const HERO_GRADIENTS = [
  { className: 'bg-gradient-to-r from-black/45 via-black/25 to-transparent' },
  { className: 'bg-gradient-to-r from-black/40 via-black/18 to-transparent' },
  { className: 'bg-gradient-to-b from-black/40 via-transparent to-black/35' },
  { className: 'bg-gradient-to-r from-black/42 from-[25%] via-transparent to-transparent' },
  { className: 'bg-gradient-to-r from-black/40 via-black/20 to-black/8' },
] as const;

export type HeroBackgroundPick = {
  desktop: (typeof HERO_DESKTOP_IMAGES)[number];
  mobile: (typeof HERO_MOBILE_IMAGES)[number];
  gradient: (typeof HERO_GRADIENTS)[number];
};

export function pickHeroBackground(): HeroBackgroundPick {
  return {
    desktop: HERO_DESKTOP_IMAGES[Math.floor(Math.random() * HERO_DESKTOP_IMAGES.length)],
    mobile: HERO_MOBILE_IMAGES[Math.floor(Math.random() * HERO_MOBILE_IMAGES.length)],
    gradient: HERO_GRADIENTS[Math.floor(Math.random() * HERO_GRADIENTS.length)],
  };
}
