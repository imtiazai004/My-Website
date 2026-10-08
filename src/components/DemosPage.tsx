import { useEffect } from 'react';
import { motion } from 'motion/react';
import { MonitorPlay, ExternalLink, Lock, ArrowLeft, Sparkles, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import { DEMOS } from '../data/demos';

export default function DemosPage() {
  useEffect(() => {
    document.title = 'Client Demos | AI Soft Tech Solution';
    window.scrollTo(0, 0);
    return () => {
      document.title = 'AI Soft Tech Solution';
    };
  }, []);

  return (
    <div className="min-h-screen bg-brand-bg text-brand-text">
      <Navbar />

      {/* Hero */}
      <section className="pt-40 pb-16 px-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-accent/5 rounded-full blur-[160px] pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-indigo-500/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center space-y-6 max-w-3xl mx-auto"
          >
            <div className="pill-badge mx-auto">
              <MonitorPlay className="w-3 h-3" />
              Client Demos
            </div>
            <h1 className="heading-lg">
              Live Website <br /> Demos
            </h1>
            <p className="text-slate-500 text-xl font-light">
              Real previews built for real clients. Open one and look around —
              every demo is fully interactive.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Demo grid */}
      <section className="px-6 pb-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {DEMOS.map((demo, i) => (
              <motion.a
                key={demo.id}
                href={demo.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                className="glass-card group !p-0 overflow-hidden flex flex-col"
              >
                {/* Thumbnail */}
                <div className={`relative h-56 bg-gradient-to-br ${demo.gradient} overflow-hidden`}>
                  <div
                    className="absolute inset-0 opacity-20"
                    style={{
                      backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.6) 1px, transparent 1px)',
                      backgroundSize: '28px 28px',
                    }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <MonitorPlay className="w-16 h-16 text-white/80 group-hover:scale-110 transition-transform duration-500" />
                  </div>
                  <div className="absolute top-4 left-4 flex gap-2">
                    <span className="px-3 py-1 bg-white/20 backdrop-blur-md border border-white/30 rounded-full text-[10px] font-bold text-white uppercase tracking-[0.2em]">
                      {demo.category}
                    </span>
                    {demo.featured && (
                      <span className="px-3 py-1 bg-white/90 rounded-full text-[10px] font-bold text-slate-900 uppercase tracking-[0.2em] flex items-center gap-1">
                        <Sparkles className="w-3 h-3" /> Featured
                      </span>
                    )}
                  </div>
                  {demo.passcodeProtected && (
                    <div className="absolute top-4 right-4">
                      <span className="px-3 py-1 bg-slate-900/60 backdrop-blur-md border border-white/20 rounded-full text-[10px] font-bold text-white uppercase tracking-[0.2em] flex items-center gap-1">
                        <Lock className="w-3 h-3" /> Private preview
                      </span>
                    </div>
                  )}
                  <div className="absolute bottom-4 right-4 w-10 h-10 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <ExternalLink className="w-4 h-4 text-white" />
                  </div>
                </div>

                {/* Body */}
                <div className="p-8 flex flex-col flex-1">
                  <p className="text-[11px] font-bold text-brand-accent uppercase tracking-[0.25em] mb-2">
                    {demo.client}
                  </p>
                  <h2 className="text-2xl font-bold text-slate-900 mb-3">{demo.title}</h2>
                  <p className="text-slate-500 font-light leading-relaxed flex-1">{demo.description}</p>

                  <div className="flex items-center justify-between pt-6 mt-6 border-t border-slate-900/[0.07]">
                    <span className="text-xs text-slate-400">Added {demo.dateAdded}</span>
                    <span className="inline-flex items-center gap-2 text-brand-accent font-bold text-sm group-hover:gap-3 transition-all">
                      View live demo <ExternalLink className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              </motion.a>
            ))}
          </div>

          {/* Empty-state hint for future demos */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-center text-slate-400 text-sm mt-12 font-light"
          >
            More client demos are added here as they are built.
          </motion.p>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 pb-24">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="glass-card text-center !p-12"
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold tracking-tight text-slate-900 mb-4">Want a demo like this for your business?</h2>
            <p className="text-slate-500 font-light text-lg mb-8 max-w-xl mx-auto">
              Tell us about your business and we will build you a free, no-obligation
              preview — customised for you, just like these.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="https://wa.me/447462086661?text=Hi!%20I%20saw%20your%20client%20demos%20and%20I%27d%20like%20a%20free%20demo%20for%20my%20business."
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                <MessageCircle className="w-5 h-5" /> Chat on WhatsApp
              </a>
              <Link to="/#contact" className="btn-secondary">
                Contact us
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="px-6 pb-16 text-center">
        <Link to="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-slate-900 text-sm transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to main site
        </Link>
      </div>

      <Footer />
    </div>
  );
}
