import { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Clock } from 'lucide-react';
import ShaderBackground from './ui/shader-background';
import Navbar from './Navbar';
import Footer from './Footer';
import { subscribeToPublishedPosts, trackActivity } from '../services/dataService';
import { BlogPost } from '../types';
import { usePageSeo } from '../lib/seo';
import { renderMarkdown, readingTime } from '../lib/markdown';
import { BUSINESS } from '../config/business';

function formatDate(ts: any): string {
  try {
    const d = ts && typeof ts.toDate === 'function' ? ts.toDate() : ts ? new Date(ts) : null;
    if (!d) return '';
    return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  } catch { return ''; }
}

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const [posts, setPosts] = useState<BlogPost[] | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    const unsub = subscribeToPublishedPosts(setPosts);
    return unsub;
  }, []);

  const post = useMemo(() => (posts ?? []).find(p => p.slug === slug) || null, [posts, slug]);
  const loading = posts === null;
  const canonical = `${BUSINESS.websiteUrl}/blog/${slug}`;

  useEffect(() => {
    if (post) trackActivity('PAGE_VIEW', { page: 'blog-post', slug: post.slug });
  }, [post]);

  usePageSeo({
    title: post ? `${post.title} — ${BUSINESS.brandName} Blog` : `Article — ${BUSINESS.brandName} Blog`,
    description: post?.excerpt,
    canonical,
    image: post?.coverImage || undefined,
    type: 'article',
    jsonLd: post ? {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: post.title,
      description: post.excerpt,
      image: post.coverImage || `${BUSINESS.websiteUrl}/og-image.jpg`,
      author: { '@type': 'Person', name: post.author || BUSINESS.brandName },
      publisher: {
        '@type': 'Organization',
        name: BUSINESS.brandName,
        legalName: BUSINESS.legalCompanyName,
        logo: { '@type': 'ImageObject', url: `${BUSINESS.websiteUrl}/og-image.jpg` },
      },
      mainEntityOfPage: canonical,
    } : null,
  });

  const html = useMemo(() => (post ? renderMarkdown(post.content) : ''), [post]);

  return (
    <div className="min-h-screen selection:bg-brand-accent selection:text-white scroll-smooth relative overflow-x-hidden">
      <ShaderBackground />
      <div className="grain-bg" />
      <div className="grid-texture" />
      <div className="soft-vignette" />
      <div className="fixed top-0 left-1/4 w-[1200px] h-[1200px] bg-brand-accent/5 rounded-full blur-[180px] -translate-y-1/2 -translate-x-1/2 pointer-events-none" aria-hidden="true" />

      <Navbar />

      <main className="relative z-20 pt-36 pb-24 px-6">
        <div className="max-w-3xl mx-auto">
          <Link to="/blog" className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-slate-500 hover:text-brand-accent transition-colors mb-10">
            <ArrowLeft className="w-4 h-4" /> Back to Blog
          </Link>

          {loading ? (
            <div className="flex justify-center py-24">
              <div className="w-6 h-6 border-2 border-brand-accent border-t-transparent rounded-full animate-spin" />
            </div>
          ) : !post ? (
            <div className="text-center py-24 space-y-4">
              <h1 className="text-3xl font-bold text-slate-900">Article not found</h1>
              <p className="text-slate-500">This post may have been moved or unpublished.</p>
              <Link to="/blog" className="inline-block btn-primary !py-3 !px-8 text-xs mt-4">Browse all articles</Link>
            </div>
          ) : (
            <article>
              {/* Header */}
              <header className="mb-10">
                {post.tags?.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-5">
                    {post.tags.map((t, i) => (
                      <span key={i} className="px-3 py-1 rounded-full bg-brand-accent/10 text-brand-accent text-[10px] font-bold uppercase tracking-widest">{t}</span>
                    ))}
                  </div>
                )}
                <h1 className="text-4xl md:text-5xl font-display font-bold text-slate-900 tracking-tight leading-[1.1] mb-5">
                  {post.title}
                </h1>
                <div className="flex items-center gap-3 text-sm text-slate-400">
                  <span className="font-medium text-slate-600">{post.author || BUSINESS.brandName}</span>
                  <span>·</span>
                  <span>{formatDate(post.createdAt)}</span>
                  <span>·</span>
                  <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {readingTime(post.content)} min read</span>
                </div>
              </header>

              {/* Cover */}
              {post.coverImage && (
                <div className="rounded-2xl overflow-hidden border border-slate-900/10 mb-12">
                  <img src={post.coverImage} alt={post.title} className="w-full object-cover" />
                </div>
              )}

              {/* Body */}
              <div className="blog-content" dangerouslySetInnerHTML={{ __html: html }} />

              {/* CTA */}
              <div className="mt-16 p-8 rounded-2xl bg-slate-900/[0.03] border border-slate-900/10 text-center">
                <h3 className="text-xl font-bold text-slate-900 mb-2">Need help building your idea?</h3>
                <p className="text-slate-500 text-sm mb-6">We build high-performance web apps, AI tools, and SaaS platforms.</p>
                <a href="/#contact" className="inline-block btn-primary !py-3 !px-8 text-xs">Get a Free Consultation</a>
              </div>
            </article>
          )}
        </div>
      </main>

      <Footer />

      <style>{`
        .blog-content { color: #334155; font-size: 1.075rem; line-height: 1.85; }
        .blog-content h1, .blog-content h2, .blog-content h3, .blog-content h4 {
          color: #0f172a; font-family: Poppins, sans-serif; font-weight: 700;
          line-height: 1.25; margin: 2rem 0 1rem;
        }
        .blog-content h1 { font-size: 2rem; }
        .blog-content h2 { font-size: 1.6rem; }
        .blog-content h3 { font-size: 1.3rem; }
        .blog-content h4 { font-size: 1.1rem; }
        .blog-content p { margin: 1.1rem 0; }
        .blog-content a { color: #1a7fe6; text-decoration: underline; text-underline-offset: 2px; }
        .blog-content strong { color: #0f172a; font-weight: 700; }
        .blog-content ul, .blog-content ol { margin: 1.1rem 0; padding-left: 1.5rem; }
        .blog-content ul { list-style: disc; }
        .blog-content ol { list-style: decimal; }
        .blog-content li { margin: 0.4rem 0; }
        .blog-content blockquote {
          border-left: 3px solid #1a7fe6; background: rgba(26,127,230,0.05);
          padding: 0.75rem 1.25rem; margin: 1.5rem 0; border-radius: 0 8px 8px 0;
          color: #475569; font-style: italic;
        }
        .blog-content code {
          background: rgba(15,23,42,0.06); padding: 0.15rem 0.4rem; border-radius: 5px;
          font-family: ui-monospace, monospace; font-size: 0.9em; color: #0f172a;
        }
        .blog-content pre {
          background: #0f172a; color: #e2e8f0; padding: 1.25rem 1.5rem; border-radius: 12px;
          overflow-x: auto; margin: 1.5rem 0;
        }
        .blog-content pre code { background: none; color: inherit; padding: 0; }
        .blog-content img { border-radius: 12px; margin: 1.5rem 0; max-width: 100%; }
        .blog-content hr { border: none; border-top: 1px solid rgba(15,23,42,0.1); margin: 2rem 0; }
      `}</style>
    </div>
  );
}
