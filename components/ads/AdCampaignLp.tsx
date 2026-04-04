import React from 'react';
import type { AdCampaignConfig } from '@/lib/adCampaigns';
import BeforeAfterSlider from '@/components/BeforeAfterSlider';
import AdLeadFormSection from './AdLeadFormSection';
import { trackClientEvent } from '@/lib/trackEvent';
import { SITE_EVENT } from '@/lib/siteEvents';
import { BOOKING_URL } from '@/lib/site';

function scrollToQuote() {
  document.getElementById('quote')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

type AdCampaignLpProps = {
  config: AdCampaignConfig;
};

const AdCampaignLp: React.FC<AdCampaignLpProps> = ({ config }) => {
  const idPrefix = `ad-${config.id}`;

  return (
    <main>
      {/* Ad campaign hero — background image TBD */}
      <section className="relative min-h-[72vh] md:min-h-screen flex items-center overflow-hidden pt-20">
        <div className="absolute inset-0 bg-brand-black">
          <div className="absolute inset-0 bg-black/25" aria-hidden />
          <div className="absolute inset-0 hero-middle-light" aria-hidden />
          <div className="absolute inset-0 bg-gradient-to-r from-black/45 via-black/25 to-transparent" aria-hidden />
          <div className="absolute inset-0 hero-vignette" aria-hidden />
          <div className="absolute inset-0 hero-gridlines" aria-hidden />
        </div>

        <div className="absolute top-28 left-0 right-0 z-10 px-4 sm:px-6 lg:px-8 pt-6 pb-2 max-h-[38vh] flex flex-col justify-end">
          <div className="w-full text-center reveal">
            <p className="text-white/60 font-semibold uppercase tracking-[0.2em] text-[10px] sm:text-xs mb-2">
              ShowRoom AutoCare
            </p>
            <p className="text-brand-yellow font-bold uppercase tracking-[0.28em] text-[10px] sm:text-[11px] mb-2">
              Hamilton &amp; GTA
            </p>
            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black uppercase leading-[1.05] tracking-tighter text-white">
              {config.headline}
            </h1>
            {config.subheadline ? (
              <p className="text-white/80 text-sm sm:text-base max-w-2xl mx-auto mt-3 leading-relaxed px-1">
                {config.subheadline}
              </p>
            ) : null}
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 z-10 px-4 sm:px-6 lg:px-8 pb-10 lg:pb-12">
          <div className="reveal flex flex-col items-center gap-5">
            <div className="flex text-brand-yellow justify-center">
              {[...Array(5)].map((_, i) => (
                <svg key={i} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                </svg>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto max-w-md sm:max-w-none">
              <button
                type="button"
                onClick={() => {
                  trackClientEvent(SITE_EVENT.AD_HERO_FAST_QUOTE);
                  scrollToQuote();
                }}
                className="bg-brand-yellow text-brand-black px-10 py-5 font-black uppercase tracking-widest text-sm magnetic-cta flex items-center justify-center gap-2 group w-full sm:w-auto"
              >
                Get a Fast Quote
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 transition-transform shrink-0">
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </button>
              <a
                href={BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackClientEvent(SITE_EVENT.AD_HERO_BOOK_NOW)}
                className="border-2 border-brand-yellow text-brand-yellow px-10 py-5 font-black uppercase tracking-widest text-sm magnetic-cta hover:bg-brand-yellow hover:text-brand-black transition-all text-center flex items-center justify-center w-full sm:w-auto"
              >
                Book Now
              </a>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 right-0 w-1/3 h-1 bg-gradient-to-l from-brand-yellow to-transparent" />
        <div className="absolute top-1/4 -right-10 w-20 h-[60%] border-r border-brand-yellow/20 hidden lg:block" />
      </section>

      <section className="py-14 md:py-20 bg-brand-black border-t border-white/5">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-2xl md:text-3xl font-black uppercase text-white mb-8 text-center sm:text-left">
            {config.includedTitle}
          </h2>
          <ul className="space-y-4">
            {config.includedBullets.map((line) => (
              <li key={line} className="flex gap-3 text-white/75 leading-relaxed">
                <span className="text-brand-yellow font-black mt-0.5 shrink-0" aria-hidden>
                  ·
                </span>
                <span>{line}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="py-14 md:py-20 bg-brand-dark border-y border-white/5">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-2xl md:text-3xl font-black uppercase text-white mb-10 text-center">
            {config.whyTitle}
          </h2>
          <div className="grid sm:grid-cols-2 gap-5">
            {config.whyItems.map((item) => (
              <div
                key={item.title}
                className="p-6 rounded-xl border border-white/10 bg-brand-black/50 hover:border-brand-yellow/25 transition-colors"
              >
                <h3 className="font-display font-bold text-brand-yellow uppercase text-sm tracking-wider mb-2">{item.title}</h3>
                <p className="text-white/65 text-sm leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <BeforeAfterSlider
        title={config.beforeAfter.title}
        subtitle={config.beforeAfter.subtitle}
        beforeSrc={config.beforeAfter.beforeSrc}
        afterSrc={config.beforeAfter.afterSrc}
        caption={config.beforeAfter.caption}
      />

      <section className="py-16 md:py-24 bg-brand-black border-b border-white/5">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-2xl md:text-3xl font-black uppercase text-white mb-3 text-center">
            Recent <span className="text-brand-yellow">work</span>
          </h2>
          <p className="text-white/45 text-center text-sm uppercase tracking-widest mb-10">Real finishes · your neighbours&apos; driveways</p>
          <div className="grid grid-cols-2 gap-3 md:gap-4">
            {config.gallery.map((img) => (
              <div
                key={img.src}
                className="relative aspect-[4/3] rounded-xl overflow-hidden border border-white/10 bg-brand-gray"
              >
                <img src={img.src} alt={img.alt} className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <AdLeadFormSection idPrefix={idPrefix} />

      <section className="py-16 md:py-24 bg-brand-black">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="font-display font-black uppercase text-brand-yellow text-xs tracking-[0.25em] mb-3 text-center">
            FAQ
          </p>
          <h2 className="font-display font-black text-2xl md:text-3xl uppercase tracking-tight text-white mb-10 text-center">
            Common questions
          </h2>
          <dl className="space-y-8">
            {config.faqs.map((item) => (
              <div key={item.q} className="border-b border-white/10 pb-8 last:border-0 last:pb-0">
                <dt className="font-bold text-white text-lg mb-2">{item.q}</dt>
                <dd className="text-white/65 leading-relaxed">{item.a}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="py-14 bg-brand-dark border-t border-white/10">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <p className="text-white/70 font-bold uppercase tracking-wider text-sm mb-4">Ready when you are</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="tel:+19053794820"
              onClick={() => trackClientEvent(SITE_EVENT.AD_FOOTER_PHONE)}
              className="inline-flex items-center justify-center border-2 border-white/25 text-white px-8 py-4 font-bold uppercase tracking-widest text-xs hover:border-brand-yellow hover:text-brand-yellow transition-colors"
            >
              (905) 379-4820
            </a>
            <button
              type="button"
              onClick={() => {
                trackClientEvent(SITE_EVENT.AD_FOOTER_QUOTE);
                scrollToQuote();
              }}
              className="inline-flex items-center justify-center bg-brand-yellow text-brand-black px-8 py-4 font-black uppercase tracking-widest text-xs magnetic-cta"
            >
              Get a free quote
            </button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default AdCampaignLp;
