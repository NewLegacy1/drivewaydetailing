import { canonicalUrl, normalizePath, SITE_ORIGIN } from './site';

const DEFAULT_OG_IMAGE = `${SITE_ORIGIN}/og-image.jpg`;

function setMeta(attr: 'property' | 'name', key: string, content: string) {
  const sel = attr === 'property' ? `meta[property="${key}"]` : `meta[name="${key}"]`;
  let el = document.head.querySelector(sel);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

/**
 * Updates document title, meta description, and Open Graph / Twitter tags (SPA-friendly).
 * Social crawlers that do not run JS still see defaults from index.html.
 */
export function setDocumentSeo(opts: { title: string; description: string; path: string }) {
  const path = normalizePath(opts.path);
  const url = canonicalUrl(path);

  document.title = opts.title;

  let metaDesc = document.querySelector<HTMLMetaElement>('meta[name="description"]');
  if (!metaDesc) {
    metaDesc = document.createElement('meta');
    metaDesc.setAttribute('name', 'description');
    document.head.appendChild(metaDesc);
  }
  metaDesc.setAttribute('content', opts.description);

  setMeta('property', 'og:title', opts.title);
  setMeta('property', 'og:description', opts.description);
  setMeta('property', 'og:url', url);
  setMeta('property', 'og:image', DEFAULT_OG_IMAGE);
  setMeta('property', 'og:type', 'website');

  setMeta('name', 'twitter:card', 'summary_large_image');
  setMeta('name', 'twitter:title', opts.title);
  setMeta('name', 'twitter:description', opts.description);
  setMeta('name', 'twitter:image', DEFAULT_OG_IMAGE);
}
