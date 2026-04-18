/**
 * Regenerates public/sitemap.xml — home + city location pages only.
 *
 * Optional: SITE_ORIGIN=https://yourdomain.com node scripts/build-sitemap.mjs
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const SITE = (process.env.SITE_ORIGIN || 'https://drivewaydetail.com').replace(/\/$/, '');
const TODAY = new Date().toISOString().slice(0, 10);

const CITY_SLUGS = ['ancaster', 'mississauga', 'hamilton', 'burlington', 'oakville'];

const STATIC = [
  { path: '/', priority: '1.0', changefreq: 'weekly' },
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
