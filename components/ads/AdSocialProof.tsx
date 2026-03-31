import React from 'react';
import { GMB_PROFILE_URL, GMB_REVIEW_URL } from '@/lib/google-business';

const RATING = (import.meta.env.VITE_ADS_GOOGLE_RATING as string | undefined)?.trim() || '5.0';
const REVIEW_LABEL = (import.meta.env.VITE_ADS_GOOGLE_REVIEW_COUNT as string | undefined)?.trim() || '50+';

function Stars() {
  return (
    <div className="flex gap-0.5 text-brand-yellow" aria-hidden>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="shrink-0">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  );
}

const AdSocialProof: React.FC = () => {
  const href = GMB_REVIEW_URL || GMB_PROFILE_URL;

  const inner = (
    <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 py-4 px-4 rounded-lg border border-white/10 bg-brand-gray/40">
      <div className="flex items-center gap-3">
        <Stars />
        <div className="text-left">
          <p className="text-white font-black text-lg leading-none">{RATING}</p>
          <p className="text-white/50 text-xs uppercase tracking-wider mt-0.5">Google rating</p>
        </div>
      </div>
      <div className="hidden sm:block w-px h-10 bg-white/15" aria-hidden />
      <div className="text-center sm:text-left">
        <p className="text-white font-bold text-sm uppercase tracking-wide">{REVIEW_LABEL} reviews</p>
        <p className="text-white/50 text-xs mt-0.5">Real customers · Hamilton &amp; GTA</p>
      </div>
      <div className="w-full sm:w-auto flex justify-center sm:justify-end sm:ml-auto">
        <span className="text-brand-yellow text-xs font-black uppercase tracking-widest">Google reviews</span>
      </div>
    </div>
  );

  if (href) {
    return (
      <section className="w-full max-w-3xl mx-auto" aria-label="Google reviews">
        <a href={href} target="_blank" rel="noopener noreferrer" className="block hover:opacity-95 transition-opacity">
          {inner}
        </a>
      </section>
    );
  }

  return (
    <section className="w-full max-w-3xl mx-auto" aria-label="Customer reviews">
      {inner}
    </section>
  );
};

export default AdSocialProof;
