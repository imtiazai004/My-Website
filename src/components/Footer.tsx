import { Twitter, Linkedin, Github, Send, CheckCircle2, Mail, MessageCircle } from 'lucide-react';
import { motion } from 'motion/react';
import { trackActivity, sendContactMessage } from '../services/dataService';
import { Logo } from './Logo';
import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { BUSINESS } from '../config/business';

const CARD = 'bg-white/[0.04] border border-white/10 backdrop-blur-xl rounded-2xl';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  // Spam guard: a hidden field bots fill in, and a minimum time on the page before sending.
  const [website, setWebsite] = useState('');
  const mountedAt = useRef(Date.now());

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !message) return;
    if (website || Date.now() - mountedAt.current < 3000) {
      setStatus('sent'); // quietly drop bot submissions
      return;
    }

    setStatus('sending');
    try {
      await sendContactMessage(email, message);
      trackActivity('CONTACT_FORM_SUBMIT', { email });
      setStatus('sent');
      setEmail('');
      setMessage('');
      setTimeout(() => setStatus('idle'), 5000);
    } catch (error) {
      setStatus('error');
    }
  };

  return (
    <footer className="pt-40 pb-16 px-6 relative overflow-hidden bg-[#0f172a] text-slate-300">
      {/* Background Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-brand-accent/15 rounded-full blur-[140px]" />

      <div className="max-w-7xl mx-auto space-y-32 relative z-10">
        <div id="contact" className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center [&>*]:min-w-0">
          <div className="space-y-12">
            <div className="space-y-8">
              <div className="pill-badge !bg-white/5 !border-white/15">
                <Send className="w-3 h-3" />
                Contact
              </div>
              <h2 className="heading-lg text-white">
                Tell us what <br />
                <span className="text-brand-accent italic font-light tracking-tighter">slows you down.</span>
              </h2>
              <p className="text-slate-400 text-xl leading-relaxed font-light max-w-lg">
                Two lines about your business and the problem is enough. We reply within 24 hours with the demo that fits, or a plan and a fixed price.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <motion.a
                whileHover={{ y: -5 }}
                href={`mailto:${BUSINESS.supportEmail}`}
                className={`flex items-center gap-5 p-6 min-w-0 sm:col-span-2 ${CARD} hover:bg-white/[0.08] transition-all group`}
              >
                <div className="w-12 h-12 rounded-xl bg-brand-accent/15 flex items-center justify-center text-brand-accent group-hover:bg-brand-accent group-hover:text-white transition-all">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Email</p>
                  <p className="text-sm font-medium tracking-tight text-white [overflow-wrap:anywhere]">{BUSINESS.supportEmail}</p>
                </div>
              </motion.a>

              <motion.a
                whileHover={{ y: -5 }}
                href={BUSINESS.whatsapp.uk.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center gap-5 p-6 ${CARD} hover:bg-green-500/10 transition-all group`}
              >
                <div className="w-12 h-12 rounded-xl bg-green-500/15 flex items-center justify-center text-green-400 group-hover:bg-green-500 group-hover:text-white transition-all">
                  <MessageCircle className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">WhatsApp (UK)</p>
                  <p className="text-sm font-medium tracking-tight text-white">+44 7462 086661</p>
                </div>
              </motion.a>
              <motion.a
                whileHover={{ y: -5 }}
                href={BUSINESS.whatsapp.pk.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center gap-5 p-6 ${CARD} hover:bg-green-500/10 transition-all group`}
              >
                <div className="w-12 h-12 rounded-xl bg-green-500/15 flex items-center justify-center text-green-400 group-hover:bg-green-500 group-hover:text-white transition-all">
                  <MessageCircle className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">WhatsApp (PK)</p>
                  <p className="text-sm font-medium tracking-tight text-white">+92 300 5863032</p>
                </div>
              </motion.a>
            </div>

            <section className={`${CARD} p-6`} aria-labelledby="business-information-title">
              <h3 id="business-information-title" className="mb-4 text-sm font-bold text-white">
                Business information
              </h3>
              <dl className="grid gap-3 text-sm sm:grid-cols-[auto_1fr] sm:gap-x-6">
                <dt className="font-semibold text-slate-400">Brand</dt>
                <dd className="text-slate-200">{BUSINESS.brandName}</dd>
                <dt className="font-semibold text-slate-400">Operated by</dt>
                <dd className="text-slate-200">{BUSINESS.legalCompanyName}</dd>
                {BUSINESS.companyNumber && (
                  <>
                    <dt className="font-semibold text-slate-400">Company registration number</dt>
                    <dd className="text-slate-200">{BUSINESS.companyNumber}</dd>
                  </>
                )}
                {BUSINESS.registeredOffice && (
                  <>
                    <dt className="font-semibold text-slate-400">Registered office</dt>
                    <dd className="text-slate-200">{BUSINESS.registeredOffice}</dd>
                  </>
                )}
                <dt className="font-semibold text-slate-400">Customer support email</dt>
                <dd>
                  <a className="text-brand-accent transition-colors hover:text-blue-300" href={`mailto:${BUSINESS.supportEmail}`}>
                    {BUSINESS.supportEmail}
                  </a>
                </dd>
              </dl>
            </section>

            <div className="flex items-center gap-6 pt-4">
              {[
                { icon: Linkedin, label: 'LinkedIn', href: BUSINESS.social.linkedin },
                { icon: Github, label: 'GitHub', href: BUSINESS.social.github },
                { icon: Twitter, label: 'X (Twitter)', href: BUSINESS.social.x },
              ].map((social, i) => (
                <motion.a
                  key={i}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  whileHover={{ scale: 1.1, backgroundColor: 'rgba(255,255,255,0.08)' }}
                  className="w-14 h-14 rounded-2xl border border-white/15 flex items-center justify-center text-slate-400 hover:text-white transition-all"
                >
                  <social.icon className="w-6 h-6" />
                </motion.a>
              ))}
            </div>
          </div>

          <div className={`${CARD} !p-10 md:!p-12 relative overflow-hidden group`}>
            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-accent/15 rounded-full blur-3xl" />

            <div className="space-y-10 relative z-10">
              <div className="space-y-2">
                <h3 className="text-3xl font-bold tracking-tight text-white">Send us a message</h3>
                <p className="text-slate-300 text-sm">We reply within 24 hours.</p>
              </div>

              {status === 'sent' ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-16 space-y-6 text-center"
                >
                  <div className="w-20 h-20 rounded-3xl bg-green-500/15 flex items-center justify-center text-green-400">
                    <CheckCircle2 className="w-10 h-10 animate-bounce" />
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-2xl font-bold text-white">Message received</h4>
                    <p className="text-slate-300">We will reply within 24 hours.</p>
                  </div>
                </motion.div>
              ) : (
                <form className="space-y-8 relative" onSubmit={handleSubmit}>
                  <div className="space-y-4">
                    <label htmlFor="contact-email" className="text-xs font-bold text-brand-accent uppercase tracking-widest ml-1">Your email</label>
                    <input
                      id="contact-email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@business.com"
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-5 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-brand-accent focus:bg-white/10 transition-all"
                    />
                  </div>
                  <div className="space-y-4">
                    <label htmlFor="contact-message" className="text-xs font-bold text-brand-accent uppercase tracking-widest ml-1">Your project</label>
                    <textarea
                      id="contact-message"
                      required
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="What does your business do, and what should the software fix?"
                      rows={4}
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-5 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-brand-accent focus:bg-white/10 transition-all resize-none"
                    />
                  </div>
                  {/* Honeypot — invisible to people, tempting to bots */}
                  <div aria-hidden="true" className="absolute -left-[9999px] w-px h-px overflow-hidden">
                    <label>Website<input type="text" tabIndex={-1} autoComplete="off" value={website} onChange={(e) => setWebsite(e.target.value)} /></label>
                  </div>
                  <motion.button
                    type="submit"
                    disabled={status === 'sending'}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="btn-primary w-full py-6 text-sm tracking-[0.2em] font-black flex items-center justify-center gap-4 disabled:opacity-50 shadow-2xl"
                  >
                    {status === 'sending' ? (
                      <div className="flex items-center gap-3">
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Sending…
                      </div>
                    ) : (
                      <>
                        Send message
                        <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                      </>
                    )}
                  </motion.button>
                  {status === 'error' && (
                    <p className="text-red-400 text-sm text-center font-semibold">Could not send. Please try again or message us on WhatsApp.</p>
                  )}
                </form>
              )}
            </div>
          </div>
        </div>

        <div className="pt-24 border-t border-white/10 flex flex-col md:flex-row justify-between items-start md:items-center gap-12">
          {/* Logo + tagline signature */}
          <div className="flex flex-col gap-5">
            <Logo variant="full" size={40} />
            <span className="text-xs text-slate-400 uppercase tracking-[0.2em] font-mono">
              &copy; {new Date().getFullYear()} {BUSINESS.brandName} — All rights reserved.
            </span>
          </div>

          <div className="flex flex-col md:items-end gap-4">
            <nav aria-label="Footer" className="flex flex-wrap gap-x-8 gap-y-3 text-xs text-slate-300 font-bold uppercase tracking-widest">
              <Link to="/work" className="hover:text-white transition-colors">Work</Link>
              <Link to="/demos" className="hover:text-white transition-colors">Demos</Link>
              <Link to="/guides" className="hover:text-white transition-colors">Guides</Link>
              <Link to="/blog" className="hover:text-white transition-colors">Blog</Link>
              <Link to="/blueprint-library" className="hover:text-white transition-colors">Blueprints</Link>
              <Link to="/compare/agency-vs-freelancer" className="hover:text-white transition-colors">Agency vs freelancer</Link>
              <Link to="/privacy" className="hover:text-white transition-colors">Privacy</Link>
              <Link to="/terms" className="hover:text-white transition-colors">Terms</Link>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
}
