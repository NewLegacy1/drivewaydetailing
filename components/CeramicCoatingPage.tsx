import React from 'react';

interface CeramicCoatingPageProps {
  onRequestQuote?: () => void;
}

function openLeadForm(onRequestQuote?: () => void) {
  onRequestQuote?.();
  window.dispatchEvent(new CustomEvent('ddc-open-quote'));
}

const BENEFITS = [
  {
    title: 'Hydrophobic finish',
    body: 'Water beads and sheets off—less water spotting, easier washes, and a cleaner look between details.',
  },
  {
    title: 'UV & chemical resistance',
    body: 'Helps protect clear coat from sun, bird droppings, and road grime when maintained properly.',
  },
  {
    title: 'Deep gloss',
    body: 'Paint looks richer and more “wet” after proper prep and coating—especially on corrected surfaces.',
  },
  {
    title: 'We come to you',
    body: 'Full prep and application at your home, office, or shop space in Hamilton and the GTA—no waiting at a detail bay.',
  },
  {
    title: 'Clear expectations',
    body: 'We walk you through prep needs, realistic outcomes, and how to care for the coating after cure.',
  },
  {
    title: 'Built for Ontario',
    body: 'Seasonal reality: salt, slush, and sun. We tailor advice for how to protect your finish year-round.',
  },
];

const STEPS = [
  { n: '01', title: 'Consult & quote', desc: 'Tell us your vehicle, condition, and goals. We respond with options—no booking widget, just a real conversation.' },
  { n: '02', title: 'Wash & decontamination', desc: 'Safe wash, iron fallout and bonded contaminant removal so the coating bonds to real paint—not dirt.' },
  { n: '03', title: 'Paint correction (if needed)', desc: 'Swirls and defects are addressed before coating when you want maximum gloss and clarity.' },
  { n: '04', title: 'Coating application', desc: 'Controlled environment at your location, panel-by-panel application, and proper flash/cure guidance.' },
  { n: '05', title: 'Handoff & aftercare', desc: 'Simple rules for the first days and weeks so the coating performs as intended.' },
];

const FAQ = [
  {
    q: 'How long does ceramic coating take?',
    a: 'Timing depends on size, condition, and whether paint correction is included. We’ll give a realistic window with your quote—most jobs are not a “same-hour” service when done properly.',
  },
  {
    q: 'Is ceramic coating worth it on a daily driver?',
    a: 'If you want easier cleaning, better protection than wax, and a glossier finish, it’s often a strong fit—especially when paired with sensible maintenance washes.',
  },
  {
    q: 'Do you need a garage?',
    a: 'Coverage from wind and direct sun during application helps. If you’re unsure about your space, mention it in the form—we’ll advise what works.',
  },
  {
    q: 'What happens after I submit the form?',
    a: 'We review your note and follow up by email with next steps. Same lead form as the rest of our site—no external booking links.',
  },
];

const CeramicCoatingPage: React.FC<CeramicCoatingPageProps> = ({ onRequestQuote }) => {
  return (
    <>
      <section className="relative w-full min-w-0 overflow-x-hidden pt-24 sm:pt-28 pb-16 sm:pb-20 md:pt-36 md:pb-24 bg-brand-black min-h-[78vh] sm:min-h-[70vh] flex flex-col justify-center">
        <div
          className="absolute inset-0 bg-cover bg-no-repeat bg-center opacity-40"
          style={{
            backgroundImage: 'url(/hero3.png)',
            backgroundPosition: 'center 45%',
          }}
          aria-hidden
        />
        <div className="absolute inset-0 bg-gradient-to-b from-brand-black via-brand-black/92 to-brand-black pointer-events-none" aria-hidden />
        <div className="max-w-7xl mx-auto w-full min-w-0 px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <p className="font-display text-brand-yellow uppercase tracking-[0.25em] text-xs font-bold mb-4">
              Mobile · Hamilton &amp; GTA
            </p>
            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tighter text-white mb-5 leading-[1.05]">
              Nano ceramic coating —{' '}
              <span className="text-brand-yellow">done at your driveway</span>
            </h1>
            <p className="text-white/75 text-lg sm:text-xl leading-relaxed mb-4">
              Pro-grade prep, correction when needed, and coating application without dropping your car off for days.
              If you want protection that still looks incredible, start with a free quote — we use the same lead form as every other service page.
            </p>
            <ul className="text-white/55 text-sm sm:text-base space-y-2 mb-8 border-l-2 border-brand-yellow/60 pl-4">
              <li>Clear, upfront expectations — not hype</li>
              <li>Paint correction before coating when gloss matters</li>
              <li>Response by email — no third-party booking</li>
            </ul>
            <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
              <button
                type="button"
                onClick={() => openLeadForm(onRequestQuote)}
                className="bg-brand-yellow text-brand-black px-8 py-4 font-black uppercase tracking-widest text-xs sm:text-sm magnetic-cta hover:opacity-95 transition-opacity"
              >
                Get my ceramic quote
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-10 bg-brand-dark border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center reveal">
            {[
              ['Mobile service', 'We bring water, power & lighting'],
              ['GTA coverage', 'Hamilton, Burlington, Oakville +'],
              ['Prep-first', 'Coating bonds to clean paint'],
              ['Fast follow-up', 'Same form as the rest of the site'],
            ].map(([t, s]) => (
              <div key={t} className="min-w-0">
                <p className="font-display font-black text-brand-yellow text-sm uppercase tracking-wider mb-1">{t}</p>
                <p className="text-white/50 text-xs uppercase tracking-tight leading-snug">{s}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-28 bg-brand-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-start">
            <div className="reveal">
              <h2 className="font-display text-3xl md:text-4xl font-black uppercase tracking-tighter text-white mb-6">
                Why owners <span className="text-brand-yellow">choose coating</span>
              </h2>
              <p className="text-white/65 text-lg leading-relaxed mb-6">
                Wax and sealants have their place — ceramic adds a harder, longer-lasting layer of protection when
                the paint is properly prepped. That prep is where most “bad coating jobs” fail — we don’t skip it.
              </p>
              <p className="text-white/65 leading-relaxed mb-8">
                Whether you’re protecting a new daily driver or refreshing paint you care about, we’ll tell you honestly
                what level of correction makes sense before a single layer goes down.
              </p>
              <button
                type="button"
                onClick={() => openLeadForm(onRequestQuote)}
                className="bg-brand-yellow text-brand-black px-6 py-3.5 font-black uppercase tracking-widest text-xs magnetic-cta"
              >
                Request a quote
              </button>
            </div>
            <div className="grid sm:grid-cols-2 gap-4 reveal">
              {BENEFITS.map((b) => (
                <div
                  key={b.title}
                  className="border border-white/10 bg-brand-gray/40 p-5 hover:border-brand-yellow/30 transition-colors"
                >
                  <h3 className="font-display font-bold text-white text-sm uppercase tracking-wide mb-2">{b.title}</h3>
                  <p className="text-white/55 text-sm leading-relaxed">{b.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-28 bg-brand-dark border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14 reveal">
            <h2 className="font-display text-3xl md:text-4xl font-black uppercase tracking-tighter text-white mb-4">
              How <span className="text-brand-yellow">we work</span>
            </h2>
            <p className="text-white/50 text-sm uppercase tracking-widest font-bold">
              Transparent steps — no mystery “packages” without context
            </p>
          </div>
          <div className="space-y-4 max-w-3xl mx-auto">
            {STEPS.map((s) => (
              <div
                key={s.n}
                className="reveal flex gap-4 sm:gap-6 border border-white/10 bg-brand-black/60 p-5 sm:p-6"
              >
                <span className="font-display font-black text-brand-yellow text-xl sm:text-2xl shrink-0 w-10">{s.n}</span>
                <div>
                  <h3 className="font-display font-black text-white uppercase tracking-tight text-sm sm:text-base mb-2">
                    {s.title}
                  </h3>
                  <p className="text-white/60 text-sm leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-28 bg-brand-black">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 reveal">
          <h2 className="font-display text-3xl md:text-4xl font-black uppercase tracking-tighter text-center text-white mb-10">
            Ceramic vs. <span className="text-brand-yellow">traditional wax</span>
          </h2>
          <div className="overflow-x-auto border border-white/10">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="bg-brand-gray/80 border-b border-white/10">
                  <th className="p-4 font-display font-black uppercase text-brand-yellow tracking-wider"> </th>
                  <th className="p-4 font-bold text-white uppercase tracking-wider">Ceramic coating</th>
                  <th className="p-4 font-bold text-white/60 uppercase tracking-wider">Carnauba wax</th>
                </tr>
              </thead>
              <tbody className="text-white/70">
                <tr className="border-b border-white/5">
                  <td className="p-4 font-semibold text-white/90">Durability</td>
                  <td className="p-4">Years with proper care</td>
                  <td className="p-4">Weeks to a few months</td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="p-4 font-semibold text-white/90">Protection</td>
                  <td className="p-4">Stronger barrier vs. environmental fallout</td>
                  <td className="p-4">Light, cosmetic layer</td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="p-4 font-semibold text-white/90">Prep</td>
                  <td className="p-4">Requires decon + often correction</td>
                  <td className="p-4">Minimal</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-white/90">Best for</td>
                  <td className="p-4">Owners who want longevity &amp; gloss</td>
                  <td className="p-4">Shows, quick depth, frequent re-application</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-28 bg-brand-dark border-t border-white/5">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl md:text-4xl font-black uppercase tracking-tighter text-center text-white mb-12 reveal">
            Common <span className="text-brand-yellow">questions</span>
          </h2>
          <dl className="space-y-6 reveal">
            {FAQ.map((item) => (
              <div key={item.q} className="border-b border-white/10 pb-6">
                <dt className="font-bold text-white text-lg mb-2">{item.q}</dt>
                <dd className="text-white/60 leading-relaxed">{item.a}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="py-20 lg:py-28 bg-brand-black border-t border-brand-yellow/20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center reveal">
          <h2 className="font-display text-3xl md:text-4xl font-black uppercase tracking-tighter text-white mb-4">
            Ready for a <span className="text-brand-yellow">quote?</span>
          </h2>
          <p className="text-white/65 text-lg leading-relaxed mb-8">
            One short form — vehicle, location, and what you want to achieve. We’ll follow up personally.
            <span className="block mt-2 text-brand-yellow/90 text-sm font-bold uppercase tracking-widest">
              No external booking links · same site lead form
            </span>
          </p>
          <button
            type="button"
            onClick={() => openLeadForm(onRequestQuote)}
            className="bg-brand-yellow text-brand-black px-10 py-4 font-black uppercase tracking-widest text-sm magnetic-cta mb-6"
          >
            Open quote form
          </button>
          <p className="text-white/40 text-xs uppercase tracking-widest">
            Serving Hamilton, Ancaster, Burlington, Oakville, Mississauga &amp; surrounding GTA
          </p>
        </div>
      </section>
    </>
  );
};

export default CeramicCoatingPage;
