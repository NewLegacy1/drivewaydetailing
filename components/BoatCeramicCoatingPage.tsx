import React from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { Droplets, MapPin, ShieldCheck, Sparkles } from 'lucide-react';
import BoatCeramicQuoteBuilder from './boat/BoatCeramicQuoteBuilder';
import { BOAT_CITY_SLUGS, getBoatCityName, isBoatCitySlug, type BoatCitySlug } from '@/lib/boatCities';
import { BOAT_CERAMIC_FAQ } from '@/lib/site';

const LOCAL_INTRO: Record<BoatCitySlug, string> = {
  hamilton:
    'Hamilton Harbour, LaSalle Park, and Lake Ontario access points—we plan ceramic coating around haul-out, marina schedules, and seasonal launch windows so your gelcoat stays protected longer than yearly wax cycles.',
  mississauga:
    'Port Credit and western GTA boaters get the same meticulous prep we bring to automotive nano-coating—scaled for hulls, decks, and brightwork on the water or at your slip.',
  toronto:
    'Toronto Island, Outer Harbour, and city-side marinas: mobile-friendly scheduling and clear scope so you know what replaces seasonal waxing and how we handle UV and wash-down exposure.',
  burlington:
    'Burlington waterfront and Bronte Creek launches—ceramic protection for fibreglass runabouts through mid-size cruisers, with add-ons for non-skid and topside areas.',
  oakville:
    'Oakville and east GTA slips: discreet, professional service focused on durable gloss and easier washes—less time buffing wax, more time on the water.',
  ancaster:
    'A short run from Hamilton Harbour and inland storage yards—we coordinate coating when your boat is on the trailer or staged for spring launch.',
};

const BoatCeramicCoatingPage: React.FC = () => {
  const { boatCity } = useParams<{ boatCity?: string }>();

  if (boatCity && !isBoatCitySlug(boatCity)) {
    return <Navigate to="/boat-ceramic-coating" replace />;
  }

  const isHub = !boatCity;
  const cityName = boatCity ? getBoatCityName(boatCity) : 'GTA & Hamilton';
  const cityLabel = isHub ? 'Greater Toronto & Hamilton' : cityName;
  const localLine = boatCity ? LOCAL_INTRO[boatCity] : null;

  const openQuoteModal = () => {
    window.dispatchEvent(new CustomEvent('ddc-open-quote'));
  };

  return (
    <>
      <section
        className="relative w-full min-w-0 overflow-x-hidden pt-24 sm:pt-28 pb-14 sm:pb-16 md:pt-36 md:pb-24 bg-brand-black min-h-[min(82vh,820px)] sm:min-h-[60vh] flex flex-col justify-center"
        aria-label="Hero: cabin cruiser wash and prep for marine ceramic coating"
      >
        <div
          className="absolute inset-0 bg-cover bg-no-repeat bg-center sm:bg-[center_45%]"
          style={{ backgroundImage: 'url(/boat-hero.png)' }}
          aria-hidden
        />
        <div className="absolute inset-0 bg-black/70 sm:bg-black/66 pointer-events-none" aria-hidden />
        <div
          className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/88 pointer-events-none"
          aria-hidden
        />
        <div className="absolute inset-0 grid-pattern opacity-[0.05] pointer-events-none" aria-hidden />
        <div className="max-w-7xl mx-auto w-full min-w-0 px-4 sm:px-6 lg:px-8 relative z-10">
          <nav className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-white/40 mb-6" aria-label="Breadcrumb">
            <Link to="/" className="hover:text-brand-yellow transition-colors">
              Home
            </Link>
            <span className="mx-2 text-white/25">/</span>
            <span className="text-white/60">Boat ceramic coating</span>
            {!isHub && (
              <>
                <span className="mx-2 text-white/25">/</span>
                <span className="text-brand-yellow">{cityName}</span>
              </>
            )}
          </nav>
          <p className="font-display text-brand-yellow uppercase tracking-[0.2em] sm:tracking-[0.28em] text-xs sm:text-sm font-bold mb-3 sm:mb-4">
            Marine nano ceramic · Gelcoat &amp; paint protection
          </p>
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tighter text-white mb-4 sm:mb-6 leading-[1.05] max-w-4xl">
            {isHub ? (
              <>
                Boat <span className="text-brand-yellow">ceramic coating</span>
                <span className="block sm:inline sm:ml-2">Skip the yearly wax · Hamilton · GTA</span>
              </>
            ) : (
              <>
                Boat ceramic coating in <span className="text-brand-yellow">{cityName}</span>
                <span className="block text-2xl sm:text-3xl md:text-4xl mt-2 text-white/90 normal-case tracking-tight font-black">
                  Longer-lasting protection than traditional wax
                </span>
              </>
            )}
          </h1>
          <p className="text-white/70 text-base sm:text-lg md:text-xl leading-relaxed max-w-3xl mb-6">
            {isHub
              ? 'Professional marine ceramic coating for fibreglass gelcoat and painted topsides: UV resistance, easier wash-downs, and less frequent reapplication than seasonal waxing. Serving Hamilton, Mississauga, Toronto, Burlington, Oakville, Ancaster, and Lake Ontario–adjacent marinas.'
              : `${localLine}`}
          </p>
          <div className="flex flex-wrap gap-3 sm:gap-4">
            <a
              href="#boat-coating-planner"
              className="inline-flex items-center justify-center bg-brand-yellow text-brand-black px-6 sm:px-8 py-3.5 font-black uppercase tracking-widest text-xs sm:text-sm magnetic-cta"
            >
              Plan your coating
            </a>
            <button
              type="button"
              onClick={openQuoteModal}
              className="inline-flex items-center justify-center border border-white/25 text-white px-6 sm:px-8 py-3.5 font-black uppercase tracking-widest text-xs sm:text-sm hover:border-brand-yellow hover:text-brand-yellow transition-colors"
            >
              Quick quote
            </button>
          </div>
        </div>
      </section>

      {!isHub && (
        <section className="py-10 bg-brand-dark border-y border-white/5 w-full min-w-0">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-white/50 text-xs font-black uppercase tracking-widest mb-3">Also serving nearby</p>
            <div className="flex flex-wrap gap-2">
              {BOAT_CITY_SLUGS.filter((s) => s !== boatCity).map((slug) => (
                <Link
                  key={slug}
                  to={`/boat-ceramic-coating/${slug}`}
                  className="px-3 py-1.5 rounded-md border border-white/10 text-xs font-bold uppercase tracking-wide text-white/70 hover:border-brand-yellow hover:text-brand-yellow transition-colors"
                >
                  Boat coating {getBoatCityName(slug)}
                </Link>
              ))}
              <Link
                to="/boat-ceramic-coating"
                className="px-3 py-1.5 rounded-md border border-white/10 text-xs font-bold uppercase tracking-wide text-white/70 hover:border-brand-yellow hover:text-brand-yellow transition-colors"
              >
                All regions (hub)
              </Link>
            </div>
          </div>
        </section>
      )}

      {isHub && (
        <section className="py-10 bg-brand-dark border-y border-white/5 w-full min-w-0">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-white/50 text-xs font-black uppercase tracking-widest mb-3">Boat ceramic coating by city</p>
            <div className="flex flex-wrap gap-2">
              {BOAT_CITY_SLUGS.map((slug) => (
                <Link
                  key={slug}
                  to={`/boat-ceramic-coating/${slug}`}
                  className="px-3 py-1.5 rounded-md border border-white/10 text-xs font-bold uppercase tracking-wide text-white/70 hover:border-brand-yellow hover:text-brand-yellow transition-colors"
                >
                  {getBoatCityName(slug)}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="py-14 sm:py-20 bg-brand-black w-full min-w-0 overflow-x-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="reveal rounded-xl border border-white/10 bg-brand-dark/50 p-6">
              <Droplets className="w-8 h-8 text-brand-yellow mb-4" aria-hidden />
              <h2 className="font-display text-brand-yellow uppercase tracking-widest text-sm font-bold mb-2">
                Beyond yearly wax
              </h2>
              <p className="text-white/75 text-sm leading-relaxed">
                Nano ceramic layers bond for durable gloss and slickness—so you spend less time re-waxing every season
                and more time enjoying cleaner wash-downs after lake runs.
              </p>
            </div>
            <div className="reveal rounded-xl border border-white/10 bg-brand-dark/50 p-6">
              <Sparkles className="w-8 h-8 text-brand-yellow mb-4" aria-hidden />
              <h2 className="font-display text-brand-yellow uppercase tracking-widest text-sm font-bold mb-2">
                Gelcoat &amp; topsides
              </h2>
              <p className="text-white/75 text-sm leading-relaxed">
                Runabouts, pontoons, cuddy cabins, and cruisers: we scope hull sides, non-skid, rails, and brightwork add-ons
                with the same correction mindset we use on automotive clear coat.
              </p>
            </div>
            <div className="reveal rounded-xl border border-white/10 bg-brand-dark/50 p-6">
              <ShieldCheck className="w-8 h-8 text-brand-yellow mb-4" aria-hidden />
              <h2 className="font-display text-brand-yellow uppercase tracking-widest text-sm font-bold mb-2">
                Prep done right
              </h2>
              <p className="text-white/75 text-sm leading-relaxed">
                Wash, decontamination, and polish or correction where needed before coating—then cure guidance so the finish
                performs as intended in sun and fresh water.
              </p>
            </div>
          </div>

          <div className="reveal rounded-xl border border-white/10 bg-brand-dark/30 p-6 sm:p-8 mb-16">
            <div className="flex items-start gap-3 mb-4">
              <MapPin className="w-6 h-6 text-brand-yellow shrink-0 mt-0.5" aria-hidden />
              <div>
                <h2 className="font-display text-xl sm:text-2xl font-black uppercase tracking-tight text-white mb-2">
                  Mobile marine ceramic {isHub ? 'across the GTA' : `in ${cityName}`}
                </h2>
                <p className="text-white/65 text-sm sm:text-base leading-relaxed max-w-3xl">
                  We coordinate with your marina, storage yard, or driveway staging—power and water where available. Whether
                  you search <strong className="text-white/90 font-semibold">boat ceramic coating</strong>,{' '}
                  <strong className="text-white/90 font-semibold">marine nano ceramic</strong>, or{' '}
                  <strong className="text-white/90 font-semibold">gelcoat protection vs wax</strong>, this page is your
                  starting point for an indicative scope and quote.
                </p>
              </div>
            </div>
          </div>

          <div id="boat-coating-planner" className="scroll-mt-28">
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-black uppercase tracking-tighter text-center mb-2">
              Boat coating <span className="text-brand-yellow">quote planner</span>
            </h2>
            <p className="text-white/50 text-center text-sm uppercase tracking-wider font-bold mb-10 max-w-2xl mx-auto">
              Length, hull type, scope, and condition—email the plan for a confirmed quote.
            </p>
            <BoatCeramicQuoteBuilder cityLabel={cityLabel} />
          </div>
        </div>
      </section>

      <section className="py-14 sm:py-20 bg-brand-dark border-t border-white/5 w-full min-w-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-2xl sm:text-3xl font-black uppercase tracking-tighter text-center mb-10">
            Boat ceramic <span className="text-brand-yellow">FAQ</span>
          </h2>
          <div className="max-w-3xl mx-auto space-y-4">
            {BOAT_CERAMIC_FAQ.map((item, i) => (
              <details
                key={i}
                className="group rounded-lg border border-white/10 bg-brand-black/40 open:border-brand-yellow/30 transition-colors"
              >
                <summary className="cursor-pointer list-none px-5 py-4 font-display font-bold text-white text-sm sm:text-base uppercase tracking-tight flex justify-between items-center gap-4 [&::-webkit-details-marker]:hidden">
                  {item.question}
                  <span className="text-brand-yellow text-lg leading-none group-open:rotate-45 transition-transform">+</span>
                </summary>
                <div className="px-5 pb-4 text-white/70 text-sm leading-relaxed border-t border-white/5 pt-3">
                  {item.answer}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default BoatCeramicCoatingPage;
