import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { buildDynamicJsonLd, BUSINESS, canonicalUrl, normalizePath, pageWebMeta } from '../lib/site';
import { setDocumentSeo } from '../lib/socialMeta';
import { GMB_PROFILE_URL } from '../lib/google-business';

const DYNAMIC_LD_ATTR = 'data-ddc-seo-ld';
const GMB_SAMEAS_ATTR = 'data-ddc-gmb-sameas';

/**
 * Updates canonical URL and injects WebSite / WebPage / FAQPage JSON-LD per route.
 * Baseline LocalBusiness stays in index.html for no-JS crawlers.
 */
const SeoHead: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    document.querySelectorAll(`script[${GMB_SAMEAS_ATTR}]`).forEach((n) => n.remove());
    if (GMB_PROFILE_URL) {
      const s = document.createElement('script');
      s.type = 'application/ld+json';
      s.setAttribute(GMB_SAMEAS_ATTR, '1');
      s.textContent = JSON.stringify({
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@id': BUSINESS.jsonLdId,
            '@type': 'LocalBusiness',
            sameAs: [GMB_PROFILE_URL],
          },
        ],
      });
      document.head.appendChild(s);
    }
    return () => {
      document.querySelectorAll(`script[${GMB_SAMEAS_ATTR}]`).forEach((n) => n.remove());
    };
  }, []);

  useEffect(() => {
    const href = canonicalUrl(pathname);
    let link = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!link) {
      link = document.createElement('link');
      link.setAttribute('rel', 'canonical');
      document.head.appendChild(link);
    }
    link.setAttribute('href', href);

    const meta = pageWebMeta(pathname);
    setDocumentSeo({
      title: meta.name,
      description: meta.description,
      path: pathname,
      ogImage: meta.ogImage,
    });

    document.querySelectorAll(`script[${DYNAMIC_LD_ATTR}]`).forEach((n) => n.remove());
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.setAttribute(DYNAMIC_LD_ATTR, '1');
    script.textContent = JSON.stringify(buildDynamicJsonLd(pathname));
    document.head.appendChild(script);

    return () => {
      document.querySelectorAll(`script[${DYNAMIC_LD_ATTR}]`).forEach((n) => n.remove());
    };
  }, [pathname]);

  return null;
};

export default SeoHead;
