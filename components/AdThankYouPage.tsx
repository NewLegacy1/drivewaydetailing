import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Success page for paid landing funnels (/ads/*). Point Google Ads conversion
 * tracking here; main-site modal quotes do not navigate to this URL.
 */
const AdThankYouPage: React.FC = () => {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-6 py-24 text-center">
      <p className="font-display text-brand-yellow text-sm font-black uppercase tracking-[0.2em] mb-4">You&apos;re all set</p>
      <h1 className="font-display text-3xl md:text-4xl font-black uppercase text-white mb-4">Thanks — we&apos;ll be in touch soon</h1>
      <p className="text-white/70 max-w-md mb-10 leading-relaxed">
        We received your quote request and will reply by email as soon as we can.
      </p>
      <Link
        to="/"
        className="inline-flex items-center justify-center bg-brand-yellow text-brand-black px-8 py-4 font-black uppercase tracking-widest text-sm magnetic-cta"
      >
        Visit full site
      </Link>
    </div>
  );
};

export default AdThankYouPage;
