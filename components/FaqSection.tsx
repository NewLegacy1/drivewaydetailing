import React from 'react';
import { HOME_FAQ } from '../lib/site';

const FaqSection: React.FC = () => (
  <section id="faq" className="py-20 md:py-28 bg-brand-dark border-t border-white/5 scroll-mt-24">
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
      <p className="font-display font-black uppercase text-brand-yellow text-xs tracking-[0.25em] mb-3">
        Questions
      </p>
      <h2 className="font-display font-black text-3xl sm:text-4xl uppercase tracking-tight text-white mb-10">
        Mobile detailing FAQ
      </h2>
      <dl className="space-y-8">
        {HOME_FAQ.map((item) => (
          <div key={item.question} className="border-b border-white/10 pb-8 last:border-0 last:pb-0">
            <dt className="font-bold text-white text-lg mb-2">{item.question}</dt>
            <dd className="text-white/65 leading-relaxed">{item.answer}</dd>
          </div>
        ))}
      </dl>
    </div>
  </section>
);

export default FaqSection;
