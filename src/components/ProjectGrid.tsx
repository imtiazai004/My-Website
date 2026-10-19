import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { Bot, Code, X, ArrowRight, Github } from 'lucide-react';
import ProjectCard from './ProjectCard';
import { FEATURED_PROJECTS, PROJECTS } from '../data/projects';
import { DEMO_APPS } from '../data/demos';
import { BUSINESS } from '../config/business';
import { ProjectVisual, StatusBadge } from './work/ProjectIcon';
import { ProjectLinks } from './work/ProjectLinks';

export default function ProjectGrid() {
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);
  const selected = PROJECTS.find((p) => p.slug === selectedSlug);

  // Close on Escape
  useEffect(() => {
    if (!selectedSlug) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setSelectedSlug(null);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [selectedSlug]);

  return (
    <section id="work" aria-labelledby="work-heading" className="py-32 px-6 relative overflow-hidden bg-white">
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(circle, rgba(15,23,42,0.4) 1px, transparent 1px)', backgroundSize: '40px 40px' }}
      />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-900/10 to-transparent" />

      <div className="max-w-7xl mx-auto mb-20">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-slate-900/10 bg-slate-900/[0.04] text-xs font-semibold text-slate-600 mb-10">
          <span className="w-1.5 h-1.5 rounded-full bg-brand-accent" />
          Our work
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="space-y-8 min-w-0"
          >
            <h2 id="work-heading" className="text-4xl md:text-6xl font-display font-medium text-slate-900 leading-tight tracking-tight">
              Products we built <br />
              <span className="text-brand-accent italic">and still run</span>
            </h2>
            <div className="space-y-5 text-slate-600 text-lg leading-relaxed">
              <p>
                Every project below is real: a system in daily use at a district control room, products people pay for
                or install, and open-source apps you can read on GitHub. The status label tells you where each one stands.
              </p>
              <p>
                Want to see the business tools? Try our {DEMO_APPS.length} working demos — from COD order confirmation to
                school fee reminders.
              </p>
            </div>
            <div className="flex flex-wrap gap-4">
              <Link to="/work" className="btn-primary !px-7 !py-4 text-sm">
                All {PROJECTS.length} projects <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
              <a
                href={BUSINESS.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary !px-7 !py-4 text-sm inline-flex items-center gap-2"
              >
                <Github className="w-4 h-4" aria-hidden="true" /> GitHub
              </a>
            </div>
          </motion.div>

          <div className="relative hidden md:flex items-center justify-center py-16 min-w-0" aria-hidden="true">
            <div className="absolute inset-0 bg-brand-accent/5 rounded-full blur-3xl opacity-60" />
            <div className="relative z-10 bg-white rounded-xl p-2 shadow-[0_50px_100px_-20px_rgba(26,127,230,0.3)] border border-slate-900/10 w-80 h-52 md:w-96 md:h-64">
              <div className="absolute inset-x-0 bottom-0 h-2 bg-slate-200 rounded-b-xl border-t border-slate-900/[0.07]" />
              <div className="w-full h-full bg-[#f8fafc] rounded-lg relative overflow-hidden flex items-center justify-center">
                <Code className="w-16 h-16 text-brand-accent" />
              </div>
              <div className="absolute -top-10 left-1/4 bg-brand-accent/20 backdrop-blur-md p-3 rounded-full border border-brand-accent/30">
                <Bot className="w-6 h-6 text-brand-accent" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {FEATURED_PROJECTS.map((project, index) => (
            <ProjectCard key={project.slug} project={project} index={index} onOpen={() => setSelectedSlug(project.slug)} />
          ))}
        </div>
        <div className="mt-12 text-center">
          <Link to="/work" className="inline-flex items-center gap-2 text-brand-accent font-semibold hover:gap-3 transition-all">
            See all {PROJECTS.length} projects <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </div>
      </div>

      <AnimatePresence>
        {selected && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-12" role="dialog" aria-modal="true" aria-labelledby="project-modal-title">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedSlug(null)}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-2xl"
            />
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 40, scale: 0.97 }}
              className="w-full max-w-4xl bg-white border border-slate-900/10 rounded-3xl shadow-2xl overflow-hidden relative z-10 flex flex-col md:flex-row max-h-[90vh]"
            >
              <div className="md:w-5/12 relative h-48 md:h-auto">
                <ProjectVisual project={selected} iconSize="w-20 h-20" />
              </div>
              <div className="md:w-7/12 p-8 md:p-10 overflow-y-auto space-y-6">
                <button
                  onClick={() => setSelectedSlug(null)}
                  aria-label="Close"
                  className="absolute top-5 right-5 p-2 rounded-full bg-white/80 hover:bg-slate-900/[0.06] transition-colors z-20"
                >
                  <X className="w-5 h-5 text-slate-600" />
                </button>
                <div className="flex items-center gap-3">
                  <StatusBadge status={selected.status} />
                  <span className="text-xs font-semibold text-brand-accent">{selected.category}</span>
                </div>
                <h3 id="project-modal-title" className="text-3xl font-display font-semibold text-slate-900">{selected.title}</h3>
                <p className="text-slate-600 text-lg leading-relaxed">{selected.description}</p>
                <div>
                  <p className="text-xs font-semibold text-slate-500 mb-2">Built with</p>
                  <div className="flex flex-wrap gap-2">
                    {selected.tags.map((tag) => (
                      <span key={tag} className="px-2.5 py-1 bg-slate-900/[0.04] border border-slate-900/10 rounded-md text-xs text-slate-600">{tag}</span>
                    ))}
                  </div>
                </div>
                <ProjectLinks project={selected} />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
