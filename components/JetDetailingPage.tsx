import React from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { JET_CITY_SLUGS, getJetCityName, isJetCitySlug, type JetCitySlug } from '@/lib/jetCities';
import { JET_FAQ } from '@/lib/site';

interface JetDetailingPageProps {
  onRequestQuote?: () => void;
}

const LOCAL_INTRO: Record<JetCitySlug, string> = {
  hamilton:
    'John C. Munro Hamilton International and regional GA—exterior safe-wash, cabin refresh, and brightwork tuned for Ontario seasons and hangar schedules.',
  mississauga:
    'Pearson-adjacent and western GTA operations: we align with FBO windows and security so your aircraft returns to service with a consistent, premium finish.',
  toronto:
    'Toronto Pearson, Billy Bishop, and satellite fields—mobile detailing where access allows, with clear scope for exteriors, cabins, and polished metal trim.',
  burlington:
    'Hamilton and western GTA reach for Burlington-based flight departments—same standards we bring to luxury autos, scaled for airframes and cabins.',
  oakville:
    'Oakville and central GTA: discreet on-ramp service for private jets and turboprops, coordinated with your hangar or line team.',
  ancaster:
    'Minutes from Hamilton International—ideal for locally based aircraft and owners who want cabin and exterior care without sending the jet out of market.',
};

const JetDetailingPage: React.FC<JetDetailingPageProps> = ({ onRequestQuote }) => {
  const { jetCity } = useParams<{ jetCity?: string }>();

  if (jetCity && !isJetCitySlug(jetCity)) {
    return <Navigate to="/jetdetailing" replace />;
  }

  const isHub = !jetCity;
  const cityName = jetCity ? getJetCityName(jetCity) : 'Toronto & Hamilton';
  const localLine = jetCity ? LOCAL_INTRO[jetCity] : null;

  const services = [
    {
      title: 'Exterior Cleaning',
      description:
        'Professional wash and protection for aircraft exteriors. We use aviation-safe products and techniques to remove contaminants, protect paint and composite surfaces, and restore a showroom finish.',
    },
    {
      title: 'Interior Cabin Detailing',
      description:
        'Deep cleaning and conditioning of cabin upholstery, leather, and surfaces. We treat every interior to the same standard we bring to luxury cars—pristine, sanitized, and refreshed.',
    },
    {
      title: 'Brightwork Polishing',
      description:
        'Restoration and protection of metal trim, propellers, and exposed alloy. Our brightwork service brings back shine and adds lasting protection against corrosion and tarnish.',
    },
  ];

  return (
    <>
      <section className="relative w-full min-w-0 overflow-x-hidden pt-24 sm:pt-28 pb-16 sm:pb-20 md:pt-36 md:pb-28 bg-brand-black min-h-[72vh] sm:min-h-[60vh] md:min-h-[60vh] flex flex-col justify-center">
        <div
          className="absolute inset-0 bg-cover bg-no-repeat bg-center"
          style={{
            backgroundImage: 'url(/jet-hero.png)',
            backgroundPosition: 'center 30%',
            backgroundSize: 'cover',
          }}
          aria-hidden
        />
        <div className="absolute inset-0 bg-black/60 pointer-events-none" aria-hidden />
        <div
          className="absolute inset-0 bg-gradient-to-b from-brand-black/50 via-transparent to-brand-black/80 pointer-events-none"
          aria-hidden
        />
        <div className="max-w-7xl mx-auto w-full min-w-0 px-4 sm:px-6 lg:px-8 relative z-10">
          <nav
            className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-white/40 mb-6"
            aria-label="Breadcrumb"
          >
            <Link to="/" className="hover:text-brand-yellow transition-colors">
              Home
            </Link>
            <span className="mx-2 text-white/25">/</span>
            <Link to="/jetdetailing" className="hover:text-brand-yellow transition-colors">
              Jet detailing
            </Link>
            {!isHub && (
              <>
                <span className="mx-2 text-white/25">/</span>
                <span className="text-brand-yellow">{cityName}</span>
              </>
            )}
          </nav>
          <div className="text-center max-w-4xl mx-auto min-w-0">
            <p className="font-display text-brand-yellow uppercase tracking-[0.2em] sm:tracking-[0.3em] text-xs sm:text-sm font-bold mb-3 sm:mb-4">
              Aircraft Detailing
            </p>
            <h1 className="font-display text-3xl sm:text-4xl md:text-6xl font-black uppercase tracking-tighter text-white mb-4 sm:mb-6 leading-tight">
              {isHub ? (
                <>
                  Jet Detailing <span className="text-brand-yellow block sm:inline">Toronto & Hamilton</span>
                </>
              ) : (
                <>
                  Jet detailing in <span className="text-brand-yellow">{cityName}</span>
                </>
              )}
            </h1>
            <p className="text-white/70 text-base sm:text-lg md:text-xl leading-relaxed px-0 sm:px-2">
              {isHub
                ? 'Premier luxury aircraft cleaning and detailing. Exterior cleaning, interior cabin detailing, and brightwork polishing for private jets and turboprops in the GTA and Hamilton area.'
                : localLine}
            </p>
            <div className="mt-8 sm:mt-10">
              <button
                type="button"
                onClick={() => onRequestQuote?.()}
                className="bg-brand-yellow text-brand-black px-6 sm:px-10 py-3.5 sm:py-4 font-black uppercase tracking-widest text-xs sm:text-sm magnetic-cta hover:scale-105 transition-transform"
              >
                Request a Quote
              </button>
            </div>
          </div>
        </div>
      </section>

      {!isHub && (
        <section className="py-10 bg-brand-dark border-y border-white/5 w-full min-w-0">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-white/50 text-xs font-black uppercase tracking-widest mb-3">Also serving nearby</p>
            <div className="flex flex-wrap gap-2">
              {JET_CITY_SLUGS.filter((s) => s !== jetCity).map((slug) => (
                <Link
                  key={slug}
                  to={`/jetdetailing/${slug}`}
                  className="px-3 py-1.5 rounded-md border border-white/10 text-xs font-bold uppercase tracking-wide text-white/70 hover:border-brand-yellow hover:text-brand-yellow transition-colors"
                >
                  Jet detailing {getJetCityName(slug)}
                </Link>
              ))}
              <Link
                to="/jetdetailing"
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
            <p className="text-white/50 text-xs font-black uppercase tracking-widest mb-3">Jet detailing by city</p>
            <div className="flex flex-wrap gap-2">
              {JET_CITY_SLUGS.map((slug) => (
                <Link
                  key={slug}
                  to={`/jetdetailing/${slug}`}
                  className="px-3 py-1.5 rounded-md border border-white/10 text-xs font-bold uppercase tracking-wide text-white/70 hover:border-brand-yellow hover:text-brand-yellow transition-colors"
                >
                  {getJetCityName(slug)}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="py-12 sm:py-20 bg-brand-dark w-full min-w-0 overflow-x-hidden">
        <div className="max-w-7xl mx-auto w-full min-w-0 px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-black uppercase tracking-tighter text-center mb-3 sm:mb-4">
            Our <span className="text-brand-yellow">Aircraft Services</span>
          </h2>
          <p className="text-white/50 text-center uppercase tracking-wider text-xs sm:text-sm font-bold mb-10 sm:mb-16 max-w-2xl mx-auto px-1">
            The same attention to detail we bring to luxury cars, applied to your aircraft.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-10">
            {services.map((s, i) => (
              <div key={i} className="p-6 sm:p-8 border border-white/10 bg-brand-black/50 rounded-xl reveal min-w-0">
                <h3 className="font-display text-brand-yellow uppercase tracking-widest text-sm font-bold mb-3">{s.title}</h3>
                <p className="text-white/80 leading-relaxed">{s.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-20 bg-brand-black border-t border-white/5 w-full min-w-0 overflow-x-hidden">
        <div className="max-w-7xl mx-auto w-full min-w-0 px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-black uppercase tracking-tighter mb-3 sm:mb-4">
            Serving <span className="text-brand-yellow">Toronto, Hamilton & GTA</span>
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto mb-8 sm:mb-10 text-sm sm:text-base px-1">
            We bring our equipment and expertise to your hangar or FBO. Toronto Pearson, Hamilton, and surrounding
            airports—you stay focused on operations, we handle the finish.
          </p>
          <button
            type="button"
            onClick={() => onRequestQuote?.()}
            className="bg-brand-yellow text-brand-black px-6 sm:px-10 py-3.5 sm:py-4 font-black uppercase tracking-widest text-xs sm:text-sm magnetic-cta max-w-full"
          >
            Get a Quote for Your Aircraft
          </button>
        </div>
      </section>

      <section className="py-14 sm:py-20 bg-brand-dark border-t border-white/5 w-full min-w-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-2xl sm:text-3xl font-black uppercase tracking-tighter text-center mb-10">
            Jet detailing <span className="text-brand-yellow">FAQ</span>
          </h2>
          <div className="max-w-3xl mx-auto space-y-4">
            {JET_FAQ.map((item, i) => (
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

export default JetDetailingPage;
