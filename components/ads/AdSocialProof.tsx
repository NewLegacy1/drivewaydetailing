import React from 'react';
import { GMB_PROFILE_URL, GMB_REVIEW_URL } from '@/lib/google-business';

const RATING = (import.meta.env.VITE_ADS_GOOGLE_RATING as string | undefined)?.trim() || '5.0';
const REVIEW_LABEL = (import.meta.env.VITE_ADS_GOOGLE_REVIEW_COUNT as string | undefined)?.trim() || '135';

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
    <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center justify-between gap-4 sm:gap-6 py-5 px-5 sm:px-6 rounded-xl border border-white/15 bg-black/45 backdrop-blur-md shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
      <div className="flex items-center justify-center sm:justify-start gap-4 min-w-0 w-full sm:w-auto">
        <Stars />
        <div className="text-left min-w-0">
          <p className="text-white font-black text-xl sm:text-2xl leading-none tabular-nums">{RATING}</p>
          <p className="text-white/55 text-[10px] sm:text-xs uppercase tracking-[0.15em] mt-1">Google rating</p>
        </div>
      </div>
      <div className="hidden sm:block w-px h-12 bg-gradient-to-b from-transparent via-white/20 to-transparent shrink-0" aria-hidden />
      <div className="flex-1 text-center sm:text-left min-w-0 w-full sm:min-w-[12rem]">
        <p className="text-white font-black text-sm sm:text-base uppercase tracking-wide">
          {REVIEW_LABEL} reviews
        </p>
        <p className="text-white/50 text-xs mt-1">Real customers · Hamilton &amp; GTA</p>
      </div>
      <div className="flex justify-center sm:justify-end w-full sm:w-auto sm:shrink-0 pt-1 sm:pt-0 border-t border-white/10 sm:border-0">
        <span className="inline-flex items-center justify-center w-full sm:w-auto text-brand-yellow text-[10px] sm:text-xs font-black uppercase tracking-[0.2em] border border-brand-yellow/50 rounded-md px-4 py-2.5 bg-brand-yellow/5">
          Google reviews
        </span>
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
