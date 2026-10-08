import { ArrowRight, ExternalLink, Lock, MonitorPlay } from 'lucide-react';
import { Link } from 'react-router-dom';
import { DEMOS } from '../data/demos';

export default function DemosSection() {
  return (
    <section id="demos" aria-labelledby="demos-heading" className="relative px-6 py-24 md:py-32 scroll-mt-24">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
          <div className="max-w-2xl">
            <div className="pill-badge mb-6"><MonitorPlay className="w-3 h-3" aria-hidden="true" /> Client demos</div>
            <h2 id="demos-heading" className="heading-lg mb-6">Explore our <span className="text-brand-accent">Demos.</span></h2>
            <p className="text-lg text-slate-500 leading-relaxed">See our websites in action. Choose a demo to explore its design, features and booking experience.</p>
          </div>
          <Link to="/demos" className="btn-secondary inline-flex items-center justify-center gap-3 shrink-0">Browse all demos <ArrowRight className="w-4 h-4" aria-hidden="true" /></Link>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {DEMOS.map(demo => (
            <article key={demo.id} className="glass-card !p-0 overflow-hidden flex flex-col">
              <div className={`relative h-48 bg-gradient-to-br ${demo.gradient} flex items-center justify-center`}>
                <MonitorPlay className="w-16 h-16 text-white/80" aria-hidden="true" />
                <span className="absolute top-4 left-4 bg-white/20 text-white border border-white/30 rounded-full px-3 py-1 text-xs font-semibold">{demo.category}</span>
                {demo.passcodeProtected && <span className="absolute bottom-4 right-4 inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs bg-slate-900/60 text-white"><Lock className="w-3 h-3" aria-hidden="true" /> Private preview</span>}
              </div>
              <div className="p-6 md:p-8 flex flex-col flex-1">
                <p className="text-xs text-brand-accent font-semibold mb-3">{demo.client}</p>
                <h3 className="text-2xl font-bold text-slate-900 mb-3">{demo.title}</h3>
                <p className="text-slate-500 leading-relaxed mb-8 flex-1">{demo.description}</p>
                <a href={demo.url} target="_blank" rel="noopener noreferrer" aria-label={`View ${demo.title} for ${demo.client} (opens in a new tab)`} className="btn-primary !px-6 !py-4 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-accent">View Demo <ExternalLink className="w-4 h-4" aria-hidden="true" /></a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
