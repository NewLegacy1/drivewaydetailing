import React from 'react';

interface JetDetailingPageProps {
  onRequestQuote?: () => void;
}

const JetDetailingPage: React.FC<JetDetailingPageProps> = ({ onRequestQuote }) => {
  const services = [
    {
      title: 'Exterior Cleaning',
      description: 'Professional wash and protection for aircraft exteriors. We use aviation-safe products and techniques to remove contaminants, protect paint and composite surfaces, and restore a showroom finish.',
    },
    {
      title: 'Interior Cabin Detailing',
      description: 'Deep cleaning and conditioning of cabin upholstery, leather, and surfaces. We treat every interior to the same standard we bring to luxury cars—pristine, sanitized, and refreshed.',
    },
    {
      title: 'Brightwork Polishing',
      description: 'Restoration and protection of metal trim, propellers, and exposed alloy. Our brightwork service brings back shine and adds lasting protection against corrosion and tarnish.',
    },
  ];

  return (
    <>
      <section className="relative w-full min-w-0 overflow-x-hidden pt-24 sm:pt-28 pb-16 sm:pb-20 md:pt-36 md:pb-28 bg-brand-black min-h-[72vh] sm:min-h-[60vh] md:min-h-[60vh] flex flex-col justify-center">
        {/* Hero background: jet + van image, cropped at bottom to hide watermark, dark overlay */}
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
        <div className="absolute inset-0 bg-gradient-to-b from-brand-black/50 via-transparent to-brand-black/80 pointer-events-none" aria-hidden />
        <div className="max-w-7xl mx-auto w-full min-w-0 px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto min-w-0">
            <p className="font-display text-brand-yellow uppercase tracking-[0.2em] sm:tracking-[0.3em] text-xs sm:text-sm font-bold mb-3 sm:mb-4">Aircraft Detailing</p>
            <h1 className="font-display text-3xl sm:text-4xl md:text-6xl font-black uppercase tracking-tighter text-white mb-4 sm:mb-6 leading-tight">
              Jet Detailing <span className="text-brand-yellow block sm:inline">Toronto & Hamilton</span>
            </h1>
            <p className="text-white/70 text-base sm:text-lg md:text-xl leading-relaxed px-0 sm:px-2">
              Premier luxury aircraft cleaning and detailing. Exterior cleaning, interior cabin detailing, and brightwork polishing for private jets and turboprops in the GTA and Hamilton area.
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
            We bring our equipment and expertise to your hangar or FBO. Toronto Pearson, Hamilton, and surrounding airports—you stay focused on operations, we handle the finish.
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
    </>
  );
};

export default JetDetailingPage;
