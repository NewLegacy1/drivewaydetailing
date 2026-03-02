import React, { useState, useRef, useCallback } from 'react';

const BEFORE_IMAGE = '/images/before-after/interior-before.png';
const AFTER_IMAGE = '/images/before-after/interior-after.png';

const BeforeAfterSlider: React.FC = () => {
  const [position, setPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback(
    (clientX: number) => {
      const el = containerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const x = clientX - rect.left;
      const pct = Math.max(0, Math.min(100, (x / rect.width) * 100));
      setPosition(pct);
    },
    []
  );

  const onPointerDown = (e: React.PointerEvent) => {
    e.preventDefault();
    handleMove(e.clientX);
    containerRef.current?.setPointerCapture?.(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (e.buttons !== 1) return;
    e.preventDefault();
    handleMove(e.clientX);
  };

  return (
    <section className="py-24 lg:py-32 bg-brand-black relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-brand-yellow/30 to-transparent" />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 reveal">
          <h2 className="font-display text-4xl md:text-5xl font-black uppercase tracking-tighter mb-4">
            See The <span className="text-brand-yellow">Transformation</span>
          </h2>
          <p className="text-white/50 uppercase tracking-[0.2em] font-bold text-sm">
            Drag the line to reveal before & after — interior revival
          </p>
        </div>

        <div
          ref={containerRef}
          className="reveal relative aspect-[4/3] rounded-xl overflow-hidden border-2 border-white/10 bg-brand-gray select-none touch-none cursor-col-resize"
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={(e) => (e.target as HTMLElement).releasePointerCapture?.(e.pointerId)}
          onPointerLeave={(e) => (e.target as HTMLElement).releasePointerCapture?.(e.pointerId)}
          style={{ cursor: 'col-resize' }}
        >
          {/* After (full image, always visible) */}
          <div className="absolute inset-0">
            <img
              src={AFTER_IMAGE}
              alt="After professional interior detailing"
              className="absolute inset-0 w-full h-full object-cover"
              draggable={false}
            />
          </div>
          {/* Before (clipped by position) */}
          <div
            className="absolute inset-0 overflow-hidden"
            style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
          >
            <img
              src={BEFORE_IMAGE}
              alt="Before detailing"
              className="absolute inset-0 w-full h-full object-cover object-[center_center]"
              draggable={false}
            />
          </div>
          {/* Draggable line + handle */}
          <div
            className="absolute top-0 bottom-0 w-1 bg-brand-yellow shadow-[0_0_20px_rgba(255,223,0,0.5)] z-10"
            style={{ left: `${position}%`, transform: 'translateX(-50%)' }}
          >
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-brand-black border-2 border-brand-yellow flex items-center justify-center overflow-hidden pointer-events-none">
              <img
                src="/images/logo-slider-handle.png"
                alt=""
                className="w-10 h-10 object-contain"
                draggable={false}
              />
            </div>
          </div>
          {/* Labels */}
          <div className="absolute top-4 left-4 px-3 py-1.5 bg-black/70 rounded font-bold text-xs uppercase tracking-widest text-white">
            Before
          </div>
          <div className="absolute top-4 right-4 px-3 py-1.5 bg-black/70 rounded font-bold text-xs uppercase tracking-widest text-brand-yellow">
            After
          </div>
        </div>
        <p className="text-center text-white/50 text-sm mt-4">
          Audi RS 6 interior — from mud and wear to showroom finish
        </p>
      </div>
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-brand-yellow/30 to-transparent" />
    </section>
  );
};

export default BeforeAfterSlider;
