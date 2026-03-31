
import React from 'react';

interface HeaderProps {
  onRequestQuote?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onRequestQuote }) => {
  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-brand-black/80 backdrop-blur-md border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-center md:justify-start md:gap-4 lg:gap-6 min-w-0">
        <a href="/" className="flex shrink-0 items-center gap-2" aria-label="ShowRoom AutoCare home">
          <img src="/logo.png" alt="ShowRoom AutoCare" className="h-11 md:h-12 w-auto" />
        </a>

        <div className="md:hidden ml-auto mr-2 flex shrink-0 items-center gap-3">
          <a
            href="/ceramic-coating"
            className="text-[10px] font-black uppercase tracking-[0.15em] text-white/70 hover:text-brand-yellow transition-colors"
          >
            Coating
          </a>
          <a
            href="/blog"
            className="text-[10px] font-black uppercase tracking-[0.2em] text-white/70 hover:text-brand-yellow transition-colors"
          >
            Blog
          </a>
        </div>

        <nav className="hidden md:flex min-w-0 flex-1 items-center justify-center gap-x-3 xl:gap-x-5 text-[11px] md:text-xs xl:text-sm font-semibold uppercase tracking-wide text-white/70 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden overflow-x-auto">
          <a href="/" className="shrink-0 whitespace-nowrap hover:text-brand-yellow transition-colors">Home</a>
          <a href="/jetdetailing" className="shrink-0 whitespace-nowrap hover:text-brand-yellow transition-colors">Jet Detailing</a>
          <a href="/ceramic-coating" className="shrink-0 whitespace-nowrap hover:text-brand-yellow transition-colors">Ceramic Coating</a>
          <a href="/blog" className="shrink-0 whitespace-nowrap hover:text-brand-yellow transition-colors">Blog</a>
          <a href="/#services" className="shrink-0 whitespace-nowrap hover:text-brand-yellow transition-colors">Services</a>
          <a href="/#about" className="shrink-0 whitespace-nowrap hover:text-brand-yellow transition-colors">About</a>
          <a href="/#areas" className="shrink-0 whitespace-nowrap hover:text-brand-yellow transition-colors">Areas</a>
          <a href="/#gallery" className="shrink-0 whitespace-nowrap hover:text-brand-yellow transition-colors">Gallery</a>
          <a href="/#contact" className="shrink-0 whitespace-nowrap hover:text-brand-yellow transition-colors">Contact</a>
        </nav>

        <div className="hidden md:flex shrink-0 items-center gap-3 lg:gap-4">
          <a 
            href="tel:+19053794820" 
            className="whitespace-nowrap text-brand-yellow font-bold text-sm tracking-tight hover:opacity-90 transition-opacity"
          >
            (905) 379-4820
          </a>
          <button type="button" onClick={() => onRequestQuote?.()} className="shrink-0 whitespace-nowrap bg-brand-yellow text-brand-black px-5 py-2 lg:px-6 lg:py-2.5 rounded-none font-bold text-xs uppercase tracking-wide magnetic-cta">
            Get Quote
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
