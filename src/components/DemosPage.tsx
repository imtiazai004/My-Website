import { useEffect } from 'react';
import { motion } from 'motion/react';
import { MonitorPlay, ExternalLink, ArrowLeft, MessageCircle, ArrowRight, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import { DEMOS, DEMO_APPS, DEMO_INDUSTRIES } from '../data/demos';
import { BUSINESS, ORGANIZATION_JSONLD } from '../config/business';
import { usePageSeo } from '../lib/seo';

const CANONICAL = `${BUSINESS.websiteUrl}/demos`;

const JSON_LD = {
  '@context': 'https://schema.org',
  '@graph': [
    ORGANIZATION_JSONLD,
    {
      '@type': 'CollectionPage',
      '@id': `${CANONICAL}#page`,
      url: CANONICAL,
      name: `Live demos — ${BUSINESS.brandName}`,
      mainEntity: {
        '@type': 'ItemList',
        numberOfItems: DEMO_APPS.length + DEMOS.length,
        itemListElement: [
          ...DEMO_APPS.map((d, i) => ({
            '@type': 'ListItem',
            position: i + 1,
            url: `${BUSINESS.websiteUrl}/demos/${d.slug}`,
            name: d.name,
            description: d.description,
          })),
          ...DEMOS.map((d, i) => ({
            '@type': 'ListItem',
            position: DEMO_APPS.length + i + 1,
            url: d.url.startsWith('http') ? d.url : `${BUSINESS.websiteUrl}${d.url}`,
            name: `${d.client} — ${d.title}`,
            description: d.description,
          })),
        ],
      },
    },
  ],
};

export default function DemosPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  usePageSeo({
    title: `${DEMO_APPS.length} Live Business App Demos — Try Before You Buy | ${BUSINESS.brandName}`,
    description: `Try ${DEMO_APPS.length} working demos: COD confirmation, digital khata, WhatsApp ordering, salon booking, clinic tokens, TikTok Shop fulfilment and more.`,
    canonical: CANONICAL,
    jsonLd: JSON_LD,
  });

  return (
    <div className="min-h-screen bg-brand-bg text-brand-text">
      <Navbar />

      <section className="pt-40 pb-12 px-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-accent/5 rounded-full blur-[160px] pointer-events-none" />
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-6 max-w-3xl mx-auto">
            <div className="pill-badge mx-auto">
              <MonitorPlay className="w-3 h-3" aria-hidden="true" />
              Live demos
            </div>
            <h1 className="heading-lg">
              Try it before <br /> you pay for it
            </h1>
            <p className="text-slate-600 text-xl leading-relaxed">
              {DEMO_APPS.length} working business apps and {DEMOS.filter((d) => !d.hidden).length} clinic websites. Each demo solves one everyday
              problem — open it, click around, and if it fits, we set it up for your business.
            </p>
          </div>
        </div>
      </section>

      {/* Industry jump links */}
      <nav aria-label="Demo industries" className="px-6 pb-10">
        <ul className="max-w-7xl mx-auto flex flex-wrap justify-center gap-2">
          {DEMO_INDUSTRIES.map((ind) => (
            <li key={ind}>
              <a href={`#${slugifyIndustry(ind)}`} className="inline-block rounded-full border border-slate-900/10 bg-white px-4 py-2 text-sm text-slate-700 hover:border-brand-accent hover:text-brand-accent transition-colors">
                {ind}
              </a>
            </li>
          ))}
          <li>
            <a href="#websites" className="inline-block rounded-full border border-slate-900/10 bg-white px-4 py-2 text-sm text-slate-700 hover:border-brand-accent hover:text-brand-accent transition-colors">
              Websites
            </a>
          </li>
        </ul>
      </nav>

      {DEMO_INDUSTRIES.map((industry) => (
        <section key={industry} id={slugifyIndustry(industry)} aria-labelledby={`${slugifyIndustry(industry)}-h`} className="px-6 pb-16 scroll-mt-28">
          <div className="max-w-7xl mx-auto">
            <h2 id={`${slugifyIndustry(industry)}-h`} className="text-2xl md:text-3xl font-display font-bold text-slate-900 mb-6">{industry}</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {DEMO_APPS.filter((d) => d.industry === industry).map((d) => (
                <article key={d.slug} className="glass-card !p-0 overflow-hidden flex flex-col">
                  <a href={`/demos/${d.slug}`} target="_blank" rel="noopener" className="block aspect-[16/10] bg-slate-100 overflow-hidden border-b border-slate-900/[0.07]" aria-label={`Open the ${d.name} demo`}>
                    <img
                      src={`/demos/thumbs/${d.slug}.webp`}
                      alt={`${d.name} demo screenshot`}
                      width={640}
                      height={400}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover object-top hover:scale-[1.03] transition-transform duration-500"
                    />
                  </a>
                  <div className="p-6 flex flex-col flex-1 gap-3">
                    <h3 className="text-xl font-bold text-slate-900">{d.name}</h3>
                    <p className="text-sm font-medium text-slate-800">{d.problem}</p>
                    <p className="text-sm text-slate-600 leading-relaxed flex-1">{d.description}</p>
                    <div className="flex flex-wrap items-center gap-4 pt-3 border-t border-slate-900/[0.07]">
                      <a href={`/demos/${d.slug}`} target="_blank" rel="noopener" className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-accent hover:gap-2.5 transition-all">
                        Open demo <ExternalLink className="w-4 h-4" aria-hidden="true" />
                      </a>
                      {d.post && (
                        <Link to={`/blog/${d.post}`} className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-900">
                          <BookOpen className="w-4 h-4" aria-hidden="true" /> Read why
                        </Link>
                      )}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      ))}

      <section id="websites" aria-labelledby="websites-h" className="px-6 pb-20 scroll-mt-28">
        <div className="max-w-7xl mx-auto">
          <h2 id="websites-h" className="text-2xl md:text-3xl font-display font-bold text-slate-900 mb-6">Websites</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {DEMOS.filter((demo) => !demo.hidden).map((demo) => (
              <a
                key={demo.id}
                href={demo.url}
                target="_blank"
                rel="noopener noreferrer"
                className="glass-card group !p-0 overflow-hidden flex flex-col"
              >
                {demo.image ? (
                  <div className="relative h-44 overflow-hidden">
                    <img
                      src={demo.image}
                      alt={`${demo.client} — website preview`}
                      loading="lazy"
                      decoding="async"
                      style={demo.imagePosition ? { objectPosition: demo.imagePosition } : undefined}
                      className="absolute inset-0 h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.04]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#2b1c1d]/60 via-transparent to-[#2b1c1d]/10" />
                    {demo.brandName && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="flex items-center gap-3 rounded-2xl bg-white/95 px-5 py-3 shadow-2xl ring-1 ring-black/5 backdrop-blur">
                          {demo.brandMark === 'braided-bun' ? (
                            <svg viewBox="62 26 100 214" className="h-12 w-auto" aria-hidden="true"><path d="M92 238 C91 222 90 206 86 192 C80 176 72 160 70 140 C68 116 74 94 90 78 C104 66 124 64 136 74 C143 80 145 88 144 97 C144 103 146 107 147 111 C149 117 153 124 158 131 C160 134 158 137 153 138 C151 139 150 141 150 143 C152 145 152 147 149 149 C151 151 151 153 148 155 C147 159 148 163 148 166 C148 171 143 175 135 176 C129 177 126 183 125 193 C124 206 125 218 128 228 Z" fill="#B8874A"/><path d="M140 86 C138 78 132 72 124 69 C110 64 98 68 88 78 C74 94 68 116 70 140 C71 154 76 166 84 178 C92 172 98 164 102 156 C106 148 110 142 114 137 C120 131 124 123 127 115 C130 105 134 97 140 86 Z" fill="#2E1626"/><path d="M70 60 C66 44 76 32 92 31 C106 30 116 40 115 53 C114 64 106 72 94 73 C82 74 73 70 70 60 Z" fill="#2E1626"/><g fill="none" stroke="#F6EDE2" strokeWidth="2.6" strokeLinecap="round"><path d="M131 80 C120 70 108 66 98 68"/><path d="M134 92 C122 80 106 74 92 76"/><path d="M128 106 C116 92 98 84 84 86"/><path d="M122 122 C110 108 92 98 78 100"/><path d="M111 140 C100 126 86 116 74 118"/><path d="M98 162 C90 148 80 138 72 136"/><path d="M93 53 C96 50 101 52 100 56 C99 61 91 62 87 58 C82 53 85 44 93 42 C102 40 109 47 108 55 C107 64 98 69 89 67"/></g><rect x="88" y="69" width="13" height="8" rx="2" transform="rotate(-20 94 73)" fill="#B8874A"/></svg>
                          ) : demo.brandMark === 'tooth' ? (
                            <svg viewBox="0 0 24 24" fill="currentColor" className="h-10 w-10" style={{ color: demo.brandAccent ?? '#5E3A5C' }} aria-hidden="true">
                              <path d="M8.2 5c-2 0-3.3 1.6-3.3 3.8 0 1.8.8 3 1.3 4.1.7 1.3.8 2.6 1.1 4.1.2 1.2.7 2 1.5 2 .9 0 1.1-1.1 1.4-2.5.3-1.3.7-2.4 1.8-2.4s1.5 1.1 1.8 2.4c.3 1.4.5 2.5 1.4 2.5.8 0 1.2-.8 1.5-2 .3-1.5.4-2.8 1.1-4.1.5-1.1 1.3-2.3 1.3-4.1 0-2.2-1.3-3.8-3.3-3.8-1.5 0-2.2.8-3.7.8S9.7 5 8.2 5z" />
                            </svg>
                          ) : (
                            <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinejoin="round" className="h-10 w-10 text-[#8a3f46]" aria-hidden="true">
                              <path d="M20 30c-3-4-4-9 0-17 4 8 3 13 0 17Z" />
                              <path d="M20 30c-5-2-9-6-9-13 6 1 9 6 9 13Z" />
                              <path d="M20 30c5-2 9-6 9-13-6 1-9 6-9 13Z" />
                              <path d="M20 30c-6 0-11-3-13-8 5-1 10 2 13 8Zm0 0c6 0 11-3 13-8-5-1-10 2-13 8Z" />
                            </svg>
                          )}
                          <span className="grid leading-none">
                            <span className="font-display text-[30px] font-semibold text-[#2b1c1d]">{demo.brandName}</span>
                            {demo.brandSub && (
                              <span className="mt-1 text-[9px] font-semibold uppercase tracking-[0.32em] text-[#7d6865]">{demo.brandSub}</span>
                            )}
                          </span>
                        </div>
                      </div>
                    )}
                    <span className="absolute left-4 top-4 rounded-full border border-white/40 bg-black/30 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm">
                      {demo.category}
                    </span>
                  </div>
                ) : (
                  <div className={`relative h-44 bg-gradient-to-br ${demo.gradient} flex items-center justify-center`}>
                    <MonitorPlay className="w-14 h-14 text-white/80 group-hover:scale-110 transition-transform duration-500" aria-hidden="true" />
                    <span className="absolute top-4 left-4 px-3 py-1 bg-white/20 border border-white/30 rounded-full text-xs font-semibold text-white">
                      {demo.category}
                    </span>
                  </div>
                )}
                <div className="p-7 flex flex-col flex-1">
                  <p className="text-xs font-semibold text-brand-accent mb-2">{demo.client}</p>
                  <h3 className="text-2xl font-bold text-slate-900 mb-3">{demo.title}</h3>
                  <p className="text-slate-600 leading-relaxed flex-1">{demo.description}</p>
                  <span className="mt-6 inline-flex items-center gap-2 text-brand-accent font-semibold text-sm">
                    View live demo <ExternalLink className="w-4 h-4" aria-hidden="true" />
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 pb-24">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass-card text-center !p-12"
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold tracking-tight text-slate-900 mb-4">Want one of these for your business?</h2>
            <p className="text-slate-600 text-lg mb-8 max-w-xl mx-auto">
              Tell us which demo is closest and what your business does. We will reply within 24 hours with a free,
              no-obligation preview plan and a fixed price.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href={`${BUSINESS.whatsapp.uk.href}?text=${encodeURIComponent('Hi! I saw your demos and would like one for my business.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                <MessageCircle className="w-5 h-5" aria-hidden="true" /> Chat on WhatsApp
              </a>
              <Link to="/work" className="btn-secondary inline-flex items-center gap-2">
                See our products <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="px-6 pb-16 text-center">
        <Link to="/" className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-900 text-sm transition-colors">
          <ArrowLeft className="w-4 h-4" aria-hidden="true" /> Back to main site
        </Link>
      </div>

      <Footer />
    </div>
  );
}

function slugifyIndustry(s: string) {
  return s.toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}
