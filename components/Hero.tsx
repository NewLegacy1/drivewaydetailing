import React, { useMemo, type ReactNode } from 'react';
import { pickHeroBackground } from '@/lib/heroBackgrounds';
import { trackClientEvent } from '@/lib/trackEvent';
import { SITE_EVENT } from '@/lib/siteEvents';

/** Paid landing pages: same hero chrome as homepage, different copy + scroll-to-form quote CTA */
export type HeroAdCopy = {
  brandLine: string;
  locationTag: string;
  title: ReactNode;
  subline?: string;
  onQuoteClick: () => void;
};

interface HeroProps {
  onRequestQuote?: () => void;
  city?: string;
  adCopy?: HeroAdCopy;
}

function StarRow({ size = 22 }: { size?: number }) {
  return (
    <div className="flex text-brand-yellow justify-center gap-0.5" aria-hidden>
      {[...Array(5)].map((_, i) => (
        <svg key={i} xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
        </svg>
      ))}
    </div>
  );
}

const Hero: React.FC<HeroProps> = ({ onRequestQuote, city, adCopy }) => {
  const { desktop: image, gradient, mobile: mobileImage } = useMemo(() => pickHeroBackground(), []);

  const sectionPt = adCopy ? 'pt-2 md:pt-4' : 'pt-20';

  return (
    <section className={`relative min-h-[72vh] md:min-h-screen flex items-center overflow-hidden ${sectionPt}`}>
      <div className="absolute inset-0 bg-brand-black">
        <div
          className="absolute inset-0 hero-bg-image md:hidden"
          style={{
            backgroundImage: `url(${mobileImage})`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            backgroundSize: 'contain',
          }}
          aria-hidden
        />
        <div
          className="absolute inset-0 hero-bg-image hidden md:block"
          style={{
            backgroundImage: `url(${image})`,
            backgroundRepeat: 'no-repeat',
          }}
          aria-hidden
        />
        {/* Stronger overlays for text contrast (especially mobile) */}
        <div className="absolute inset-0 bg-black/55 md:bg-black/45" aria-hidden />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/35 to-black/65 md:from-black/40 md:via-black/30 md:to-black/55 pointer-events-none" aria-hidden />
        <div className="absolute inset-0 hero-middle-light" aria-hidden />
        <div className={`absolute inset-0 ${gradient.className}`} aria-hidden />
        <div className="absolute inset-0 hero-vignette opacity-95" aria-hidden />
        <div className="absolute inset-0 hero-gridlines opacity-50" aria-hidden />
      </div>

      <div
        className={`absolute top-28 left-0 right-0 z-10 px-4 sm:px-6 lg:px-8 pt-6 pb-2 flex flex-col justify-end ${
          adCopy ? 'max-h-[min(48vh,420px)] md:max-h-[34vh]' : 'max-h-[28vh]'
        }`}
      >
        <div className="w-full text-center reveal">
          {adCopy ? (
            <>
              <p className="text-white/60 font-semibold uppercase tracking-[0.2em] text-[10px] sm:text-xs mb-2">
                {adCopy.brandLine}
              </p>
              <p className="text-brand-yellow font-bold uppercase tracking-[0.28em] text-[10px] sm:text-[11px] mb-2 whitespace-nowrap overflow-hidden text-ellipsis px-1">
                {adCopy.locationTag}
              </p>
              <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black uppercase leading-[1.05] tracking-[-0.04em] sm:tracking-[-0.045em] text-white">
                {adCopy.title}
              </h1>
              {adCopy.subline ? (
                <p className="text-white/80 text-sm sm:text-base max-w-2xl mx-auto mt-3 leading-relaxed px-1">
                  {adCopy.subline}
                </p>
              ) : null}
            </>
          ) : (
            <>
              <p className="text-brand-yellow font-bold tracking-[0.3em] uppercase text-xs sm:text-sm">
                {city ? `Mobile Detailing ${city}` : 'Mobile Car Detailing Hamilton'}
              </p>
              <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black uppercase leading-none tracking-tighter mt-1">
                <span className="text-brand-yellow text-glow">Showroom</span> Detailing. Delivered.
              </h1>
            </>
          )}
        </div>
        <div className="reveal grid grid-cols-3 sm:flex sm:flex-wrap sm:justify-center gap-0 mt-5 w-full sm:w-auto">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-3 px-2 sm:px-8 py-2 sm:py-0 border-r border-white/20 min-w-0">
            <span className="text-brand-yellow font-black text-base sm:text-xl tabular-nums">4+</span>
            <span className="text-white/80 text-xs sm:text-sm font-medium uppercase tracking-wider">Years</span>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-3 px-2 sm:px-8 py-2 sm:py-0 border-r border-white/20">
            <span className="text-brand-yellow font-black text-base sm:text-xl">Mobile</span>
            <span className="text-white/80 text-xs sm:text-sm font-medium uppercase tracking-wider">Service</span>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-3 px-2 sm:px-8 py-2 sm:py-0 border-r border-white/20 last:border-r-0">
            <span className="text-brand-yellow font-black text-base sm:text-xl tabular-nums">500+</span>
            <span className="text-white/80 text-xs sm:text-sm font-medium uppercase tracking-wider">Cars</span>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 z-10 px-4 sm:px-6 lg:px-8 pb-10 lg:pb-12">
        <div className="reveal flex flex-col items-center gap-5 sm:gap-6">
          {/* Between stat badges (above) and review + CTAs */}
          <p className="text-brand-yellow font-bold uppercase tracking-[0.22em] text-[10px] sm:text-xs text-center px-2">
            Serving Hamilton, Oakville &amp; Burlington
          </p>
          <div className="w-full max-w-md mx-auto rounded-xl border border-brand-yellow/25 bg-black/55 backdrop-blur-md px-5 py-4 sm:py-5 shadow-[0_8px_32px_rgba(0,0,0,0.45)]">
            <StarRow size={24} />
            <p className="text-center text-white font-black uppercase tracking-[0.12em] text-xs sm:text-sm mt-3">
              135+ Five-Star Google Reviews
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto max-w-md sm:max-w-none">
            <button
              type="button"
              onClick={() => {
                trackClientEvent(adCopy ? SITE_EVENT.AD_HERO_FAST_QUOTE : SITE_EVENT.HERO_FAST_QUOTE);
                if (adCopy) adCopy.onQuoteClick();
                else onRequestQuote?.();
              }}
              className="bg-brand-yellow text-brand-black px-10 py-6 sm:py-6 min-h-[56px] font-black uppercase tracking-widest text-sm magnetic-cta flex items-center justify-center gap-2 group w-full sm:w-auto"
            >
              Get a Fast Quote
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 transition-transform shrink-0">
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </button>
            <a
              href="https://detailops.vercel.app/book/showroom-autocare"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackClientEvent(adCopy ? SITE_EVENT.AD_HERO_BOOK_NOW : SITE_EVENT.HERO_BOOK_NOW)}
              className="border-2 border-brand-yellow text-brand-yellow px-10 py-6 sm:py-6 min-h-[56px] font-black uppercase tracking-widest text-sm magnetic-cta hover:bg-brand-yellow hover:text-brand-black transition-all text-center flex items-center justify-center w-full sm:w-auto"
            >
              Book Now
            </a>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 right-0 w-1/3 h-1 bg-gradient-to-l from-brand-yellow to-transparent" />
      <div className="absolute top-1/4 -right-10 w-20 h-[60%] border-r border-brand-yellow/20 hidden lg:block" />
    </section>
  );
};

export default Hero;
