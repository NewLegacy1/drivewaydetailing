
import React from 'react';

const services = [
  {
    icon: '🧼',
    title: 'Deep Interior Revival',
    subtitle: 'That "New Car" Smell',
    description: 'From coffee stains to pet hair, we deep-clean every inch. Our process includes steam sanitization and leather conditioning to make your cabin feel brand new.',
    benefits: ['Steam sanitization', 'Stain removal', 'Leather care'],
    popular: true,
  },
  {
    icon: '🛡️',
    title: 'Nano Ceramic Coating',
    subtitle: 'The Ultimate Shield',
    description: 'Lock in a mirror-like shine for up to 9 years. Our pro-grade coatings repel water, dirt, and UV rays, making your car stay cleaner, longer.',
    benefits: ['Extreme hydrophobics', 'Bird-poo resistance', 'Permanent gloss'],
  },
  {
    icon: '✨',
    title: 'Precision Paint Correction',
    subtitle: 'Say Goodbye to Swirls',
    description: "Does your paint look dull or scratched? We use multi-stage machine polishing to remove 85-95% of surface defects, restoring your car's original deep color.",
    benefits: ['Mirror finish', 'Scratch removal', 'Color restoration'],
  },
];

interface ServicesProps {
  onRequestQuote?: () => void;
}

const Services: React.FC<ServicesProps> = ({ onRequestQuote }) => {
  return (
    <section id="services" className="py-24 bg-brand-page border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 reveal">
          <h2 className="font-display text-4xl md:text-5xl font-black uppercase tracking-tighter mb-4 text-brand-navy">
            Master-grade <span className="text-brand-yellow">services</span>
          </h2>
          <div className="w-24 h-1 bg-brand-yellow mx-auto rounded-full" />
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, idx) => (
            <div
              key={idx}
              className="reveal bg-white border border-slate-200 p-8 group transition-all duration-500 hover:border-brand-yellow/40 hover:shadow-lg relative rounded-lg"
            >
              <div className="absolute inset-0 bg-brand-yellow/0 group-hover:bg-brand-yellow/[0.03] transition-colors duration-500 pointer-events-none rounded-lg" aria-hidden />
              {service.popular && (
                <span className="absolute top-4 right-4 z-20 inline-block rounded border border-brand-yellow/40 bg-brand-yellow/10 px-2 py-0.5 text-[9px] font-black uppercase tracking-[0.2em] text-brand-navy-mid">
                  Most popular
                </span>
              )}
              <div className="text-5xl mb-6 grayscale group-hover:grayscale-0 transition-all duration-500 transform group-hover:scale-110">
                {service.icon}
              </div>
              <h3 className="font-display text-2xl font-black uppercase mb-2 text-brand-navy group-hover:text-brand-navy-mid transition-colors">
                {service.title}
              </h3>
              <p className="text-brand-yellow font-bold uppercase text-xs tracking-widest mb-6">
                {service.subtitle}
              </p>
              <p className="text-slate-600 mb-8 leading-relaxed">
                {service.description}
              </p>

              <ul className="space-y-3">
                {service.benefits.map((benefit, bIdx) => (
                  <li key={bIdx} className="flex items-center gap-3 text-sm text-slate-700 font-semibold uppercase tracking-tight">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-brand-yellow shrink-0">
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                    {benefit}
                  </li>
                ))}
              </ul>

              <div className="mt-8 pt-6 border-t border-slate-200 relative z-10">
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    onRequestQuote?.();
                    window.dispatchEvent(new CustomEvent('ddc-open-quote'));
                  }}
                  className="w-full bg-brand-navy text-white py-4 px-6 font-black uppercase tracking-widest text-xs flex items-center justify-center gap-2 group/btn magnetic-cta hover:bg-brand-silver hover:text-brand-navy transition-colors rounded-sm"
                >
                  Get quote
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="group-hover/btn:translate-x-1 transition-transform">
                    <path d="M5 12h14" />
                    <path d="m12 5 7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
