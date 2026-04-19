import React from 'react';
import { BUSINESS } from '@/lib/site';

const ServiceAreas: React.FC = () => {
  return (
    <section id="areas" className="py-24 bg-brand-page border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="reveal mb-12">
          <h2 className="font-display text-3xl md:text-4xl font-black uppercase tracking-tighter text-brand-navy">
            Proudly serving <span className="text-brand-yellow">the GTA</span>
          </h2>
          <p className="text-slate-500 mt-4 uppercase tracking-[0.2em] font-bold text-sm">Mobile detailing where you are</p>
        </div>

        <div className="flex flex-wrap justify-center gap-4 reveal">
          <div className="px-10 py-4 bg-white border-2 border-brand-yellow/40 font-display font-black uppercase tracking-widest text-sm text-brand-navy rounded-sm shadow-sm">
            Greater Toronto Area
          </div>
        </div>

        <div className="mt-20 reveal relative p-6 sm:p-10 md:p-12 bg-gradient-to-b from-white to-brand-dark border border-brand-yellow/25 max-w-4xl mx-auto overflow-hidden rounded-lg shadow-sm">
          <img src="/images/gwagon.png" alt="" className="absolute inset-0 w-full h-full object-cover opacity-[0.08]" aria-hidden />
          <div className="relative z-10">
            <h3 className="font-display text-2xl sm:text-3xl font-black uppercase tracking-tighter mb-6 px-1 text-brand-navy">
              Ready to fall in love <br />
              <span className="text-brand-yellow">with your car again?</span>
            </h3>
            <p className="text-slate-600 text-base sm:text-lg mb-4 max-w-2xl mx-auto px-1 leading-relaxed">
              Join the hundreds of GTA drivers who trust {BUSINESS.name} for a flawless, protective finish.
            </p>
            <p className="text-brand-navy-mid font-bold text-xs sm:text-sm uppercase tracking-wider mb-8 px-1 leading-relaxed">
              <span className="sm:hidden">Detailing from $130 — Ceramic from $300. Transparent pricing.</span>
              <span className="hidden sm:inline">
                Detailing packages starting at $130 — Ceramic coating from $300.<br />Transparent pricing, no surprises.
              </span>
            </p>
            <button
              type="button"
              onClick={() => window.dispatchEvent(new CustomEvent('ddc-open-quote'))}
              className="bg-brand-navy text-white px-12 py-5 font-black uppercase tracking-widest text-sm magnetic-cta inline-flex items-center gap-2 group hover:bg-brand-silver hover:text-brand-navy transition-colors rounded-sm"
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
    </section>
  );
};

export default ServiceAreas;
