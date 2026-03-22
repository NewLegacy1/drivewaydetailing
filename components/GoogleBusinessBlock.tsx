import React from 'react';
import {
  GMB_MAP_EMBED_SRC,
  GMB_PROFILE_URL,
  GMB_REVIEW_URL,
  hasGoogleBusinessIntegration,
  isAllowedMapEmbedSrc,
} from '../lib/google-business';

type Variant = 'reviews' | 'footer';

const GoogleBusinessBlock: React.FC<{ variant?: Variant }> = ({ variant = 'reviews' }) => {
  if (!hasGoogleBusinessIntegration()) return null;

  const showMap = GMB_MAP_EMBED_SRC && isAllowedMapEmbedSrc(GMB_MAP_EMBED_SRC);

  const wrap =
    variant === 'footer'
      ? 'rounded border border-white/10 bg-brand-gray/30 p-5'
      : 'mb-8 max-w-4xl mx-auto px-4 sm:px-6 text-center';

  return (
    <div className={wrap}>
      <p className="font-display font-black uppercase text-brand-yellow text-[10px] tracking-[0.25em] mb-2">
        Google Business Profile
      </p>
      <h2
        className={
          variant === 'footer'
            ? 'font-display font-black text-white text-lg uppercase tracking-tight mb-3'
            : 'font-display font-black text-white text-xl sm:text-2xl uppercase tracking-tight mb-2'
        }
      >
        See verified reviews &amp; updates on Google
      </h2>
      <p className="text-white/55 text-sm leading-relaxed mb-5 max-w-xl mx-auto">
        Read what customers say on our live listing, get directions, or leave a review — it helps local search and other drivers find us.
      </p>
      <div className="flex flex-wrap items-center justify-center gap-3">
        {GMB_PROFILE_URL && (
          <a
            href={GMB_PROFILE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-5 py-2.5 bg-white text-brand-black font-bold text-xs uppercase tracking-widest hover:bg-brand-yellow transition-colors"
          >
            View on Google Maps
          </a>
        )}
        {GMB_REVIEW_URL && (
          <a
            href={GMB_REVIEW_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-5 py-2.5 border-2 border-brand-yellow text-brand-yellow font-bold text-xs uppercase tracking-widest hover:bg-brand-yellow hover:text-brand-black transition-colors"
          >
            Leave a Google review
          </a>
        )}
      </div>
      {showMap && (
        <div className="mt-6 rounded-lg overflow-hidden border border-white/10 aspect-video max-w-3xl mx-auto bg-brand-gray">
          <iframe
            title="ShowRoom AutoCare on Google Maps"
            src={GMB_MAP_EMBED_SRC}
            className="w-full h-full min-h-[220px]"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </div>
      )}
    </div>
  );
};

export default GoogleBusinessBlock;
