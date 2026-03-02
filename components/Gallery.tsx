import React from 'react';

// Curated: 8 strongest shots — uniform grid for a clean, premium feel
const GALLERY_IMAGES = [
  { src: '/images/gallery-01.png', alt: 'Cadillac Escalade interior – tan leather, vacuum lines, Hamilton GTA' },
  { src: '/images/gallery-03.png', alt: 'Mercedes G-Wagen mobile detailing – grey SUV Ontario' },
  { src: '/images/gallery-05.png', alt: 'Porsche Carrera GTS interior – showroom finish Hamilton' },
  { src: '/images/gallery-08.png', alt: 'Red Porsche GTS exterior – paint correction and coating' },
  { src: '/images/gallery-09.png', alt: 'Luxury sedan snow foam wash – mobile detailing at your location' },
  { src: '/images/gallery-10.png', alt: 'ShowRoom AutoCare mobile van – blue Dodge Challenger detailing' },
  { src: '/images/gallery-16.png', alt: 'Porsche 911 Carrera interior – professional detailing finish' },
  { src: '/images/gallery-17.png', alt: 'Mobile car detailing result – Hamilton Burlington Oakville Mississauga' },
];

const Gallery: React.FC = () => {
  return (
    <section id="gallery" className="py-24 lg:py-32 bg-brand-black relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-brand-yellow/20 to-transparent" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 reveal">
          <h2 className="font-display text-4xl md:text-5xl font-black uppercase tracking-tighter mb-4">
            Our <span className="text-brand-yellow">Work</span>
          </h2>
          <p className="text-white/50 uppercase tracking-[0.25em] font-bold text-sm max-w-xl mx-auto">
            Showroom finishes. Real cars. Real driveways.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {GALLERY_IMAGES.map((item) => (
            <div
              key={item.src}
              className="reveal group relative overflow-hidden rounded-xl border border-white/10 bg-brand-gray aspect-square min-h-0"
            >
              <img
                src={item.src}
                alt={item.alt}
                loading="lazy"
                decoding="async"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-black/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute inset-0 ring-2 ring-inset ring-brand-yellow/0 group-hover:ring-brand-yellow/50 rounded-xl transition-all duration-300 pointer-events-none" />
            </div>
          ))}
        </div>
      </div>
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-brand-yellow/20 to-transparent" />
    </section>
  );
};

export default Gallery;
