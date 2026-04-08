/**
 * Regenerates public/sitemap.xml from static routes + public/blog/data.json.
 * Run automatically before `vite build` (see package.json).
 *
 * Optional: SITE_ORIGIN=https://yourdomain.com node scripts/build-sitemap.mjs
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const SITE = (process.env.SITE_ORIGIN || 'https://showroomautocare.ca').replace(/\/$/, '');
const TODAY = new Date().toISOString().slice(0, 10);

const CITY_SLUGS = ['ancaster', 'mississauga', 'hamilton', 'burlington', 'oakville'];

/** Keep in sync with lib/fleetCities.ts FLEET_CITY_SLUGS */
const FLEET_CITY_SLUGS = ['hamilton', 'mississauga', 'toronto', 'burlington', 'oakville', 'ancaster'];

/** Keep in sync with lib/boatCities.ts BOAT_CITY_SLUGS */
const BOAT_CITY_SLUGS = ['hamilton', 'mississauga', 'toronto', 'burlington', 'oakville', 'ancaster'];

const STATIC = [
  { path: '/', priority: '1.0', changefreq: 'weekly' },
  { path: '/blog', priority: '0.85', changefreq: 'daily' },
  { path: '/ceramic-coating', priority: '0.95', changefreq: 'weekly' },
  { path: '/jetdetailing', priority: '0.8', changefreq: 'monthly' },
  { path: '/fleet-detailing', priority: '0.92', changefreq: 'weekly' },
  { path: '/boat-ceramic-coating', priority: '0.91', changefreq: 'weekly' },
  ...FLEET_CITY_SLUGS.map((slug) => ({
    path: `/fleet-detailing/${slug}`,
    priority: '0.9',
    changefreq: 'weekly',
  })),
  ...BOAT_CITY_SLUGS.map((slug) => ({
    path: `/boat-ceramic-coating/${slug}`,
    priority: '0.89',
    changefreq: 'weekly',
  })),
  ...CITY_SLUGS.map((slug) => ({
    path: `/${slug}`,
    priority: '0.9',
    changefreq: 'weekly',
  })),
];

function urlXml(loc, lastmod, changefreq, priority) {
  return `  <url>
    <loc>${loc}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
}

function main() {
  const chunks = [];

  for (const s of STATIC) {
    const loc = s.path === '/' ? `${SITE}/` : `${SITE}${s.path}`;
    chunks.push(urlXml(loc, TODAY, s.changefreq, s.priority));
  }

  const dataPath = path.join(ROOT, 'public', 'blog', 'data.json');
  if (fs.existsSync(dataPath)) {
    try {
      const raw = fs.readFileSync(dataPath, 'utf8');
      const posts = JSON.parse(raw);
      if (Array.isArray(posts)) {
        for (const p of posts) {
          if (p?.slug && typeof p.slug === 'string') {
            const lastmod = String(p.published_at || p.post_date || TODAY).slice(0, 10);
            const loc = `${SITE}/blog/${encodeURIComponent(p.slug)}`;
            chunks.push(urlXml(loc, lastmod, 'monthly', '0.75'));
          }
        }
      }
    } catch (e) {
      console.warn('build-sitemap: could not read blog data', e.message);
    }
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${chunks.join('\n')}
</urlset>
`;
  const out = path.join(ROOT, 'public', 'sitemap.xml');
  fs.writeFileSync(out, xml, 'utf8');
  console.log(`build-sitemap: wrote ${chunks.length} URLs to public/sitemap.xml`);
}

main();
