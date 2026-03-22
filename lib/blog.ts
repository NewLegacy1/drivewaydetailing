import { SITE_ORIGIN } from './site';

export type BlogPost = {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  body_html: string;
  meta_title: string | null;
  meta_description: string | null;
  /** Legacy entries may include a cover; new posts are text-only. */
  cover_image_url?: string | null;
  cover_image_alt?: string | null;
  cover_image_credit_html?: string | null;
  focus_city: string;
  focus_city_slug: string | null;
  published_at: string;
  post_date: string;
};

const DATA_PATH = '/blog/data.json';

function isBlogPost(x: unknown): x is BlogPost {
  if (!x || typeof x !== 'object') return false;
  const o = x as Record<string, unknown>;
  return (
    typeof o.slug === 'string' &&
    typeof o.title === 'string' &&
    typeof o.body_html === 'string' &&
    typeof o.published_at === 'string'
  );
}

export async function fetchBlogPosts(): Promise<BlogPost[]> {
  try {
    const res = await fetch(DATA_PATH, { cache: 'no-store' });
    if (!res.ok) return [];
    const data: unknown = await res.json();
    if (!Array.isArray(data)) return [];
    const posts = data.filter(isBlogPost);
    posts.sort((a, b) => (a.published_at < b.published_at ? 1 : -1));
    return posts;
  } catch (e) {
    console.error('fetchBlogPosts', e);
    return [];
  }
}

export async function fetchBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  if (!slug) return null;
  const posts = await fetchBlogPosts();
  return posts.find((p) => p.slug === slug) ?? null;
}

export function blogPostPath(slug: string): string {
  return `/blog/${slug}`;
}

export function blogPostCanonicalUrl(slug: string): string {
  return `${SITE_ORIGIN}${blogPostPath(slug)}`;
}
