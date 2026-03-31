import React from 'react';
import { Link } from 'react-router-dom';

function scrollToQuote(e: React.MouseEvent) {
  e.preventDefault();
  document.getElementById('quote')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

const AdMinimalHeader: React.FC = () => {
  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-brand-black/95 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 md:h-[4.25rem] flex items-center justify-between gap-4">
        <Link to="/" className="flex shrink-0 items-center gap-2" aria-label="ShowRoom AutoCare home">
          <img src="/logo.png" alt="" className="h-9 md:h-10 w-auto" />
          <span className="sr-only">ShowRoom AutoCare</span>
        </Link>
        <div className="flex items-center gap-2 sm:gap-3">
          <a
            href="tel:+19053794820"
            className="text-brand-yellow font-bold text-sm sm:text-base whitespace-nowrap hover:opacity-90 transition-opacity"
          >
            <span className="hidden sm:inline">(905) 379-4820</span>
            <span className="sm:hidden">Call</span>
          </a>
          <button
            type="button"
            onClick={scrollToQuote}
            className="shrink-0 bg-brand-yellow text-brand-black px-3 sm:px-5 py-2 rounded-none font-black text-[10px] sm:text-xs uppercase tracking-wide magnetic-cta whitespace-nowrap"
          >
            Free quote
          </button>
        </div>
      </div>
    </header>
  );
};

export default AdMinimalHeader;
