import React, { useCallback, useRef, useState } from 'react';

interface BeforeAfterSliderProps {
  title?: string;
  subtitle?: string;
  caption?: string;
  beforeSrc?: string;
  afterSrc?: string;
}

const BeforeAfterSlider: React.FC<BeforeAfterSliderProps> = ({
  title = 'Before / After',
  subtitle = 'Drag to compare',
  caption = 'Paint correction and protection — real client vehicle.',
  beforeSrc = '/images/before-after/before.jpg',
  afterSrc = '/images/before-after/after.jpg',
}) => {
  const [position, setPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);

  const onPointerDown = (e: React.PointerEvent) => {
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
  };

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const pct = Math.min(100, Math.max(0, (x / rect.width) * 100));
    setPosition(pct);
  }, []);

  return (
    <section className="py-24 lg:py-32 bg-brand-page relative overflow-hidden border-t border-slate-200">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-brand-yellow/30 to-transparent" />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 reveal">
          <h2 className="font-display text-4xl md:text-5xl font-black uppercase tracking-tighter mb-4 text-brand-navy">{title}</h2>
          <p className="text-slate-500 uppercase tracking-[0.2em] font-bold text-sm">{subtitle}</p>
        </div>

        <div
          ref={containerRef}
          className="reveal relative aspect-[4/3] rounded-xl overflow-hidden border-2 border-slate-200 bg-slate-100 select-none touch-none cursor-col-resize shadow-lg"
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={(e) => (e.target as HTMLElement).releasePointerCapture?.(e.pointerId)}
          onPointerLeave={(e) => (e.target as HTMLElement).releasePointerCapture?.(e.pointerId)}
          style={{ cursor: 'col-resize' }}
        >
          <div className="absolute inset-0">
            <img
              src={afterSrc}
              alt="After professional detailing"
              className="absolute inset-0 w-full h-full object-cover"
              draggable={false}
            />
          </div>
          <div
            className="absolute inset-0 overflow-hidden"
            style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
          >
            <img
              src={beforeSrc}
              alt="Before detailing"
              className="absolute inset-0 w-full h-full object-cover object-[center_center]"
              draggable={false}
            />
          </div>
          <div
            className="absolute top-0 bottom-0 w-1 bg-brand-yellow shadow-[0_0_16px_rgba(58,123,213,0.45)] z-10"
            style={{ left: `${position}%`, transform: 'translateX(-50%)' }}
          >
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-brand-navy border-2 border-brand-yellow flex items-center justify-center overflow-hidden pointer-events-none">
              <img
                src="/images/logo-slider-handle.png"
                alt=""
                className="w-10 h-10 object-contain"
                draggable={false}
              />
            </div>
          </div>
          <div className="absolute top-4 left-4 px-3 py-1.5 bg-brand-navy/85 rounded font-bold text-xs uppercase tracking-widest text-white">
            Before
          </div>
          <div className="absolute top-4 right-4 px-3 py-1.5 bg-white/90 rounded font-bold text-xs uppercase tracking-widest text-brand-navy border border-slate-200">
            After
          </div>
        </div>
        <p className="text-center text-slate-500 text-sm mt-4">{caption}</p>
      </div>
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-brand-yellow/30 to-transparent" />
    </section>
  );
};

export default BeforeAfterSlider;
