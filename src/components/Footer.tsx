import { Twitter, Linkedin, Send, CheckCircle2, Mail, MessageCircle } from 'lucide-react';
import { motion } from 'motion/react';
import { trackActivity, sendContactMessage } from '../services/dataService';
import { Logo } from './Logo';
import React, { useState } from 'react';

const CARD = 'bg-white/[0.04] border border-white/10 backdrop-blur-xl rounded-2xl';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !message) return;

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
        <div id="contact" className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <div className="space-y-12">
            <div className="space-y-8">
              <div className="pill-badge !bg-white/5 !border-white/15">
                <Send className="w-3 h-3" />
                INITIATE PROTOCOL
              </div>
              <h2 className="heading-lg text-white">
                Ready to Build the <br />
                <span className="text-brand-accent italic font-light tracking-tighter">Global Future?</span>
              </h2>
              <p className="text-slate-400 text-xl leading-relaxed font-light max-w-lg">
                We combine high-performance engineering with cinematic design to build applications that don't just work—they inspire.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <motion.a
                whileHover={{ y: -5 }}
                href="mailto:info@aisofttechsolution.com"
                className={`flex items-center gap-5 p-6 ${CARD} hover:bg-white/[0.08] transition-all group`}
              >
                <div className="w-12 h-12 rounded-xl bg-brand-accent/15 flex items-center justify-center text-brand-accent group-hover:bg-brand-accent group-hover:text-white transition-all">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Email Control</p>
                  <p className="text-sm font-medium tracking-tight text-white">info@aisofttechsolution.com</p>
                </div>
              </motion.a>

              <motion.a
                whileHover={{ y: -5 }}
                href="https://wa.me/447462086661"
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center gap-5 p-6 ${CARD} hover:bg-green-500/10 transition-all group`}
              >
                <div className="w-12 h-12 rounded-xl bg-green-500/15 flex items-center justify-center text-green-400 group-hover:bg-green-500 group-hover:text-white transition-all">
                  <MessageCircle className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">WhatsApp (UK)</p>
                  <p className="text-sm font-medium tracking-tight text-white">+44 7462 086661</p>
                </div>
              </motion.a>
              <motion.a
                whileHover={{ y: -5 }}
                href="https://wa.me/923005863032"
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center gap-5 p-6 ${CARD} hover:bg-green-500/10 transition-all group`}
              >
                <div className="w-12 h-12 rounded-xl bg-green-500/15 flex items-center justify-center text-green-400 group-hover:bg-green-500 group-hover:text-white transition-all">
                  <MessageCircle className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">WhatsApp (PK)</p>
                  <p className="text-sm font-medium tracking-tight text-white">+92 300 5863032</p>
                </div>
              </motion.a>
            </div>

            <div className="flex items-center gap-6 pt-4">
              {[
                { icon: Twitter, label: 'Twitter', href: 'https://x.com/imtiazahmadPTI' },
                { icon: Linkedin, label: 'LinkedIn', href: 'https://www.linkedin.com/in/imtiazahmad004' }
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
                <h3 className="text-3xl font-bold tracking-tight text-white">Quick Discovery</h3>
                <p className="text-slate-400 text-sm tracking-wide">Tell us about your project vision.</p>
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
                    <h4 className="text-2xl font-bold text-white">Transmission Received</h4>
                    <p className="text-slate-400">Our team will establish contact shortly.</p>
                  </div>
                </motion.div>
              ) : (
                <form className="space-y-8" onSubmit={handleSubmit}>
                  <div className="space-y-4">
                    <label className="text-[11px] font-black text-brand-accent uppercase tracking-[0.3em] ml-1">Identity/Email</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="commander@enterprise.com"
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-5 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-brand-accent focus:bg-white/10 transition-all"
                    />
                  </div>
                  <div className="space-y-4">
                    <label className="text-[11px] font-black text-brand-accent uppercase tracking-[0.3em] ml-1">Mission Brief</label>
                    <textarea
                      required
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="What are we building today?"
                      rows={4}
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-5 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-brand-accent focus:bg-white/10 transition-all resize-none"
                    />
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
                        UPLOADING_DATA...
                      </div>
                    ) : (
                      <>
                        SEND TRANSMISSION
                        <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                      </>
                    )}
                  </motion.button>
                  {status === 'error' && (
                    <p className="text-red-400 text-xs text-center font-bold animate-pulse">TRANSMISSION ERROR. RETRY PROTOCOL.</p>
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
            <span className="text-[10px] text-slate-500 uppercase tracking-[0.4em] font-mono">
              &copy; {new Date().getFullYear()} Soft Tech Solution — All rights reserved.
            </span>
          </div>

          <div className="flex flex-col md:items-end gap-4">
            <div className="flex gap-16 font-display mb-4">
              <div className="flex flex-col">
                <span className="text-4xl font-bold tracking-tighter text-white">12</span>
                <span className="text-[10px] text-slate-400 uppercase font-black tracking-widest">SHIPPED</span>
              </div>
              <div className="flex flex-col">
                <span className="text-4xl font-bold tracking-tighter text-white">99+</span>
                <span className="text-[10px] text-slate-400 uppercase font-black tracking-widest">PERFORMANCE</span>
              </div>
              <div className="flex flex-col">
                <span className="text-4xl font-bold tracking-tighter text-white">&lt;100ms</span>
                <span className="text-[10px] text-slate-400 uppercase font-black tracking-widest">LATENCY</span>
              </div>
            </div>
            <div className="flex gap-8 text-[11px] text-slate-400 font-black uppercase tracking-[0.3em]">
              <button onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-white transition-colors">Privacy</button>
              <button onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-white transition-colors">Terms</button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
