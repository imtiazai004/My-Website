import { ArrowRight, ExternalLink, MonitorPlay } from 'lucide-react';
import { Link } from 'react-router-dom';
import { DEMO_APPS } from '../data/demos';

/** Six demos that cover the most common requests; the rest live on /demos. */
const HOME_DEMOS = ['codconfirm', 'khatabook', 'bizbot', 'salonbook', 'tikfulfill', 'feechaser'];

export default function DemosSection() {
  const demos = HOME_DEMOS.map((s) => DEMO_APPS.find((d) => d.slug === s)).filter(Boolean) as typeof DEMO_APPS;

  return (
    <section id="demos" aria-labelledby="demos-heading" className="relative px-6 py-24 md:py-32 scroll-mt-24">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
          <div className="max-w-2xl">
            <div className="pill-badge mb-6"><MonitorPlay className="w-3 h-3" aria-hidden="true" /> Live demos</div>
            <h2 id="demos-heading" className="heading-lg mb-6">Try it <span className="text-brand-accent">before you pay.</span></h2>
            <p className="text-lg text-slate-600 leading-relaxed">
              {DEMO_APPS.length} working demos, each solving one everyday business problem. Open one, click around, and if it fits we set it up for you.
            </p>
          </div>
          <Link to="/demos" className="btn-secondary inline-flex items-center justify-center gap-3 shrink-0">All {DEMO_APPS.length} demos <ArrowRight className="w-4 h-4" aria-hidden="true" /></Link>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {demos.map((d) => (
            <article key={d.slug} className="glass-card !p-0 overflow-hidden flex flex-col">
              <a href={`/demos/${d.slug}`} target="_blank" rel="noopener" className="block aspect-[16/10] bg-slate-100 overflow-hidden border-b border-slate-900/[0.07]" aria-label={`Open the ${d.name} demo`}>
                <img
                  src={`/demos/thumbs/${d.slug}.webp`}
                  alt={`${d.name} demo screenshot`}
                  width={640}
                  height={400}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover object-top"
                />
              </a>
              <div className="p-6 flex flex-col flex-1 gap-2">
                <h3 className="text-xl font-bold text-slate-900">{d.name}</h3>
                <p className="text-sm text-slate-600 leading-relaxed flex-1">{d.description}</p>
                <a href={`/demos/${d.slug}`} target="_blank" rel="noopener" className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-accent">
                  Open demo <ExternalLink className="w-4 h-4" aria-hidden="true" />
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
