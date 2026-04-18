import React from 'react';

const REVIEWS = [
  {
    text: 'They coordinated the date and time, showed up on time in a fully equipped van with everything needed for the work, including water. Polite, thorough, and the cars looked incredible inside and out.',
    author: 'Local SUV owner',
    location: 'Hamilton',
  },
  {
    text: 'Interior revival after months of pet hair and road grime — it honestly looked new again. Clear communication and no rush job.',
    author: 'GTA commuter',
    location: 'Burlington',
  },
  {
    text: 'Five stars. Got my vehicle detailed while I worked from home — no waiting room, no hassle. The finish on the paint and interior exceeded what I expected.',
    author: 'Pickup owner',
    location: 'Oakville',
  },
];

const ReviewsStrip: React.FC = () => {
  return (
    <section className="py-16 bg-white border-y border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="font-display text-brand-yellow text-xs font-black uppercase tracking-[0.25em] text-center mb-10">
          What clients say
        </p>
        <div className="grid md:grid-cols-3 gap-8">
          {REVIEWS.map((r) => (
            <figure key={r.author} className="bg-brand-page border border-slate-200 p-6 rounded-lg shadow-sm">
              <blockquote className="text-slate-700 text-sm leading-relaxed mb-4">&ldquo;{r.text}&rdquo;</blockquote>
              <figcaption className="text-brand-navy font-bold text-xs uppercase tracking-wider">
                {r.author}
                <span className="text-slate-400 font-semibold"> · {r.location}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ReviewsStrip;
