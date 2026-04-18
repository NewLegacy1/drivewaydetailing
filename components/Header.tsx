import React from 'react';
import { Link } from 'react-router-dom';
import { trackClientEvent } from '@/lib/trackEvent';
import { SITE_EVENT } from '@/lib/siteEvents';
import { BUSINESS } from '@/lib/site';
import { CITY_SLUGS, CITY_NAMES, type CitySlug } from '@/lib/cities';

interface HeaderProps {
  onRequestQuote?: () => void;
}

const MORE_LINKS = [
  { href: '/#services', label: 'Services' },
  { href: '/#about', label: 'About' },
  { href: '/#areas', label: 'Areas' },
  { href: '/#gallery', label: 'Gallery' },
  { href: '/#get-quote', label: 'Quote' },
] as const;

const Header: React.FC<HeaderProps> = ({ onRequestQuote }) => {
  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-brand-navy/95 backdrop-blur-md border-b border-white/10 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-center md:justify-start md:gap-3 lg:gap-5 min-w-0">
        <Link to="/" className="flex shrink-0 items-center gap-2" aria-label={`${BUSINESS.name} home`}>
          <img src="/logo.png" alt={BUSINESS.name} className="h-11 md:h-14 w-auto max-h-[3.25rem]" />
        </Link>

        <div className="md:hidden ml-auto mr-2 flex shrink-0 items-center gap-2">
          <details className="relative group">
            <summary className="list-none cursor-pointer text-[10px] font-black uppercase tracking-[0.12em] text-white/80 hover:text-brand-silver transition-colors [&::-webkit-details-marker]:hidden">
              Menu
            </summary>
            <div
              className="absolute right-0 top-full z-50 mt-2 min-w-[12rem] rounded-md border border-white/15 bg-brand-navy shadow-xl py-2"
              onClick={(e) => {
                const el = (e.target as HTMLElement).closest('a');
                if (el) (e.currentTarget.closest('details') as HTMLDetailsElement | null)?.removeAttribute('open');
              }}
            >
              <p className="px-4 py-1 text-[10px] font-black uppercase tracking-widest text-brand-silver/90">Locations</p>
              {CITY_SLUGS.map((slug) => (
                <Link
                  key={slug}
                  to={`/${slug}`}
                  className="block px-4 py-2 text-xs font-bold uppercase tracking-wide text-white/85 hover:bg-white/10 hover:text-brand-silver"
                >
                  {CITY_NAMES[slug as CitySlug]}
                </Link>
              ))}
              <div className="my-1 border-t border-white/10" />
              {MORE_LINKS.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  className="block px-4 py-2 text-xs font-semibold uppercase tracking-wide text-white/65 hover:bg-white/5 hover:text-brand-silver"
                >
                  {l.label}
                </a>
              ))}
            </div>
          </details>
        </div>

        <nav className="hidden md:flex min-w-0 flex-1 items-center justify-center gap-x-1 lg:gap-x-2 xl:gap-x-3 text-[10px] lg:text-[11px] xl:text-xs font-semibold uppercase tracking-wide text-white/80 overflow-x-auto">
          <Link to="/" className="shrink-0 whitespace-nowrap hover:text-brand-silver transition-colors px-1.5">
            Home
          </Link>
          <details className="relative shrink-0 group/nav">
            <summary className="list-none cursor-pointer whitespace-nowrap hover:text-brand-silver transition-colors px-1.5 [&::-webkit-details-marker]:hidden">
              Locations
            </summary>
            <div
              className="absolute left-0 top-full z-50 mt-2 min-w-[10.5rem] rounded-md border border-white/15 bg-brand-navy py-2 shadow-xl"
              onClick={(e) => {
                const el = (e.target as HTMLElement).closest('a');
                if (el) (e.currentTarget.closest('details') as HTMLDetailsElement | null)?.removeAttribute('open');
              }}
            >
              {CITY_SLUGS.map((slug) => (
                <Link
                  key={slug}
                  to={`/${slug}`}
                  className="block px-4 py-2 text-[11px] font-semibold uppercase tracking-wide text-white/85 hover:bg-white/10 hover:text-brand-silver"
                >
                  {CITY_NAMES[slug as CitySlug]}
                </Link>
              ))}
            </div>
          </details>
          <details className="relative shrink-0 group/nav2">
            <summary className="list-none cursor-pointer whitespace-nowrap hover:text-brand-silver transition-colors px-1.5 [&::-webkit-details-marker]:hidden">
              More
            </summary>
            <div
              className="absolute left-0 top-full z-50 mt-2 min-w-[10.5rem] rounded-md border border-white/15 bg-brand-navy py-2 shadow-xl"
              onClick={(e) => {
                const el = (e.target as HTMLElement).closest('a');
                if (el) (e.currentTarget.closest('details') as HTMLDetailsElement | null)?.removeAttribute('open');
              }}
            >
              {MORE_LINKS.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  className="block px-4 py-2 text-[11px] font-semibold uppercase tracking-wide text-white/80 hover:bg-white/10 hover:text-brand-silver"
                >
                  {l.label}
                </a>
              ))}
            </div>
          </details>
        </nav>

        <div className="hidden md:flex shrink-0 items-center gap-2 lg:gap-4">
          <button
            type="button"
            onClick={() => {
              trackClientEvent(SITE_EVENT.HEADER_GET_QUOTE);
              onRequestQuote?.();
            }}
            className="shrink-0 whitespace-nowrap bg-white text-brand-navy px-4 py-2 lg:px-6 lg:py-2.5 rounded-sm font-bold text-[10px] lg:text-xs uppercase tracking-wide magnetic-cta hover:bg-brand-silver hover:text-brand-navy transition-colors shadow-sm"
          >
            Get Quote
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
