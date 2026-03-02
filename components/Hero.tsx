import React, { useMemo } from 'react';

// Mobile hero: A/B test — Porsche + truck, or team washing Porsche in driveway
const HERO_MOBILE_IMAGES = ['/hero-mobile.png', '/images/showroom-switch.png'];

// Desktop: A/B test hero images (replace with your own for variety)
const HERO_IMAGES = ['/hero.png', '/hero2.png', '/hero3.png'];

// Lighter on left so worker is more visible; still dark enough for text
const HERO_GRADIENTS: { className: string }[] = [
  { className: 'bg-gradient-to-r from-black/45 via-black/25 to-transparent' },
  { className: 'bg-gradient-to-r from-black/40 via-black/18 to-transparent' },
  { className: 'bg-gradient-to-b from-black/40 via-transparent to-black/35' },
  { className: 'bg-gradient-to-r from-black/42 from-[25%] via-transparent to-transparent' },
  { className: 'bg-gradient-to-r from-black/40 via-black/20 to-black/8' },
];

interface HeroProps {
  onRequestQuote?: () => void;
  city?: string;
}

const Hero: React.FC<HeroProps> = ({ onRequestQuote, city }) => {
  const { image, gradient, mobileImage } = useMemo(() => ({
    image: HERO_IMAGES[Math.floor(Math.random() * HERO_IMAGES.length)],
    gradient: HERO_GRADIENTS[Math.floor(Math.random() * HERO_GRADIENTS.length)],
    mobileImage: HERO_MOBILE_IMAGES[Math.floor(Math.random() * HERO_MOBILE_IMAGES.length)],
  }), []);

  return (
    <section className="relative min-h-[72vh] md:min-h-screen flex items-center overflow-hidden pt-20">
      {/* Background: mobile = A/B (Porsche+truck or team+Porsche); desktop = random hero + gradient */}
      <div className="absolute inset-0 bg-brand-black">
        {/* Mobile: random from Porsche+truck or team washing Porsche */}
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
        {/* Desktop: random hero (changes on refresh) */}
        <div
          className="absolute inset-0 hero-bg-image hidden md:block"
          style={{
            backgroundImage: `url(${image})`,
            backgroundRepeat: 'no-repeat',
          }}
          aria-hidden
        />
        <div className="absolute inset-0 bg-black/25" aria-hidden />
        <div className="absolute inset-0 hero-middle-light" aria-hidden />
        <div className={`absolute inset-0 ${gradient.className}`} />
        <div className="absolute inset-0 hero-vignette" aria-hidden />
        <div className="absolute inset-0 hero-gridlines" aria-hidden />
      </div>

      {/* Top band ONLY: headline + stats — fixed height so it never covers the worker */}
      <div className="absolute top-28 left-0 right-0 z-10 px-4 sm:px-6 lg:px-8 pt-6 pb-2 max-h-[28vh] flex flex-col justify-end">
        <div className="w-full text-center reveal">
          <p className="text-brand-yellow font-bold tracking-[0.3em] uppercase text-xs sm:text-sm">
            {city ? `Mobile Detailing ${city}` : 'Mobile Car Detailing Hamilton'}
          </p>
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black uppercase leading-none tracking-tighter mt-1">
            <span className="text-brand-yellow text-glow">Showroom</span> Detailing. Delivered.
          </h1>
        </div>
        {/* Stats: equal columns on mobile so 4+ / Mobile / 500+ align; bar on desktop */}
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

      {/* Bottom: review + buttons — worker stays visible in between */}
      <div className="absolute bottom-0 left-0 right-0 z-10 px-4 sm:px-6 lg:px-8 pb-10 lg:pb-12">
        <div className="reveal flex flex-col items-center gap-5">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 text-center sm:text-left">
            <div className="flex text-brand-yellow justify-center">
              {[...Array(5)].map((_, i) => (
                <svg key={i} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
              ))}
            </div>
            <span className="text-white/80 font-bold uppercase tracking-widest text-sm">
              100+ Five-Star Google Reviews
            </span>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <button type="button" onClick={() => onRequestQuote?.()} className="bg-brand-yellow text-brand-black px-10 py-5 font-black uppercase tracking-widest text-sm magnetic-cta flex items-center justify-center gap-2 group">
              Get a Fast Quote
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 transition-transform"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
            </button>
            <a href="https://detailops.vercel.app/book/showroom-autocare" target="_blank" rel="noopener noreferrer" className="border-2 border-brand-yellow text-brand-yellow px-10 py-5 font-black uppercase tracking-widest text-sm magnetic-cta hover:bg-brand-yellow hover:text-brand-black transition-all text-center">
              Book Now
            </a>
          </div>
        </div>
      </div>

      {/* Aesthetic Border Accent */}
      <div className="absolute bottom-0 right-0 w-1/3 h-1 bg-gradient-to-l from-brand-yellow to-transparent"></div>
      <div className="absolute top-1/4 -right-10 w-20 h-[60%] border-r border-brand-yellow/20 hidden lg:block"></div>
    </section>
  );
};

export default Hero;
