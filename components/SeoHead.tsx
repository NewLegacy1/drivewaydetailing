import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { buildDynamicJsonLd, canonicalUrl, normalizePath } from '../lib/site';

const DYNAMIC_LD_ATTR = 'data-showroom-seo-ld';

/**
 * Updates canonical URL and injects WebSite / WebPage / FAQPage JSON-LD per route.
 * Baseline LocalBusiness stays in index.html for no-JS crawlers.
 */
const SeoHead: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    const href = canonicalUrl(pathname);
    let link = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!link) {
      link = document.createElement('link');
      link.setAttribute('rel', 'canonical');
      document.head.appendChild(link);
    }
    link.setAttribute('href', href);

    const p = normalizePath(pathname);
    const isBlogList = p === '/blog';
    const isBlogArticle = p.startsWith('/blog/') && p.length > '/blog/'.length;
    document.querySelectorAll(`script[${DYNAMIC_LD_ATTR}]`).forEach((n) => n.remove());
    if (isBlogList || isBlogArticle) {
      return;
    }
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.setAttribute(DYNAMIC_LD_ATTR, '1');
    script.textContent = JSON.stringify(buildDynamicJsonLd(pathname));
    document.head.appendChild(script);
  }, [pathname]);

  return null;
};

export default SeoHead;
