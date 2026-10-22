import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight, Clock } from 'lucide-react';
import type { BlogPost } from '../types';
import { readingTime } from '../lib/markdown';

/**
 * Homepage: the three newest published blog posts, so visitors and crawlers
 * reach new articles from the homepage. Renders nothing until posts load.
 */
export default function LatestPosts() {
  const [posts, setPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    let unsub: (() => void) | undefined;
    let cancelled = false;
    import('../services/dataService').then(({ subscribeToPublishedPosts }) => {
      if (cancelled) return;
      unsub = subscribeToPublishedPosts((all) => setPosts(all.slice(0, 3)));
    });
    return () => {
      cancelled = true;
      unsub?.();
    };
  }, []);

  if (posts.length === 0) return null;

  return (
    <section id="latest-articles" aria-labelledby="latest-articles-heading" className="py-28 px-6 relative bg-white">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-900/10 to-transparent" />
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14"
        >
          <div className="space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-slate-900/10 bg-slate-900/[0.04] text-xs font-semibold text-slate-600">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-accent" />
              From the blog
            </div>
            <h2 id="latest-articles-heading" className="text-4xl md:text-5xl font-display font-medium text-slate-900 tracking-tight leading-tight">
              Latest <span className="text-brand-accent italic">articles</span>
            </h2>
            <p className="text-slate-600 text-lg max-w-xl">
              Practical answers to the problems we solve for sellers and small businesses.
            </p>
          </div>
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-brand-accent font-bold text-sm hover:gap-3 transition-all shrink-0"
          >
            All articles <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post, i) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
            >
              <Link
                to={`/blog/${post.slug}`}
                className="group flex flex-col h-full bg-white border border-slate-900/10 rounded-2xl p-7 hover:shadow-[0_20px_50px_rgba(15,23,42,0.08)] hover:border-brand-accent/30 transition-all"
              >
                <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-4">
                  {post.tags?.[0] && <span className="text-brand-accent">{post.tags[0]}</span>}
                  {post.tags?.[0] && <span className="text-slate-300">·</span>}
                  <Clock className="w-3 h-3" /> {readingTime(post.content)} min read
                </div>
                <h3 className="text-lg font-display font-bold text-slate-900 leading-snug mb-3 group-hover:text-brand-accent transition-colors line-clamp-3">
                  {post.title}
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed line-clamp-3 flex-1">{post.excerpt}</p>
                <span className="mt-5 inline-flex items-center gap-2 text-brand-accent font-bold text-sm group-hover:gap-3 transition-all">
                  Read <ArrowRight className="w-4 h-4" />
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
