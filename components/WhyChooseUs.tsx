import React from 'react';

interface WhyChooseUsProps {
  city?: string;
}

const ICONS = {
  mobile: (
    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 17a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V6.5a1.5 1.5 0 0 0-1.5-1.5h-11A1.5 1.5 0 0 0 5 6.5V17Z" />
      <path d="M5 10h14" /><path d="M7 15h.01" /><path d="M17 15h.01" />
    </svg>
  ),
  independent: (
    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2v4" /><path d="M12 18v4" /><path d="m4.93 4.93 2.83 2.83" /><path d="m16.24 16.24 2.83 2.83" />
      <path d="M2 12h4" /><path d="M18 12h4" /><path d="m4.93 19.07 2.83-2.83" /><path d="m16.24 7.76 2.83-2.83" />
      <path d="M12 6a6 6 0 0 1 6 6 6 6 0 0 1-6 6 6 6 0 0 1-6-6 6 6 0 0 1 6-6z" />
    </svg>
  ),
  trusted: (
    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  ),
  local: (
    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" />
    </svg>
  ),
};

const WhyChooseUs: React.FC<WhyChooseUsProps> = ({ city = 'Hamilton' }) => {
  const reasons = [
    { title: 'Mobile Convenience', desc: 'We come to you (Home, Office, or Job site). Save time while we perfect your ride.', icon: 'mobile' as const },
    { title: 'Fully Independent', desc: 'We bring our own de-ionized water and quiet power. No need to plug into your house.', icon: 'independent' as const },
    { title: 'Trusted Professionals', desc: 'All staff are background-checked and hand-picked for their surgical attention to detail.', icon: 'trusted' as const },
    { title: `${city} Grown`, desc: 'Locally owned and operated since 2021. We know the local grime and how to beat it.', icon: 'local' as const },
  ];

  return (
    <section id="about" className="py-24 lg:py-32 bg-brand-dark relative overflow-hidden">
      {/* Textured dark background */}
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }} aria-hidden />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-brand-yellow/20 to-transparent" aria-hidden />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          <div className="reveal">
            <h2 className="font-display text-4xl md:text-5xl font-black uppercase tracking-tighter mb-4">
              Why Detailers <br />
              <span className="text-brand-yellow italic">Fear Our Standards</span>
            </h2>
            <p className="text-white/50 uppercase tracking-[0.2em] font-bold text-sm mb-12">
              No shortcuts. No excuses.
            </p>

            <div className="grid sm:grid-cols-2 gap-4">
              {reasons.map((reason, idx) => (
                <div
                  key={idx}
                  className="reveal group relative p-6 rounded-xl border border-white/10 bg-brand-black/50 hover:border-brand-yellow/30 hover:bg-brand-black/70 transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-lg bg-brand-yellow/10 flex items-center justify-center text-brand-yellow mb-4 group-hover:bg-brand-yellow/20 transition-colors">
                    {ICONS[reason.icon]}
                  </div>
                  <h3 className="font-display font-bold text-white uppercase text-lg mb-2">{reason.title}</h3>
                  <p className="text-white/60 text-sm leading-relaxed">{reason.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="reveal relative">
            <div className="aspect-square border-2 border-brand-yellow/20 relative p-8 overflow-hidden rounded-xl bg-brand-black/30">
              <div className="absolute inset-0 bg-brand-yellow/5 m-4 rounded-lg" />
              <img
                src="/images/porsche-interior.png"
                alt="ShowRoom AutoCare interior detailing result"
                className="w-full h-full object-cover border border-white/10 rounded-lg"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-brand-yellow/20 to-transparent" aria-hidden />
    </section>
  );
};

export default WhyChooseUs;
