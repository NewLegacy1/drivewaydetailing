import React, { useMemo } from 'react';
import type { AdCampaignConfig } from '@/lib/adCampaigns';
import { pickHeroBackground } from '@/lib/heroBackgrounds';
import BeforeAfterSlider from '@/components/BeforeAfterSlider';
import AdSocialProof from './AdSocialProof';
import AdLeadFormSection from './AdLeadFormSection';

function scrollToQuote(e: React.MouseEvent) {
  e.preventDefault();
  document.getElementById('quote')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

type AdCampaignLpProps = {
  config: AdCampaignConfig;
};

const AdCampaignLp: React.FC<AdCampaignLpProps> = ({ config }) => {
  const idPrefix = `ad-${config.id}`;
  const { desktop: heroDesktop, mobile: heroMobile, gradient } = useMemo(() => pickHeroBackground(), []);

  return (
    <main>
      {/* Hero: same image pools + overlays as homepage Hero (mobile vs desktop) */}
      <section className="relative w-full min-w-0 overflow-hidden min-h-[min(100dvh,920px)] md:min-h-[min(92vh,960px)] flex items-end md:items-center pb-6 pt-4 md:pb-0 md:pt-0">
        <div className="absolute inset-0 bg-brand-black">
          <div
            className="absolute inset-0 hero-bg-image md:hidden"
            style={{
              backgroundImage: `url(${heroMobile})`,
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center 45%',
            }}
            aria-hidden
          />
          <div
            className="absolute inset-0 hero-bg-image hidden md:block"
            style={{
              backgroundImage: `url(${heroDesktop})`,
              backgroundRepeat: 'no-repeat',
            }}
            aria-hidden
          />
          <div className="absolute inset-0 bg-black/30 md:bg-black/25" aria-hidden />
          <div className="absolute inset-0 hero-middle-light" aria-hidden />
          <div className={`absolute inset-0 ${gradient.className}`} aria-hidden />
          <div className="absolute inset-0 hero-vignette" aria-hidden />
          <div className="absolute inset-0 hero-gridlines opacity-60" aria-hidden />
          <div className="absolute inset-0 bg-gradient-to-b from-brand-black/80 via-transparent to-brand-black md:from-brand-black/50 md:via-transparent md:to-brand-black/90 pointer-events-none" aria-hidden />
        </div>

        <div className="relative z-10 w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-16">
          <div className="max-w-2xl mx-auto md:mx-0 text-center md:text-left [text-shadow:0_2px_24px_rgba(0,0,0,0.85)]">
            <p className="font-display text-brand-yellow uppercase tracking-[0.25em] text-[10px] sm:text-xs font-bold mb-4">
              ShowRoom AutoCare • Hamilton &amp; GTA
            </p>
            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-black uppercase tracking-tight text-white leading-[1.08] mb-5">
              {config.headline}
            </h1>
            <p className="text-white/90 text-base sm:text-lg md:text-xl leading-relaxed mb-8">
              {config.subheadline}
            </p>
          </div>

          <div className="mb-8 max-w-2xl mx-auto md:mx-0 w-full">
            <AdSocialProof />
          </div>

          <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 max-w-2xl mx-auto md:mx-0 w-full">
            <a
              href="tel:+19053794820"
              className="w-full sm:w-auto sm:flex-1 inline-flex items-center justify-center border-2 border-brand-yellow text-brand-yellow px-6 py-4 sm:px-8 font-black uppercase tracking-widest text-xs sm:text-sm hover:bg-brand-yellow/10 transition-colors [text-shadow:none] shadow-lg shadow-black/40 min-h-[52px]"
            >
              Call (905) 379-4820
            </a>
            <button
              type="button"
              onClick={scrollToQuote}
              className="w-full sm:w-auto sm:flex-1 inline-flex items-center justify-center bg-brand-yellow text-brand-black px-6 py-4 sm:px-8 font-black uppercase tracking-widest text-xs sm:text-sm magnetic-cta hover:opacity-95 transition-opacity shadow-lg shadow-black/30 min-h-[52px]"
            >
              Get a free quote
            </button>
          </div>
        </div>
      </section>

      {/* 5: What’s included */}
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

      {/* 6: Why ShowRoom */}
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

      {/* 7: Before / after */}
      <BeforeAfterSlider
        title={config.beforeAfter.title}
        subtitle={config.beforeAfter.subtitle}
        beforeSrc={config.beforeAfter.beforeSrc}
        afterSrc={config.beforeAfter.afterSrc}
        caption={config.beforeAfter.caption}
      />

      {/* Gallery */}
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

      {/* 8: Form CTA */}
      <AdLeadFormSection idPrefix={idPrefix} />

      {/* 9: FAQ */}
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

      {/* Bottom CTA */}
      <section className="py-14 bg-brand-dark border-t border-white/10">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <p className="text-white/70 font-bold uppercase tracking-wider text-sm mb-4">Ready when you are</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="tel:+19053794820"
              className="inline-flex items-center justify-center border-2 border-white/25 text-white px-8 py-4 font-bold uppercase tracking-widest text-xs hover:border-brand-yellow hover:text-brand-yellow transition-colors"
            >
              (905) 379-4820
            </a>
            <button
              type="button"
              onClick={scrollToQuote}
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
