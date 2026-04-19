import React from 'react';

const TRUST_ITEMS = () => [
  'GTA',
  'Premium products',
  '500+ cars detailed',
  'Free quote',
];

const TrustStrip: React.FC = () => (
  <section className="bg-brand-black border-y border-white/10 py-3" aria-label="Why choose us">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 md:gap-14 text-xs font-bold uppercase tracking-widest text-white/70">
        {TRUST_ITEMS().map((item, i) => (
          <span key={i} className="text-white/90">{item}</span>
        ))}
      </div>
    </div>
  </section>
);

export default TrustStrip;
