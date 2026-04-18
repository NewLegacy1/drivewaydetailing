import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import DOMPurify from 'dompurify';
import { fetchBlogPostBySlug, blogPostCanonicalUrl, type BlogPost } from '../lib/blog';
import { BUSINESS, SITE_ORIGIN, breadcrumbItemsForBlogPost, canonicalUrl } from '../lib/site';
import { setDocumentSeo } from '../lib/socialMeta';

const SEO_LD_ATTR = 'data-ddc-blog-post-ld';

const PURIFY = {
  ALLOWED_TAGS: ['h2', 'h3', 'p', 'ul', 'ol', 'li', 'strong', 'em', 'a', 'br', 'blockquote'],
  ALLOWED_ATTR: ['href', 'target', 'rel'],
};

function buildBlogPostingJsonLd(post: BlogPost): Record<string, unknown> {
  const url = blogPostCanonicalUrl(post.slug);
  const crumbs = breadcrumbItemsForBlogPost(post.slug, post.title);
  const breadcrumb: Record<string, unknown> = {
    '@type': 'BreadcrumbList',
    '@id': `${url}#breadcrumb`,
    itemListElement: crumbs.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.name,
      item: canonicalUrl(c.path),
    })),
  };

  const article: Record<string, unknown> = {
    '@type': 'BlogPosting',
    '@id': `${url}#article`,
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${url}#webpage` },
    headline: post.title,
    description: post.meta_description || post.excerpt || undefined,
    datePublished: post.published_at,
    dateModified: post.published_at,
    author: { '@type': 'Organization', name: BUSINESS.name },
    publisher: {
      '@type': 'Organization',
      name: BUSINESS.name,
      logo: { '@type': 'ImageObject', url: `${SITE_ORIGIN}/logo.png` },
    },
    articleSection: 'Automotive',
    keywords: [
      'mobile detailing',
      'ceramic coating',
      post.focus_city,
      'Ontario',
      'GTA',
    ].join(', '),
  };
  if (post.cover_image_url) {
    article.image = [post.cover_image_url];
  }
  return {
    '@context': 'https://schema.org',
    '@graph': [article, breadcrumb],
  };
}

const BlogPostPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPost | null | undefined>(undefined);

  useEffect(() => {
    let cancelled = false;
    if (!slug) {
      setPost(null);
      return;
    }
    (async () => {
      const row = await fetchBlogPostBySlug(slug);
      if (!cancelled) setPost(row);
    })();
    return () => {
      cancelled = true;
    };
  }, [slug]);

  useEffect(() => {
    if (post === undefined) return;

    document.querySelectorAll(`script[${SEO_LD_ATTR}]`).forEach((n) => n.remove());

    if (!post) {
      document.title = `Article not found | ${BUSINESS.name}`;
      return;
    }

    const title = post.meta_title || post.title;
    const desc = post.meta_description || post.excerpt || '';
    setDocumentSeo({
      title,
      description: desc || title,
      path: `/blog/${post.slug}`,
    });

    let canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    const prevCanonical = canonical?.getAttribute('href') ?? '';
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', blogPostCanonicalUrl(post.slug));

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.setAttribute(SEO_LD_ATTR, '1');
    script.textContent = JSON.stringify(buildBlogPostingJsonLd(post));
    document.head.appendChild(script);

    return () => {
      if (canonical) canonical.setAttribute('href', prevCanonical);
      document.querySelectorAll(`script[${SEO_LD_ATTR}]`).forEach((n) => n.remove());
    };
  }, [post]);

  if (post === undefined) {
    return (
      <div className="pt-32 pb-24 px-4 text-center text-white/50 font-semibold uppercase tracking-widest text-sm">
        Loading…
      </div>
    );
  }

  if (!post) {
    return (
      <div className="pt-32 pb-24 px-4 max-w-xl mx-auto text-center">
        <h1 className="font-display font-black text-2xl text-white mb-4">Article not found</h1>
        <Link to="/blog" className="text-brand-yellow font-bold uppercase tracking-widest text-sm hover:underline">
          Back to blog
        </Link>
      </div>
    );
  }

  const safeBody = DOMPurify.sanitize(post.body_html, PURIFY);
  const safeCredit = post.cover_image_credit_html
    ? DOMPurify.sanitize(post.cover_image_credit_html, {
        ALLOWED_TAGS: ['a'],
        ALLOWED_ATTR: ['href', 'rel', 'target'],
      })
    : '';

  return (
    <article className="pt-24 md:pt-28 pb-20 min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="text-xs font-bold uppercase tracking-widest text-white/40 mb-8">
          <Link to="/blog" className="hover:text-brand-yellow transition-colors">
            Blog
          </Link>
          <span className="mx-2">/</span>
          <span className="text-white/60">{post.focus_city}, ON</span>
        </nav>

        <header className="mb-8 reveal">
          <p className="text-brand-yellow text-[10px] font-black uppercase tracking-[0.25em] mb-3">
            {BUSINESS.name} · {post.focus_city}
          </p>
          <h1 className="font-display font-black text-3xl sm:text-4xl md:text-[2.75rem] uppercase tracking-tight text-white leading-tight">
            {post.title}
          </h1>
          {post.excerpt && (
            <p className="mt-5 text-lg text-white/65 leading-relaxed">{post.excerpt}</p>
          )}
        </header>

        <div
          className="reveal blog-prose text-white/80 leading-relaxed space-y-4
            [&_h2]:font-display [&_h2]:font-black [&_h2]:text-white [&_h2]:text-xl [&_h2]:uppercase [&_h2]:tracking-tight [&_h2]:mt-10 [&_h2]:mb-3
            [&_h3]:font-bold [&_h3]:text-white [&_h3]:text-lg [&_h3]:mt-8 [&_h3]:mb-2
            [&_p]:text-white/75 [&_a]:text-brand-yellow [&_a]:underline [&_a:hover]:text-white
            [&_ul]:list-disc [&_ul]:pl-6 [&_li]:my-1
            [&_strong]:text-white"
          dangerouslySetInnerHTML={{ __html: safeBody }}
        />

        <div className="mt-14 pt-10 border-t border-white/10 reveal">
          <p className="text-white/50 text-sm mb-4">
            Ready for mobile detailing or ceramic coating in {post.focus_city} or the GTA?
          </p>
          <div className="flex flex-wrap gap-4">
            <button
              type="button"
              onClick={() => window.dispatchEvent(new CustomEvent('ddc-open-quote'))}
              className="bg-brand-yellow text-brand-black px-6 py-3 font-bold text-xs uppercase tracking-widest magnetic-cta"
            >
              Get a quote
            </button>
            {post.focus_city_slug && (
              <Link
                to={`/${post.focus_city_slug}`}
                className="border border-white/20 text-white px-6 py-3 font-bold text-xs uppercase tracking-widest hover:border-brand-yellow transition-colors"
              >
                {post.focus_city} services
              </Link>
            )}
          </div>
        </div>
      </div>
    </article>
  );
};

export default BlogPostPage;
