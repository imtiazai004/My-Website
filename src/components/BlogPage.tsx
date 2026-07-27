import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight, Clock, PenLine } from 'lucide-react';
import ShaderBackground from './ui/shader-background';
import Navbar from './Navbar';
import Footer from './Footer';
import { subscribeToPublishedPosts, trackActivity } from '../services/dataService';
import { BlogPost } from '../types';
import { usePageSeo } from '../lib/seo';
import { readingTime } from '../lib/markdown';
import { BUSINESS } from '../config/business';

function formatDate(ts: any): string {
  try {
    const d = ts && typeof ts.toDate === 'function' ? ts.toDate() : ts ? new Date(ts) : null;
    if (!d) return '';
    return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  } catch { return ''; }
}

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  usePageSeo({
    title: `Blog — ${BUSINESS.brandName} | Product Research, AI & Web Dev Insights`,
    description: `Guides and insights on e-commerce product research, AI tools, and web development from the ${BUSINESS.brandName} team.`,
    canonical: `${BUSINESS.websiteUrl}/blog`,
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'Blog',
      name: `${BUSINESS.brandName} Blog`,
      url: `${BUSINESS.websiteUrl}/blog`,
      description:
        'Guides and insights on e-commerce product research, AI tools, and web development.',
    },
  });

  useEffect(() => {
    window.scrollTo(0, 0);
    trackActivity('PAGE_VIEW', { page: 'blog' });
    const unsub = subscribeToPublishedPosts((data) => { setPosts(data); setLoading(false); });
    return unsub;
  }, []);

  const [featured, ...rest] = posts;

  return (
    <div className="min-h-screen selection:bg-brand-accent selection:text-white scroll-smooth relative overflow-x-hidden">
      <ShaderBackground />
      <div className="grain-bg" />
      <div className="grid-texture" />
      <div className="soft-vignette" />
      <div className="fixed top-0 left-1/4 w-[1200px] h-[1200px] bg-brand-accent/5 rounded-full blur-[180px] -translate-y-1/2 -translate-x-1/2 pointer-events-none" aria-hidden="true" />

      <Navbar />

      <main className="relative z-20 pt-36 pb-24 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-slate-900/10 bg-slate-900/[0.04] text-[10px] font-bold tracking-[0.2em] text-slate-500 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-accent animate-pulse" />
              THE BLOG
            </div>
            <h1 className="text-5xl md:text-6xl font-display font-bold text-slate-900 tracking-tight leading-tight mb-5">
              Insights & <span className="text-brand-accent italic">Guides</span>
            </h1>
            <p className="text-slate-500 text-xl font-light">
              Product research, AI tools, and web development — practical writing from the team behind ProfitScout.
            </p>
          </div>

          {loading ? (
            <div className="flex justify-center py-24">
              <div className="w-6 h-6 border-2 border-brand-accent border-t-transparent rounded-full animate-spin" />
            </div>
          ) : posts.length === 0 ? (
            <div className="text-center py-24">
              <PenLine className="w-10 h-10 text-brand-accent/30 mx-auto mb-4" />
              <p className="text-slate-500">No articles published yet. Check back soon!</p>
            </div>
          ) : (
            <div className="space-y-16">
              {/* Featured */}
              {featured && (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                  <Link to={`/blog/${featured.slug}`} className="group block">
                    <div className="grid md:grid-cols-2 gap-8 items-center bg-white border border-slate-900/10 rounded-3xl overflow-hidden hover:shadow-[0_30px_70px_rgba(15,23,42,0.10)] transition-all">
                      <div className="aspect-[16/10] overflow-hidden bg-slate-100">
                        {featured.coverImage && (
                          <img src={featured.coverImage} alt={featured.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy" />
                        )}
                      </div>
                      <div className="p-8 md:p-10">
                        <div className="flex items-center gap-3 text-[11px] font-bold uppercase tracking-widest text-brand-accent mb-4">
                          <span>Featured</span>
                          <span className="text-slate-300">·</span>
                          <span className="text-slate-400 flex items-center gap-1"><Clock className="w-3 h-3" /> {readingTime(featured.content)} min read</span>
                        </div>
                        <h2 className="text-3xl font-display font-bold text-slate-900 leading-tight mb-4 group-hover:text-brand-accent transition-colors">
                          {featured.title}
                        </h2>
                        <p className="text-slate-500 leading-relaxed mb-6 line-clamp-3">{featured.excerpt}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-slate-400">{featured.author} · {formatDate(featured.createdAt)}</span>
                          <span className="inline-flex items-center gap-2 text-brand-accent font-bold text-sm group-hover:gap-3 transition-all">
                            Read <ArrowRight className="w-4 h-4" />
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              )}

              {/* Grid */}
              {rest.length > 0 && (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                  {rest.map((post, i) => (
                    <motion.div
                      key={post.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.05 }}
                    >
                      <Link to={`/blog/${post.slug}`} className="group block bg-white border border-slate-900/10 rounded-2xl overflow-hidden h-full hover:shadow-[0_20px_50px_rgba(15,23,42,0.08)] hover:border-brand-accent/30 transition-all">
                        <div className="aspect-[16/10] overflow-hidden bg-slate-100">
                          {post.coverImage && (
                            <img src={post.coverImage} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy" />
                          )}
                        </div>
                        <div className="p-6">
                          <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-3">
                            <Clock className="w-3 h-3" /> {readingTime(post.content)} min read
                          </div>
                          <h3 className="text-lg font-display font-bold text-slate-900 leading-snug mb-2 group-hover:text-brand-accent transition-colors line-clamp-2">
                            {post.title}
                          </h3>
                          <p className="text-slate-500 text-sm leading-relaxed line-clamp-3 mb-4">{post.excerpt}</p>
                          <span className="text-xs text-slate-400">{formatDate(post.createdAt)}</span>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
