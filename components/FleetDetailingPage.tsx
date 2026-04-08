import React from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { MapPin, ShieldCheck, Sparkles } from 'lucide-react';
import FleetQuoteBuilder from './fleet/FleetQuoteBuilder';
import { FLEET_CITY_SLUGS, getFleetCityName, isFleetCitySlug, type FleetCitySlug } from '@/lib/fleetCities';
import { BOOKING_URL } from '@/lib/site';
import { FLEET_FAQ } from '@/lib/site';

const LOCAL_INTRO: Record<FleetCitySlug, string> = {
  hamilton:
    'From industrial north end yards to Stoney Creek corridors, we keep Hamilton fleets road-ready: semi cabs, sleepers, vans, and company cars—scheduled on-site so your drivers stay rolling.',
  mississauga:
    'Mississauga distribution hubs and fleet yards get high-volume turnover. We coordinate mobile fleet detailing and truck cab cleaning around your dock schedule and peak hours.',
  toronto:
    'Toronto carriers and contractors trust predictable on-site detailing: fewer driver hours lost to drop-offs, consistent cab hygiene, and a finish that reflects your brand in the GTA core.',
  burlington:
    'Burlington fleets along the QEW and 403 corridor benefit from route-efficient visits—interior revival and exterior washes without pulling units out of rotation longer than necessary.',
  oakville:
    'Oakville commercial and light-fleet clients get the same premium standards we bring to luxury retail: discreet vans, pro equipment, and clear communication with your fleet manager.',
  ancaster:
    'Ancaster and west-Hamilton operations get mobile service tailored to mixed fleets—pickups, vans, and highway tractors—with contract pricing that rewards weekly or biweekly programs.',
};

const FleetDetailingPage: React.FC = () => {
  const { fleetCity } = useParams<{ fleetCity?: string }>();

  if (fleetCity && !isFleetCitySlug(fleetCity)) {
    return <Navigate to="/fleet-detailing" replace />;
  }

  const isHub = !fleetCity;
  const cityName = fleetCity ? getFleetCityName(fleetCity) : 'GTA & Hamilton';
  const cityLabel = isHub ? 'Greater Toronto & Hamilton' : cityName;
  const localLine = fleetCity ? LOCAL_INTRO[fleetCity] : null;

  const openQuoteModal = () => {
    window.dispatchEvent(new CustomEvent('showroom-open-quote'));
  };

  return (
    <>
      <section
        className="relative w-full min-w-0 overflow-x-hidden pt-24 sm:pt-28 pb-14 sm:pb-16 md:pt-36 md:pb-24 bg-brand-black min-h-[min(85vh,820px)] sm:min-h-[62vh] flex flex-col justify-center"
        aria-label="Hero: mobile detailing van with fleet trucks at a commercial yard"
      >
        <div
          className="absolute inset-0 bg-cover bg-no-repeat bg-[center_82%] sm:bg-[center_78%] md:bg-[center_72%] lg:bg-[center_68%]"
          style={{ backgroundImage: 'url(/fleet-hero.png)' }}
          aria-hidden
        />
        {/* Stronger veil: hides compression noise and keeps headline readable */}
        <div className="absolute inset-0 bg-black/72 sm:bg-black/68 pointer-events-none" aria-hidden />
        <div
          className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/35 to-black/92 pointer-events-none"
          aria-hidden
        />
        <div className="absolute inset-0 grid-pattern opacity-[0.05] pointer-events-none" aria-hidden />
        <div className="max-w-7xl mx-auto w-full min-w-0 px-4 sm:px-6 lg:px-8 relative z-10">
          <nav className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-white/40 mb-6" aria-label="Breadcrumb">
            <Link to="/" className="hover:text-brand-yellow transition-colors">
              Home
            </Link>
            <span className="mx-2 text-white/25">/</span>
            <span className="text-white/60">Fleet detailing</span>
            {!isHub && (
              <>
                <span className="mx-2 text-white/25">/</span>
                <span className="text-brand-yellow">{cityName}</span>
              </>
            )}
          </nav>
          <p className="font-display text-brand-yellow uppercase tracking-[0.2em] sm:tracking-[0.28em] text-xs sm:text-sm font-bold mb-3 sm:mb-4">
            Commercial · Transport · Company fleets
          </p>
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tighter text-white mb-4 sm:mb-6 leading-[1.05] max-w-4xl">
            {isHub ? (
              <>
                Fleet detailing &amp;{' '}
                <span className="text-brand-yellow">transport truck cleaning</span>
                <span className="block sm:inline sm:ml-2">Hamilton · GTA</span>
              </>
            ) : (
              <>
                Fleet detailing in <span className="text-brand-yellow">{cityName}</span>
                <span className="block text-2xl sm:text-3xl md:text-4xl mt-2 text-white/90 normal-case tracking-tight font-black">
                  Semi cabs, sleepers &amp; company vehicles
                </span>
              </>
            )}
          </h1>
          <p className="text-white/70 text-base sm:text-lg md:text-xl leading-relaxed max-w-3xl mb-6">
            {isHub
              ? 'Professional fleet vehicle detailing and commercial truck cleaning for carriers, contractors, and corporate fleets. Mobile interior and exterior programs with contract pricing across Hamilton, Mississauga, Toronto, Burlington, and the Golden Horseshoe.'
              : `${localLine} Same team, same equipment standards as our premium mobile detailing—scaled for fleets.`}
          </p>
          <div className="flex flex-wrap gap-3 sm:gap-4">
            <a
              href="#fleet-contract-planner"
              className="inline-flex items-center justify-center bg-brand-yellow text-brand-black px-6 sm:px-8 py-3.5 font-black uppercase tracking-widest text-xs sm:text-sm magnetic-cta"
            >
              Build a contract plan
            </a>
            <button
              type="button"
              onClick={openQuoteModal}
              className="inline-flex items-center justify-center border border-white/25 text-white px-6 sm:px-8 py-3.5 font-black uppercase tracking-widest text-xs sm:text-sm hover:border-brand-yellow hover:text-brand-yellow transition-colors"
            >
              Quick quote
            </button>
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center text-brand-yellow font-bold uppercase tracking-wider text-xs sm:text-sm hover:underline underline-offset-4 py-3.5"
            >
              Book single-vehicle detail →
            </a>
          </div>
        </div>
      </section>

      {!isHub && (
        <section className="py-10 bg-brand-dark border-y border-white/5 w-full min-w-0">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-white/50 text-xs font-black uppercase tracking-widest mb-3">Also serving nearby</p>
            <div className="flex flex-wrap gap-2">
              {FLEET_CITY_SLUGS.filter((s) => s !== fleetCity).map((slug) => (
                <Link
                  key={slug}
                  to={`/fleet-detailing/${slug}`}
                  className="px-3 py-1.5 rounded-md border border-white/10 text-xs font-bold uppercase tracking-wide text-white/70 hover:border-brand-yellow hover:text-brand-yellow transition-colors"
                >
                  Fleet detailing {getFleetCityName(slug)}
                </Link>
              ))}
              <Link
                to="/fleet-detailing"
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
            <p className="text-white/50 text-xs font-black uppercase tracking-widest mb-3">Fleet detailing by city</p>
            <div className="flex flex-wrap gap-2">
              {FLEET_CITY_SLUGS.map((slug) => (
                <Link
                  key={slug}
                  to={`/fleet-detailing/${slug}`}
                  className="px-3 py-1.5 rounded-md border border-white/10 text-xs font-bold uppercase tracking-wide text-white/70 hover:border-brand-yellow hover:text-brand-yellow transition-colors"
                >
                  {getFleetCityName(slug)}
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
              <TruckIcon className="w-8 h-8 text-brand-yellow mb-4" />
              <h2 className="font-display text-brand-yellow uppercase tracking-widest text-sm font-bold mb-2">
                Transport &amp; semi trucks
              </h2>
              <p className="text-white/75 text-sm leading-relaxed">
                Day cabs and sleeper units: interior sanitizing, dash and bunk refresh, and exterior washes sized for
                highway tractors—not generic car tunnels.
              </p>
            </div>
            <div className="reveal rounded-xl border border-white/10 bg-brand-dark/50 p-6">
              <Sparkles className="w-8 h-8 text-brand-yellow mb-4" aria-hidden />
              <h2 className="font-display text-brand-yellow uppercase tracking-widest text-sm font-bold mb-2">
                Company &amp; mixed fleets
              </h2>
              <p className="text-white/75 text-sm leading-relaxed">
                Cars, SUVs, vans, and pickups on one program. Consistent scheduling for sales teams, service fleets, and
                last-mile delivery in the GTA.
              </p>
            </div>
            <div className="reveal rounded-xl border border-white/10 bg-brand-dark/50 p-6">
              <ShieldCheck className="w-8 h-8 text-brand-yellow mb-4" aria-hidden />
              <h2 className="font-display text-brand-yellow uppercase tracking-widest text-sm font-bold mb-2">
                Contract-ready
              </h2>
              <p className="text-white/75 text-sm leading-relaxed">
                Frequency discounts (weekly through bimonthly) and multi-month loyalty savings—spelled out in our planner
                so procurement gets a clear number to start from.
              </p>
            </div>
          </div>

          <div className="reveal rounded-xl border border-white/10 bg-brand-dark/30 p-6 sm:p-8 mb-16">
            <div className="flex items-start gap-3 mb-4">
              <MapPin className="w-6 h-6 text-brand-yellow shrink-0 mt-0.5" aria-hidden />
              <div>
                <h2 className="font-display text-xl sm:text-2xl font-black uppercase tracking-tight text-white mb-2">
                  Mobile fleet detailing {isHub ? 'across the GTA' : `in ${cityName}`}
                </h2>
                <p className="text-white/65 text-sm sm:text-base leading-relaxed max-w-3xl">
                  We bring water, power, and pro-grade chemistry to your yard, terminal, or office lot—reducing downtime vs.
                  sending drivers to random washes. Search terms like <strong className="text-white/90 font-semibold">fleet
                  washing</strong>, <strong className="text-white/90 font-semibold">semi truck interior detailing</strong>,
                  and <strong className="text-white/90 font-semibold">commercial fleet cleaning</strong> all lead here: one
                  team for high-touch cab work and repeatable exterior maintenance.
                </p>
              </div>
            </div>
          </div>

          <div id="fleet-contract-planner" className="scroll-mt-28">
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-black uppercase tracking-tighter text-center mb-2">
              Fleet <span className="text-brand-yellow">contract planner</span>
            </h2>
            <p className="text-white/50 text-center text-sm uppercase tracking-wider font-bold mb-10 max-w-2xl mx-auto">
              Configure vehicles, frequency, and term—then email the plan for a confirmed quote.
            </p>
            <FleetQuoteBuilder cityLabel={cityLabel} />
          </div>
        </div>
      </section>

      <section className="py-14 sm:py-20 bg-brand-dark border-t border-white/5 w-full min-w-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-2xl sm:text-3xl font-black uppercase tracking-tighter text-center mb-10">
            Fleet detailing <span className="text-brand-yellow">FAQ</span>
          </h2>
          <div className="max-w-3xl mx-auto space-y-4">
            {FLEET_FAQ.map((item, i) => (
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

function TruckIcon({ className }: { className?: string }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2" />
      <path d="M15 18H9" />
      <path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14" />
      <circle cx="17" cy="18" r="2" />
      <circle cx="7" cy="18" r="2" />
    </svg>
  );
}

export default FleetDetailingPage;
