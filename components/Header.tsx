
import React from 'react';

interface HeaderProps {
  onRequestQuote?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onRequestQuote }) => {
  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-brand-black/80 backdrop-blur-md border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-center md:justify-between">
        <a href="/" className="flex items-center gap-2" aria-label="ShowRoom AutoCare home">
          <img src="/logo.png" alt="ShowRoom AutoCare" className="h-11 md:h-12 w-auto" />
        </a>

        <nav className="hidden md:flex items-center gap-8 text-sm font-semibold uppercase tracking-widest text-white/70">
          <a href="/" className="hover:text-brand-yellow transition-colors">Home</a>
          <a href="/jetdetailing" className="hover:text-brand-yellow transition-colors">Jet Detailing</a>
          <a href="/#services" className="hover:text-brand-yellow transition-colors">Services</a>
          <a href="/#about" className="hover:text-brand-yellow transition-colors">About</a>
          <a href="/#areas" className="hover:text-brand-yellow transition-colors">Areas</a>
          <a href="/#gallery" className="hover:text-brand-yellow transition-colors">Gallery</a>
          <a href="/#contact" className="hover:text-brand-yellow transition-colors">Contact</a>
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <a 
            href="tel:+19053794820" 
            className="text-brand-yellow font-bold text-sm tracking-tighter"
          >
            (905) 379-4820
          </a>
          <button type="button" onClick={() => onRequestQuote?.()} className="bg-brand-yellow text-brand-black px-6 py-2.5 rounded-none font-bold text-xs uppercase tracking-widest magnetic-cta">
            Get Quote
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
