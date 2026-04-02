import React from 'react';

const HeroVideo: React.FC = () => {
  return (
    <section className="py-16 lg:py-24 bg-brand-black relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-brand-yellow/30 to-transparent" />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 reveal">
          <h2 className="font-display text-3xl md:text-4xl font-black uppercase tracking-tighter mb-3">
            See us <span className="text-brand-yellow">in action</span>
          </h2>
          <p className="text-white/50 uppercase tracking-[0.2em] font-bold text-sm">
            Mobile detailing — classic M3 wash
          </p>
        </div>
        <div className="reveal relative rounded-xl overflow-hidden border-2 border-white/10 shadow-2xl bg-brand-gray">
          <video
            src="/video.mp4"
            controls
            playsInline
            className="w-full aspect-video object-cover"
            poster=""
            preload="metadata"
          >
            <track kind="captions" />
            Your browser does not support the video tag.
          </video>
          <div className="absolute inset-0 pointer-events-none rounded-xl ring-inset ring-1 ring-white/5" />
        </div>
      </div>
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-brand-yellow/30 to-transparent" />
    </section>
  );
};

export default HeroVideo;
