
import React from 'react';

const services = [
  {
    icon: '🧼',
    title: 'Deep Interior Revival',
    subtitle: 'That "New Car" Smell',
    description: 'From coffee stains to pet hair, we deep-clean every inch. Our process includes steam sanitization and leather conditioning to make your cabin feel brand new.',
    benefits: ['Steam sanitization', 'Stain removal', 'Leather care']
  },
  {
    icon: '🛡️',
    title: 'Nano Ceramic Coating',
    subtitle: 'The Ultimate Shield',
    description: 'Lock in a mirror-like shine for up to 9 years. Our pro-grade coatings repel water, dirt, and UV rays, making your car stay cleaner, longer.',
    benefits: ['Extreme hydrophobics', 'Bird-poo resistance', 'Permanent gloss']
  },
  {
    icon: '✨',
    title: 'Precision Paint Correction',
    subtitle: 'Say Goodbye to Swirls',
    description: 'Does your paint look dull or scratched? We use multi-stage machine polishing to remove 85-95% of surface defects, restoring your car\'s original deep color.',
    benefits: ['Mirror finish', 'Scratch removal', 'Color restoration']
  }
];

interface ServicesProps {
  onRequestQuote?: () => void;
}

const Services: React.FC<ServicesProps> = ({ onRequestQuote }) => {
  return (
    <section id="services" className="py-24 bg-brand-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 reveal">
          <h2 className="font-display text-4xl md:text-5xl font-black uppercase tracking-tighter mb-4">
            Master-Grade <span className="text-brand-yellow">Services</span>
          </h2>
          <div className="w-24 h-1 bg-brand-yellow mx-auto"></div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, idx) => (
            <div 
              key={idx} 
              className="reveal bg-brand-gray border border-white/5 p-8 group transition-all duration-500 hover:border-brand-yellow/50 relative"
            >
              {/* Glowing Background Effect — pointer-events-none so button stays clickable */}
              <div className="absolute inset-0 bg-brand-yellow/0 group-hover:bg-brand-yellow/[0.02] transition-colors duration-500 pointer-events-none" aria-hidden></div>
              <div className="text-5xl mb-6 grayscale group-hover:grayscale-0 transition-all duration-500 transform group-hover:scale-110">
                {service.icon}
              </div>
              <h3 className="font-display text-2xl font-black uppercase mb-2 group-hover:text-brand-yellow transition-colors">
                {service.title}
              </h3>
              <p className="text-brand-yellow font-bold uppercase text-xs tracking-widest mb-6">
                {service.subtitle}
              </p>
              <p className="text-white/60 mb-8 leading-relaxed">
                {service.description}
              </p>
              
              <ul className="space-y-3">
                {service.benefits.map((benefit, bIdx) => (
                  <li key={bIdx} className="flex items-center gap-3 text-sm text-white/80 font-semibold uppercase tracking-tight">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ffdf00" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
                    {benefit}
                  </li>
                ))}
              </ul>

              <div className="mt-8 pt-6 border-t border-white/5 relative z-10">
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    onRequestQuote?.();
                    window.dispatchEvent(new CustomEvent('showroom-open-quote'));
                  }}
                  className="w-full bg-brand-yellow text-brand-black py-4 px-6 font-black uppercase tracking-widest text-xs flex items-center justify-center gap-2 group/btn magnetic-cta hover:opacity-95 transition-opacity"
                >
                  Get Quote
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="group-hover/btn:translate-x-1 transition-transform"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
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
