/**
 * Daily blog generator — text only, writes to public/blog/data.json (no database).
 * Run locally: OPENAI_API_KEY=... node scripts/generate-daily-blog.mjs
 * Backfill: OPENAI_API_KEY=... node scripts/generate-daily-blog.mjs --seed 5
 *   (creates up to 5 posts for today and previous calendar days; skips dates that already exist)
 * Scheduled: .github/workflows/daily-blog.yml
 */
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const DATA_PATH = path.join(ROOT, 'public', 'blog', 'data.json');

const TIMEZONE = 'America/Toronto';

const ROTATION_CITIES = [
  { name: 'Hamilton', slug: 'hamilton' },
  { name: 'Ancaster', slug: 'ancaster' },
  { name: 'Burlington', slug: 'burlington' },
  { name: 'Oakville', slug: 'oakville' },
  { name: 'Mississauga', slug: 'mississauga' },
];

const TOPIC_SEEDS = [
  'paint decontamination before ceramic coating',
  'how to maintain ceramic coating through Ontario winters',
  'mobile detailing vs shop detailing for busy owners',
  'interior fabric and leather care after road salt season',
  'paint correction myths and what actually fixes swirl marks',
  'how often to book maintenance washes after coating',
  'bird etching and water spots: prevention in the GTA',
  'choosing between wax, sealant, and ceramic for daily drivers',
];

function getTorontoYmd(now = new Date()) {
  const fmt = new Intl.DateTimeFormat('en-CA', {
    timeZone: TIMEZONE,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
  const parts = fmt.formatToParts(now);
  const y = parts.find((p) => p.type === 'year').value;
  const m = parts.find((p) => p.type === 'month').value;
  const d = parts.find((p) => p.type === 'day').value;
  return `${y}-${m}-${d}`;
}

function dayNumberFromYmd(ymd) {
  const [y, m, d] = ymd.split('-').map(Number);
  return Math.floor(Date.UTC(y, m - 1, d) / 86400000);
}

/** Civil YYYY-MM-DD plus/minus days (UTC calendar math). */
function ymdAddDays(ymd, deltaDays) {
  const [y, m, d] = ymd.split('-').map(Number);
  const t = Date.UTC(y, m - 1, d) + deltaDays * 86400000;
  const nd = new Date(t);
  const yy = nd.getUTCFullYear();
  const mm = String(nd.getUTCMonth() + 1).padStart(2, '0');
  const dd = String(nd.getUTCDate()).padStart(2, '0');
  return `${yy}-${mm}-${dd}`;
}

function publishedAtFromYmd(ymd) {
  const [y, m, d] = ymd.split('-').map(Number);
  return new Date(Date.UTC(y, m - 1, d, 17, 0, 0)).toISOString();
}

function parseSeedCount() {
  const i = process.argv.indexOf('--seed');
  if (i === -1 || process.argv[i + 1] == null) return 0;
  const n = parseInt(process.argv[i + 1], 10);
  if (!Number.isFinite(n) || n < 1) return 0;
  return Math.min(n, 30);
}

function slugify(input) {
  return (
    input
      .toLowerCase()
      .replace(/['']/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
      .slice(0, 72) || 'detailing-post'
  );
}

async function generateWithOpenAI(apiKey, params) {
  const site = 'https://showroomautocare.com';
  const system = `You write original, helpful SEO articles for ShowRoom AutoCare, a premium MOBILE car detailing and ceramic coating business in Ontario, Canada.
Audience: vehicle owners in the Greater Toronto and Hamilton area.
Tone: professional, clear, non-hype. No unverifiable superlatives like "best" or "#1". Do not invent discounts, prices, or guarantees.
The primary local focus for this article is ${params.cityName}, Ontario — also mention nearby GTA context naturally (Hamilton, Burlington, Oakville, Mississauga, Ancaster) where relevant.

Output ONLY valid JSON with keys:
title (string, under 70 chars),
slug (string, lowercase kebab-case, short, unique-ish; may include the date fragment ${params.postDate}),
excerpt (string, 1–2 sentences),
meta_title (string, <= 60 chars, include city and detailing or ceramic coating),
meta_description (string, 140–160 chars, include city and CTA to request a quote),
body_html (string, semantic HTML only: h2, h3, p, ul, li, strong, em, a).

body_html requirements:
- 650–1000 words total (keep concise for fast reading).
- Do not reference images, figures, or stock photos — text only.
- Include 2–3 internal links using full URLs starting with ${site} only:
  - City hub: ${site}/${params.citySlug}
  - Home: ${site}/
  - Optional other city page from: /hamilton /ancaster /burlington /oakville /mississauga
- Use rel="noopener" on every a tag. External links are NOT allowed except the internal URLs above.
- Include one h2 near the top and 2–4 more h2/h3 sections.
- Mention mobile service (we come to you) once clearly.
- End with a short paragraph that mentions calling (905) 379-4820 or using the website quote form — no mailto in HTML.`;

  const user = `Write today's article. Topic angle: ${params.topic}. Local pillar city: ${params.cityName}. Date stamp for slug if helpful: ${params.postDate}.`;

  const res = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      temperature: 0.85,
      response_format: { type: 'json_object' },
      messages: [
        { role: 'system', content: system },
        { role: 'user', content: user },
      ],
    }),
  });

  if (!res.ok) {
    const t = await res.text();
    throw new Error(`OpenAI ${res.status}: ${t.slice(0, 400)}`);
  }

  const data = await res.json();
  const raw = data.choices?.[0]?.message?.content;
  if (!raw) throw new Error('OpenAI: empty content');

  let parsed;
  try {
    parsed = JSON.parse(raw);
  } catch {
    throw new Error('OpenAI: invalid JSON');
  }

  for (const key of ['title', 'slug', 'excerpt', 'body_html', 'meta_title', 'meta_description']) {
    if (typeof parsed[key] !== 'string' || !parsed[key].trim()) {
      throw new Error(`OpenAI: missing field ${key}`);
    }
  }

  parsed.slug = slugify(parsed.slug);
  if (!parsed.slug) parsed.slug = `detailing-${params.postDate}`;

  return parsed;
}

function readPosts() {
  const raw = fs.readFileSync(DATA_PATH, 'utf8');
  const data = JSON.parse(raw);
  if (!Array.isArray(data)) throw new Error('blog data.json must be an array');
  return data;
}

function writePosts(posts) {
  fs.mkdirSync(path.dirname(DATA_PATH), { recursive: true });
  fs.writeFileSync(DATA_PATH, JSON.stringify(posts, null, 2) + '\n', 'utf8');
}

function uniqueSlug(desired, existingSlugs) {
  let slug = desired;
  const base = slug;
  let n = 2;
  while (existingSlugs.has(slug)) {
    slug = `${base}-${n}`;
    n += 1;
  }
  return slug;
}

async function addPostForDate(openaiKey, postDate) {
  const posts = readPosts();

  if (posts.some((p) => p.post_date === postDate)) {
    console.log('Skip: post already exists for', postDate);
    return;
  }

  const dayNum = dayNumberFromYmd(postDate);
  const city = ROTATION_CITIES[dayNum % ROTATION_CITIES.length];
  const topic = TOPIC_SEEDS[dayNum % TOPIC_SEEDS.length];

  const article = await generateWithOpenAI(openaiKey, {
    cityName: city.name,
    citySlug: city.slug,
    topic,
    postDate,
  });

  const existingSlugs = new Set(posts.map((p) => p.slug));
  const slug = uniqueSlug(article.slug, existingSlugs);

  const row = {
    id: crypto.randomUUID(),
    slug,
    title: article.title.trim(),
    excerpt: article.excerpt.trim(),
    body_html: article.body_html.trim(),
    meta_title: article.meta_title.trim(),
    meta_description: article.meta_description.trim(),
    focus_city: city.name,
    focus_city_slug: city.slug,
    published_at: publishedAtFromYmd(postDate),
    post_date: postDate,
  };

  posts.unshift(row);
  writePosts(posts);
  console.log('Wrote post:', slug, postDate);
}

async function main() {
  const openaiKey = process.env.OPENAI_API_KEY;
  if (!openaiKey) {
    console.error('Missing OPENAI_API_KEY');
    process.exit(1);
  }

  const seedCount = parseSeedCount();
  const today = getTorontoYmd();

  if (seedCount > 0) {
    for (let i = 0; i < seedCount; i++) {
      const postDate = ymdAddDays(today, -i);
      await addPostForDate(openaiKey, postDate);
    }
    return;
  }

  await addPostForDate(openaiKey, today);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
