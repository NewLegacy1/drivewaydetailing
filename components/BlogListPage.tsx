import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchBlogPosts, blogPostPath, type BlogPost } from '../lib/blog';
import { AREA_SERVED, BUSINESS, SITE_ORIGIN, pageWebMeta } from '../lib/site';
import { setDocumentSeo } from '../lib/socialMeta';

const SEO_LD_ATTR = 'data-ddc-blog-list-ld';

function buildBlogListJsonLd(posts: BlogPost[]): Record<string, unknown> {
  const items = posts.slice(0, 24).map((p, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    url: `${SITE_ORIGIN}${blogPostPath(p.slug)}`,
    name: p.title,
  }));
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Blog',
        '@id': `${SITE_ORIGIN}/blog#blog`,
        name: `${BUSINESS.name} Detailing Blog`,
        description:
          'Mobile car detailing, ceramic coating, and paint care tips for drivers in the Greater Toronto Area (GTA).',
        url: `${SITE_ORIGIN}/blog`,
        publisher: { '@id': `${SITE_ORIGIN}/#business` },
        blogPost: posts.slice(0, 12).map((p) => {
          const entry: Record<string, unknown> = {
            '@type': 'BlogPosting',
            headline: p.title,
            url: `${SITE_ORIGIN}${blogPostPath(p.slug)}`,
            datePublished: p.published_at,
          };
          if (p.cover_image_url) entry.image = p.cover_image_url;
          return entry;
        }),
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${SITE_ORIGIN}/blog#breadcrumb`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_ORIGIN}/` },
          { '@type': 'ListItem', position: 2, name: 'Blog', item: `${SITE_ORIGIN}/blog` },
        ],
      },
      {
        '@type': 'ItemList',
        '@id': `${SITE_ORIGIN}/blog#recent`,
        itemListElement: items,
      },
    ],
  };
}

const BlogListPage: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const list = await fetchBlogPosts();
      if (!cancelled) {
        setPosts(list);
        setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    const m = pageWebMeta('/blog');
    setDocumentSeo({ title: m.name, description: m.description, path: '/blog' });

    document.querySelectorAll(`script[${SEO_LD_ATTR}]`).forEach((n) => n.remove());
    if (posts.length) {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.setAttribute(SEO_LD_ATTR, '1');
      script.textContent = JSON.stringify(buildBlogListJsonLd(posts));
      document.head.appendChild(script);
    }

    return () => {
      document.querySelectorAll(`script[${SEO_LD_ATTR}]`).forEach((n) => n.remove());
    };
  }, [posts]);

  return (
    <div className="pt-24 md:pt-28 pb-20 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="mb-12 md:mb-16 reveal">
          <p className="font-display font-black uppercase text-brand-yellow text-xs tracking-[0.25em] mb-3">
            Local expertise
          </p>
          <h1 className="font-display font-black text-3xl sm:text-4xl md:text-5xl uppercase tracking-tight text-white mb-6">
            Detailing and ceramic coating blog for the GTA
          </h1>
          <p className="text-white/65 text-lg max-w-3xl leading-relaxed">
            Practical guides on mobile detailing, ceramic coating care, and paint protection for drivers in the{' '}
            {AREA_SERVED.join(', ')}. New articles are added on a regular schedule.
          </p>
        </header>

        {loading && (
          <p className="text-white/50 font-semibold uppercase tracking-widest text-sm">Loading articles</p>
        )}

        {!loading && posts.length === 0 && (
          <div className="rounded border border-white/10 bg-brand-gray/40 p-8 max-w-2xl">
            <p className="text-white font-bold mb-2">No posts yet</p>
            <p className="text-white/60 text-sm leading-relaxed">
              After you run the Supabase migration, set Vercel environment variables, and the daily cron calls
              the API route, new posts will show up here.
            </p>
          </div>
        )}

        <ul className="grid gap-8 md:gap-10 md:grid-cols-2 lg:grid-cols-3 list-none p-0 m-0">
          {posts.map((post) => (
            <li key={post.id} className="reveal">
              <article className="group flex flex-col h-full border border-white/10 bg-brand-dark/60 hover:border-brand-yellow/40 transition-colors p-6 md:p-7">
                <div className="flex flex-col flex-1">
                  {post.focus_city && (
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-yellow mb-2">
                      {post.focus_city}, ON
                    </span>
                  )}
                  <h2 className="font-display font-black text-lg uppercase tracking-tight text-white mb-2 leading-snug">
                    <Link
                      to={blogPostPath(post.slug)}
                      className="hover:text-brand-yellow transition-colors"
                    >
                      {post.title}
                    </Link>
                  </h2>
                  {post.excerpt && (
                    <p className="text-white/55 text-sm leading-relaxed line-clamp-3 flex-1">{post.excerpt}</p>
                  )}
                  <Link
                    to={blogPostPath(post.slug)}
                    className="mt-4 inline-flex items-center text-xs font-bold uppercase tracking-widest text-brand-yellow hover:underline"
                  >
                    Read article
                  </Link>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default BlogListPage;
