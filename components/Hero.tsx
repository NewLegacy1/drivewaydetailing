import React, { useMemo } from 'react';

/** Primary hero art — snow foam wash at a residential driveway. */
const HERO_IMAGE = '/hero-driveway-911.png';

const HERO_GRADIENTS: { className: string }[] = [
  { className: 'bg-gradient-to-r from-brand-navy/80 via-brand-navy/35 to-transparent' },
  { className: 'bg-gradient-to-r from-brand-navy/75 via-brand-navy/30 to-transparent' },
  { className: 'bg-gradient-to-b from-brand-navy/70 via-transparent to-brand-navy/55' },
  { className: 'bg-gradient-to-r from-brand-navy/78 from-[25%] via-transparent to-transparent' },
  { className: 'bg-gradient-to-r from-brand-navy/72 via-brand-navy/40 to-brand-navy/15' },
];

function stableIndex(seed: string, length: number): number {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return Math.abs(h) % length;
}

interface HeroProps {
  onRequestQuote?: () => void;
  /** Same seed → same gradient (omit for random gradient). */
  layoutSeed?: string;
  noHeaderOffset?: boolean;
}

const Hero: React.FC<HeroProps> = ({ onRequestQuote, layoutSeed, noHeaderOffset }) => {
  const gradient = useMemo(() => {
    if (layoutSeed) {
      return HERO_GRADIENTS[stableIndex(`${layoutSeed}:gradient`, HERO_GRADIENTS.length)];
    }
    return HERO_GRADIENTS[Math.floor(Math.random() * HERO_GRADIENTS.length)];
  }, [layoutSeed]);

  return (
    <section
      className={`relative min-h-[72vh] md:min-h-screen flex items-center overflow-hidden ${noHeaderOffset ? 'pt-6 sm:pt-8' : 'pt-20'}`}
    >
      <div className="absolute inset-0 bg-brand-navy">
        <div
          className="absolute inset-0 hero-bg-image"
          style={{
            backgroundImage: `url(${HERO_IMAGE})`,
            backgroundRepeat: 'no-repeat',
          }}
          aria-hidden
        />
        <div className="absolute inset-0 bg-brand-navy/35" aria-hidden />
        <div className="absolute inset-0 hero-middle-light" aria-hidden />
        <div className={`absolute inset-0 ${gradient.className}`} />
        <div className="absolute inset-0 hero-vignette" aria-hidden />
        <div className="absolute inset-0 hero-gridlines" aria-hidden />
      </div>

      <div
        className={`absolute left-0 right-0 z-10 px-4 sm:px-6 lg:px-8 pb-2 max-h-[28vh] flex flex-col justify-end ${noHeaderOffset ? 'top-8 md:top-10 pt-2 md:pt-4' : 'top-24 md:top-28 pt-4 md:pt-6'}`}
      >
        <div className="w-full text-center reveal">
          <p className="text-brand-silver font-bold tracking-[0.3em] uppercase text-xs sm:text-sm">
            Mobile car detailing — GTA
          </p>
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black uppercase leading-none tracking-tighter mt-1 text-white drop-shadow-sm">
            <span className="text-brand-silver text-glow">Driveway</span> detailing. Delivered.
          </h1>
        </div>
        <div className="reveal grid grid-cols-3 sm:flex sm:flex-wrap sm:justify-center gap-0 mt-5 w-full sm:w-auto">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-3 px-2 sm:px-8 py-2 sm:py-0 border-r border-white/25 min-w-0">
            <span className="text-brand-silver font-black text-base sm:text-xl tabular-nums">4+</span>
            <span className="text-white/85 text-xs sm:text-sm font-medium uppercase tracking-wider">Years</span>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-3 px-2 sm:px-8 py-2 sm:py-0 border-r border-white/25">
            <span className="text-brand-silver font-black text-base sm:text-xl">Mobile</span>
            <span className="text-white/85 text-xs sm:text-sm font-medium uppercase tracking-wider">Service</span>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-3 px-2 sm:px-8 py-2 sm:py-0 border-r border-white/25 last:border-r-0">
            <span className="text-brand-silver font-black text-base sm:text-xl tabular-nums">500+</span>
            <span className="text-white/85 text-xs sm:text-sm font-medium uppercase tracking-wider">Cars</span>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 z-10 px-4 sm:px-6 lg:px-8 pb-7 md:pb-10 lg:pb-12">
        <div className="reveal flex flex-col items-center gap-5">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 text-center sm:text-left">
            <div className="flex text-brand-yellow justify-center">
              {[...Array(5)].map((_, i) => (
                <svg key={i} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                </svg>
              ))}
            </div>
            <span className="text-white/85 font-bold uppercase tracking-widest text-sm">
              Five-star rated mobile detailer
            </span>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              type="button"
              onClick={() => onRequestQuote?.()}
              className="bg-white text-brand-navy px-10 py-5 font-black uppercase tracking-widest text-sm magnetic-cta flex items-center justify-center gap-2 group hover:bg-brand-silver transition-colors"
            >
              Request a quote
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 transition-transform">
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 right-0 w-1/3 h-1 bg-gradient-to-l from-brand-yellow to-transparent" />
      <div className="absolute top-1/4 -right-10 w-20 h-[60%] border-r border-brand-yellow/25 hidden lg:block" />
    </section>
  );
};

export default Hero;
