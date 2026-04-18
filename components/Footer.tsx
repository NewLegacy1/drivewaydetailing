import React from 'react';
import { Link } from 'react-router-dom';
import { BUSINESS } from '@/lib/site';
import { CITY_SLUGS, CITY_NAMES, type CitySlug } from '@/lib/cities';

const Footer: React.FC = () => {
  const openQuote = () => {
    window.dispatchEvent(new CustomEvent('ddc-open-quote'));
  };

  return (
    <footer id="get-quote" className="bg-brand-navy border-t border-white/10 pt-16 pb-10 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12 mb-14">
          <div className="space-y-5">
            <div className="flex items-center gap-2">
              <img src="/logo.png" alt={BUSINESS.name} className="h-10 w-auto max-h-12 drop-shadow-md" />
            </div>
            <p className="text-white/60 text-sm leading-relaxed font-medium">
              Premium mobile detailing, ceramic coating &amp; paint restoration at your driveway or workplace.
            </p>
          </div>

          <div>
            <h4 className="font-display font-black uppercase text-brand-silver text-xs tracking-[0.2em] mb-5">Locations</h4>
            <ul className="space-y-2">
              {CITY_SLUGS.map((slug) => (
                <li key={slug}>
                  <Link
                    to={`/${slug}`}
                    className="text-white font-semibold hover:text-brand-silver transition-colors text-sm uppercase tracking-wider"
                  >
                    {CITY_NAMES[slug as CitySlug]}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display font-black uppercase text-brand-silver text-xs tracking-[0.2em] mb-5">Quote</h4>
            <p className="text-white/60 text-sm leading-relaxed mb-5">
              To reach us, submit the quote form — we reply with options and scheduling.
            </p>
            <button
              type="button"
              onClick={openQuote}
              className="inline-flex items-center justify-center bg-white text-brand-navy px-8 py-3.5 font-black uppercase tracking-widest text-xs magnetic-cta hover:bg-brand-silver transition-colors rounded-sm"
            >
              Open quote form
            </button>
            <p className="text-white/50 text-xs mt-6 leading-relaxed uppercase tracking-wide">
              Mobile service by appointment
            </p>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-[11px] font-bold uppercase tracking-widest text-white/35">
          <p>
            © {new Date().getFullYear()} {BUSINESS.name}. All Rights Reserved.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6">
            <a href="#" className="hover:text-brand-silver transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-brand-silver transition-colors">
              Terms of Service
            </a>
            <a href="https://newlegacyai.ca" target="_blank" rel="noopener noreferrer" className="hover:text-brand-silver transition-colors">
              Site by New Legacy AI
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
