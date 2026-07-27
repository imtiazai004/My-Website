import { useEffect } from 'react';
import { motion } from 'motion/react';
import ShaderBackground from './ui/shader-background';
import Navbar from './Navbar';
import Footer from './Footer';
import {
  Download, Sparkles, Crop, Captions, Film, Wand2, Search, Gauge,
  Eye, Scissors, ArrowRight, CheckCircle, Monitor, Zap,
} from 'lucide-react';
import { BUSINESS } from '../config/business';

const DOWNLOAD_URL = 'https://github.com/imtiazai004/Soft-Clipper/releases/latest/download/Soft-Clipper.zip';
const PAGE_URL = 'https://aisofttechsolution.com/soft-clipper';
const OG_IMAGE = 'https://cdn.jsdelivr.net/gh/imtiazai004/Soft-Clipper@main/website/soft-clipper.svg';

const FEATURES = [
  { icon: Sparkles, title: 'AI viral moment detection', desc: 'Analyzes the transcript (or the video itself) and ranks the most viral-worthy moments with a 0–100 virality score.' },
  { icon: Crop, title: 'Smart reframing', desc: 'Face-tracking keeps the speaker centered in 9:16 — even across camera cuts — plus fit-on-blur, split-screen, and center-crop modes.' },
  { icon: Captions, title: 'Auto captions', desc: 'Burns TikTok-style captions right onto the clip in the original language — English, Urdu, Pashto, Hindi and more.' },
  { icon: Film, title: 'Teasers & highlight reels', desc: 'Stitches the best moments from across a video into a single teaser or theme-based highlight reel.' },
  { icon: Search, title: 'Prompt-based search', desc: 'Tell it what you want — "funny moments", "every goal" — and the AI finds only those clips.' },
  { icon: Eye, title: 'Works on non-talking videos', desc: 'Music, sports and gameplay too — visual + audio analysis finds the highlights when there is little or no dialogue.' },
  { icon: Wand2, title: 'Fix any clip', desc: 'Not happy with a cut? Adjust it with a simple prompt or tweak it manually, then re-render — no external editor needed.' },
  { icon: Gauge, title: 'Captions & hashtags', desc: 'Generates a ready-to-post caption and relevant hashtags for every single clip.' },
];

const STEPS = [
  { n: 1, title: 'Add a video', desc: 'Paste a YouTube, TikTok or Facebook link and download it, or use a file you already have.' },
  { n: 2, title: 'Let AI find the moments', desc: 'Auto-detect viral clips with a virality score, or build a teaser / highlight reel.' },
  { n: 3, title: 'Reframe & caption', desc: 'Clips are reframed to 9:16 with the speaker in frame and captions burned in — automatically.' },
  { n: 4, title: 'Preview, fix & download', desc: 'Preview each clip, fix any you don\'t like with a prompt, then download — ready to post.' },
];

const FAQS = [
  { q: 'Is Soft Clipper free?', a: 'Yes. The app is completely free. AI features use Google Gemini — you add your own free Gemini API key the first time you open it.' },
  { q: 'Do I need to install anything?', a: 'No. Everything is bundled, including ffmpeg. Just download, unzip and run on Windows 10 or 11.' },
  { q: 'Which platforms are the clips for?', a: 'TikTok, Instagram Reels, YouTube Shorts and Facebook — vertical 9:16 by default, plus 1:1 and 16:9.' },
  { q: 'Does it work on other languages?', a: 'Yes. When a video has no captions, the audio is transcribed by AI, which supports Urdu, Pashto, Hindi, English and many more.' },
];

function useSoftClipperSEO() {
  useEffect(() => {
    window.scrollTo(0, 0);
    const prevTitle = document.title;
    document.title = 'Soft Clipper — Free AI Video Clipper for TikTok, Reels & Shorts | AI Soft Tech Solution';

    const description = 'Soft Clipper is a free Windows app that turns long videos into viral vertical clips for TikTok, Instagram Reels and YouTube Shorts. AI finds the best moments, reframes to 9:16, and adds captions automatically.';

    const meta = (selector: string, attr: string, key: string, value: string) => {
      let el = document.head.querySelector<HTMLMetaElement>(selector);
      if (!el) { el = document.createElement('meta'); el.setAttribute(attr, key); document.head.appendChild(el); }
      el.setAttribute('content', value);
      return el;
    };
    meta('meta[name="description"]', 'name', 'description', description);
    meta('meta[property="og:title"]', 'property', 'og:title', 'Soft Clipper — Free AI Video Clipper for TikTok, Reels & Shorts');
    meta('meta[property="og:description"]', 'property', 'og:description', description);
    meta('meta[property="og:url"]', 'property', 'og:url', PAGE_URL);
    meta('meta[property="og:type"]', 'property', 'og:type', 'website');
    meta('meta[property="og:image"]', 'property', 'og:image', OG_IMAGE);
    meta('meta[name="twitter:title"]', 'name', 'twitter:title', 'Soft Clipper — Free AI Video Clipper');
    meta('meta[name="twitter:description"]', 'name', 'twitter:description', description);

    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    const prevCanonical = canonical?.getAttribute('href') || '';
    if (!canonical) { canonical = document.createElement('link'); canonical.setAttribute('rel', 'canonical'); document.head.appendChild(canonical); }
    canonical.setAttribute('href', PAGE_URL);

    const ld = document.createElement('script');
    ld.type = 'application/ld+json';
    ld.setAttribute('data-soft-clipper', 'true');
    ld.textContent = JSON.stringify([
      {
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: 'Soft Clipper',
        applicationCategory: 'MultimediaApplication',
        operatingSystem: 'Windows 10, Windows 11',
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
        description,
        url: PAGE_URL,
        downloadUrl: DOWNLOAD_URL,
        softwareVersion: '1.0.1',
        author: {
          '@type': 'Organization',
          name: BUSINESS.brandName,
          legalName: BUSINESS.legalCompanyName,
          url: BUSINESS.websiteUrl,
        },
      },
      {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: FAQS.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
      },
    ]);
    document.head.appendChild(ld);

    return () => {
      document.title = prevTitle;
      if (canonical && prevCanonical) canonical.setAttribute('href', prevCanonical);
      ld.remove();
    };
  }, []);
}

export default function SoftClipperPage() {
  useSoftClipperSEO();

  return (
    <div className="min-h-screen selection:bg-brand-accent selection:text-white scroll-smooth relative overflow-x-hidden">
      <ShaderBackground />
      <div className="grain-bg" />
      <div className="grid-texture" />
      <div className="soft-vignette" />
      <div className="fixed top-0 left-1/4 w-[1200px] h-[1200px] bg-brand-accent/5 rounded-full blur-[180px] -translate-y-1/2 -translate-x-1/2 pointer-events-none" aria-hidden="true" />
      <div className="fixed bottom-0 right-0 w-[900px] h-[900px] bg-blue-500/4 rounded-full blur-[160px] translate-y-1/2 translate-x-1/2 pointer-events-none" aria-hidden="true" />

      <Navbar />

      {/* ── Hero ── */}
      <section className="relative z-20 pt-40 pb-24 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <a href="/" className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-slate-500 hover:text-brand-accent transition-colors mb-10">
              ← Back to Home
            </a>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-accent/10 border border-brand-accent/20 rounded-full text-brand-accent text-[10px] font-bold uppercase tracking-widest mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-accent animate-pulse" />
              Free Windows App · TikTok · Reels · Shorts
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-slate-900 mb-6 leading-tight" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Turn long videos into <span className="text-brand-accent italic">viral clips</span>
            </h1>
            <p className="text-slate-600 text-lg md:text-xl font-light max-w-2xl mx-auto mb-10 leading-relaxed">
              Soft Clipper finds the best moments in any long video with AI, reframes them to 9:16 while keeping the speaker in frame, burns in captions, and exports ready-to-post clips for TikTok, Reels and YouTube Shorts.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a href={DOWNLOAD_URL} className="inline-flex items-center gap-2 px-8 py-4 bg-brand-accent text-white rounded-full text-sm font-bold hover:bg-blue-400 transition-all shadow-lg shadow-brand-accent/30">
                <Download className="w-4 h-4" /> Download for Windows
              </a>
              <a href="#features" className="inline-flex items-center gap-2 px-8 py-4 bg-slate-900/[0.05] border border-slate-900/10 text-slate-700 rounded-full text-sm font-bold hover:bg-slate-900/[0.08] transition-all">
                See what it does <ArrowRight className="w-4 h-4" />
              </a>
            </div>
            <p className="text-slate-400 text-xs mt-6 flex items-center justify-center gap-2">
              <Monitor className="w-3.5 h-3.5" /> Windows 10/11 · No installation — just unzip and run · 100% free
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Features ── */}
      <section id="features" className="relative z-20 py-24 px-6 bg-white/60 backdrop-blur-sm border-y border-slate-900/[0.06]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-brand-accent font-bold tracking-widest text-xs uppercase">Everything you need</span>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mt-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
              One app, from clip to caption
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {FEATURES.map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: (i % 4) * 0.05 }}
                className="p-6 bg-white rounded-2xl border border-slate-900/[0.07] shadow-sm hover:shadow-md hover:-translate-y-1 transition-all"
              >
                <div className="w-11 h-11 rounded-xl bg-brand-accent/10 border border-brand-accent/20 flex items-center justify-center mb-4">
                  <f.icon className="w-5 h-5 text-brand-accent" />
                </div>
                <h3 className="font-bold text-slate-900 mb-1.5">{f.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How it works ── */}
      <section className="relative z-20 py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-brand-accent font-bold tracking-widest text-xs uppercase">How it works</span>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mt-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
              From a long video to posted clips
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {STEPS.map((s) => (
              <motion.div
                key={s.n}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
                className="flex gap-5 p-6 bg-white/70 rounded-2xl border border-slate-900/[0.06]"
              >
                <div className="w-10 h-10 shrink-0 rounded-xl bg-brand-accent text-white font-bold flex items-center justify-center">{s.n}</div>
                <div>
                  <h3 className="font-bold text-slate-900 mb-1">{s.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{s.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="relative z-20 py-24 px-6 bg-white/60 backdrop-blur-sm border-y border-slate-900/[0.06]">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-brand-accent font-bold tracking-widest text-xs uppercase">FAQ</span>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mt-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Good to know
            </h2>
          </div>
          <div className="space-y-4">
            {FAQS.map((f, i) => (
              <details key={i} className="group p-6 bg-white rounded-2xl border border-slate-900/[0.07]">
                <summary className="font-bold text-slate-900 cursor-pointer flex items-center gap-3">
                  <CheckCircle className="w-4 h-4 text-brand-accent shrink-0" /> {f.q}
                </summary>
                <p className="text-slate-500 text-sm leading-relaxed mt-3 pl-7">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="relative z-20 py-28 px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <Scissors className="w-10 h-10 text-brand-accent mx-auto mb-6" />
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-5" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Start clipping in minutes
          </h2>
          <p className="text-slate-600 text-lg font-light mb-10">
            Download Soft Clipper, add your free Gemini key, and turn your first long video into viral clips today.
          </p>
          <a href={DOWNLOAD_URL} className="inline-flex items-center gap-2 px-10 py-4 bg-brand-accent text-white rounded-full text-base font-bold hover:bg-blue-400 transition-all shadow-lg shadow-brand-accent/30">
            <Download className="w-5 h-5" /> Download for Windows — Free
          </a>
          <p className="text-slate-400 text-xs mt-5 flex items-center justify-center gap-2">
            <Zap className="w-3.5 h-3.5" /> ffmpeg included · runs on your PC · your videos stay private
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
