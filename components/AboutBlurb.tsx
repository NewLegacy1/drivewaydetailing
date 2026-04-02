import React from 'react';

const AboutBlurb: React.FC = () => {
  return (
    <section className="py-16 lg:py-20 bg-brand-black border-y border-white/5">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center gap-8 text-center sm:text-left">
          <div className="flex-shrink-0">
            <div className="w-28 h-28 rounded-full border-2 border-brand-yellow/40 bg-brand-gray overflow-hidden flex items-center justify-center text-white/30 font-bold text-2xl">
              Team
            </div>
          </div>
          <div>
            <h3 className="font-display text-2xl font-black uppercase tracking-tighter text-white mb-3">
              The people behind the shine
            </h3>
            <p className="text-white/70 leading-relaxed mb-2">
              ShowRoom AutoCare is run by car people who got tired of seeing great cars treated like appliances. We bring showroom standards to your driveway — no compromise, no shortcuts.
            </p>
            <p className="text-white/50 text-sm">
              Add a real photo of yourself or the team above to build trust. Local service businesses with a face convert better.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutBlurb;
