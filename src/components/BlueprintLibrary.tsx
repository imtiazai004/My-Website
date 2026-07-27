import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { BookOpen, Search, Calendar, ArrowRight, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import { subscribeToBlueprints } from '../services/dataService';
import { Blueprint } from '../types';


export default function BlueprintLibrary() {
  const [blueprints, setBlueprints] = useState<Blueprint[]>([]);
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  useEffect(() => {
    document.title = 'Blueprint Library | AI Soft Tech Solution';
    return () => { document.title = 'AI Soft Tech Solution'; };
  }, []);

  useEffect(() => {
    return subscribeToBlueprints(setBlueprints);
  }, []);

  const categories = ['All', ...Array.from(new Set(blueprints.map(b => b.category).filter(Boolean)))];

  const filtered = blueprints.filter(b => {
    const q = search.toLowerCase();
    const matchSearch = !q || b.title.toLowerCase().includes(q) || b.description.toLowerCase().includes(q) || b.tags?.some(t => t.toLowerCase().includes(q));
    const matchCat = activeCategory === 'All' || b.category === activeCategory;
    return matchSearch && matchCat;
  });

  return (
    <div className="min-h-screen bg-[#030712] text-white">
      <Navbar />

      {/* Hero */}
      <section className="pt-40 pb-16 px-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.5) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-accent/5 rounded-full blur-[160px] pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-indigo-500/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center space-y-6 max-w-3xl mx-auto">
            <div className="pill-badge mx-auto">
              <BookOpen className="w-3 h-3" />
              BLUEPRINT LIBRARY
            </div>
            <h1 className="heading-lg text-white">
              Free Building <br /> Blueprints
            </h1>
            <p className="text-brand-text-muted text-xl font-light">
              Daily guides to help you build, launch, and scale. Every blueprint is free to download.
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.15 }} className="mt-12 max-w-xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
              <input
                type="text"
                placeholder="Search blueprints..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-2xl pl-11 pr-5 py-4 text-white placeholder-white/25 focus:outline-none focus:border-brand-accent/50 transition-colors"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Category filters */}
      {categories.length > 1 && (
        <section className="px-6 pb-8">
          <div className="max-w-7xl mx-auto flex flex-wrap gap-2 justify-center">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-xl text-[11px] font-bold uppercase tracking-widest transition-all ${
                  activeCategory === cat
                    ? 'bg-brand-accent text-white shadow-[0_0_16px_rgba(99,102,241,0.3)]'
                    : 'bg-white/5 border border-white/10 text-white/40 hover:text-white hover:border-white/20'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </section>
      )}

      {/* Grid */}
      <section className="px-6 pb-32">
        <div className="max-w-7xl mx-auto">
          {filtered.length === 0 ? (
            <div className="text-center py-32 space-y-4">
              <BookOpen className="w-14 h-14 mx-auto text-white/10" />
              <p className="text-white/20 text-lg">
                {blueprints.length === 0 ? 'No blueprints published yet. Check back soon.' : 'No results for your search.'}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((bp, i) => (
                <motion.div
                  key={bp.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.04, duration: 0.4 }}
                  className="group flex flex-col p-6 bg-white/[0.03] border border-white/[0.07] rounded-2xl hover:border-brand-accent/30 hover:bg-white/[0.05] transition-all duration-300"
                >
                  {/* Top badge */}
                  <div className="flex items-start justify-between mb-4">
                    <span className="px-3 py-1 bg-brand-accent/10 border border-brand-accent/20 text-brand-accent text-[10px] font-bold uppercase tracking-widest rounded-lg">
                      {bp.category}
                    </span>
                    <span className="px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-widest border bg-orange-500/10 text-orange-400 border-orange-500/20">
                      HTML
                    </span>
                  </div>

                  {/* Title & description */}
                  <h2 className="text-white font-bold text-[17px] leading-snug mb-3 group-hover:text-brand-accent transition-colors">
                    {bp.title}
                  </h2>
                  <p className="text-white/45 text-sm leading-relaxed flex-1 mb-5 line-clamp-3">
                    {bp.description}
                  </p>

                  {/* Tags */}
                  {bp.tags?.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mb-5">
                      {bp.tags.slice(0, 4).map(tag => (
                        <span key={tag} className="px-2 py-0.5 bg-white/5 rounded-md text-[10px] text-white/30 font-mono">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-4 border-t border-white/[0.06]">
                    <span className="flex items-center gap-1.5 text-[10px] font-mono text-white/20">
                      <Calendar className="w-3 h-3" />
                      {bp.createdAt?.toDate
                        ? new Date(bp.createdAt.toDate()).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
                        : 'Recent'}
                    </span>
                    <Link
                      to={`/blueprint-library/${bp.id}`}
                      className="flex items-center gap-1.5 px-4 py-2 bg-brand-accent text-white text-[10px] font-bold uppercase tracking-widest rounded-lg hover:bg-indigo-400 transition-colors shadow-[0_0_12px_rgba(99,102,241,0.2)]"
                    >
                      Read
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Back to site */}
      <div className="px-6 pb-16 text-center">
        <Link to="/" className="inline-flex items-center gap-2 text-white/30 hover:text-white text-sm transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to main site
        </Link>
      </div>
    </div>
  );
}
