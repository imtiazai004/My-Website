import { useEffect } from 'react';
import ShaderBackground from './ui/shader-background';
import Navbar from './Navbar';

export default function PrivacyPolicy() {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Privacy Policy — ProfitScout | AI Soft Tech Solution';
  }, []);

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

          {/* Header */}
          <div className="mb-12">
            <a
              href="/"
              className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-slate-500 hover:text-brand-accent transition-colors mb-8"
            >
              ← Back to Home
            </a>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-accent/10 border border-brand-accent/20 rounded-full text-brand-accent text-[10px] font-bold uppercase tracking-widest mb-4 ml-0 block w-fit">
              Legal
            </div>
            <h1 className="text-4xl font-bold text-slate-900 mb-3" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
              Privacy Policy
            </h1>
            <p className="text-slate-500 text-sm">ProfitScout Chrome Extension · Last updated: June 14, 2026</p>
          </div>

          {/* Intro */}
          <div className="bg-slate-900/[0.03] border border-slate-900/10 rounded-2xl p-6 mb-6">
            <p className="text-slate-600 text-sm leading-relaxed">
              ProfitScout is a free Chrome extension for e-commerce product research, built by{' '}
              <span className="text-brand-accent font-semibold">Imtiaz Ahmad</span> at AI Soft Tech Solution.
              This policy explains what data the extension handles and how it is used.
            </p>
          </div>

          {/* Sections */}
          <div className="space-y-4">

            <div className="bg-slate-900/[0.03] border border-slate-900/10 rounded-2xl p-6">
              <h2 className="text-slate-900 font-bold text-base mb-3" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                1. Data We Collect
              </h2>
              <p className="text-slate-600 text-sm leading-relaxed">
                ProfitScout does not collect any personal information. The extension reads publicly visible
                product data (title, price, reviews, BSR, images) from supported e-commerce websites solely
                to perform local analysis.
              </p>
            </div>

            <div className="bg-slate-900/[0.03] border border-slate-900/10 rounded-2xl p-6">
              <h2 className="text-slate-900 font-bold text-base mb-3" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                2. Data Storage
              </h2>
              <p className="text-slate-600 text-sm leading-relaxed mb-4">
                All data is stored locally in your browser using Chrome's built-in storage API.
                None of this data is transmitted to any external server controlled by the developer.
              </p>
              <ul className="space-y-2">
                {[
                  'Your settings (cost %, FBA fee, auto-inject preference)',
                  'Your saved leads (up to 100 products)',
                  'Your product tracking history (up to 2,000 products)',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-slate-600 text-sm">
                    <span className="text-brand-accent mt-0.5 shrink-0">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-slate-900/[0.03] border border-slate-900/10 rounded-2xl p-6">
              <h2 className="text-slate-900 font-bold text-base mb-3" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                3. Gemini API Key
              </h2>
              <p className="text-slate-600 text-sm leading-relaxed">
                If you choose to enable AI features, you provide your own Google Gemini API key. This key
                is stored only in your browser's local storage and is sent directly to Google's Generative
                Language API (<span className="text-slate-700">generativelanguage.googleapis.com</span>).
                It is never sent to the developer or any third party.
              </p>
            </div>

            <div className="bg-slate-900/[0.03] border border-slate-900/10 rounded-2xl p-6">
              <h2 className="text-slate-900 font-bold text-base mb-3" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                4. Firebase Sync
              </h2>
              <p className="text-slate-600 text-sm leading-relaxed">
                ProfitScout sends anonymous product metadata (price, BSR, sourcing score) to a Firebase
                Realtime Database owned by the developer. This is used to build aggregated market
                intelligence. No personal information, browsing history, or API keys are included in
                this sync.
              </p>
            </div>

            <div className="bg-slate-900/[0.03] border border-slate-900/10 rounded-2xl p-6">
              <h2 className="text-slate-900 font-bold text-base mb-3" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                5. Third-Party Services
              </h2>
              <ul className="space-y-2">
                {[
                  'Google Generative Language API (only when Gemini key is provided by user)',
                  'Google Firebase Realtime Database (anonymous product metadata only)',
                  'Amazon Autocomplete API (for keyword suggestions)',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-slate-600 text-sm">
                    <span className="text-brand-accent mt-0.5 shrink-0">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-slate-900/[0.03] border border-slate-900/10 rounded-2xl p-6">
              <h2 className="text-slate-900 font-bold text-base mb-3" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                6. Data Sharing
              </h2>
              <p className="text-slate-600 text-sm leading-relaxed">
                We do not sell, trade, or share any user data with third parties.
              </p>
            </div>

            <div className="bg-brand-accent/5 border border-brand-accent/20 rounded-2xl p-6">
              <h2 className="text-slate-900 font-bold text-base mb-4" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                7. Contact
              </h2>
              <div className="space-y-2 text-sm">
                <p className="text-slate-700 font-semibold">Imtiaz Ahmad</p>
                <p className="text-slate-500">AI Soft Tech Solution</p>
                <a
                  href="mailto:imtiazahmad@aisofttechsolution.com"
                  className="block text-brand-accent hover:text-indigo-300 transition-colors"
                >
                  imtiazahmad@aisofttechsolution.com
                </a>
                <a
                  href="https://aisofttechsolution.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-brand-accent hover:text-indigo-300 transition-colors"
                >
                  aisofttechsolution.com
                </a>
                <a
                  href="https://wa.me/923005863032"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-slate-500 hover:text-slate-900 transition-colors"
                >
                  WhatsApp: +92 300 586 3032
                </a>
              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}
