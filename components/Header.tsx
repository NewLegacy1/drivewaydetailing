import React from 'react';
import { trackClientEvent } from '@/lib/trackEvent';
import { SITE_EVENT } from '@/lib/siteEvents';

interface HeaderProps {
  onRequestQuote?: () => void;
}

const MORE_LINKS = [
  { href: '/#services', label: 'Services' },
  { href: '/#about', label: 'About' },
  { href: '/#areas', label: 'Areas' },
  { href: '/#gallery', label: 'Gallery' },
  { href: '/#contact', label: 'Contact' },
] as const;

const Header: React.FC<HeaderProps> = ({ onRequestQuote }) => {
  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-brand-black/80 backdrop-blur-md border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-center md:justify-start md:gap-3 lg:gap-5 min-w-0">
        <a href="/" className="flex shrink-0 items-center gap-2" aria-label="ShowRoom AutoCare home">
          <img src="/logo.png" alt="ShowRoom AutoCare" className="h-11 md:h-12 w-auto" />
        </a>

        <div className="md:hidden ml-auto mr-2 flex shrink-0 items-center gap-2">
          <details className="relative group">
            <summary className="list-none cursor-pointer text-[10px] font-black uppercase tracking-[0.12em] text-white/70 hover:text-brand-yellow transition-colors [&::-webkit-details-marker]:hidden">
              Menu
            </summary>
            <div
              className="absolute right-0 top-full z-50 mt-2 min-w-[11rem] rounded-md border border-white/10 bg-brand-black/95 backdrop-blur-md py-2 shadow-xl"
              onClick={(e) => {
                const el = (e.target as HTMLElement).closest('a');
                if (el) (e.currentTarget.closest('details') as HTMLDetailsElement | null)?.removeAttribute('open');
              }}
            >
              <a
                href="/ceramic-coating"
                className="block px-4 py-2 text-xs font-bold uppercase tracking-wide text-white/80 hover:bg-white/5 hover:text-brand-yellow"
              >
                Ceramic
              </a>
              <a
                href="/fleet-detailing"
                className="block px-4 py-2 text-xs font-bold uppercase tracking-wide text-white/80 hover:bg-white/5 hover:text-brand-yellow"
              >
                Fleet
              </a>
              <a
                href="/boat-ceramic-coating"
                className="block px-4 py-2 text-xs font-bold uppercase tracking-wide text-white/80 hover:bg-white/5 hover:text-brand-yellow"
              >
                Boats
              </a>
              <a
                href="/blog"
                className="block px-4 py-2 text-xs font-bold uppercase tracking-wide text-white/80 hover:bg-white/5 hover:text-brand-yellow"
              >
                Blog
              </a>
              <div className="my-1 border-t border-white/10" />
              {MORE_LINKS.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  className="block px-4 py-2 text-xs font-semibold uppercase tracking-wide text-white/60 hover:bg-white/5 hover:text-brand-yellow"
                >
                  {l.label}
                </a>
              ))}
            </div>
          </details>
        </div>

        <nav className="hidden md:flex min-w-0 flex-1 items-center justify-center gap-x-2 lg:gap-x-3 xl:gap-x-4 text-[10px] lg:text-[11px] xl:text-xs font-semibold uppercase tracking-wide text-white/70 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden overflow-x-auto">
          <a href="/" className="shrink-0 whitespace-nowrap hover:text-brand-yellow transition-colors">
            Home
          </a>
          <a href="/jetdetailing" className="shrink-0 whitespace-nowrap hover:text-brand-yellow transition-colors">
            Jet
          </a>
          <a href="/fleet-detailing" className="shrink-0 whitespace-nowrap hover:text-brand-yellow transition-colors">
            Fleet
          </a>
          <a href="/boat-ceramic-coating" className="shrink-0 whitespace-nowrap hover:text-brand-yellow transition-colors">
            Boats
          </a>
          <a href="/ceramic-coating" className="shrink-0 whitespace-nowrap hover:text-brand-yellow transition-colors">
            Ceramic
          </a>
          <a href="/blog" className="shrink-0 whitespace-nowrap hover:text-brand-yellow transition-colors">
            Blog
          </a>
          <details className="relative shrink-0 group/nav">
            <summary className="list-none cursor-pointer whitespace-nowrap hover:text-brand-yellow transition-colors [&::-webkit-details-marker]:hidden">
              More
            </summary>
            <div
              className="absolute left-0 top-full z-50 mt-2 min-w-[10.5rem] rounded-md border border-white/10 bg-brand-black/95 backdrop-blur-md py-2 shadow-xl"
              onClick={(e) => {
                const el = (e.target as HTMLElement).closest('a');
                if (el) (e.currentTarget.closest('details') as HTMLDetailsElement | null)?.removeAttribute('open');
              }}
            >
              {MORE_LINKS.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  className="block px-4 py-2 text-[11px] font-semibold uppercase tracking-wide text-white/75 hover:bg-white/5 hover:text-brand-yellow"
                >
                  {l.label}
                </a>
              ))}
            </div>
          </details>
        </nav>

        <div className="hidden md:flex shrink-0 items-center gap-2 lg:gap-4">
          <a
            href="tel:+19053794820"
            onClick={() => trackClientEvent(SITE_EVENT.HEADER_PHONE)}
            className="whitespace-nowrap text-brand-yellow font-bold text-xs lg:text-sm tracking-tight hover:opacity-90 transition-opacity"
          >
            (905) 379-4820
          </a>
          <button
            type="button"
            onClick={() => {
              trackClientEvent(SITE_EVENT.HEADER_GET_QUOTE);
              onRequestQuote?.();
            }}
            className="shrink-0 whitespace-nowrap bg-brand-yellow text-brand-black px-4 py-2 lg:px-6 lg:py-2.5 rounded-none font-bold text-[10px] lg:text-xs uppercase tracking-wide magnetic-cta"
          >
            Get Quote
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
