
import React from 'react';

const areas = [
  'Hamilton', 'Ancaster', 'Burlington', 'Oakville', 
  'Mississauga', 'Waterdown', 'Caledonia', 'Brantford'
];

interface ServiceAreasProps {
  onRequestQuote?: () => void;
  city?: string;
}

const ServiceAreas: React.FC<ServiceAreasProps> = ({ onRequestQuote, city }) => {
  return (
    <section id="areas" className="py-24 bg-brand-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="reveal mb-12">
          <h2 className="font-display text-3xl md:text-4xl font-black uppercase tracking-tighter">
            Proudly Serving <span className="text-brand-yellow">{city ? `${city} & The GTA` : 'Hamilton & The GTA'}</span>
          </h2>
          <p className="text-white/50 mt-4 uppercase tracking-[0.2em] font-bold text-sm">Our mobile units cover a 100km radius</p>
        </div>

        <div className="flex flex-wrap justify-center gap-4 reveal">
          {areas.map((area, idx) => (
            <div 
              key={idx} 
              className="px-8 py-4 bg-brand-gray border border-white/5 font-display font-black uppercase tracking-widest text-sm text-white/80 hover:text-brand-yellow hover:border-brand-yellow transition-all cursor-default"
            >
              {area}
            </div>
          ))}
        </div>

        <div className="mt-20 reveal relative p-12 bg-gradient-to-b from-brand-gray to-brand-black border border-brand-yellow/20 max-w-4xl mx-auto overflow-hidden">
          <img src="/images/gwagon.png" alt="" className="absolute inset-0 w-full h-full object-cover opacity-[0.12]" aria-hidden />
          <div className="relative z-10">
          <h3 className="font-display text-3xl font-black uppercase tracking-tighter mb-6">
            Ready to Fall in Love <br />
            <span className="text-brand-yellow">With Your Car Again?</span>
          </h3>
          <p className="text-white/70 text-lg mb-4 max-w-2xl mx-auto">
            Join the hundreds of {city ? `${city} ` : 'Hamilton '}drivers who trust ShowRoom AutoCare for a flawless, protective finish.
          </p>
          <p className="text-brand-yellow font-bold text-sm uppercase tracking-wider mb-8">
            Detailing packages starting at $130 — Ceramic coating from $300.<br />Transparent pricing, no surprises.
          </p>
          <button type="button" onClick={() => onRequestQuote?.()} className="bg-brand-yellow text-brand-black px-12 py-5 font-black uppercase tracking-widest text-sm magnetic-cta inline-flex items-center gap-2 group">
            Claim Your Free Consultation
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 transition-transform"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
          </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceAreas;
