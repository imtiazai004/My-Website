import { Terminal, Github, Twitter, Linkedin, Heart, Send, CheckCircle2, Mail, MessageCircle } from 'lucide-react';
import { motion } from 'motion/react';
import { trackActivity, sendContactMessage } from '../services/dataService';
import React, { useState } from 'react';

interface FooterProps {
  onAction?: () => void;
}

export default function Footer({ onAction }: FooterProps) {
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
    <footer className="pt-40 pb-16 px-6 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-brand-accent/5 rounded-full blur-[140px]" />

      <div className="max-w-7xl mx-auto space-y-32">
        <div id="contact" className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <div className="space-y-12">
            <div className="space-y-8">
              <div className="pill-badge">
                <Send className="w-3 h-3" />
                INITIATE PROTOCOL
              </div>
              <h2 className="heading-lg text-white">
                Ready to Build the <br />
                <span className="text-brand-accent italic font-light tracking-tighter">Global Future?</span>
              </h2>
              <p className="text-neutral-400 text-xl leading-relaxed font-light max-w-lg">
                We combine high-performance engineering with cinematic design to build applications that don't just work—they inspire.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <motion.a 
                whileHover={{ y: -5 }}
                href="mailto:info@aisofttechsolution.com" 
                className="flex items-center gap-5 p-6 glass-card !p-6 hover:bg-white/[0.05] transition-all group"
              >
                <div className="w-12 h-12 rounded-xl bg-brand-accent/10 flex items-center justify-center text-brand-accent group-hover:bg-brand-accent group-hover:text-white transition-all">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-brand-text-dim uppercase tracking-widest">Email Control</p>
                  <p className="text-sm font-medium tracking-tight">info@aisofttechsolution.com</p>
                </div>
              </motion.a>

              <motion.a 
                whileHover={{ y: -5 }}
                href="https://wa.me/447462086661" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-5 p-6 glass-card !p-6 hover:bg-green-500/10 transition-all group"
              >
                <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center text-green-500 group-hover:bg-green-500 group-hover:text-white transition-all">
                  <MessageCircle className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-brand-text-dim uppercase tracking-widest">Secure Comms</p>
                  <p className="text-sm font-medium tracking-tight">+44 7462 086661</p>
                </div>
              </motion.a>
            </div>

            <div className="flex items-center gap-6 pt-4">
              {[
                { icon: Github, label: 'GitHub' },
                { icon: Twitter, label: 'Twitter' },
                { icon: Linkedin, label: 'LinkedIn' }
              ].map((social, i) => (
                <motion.a 
                  key={i}
                  href="#"
                  whileHover={{ scale: 1.1, backgroundColor: 'rgba(255,255,255,0.05)' }}
                  className="w-14 h-14 rounded-2xl border border-white/5 flex items-center justify-center text-brand-text-dim hover:text-white transition-all"
                >
                  <social.icon className="w-6 h-6" />
                </motion.a>
              ))}
            </div>
          </div>
          
          <div className="glass-card !p-10 md:!p-12 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-accent/10 rounded-full blur-3xl" />
            
            <div className="space-y-10 relative z-10">
              <div className="space-y-2">
                <h3 className="text-3xl font-bold tracking-tight">Quick Discovery</h3>
                <p className="text-brand-text-dim text-sm tracking-wide">Tell us about your project vision.</p>
              </div>

              {status === 'sent' ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-16 space-y-6 text-center"
                >
                  <div className="w-20 h-20 rounded-3xl bg-green-500/10 flex items-center justify-center text-green-500">
                    <CheckCircle2 className="w-10 h-10 animate-bounce" />
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-2xl font-bold">Transmission Received</h4>
                    <p className="text-brand-text-dim">Our team will establish contact shortly.</p>
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
                      className="w-full bg-white/[0.02] border border-white/10 rounded-2xl px-6 py-5 text-sm focus:outline-none focus:border-brand-accent focus:bg-white/[0.05] transition-all"
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
                      className="w-full bg-white/[0.02] border border-white/10 rounded-2xl px-6 py-5 text-sm focus:outline-none focus:border-brand-accent focus:bg-white/[0.05] transition-all resize-none"
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
                    <p className="text-red-500 text-xs text-center font-bold animate-pulse">TRANSMISSION ERROR. RETRY PROTOCOL.</p>
                  )}
                </form>
              )}
            </div>
          </div>
        </div>
        
        <div className="pt-24 border-t border-white/5 flex flex-col md:flex-row justify-between items-start md:items-center gap-12">
          <div className="flex flex-col gap-4">
            <span className="text-[11px] text-brand-accent font-black uppercase tracking-[0.3em]">Operational Metrics</span>
            <div className="flex gap-16 font-display">
              <div className="flex flex-col">
                <span className="text-4xl font-bold tracking-tighter">12</span>
                <span className="text-[10px] text-brand-text-dim uppercase font-black tracking-widest">SHIPPED</span>
              </div>
              <div className="flex flex-col">
                <span className="text-4xl font-bold tracking-tighter">99+</span>
                <span className="text-[10px] text-brand-text-dim uppercase font-black tracking-widest">PERFORMANCE</span>
              </div>
              <div className="flex flex-col">
                <span className="text-4xl font-bold tracking-tighter">&lt;100ms</span>
                <span className="text-[10px] text-brand-text-dim uppercase font-black tracking-widest">LATENCY</span>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col md:items-end gap-4">
            <div className="flex gap-8 text-[11px] text-brand-text-dim font-black uppercase tracking-[0.3em]">
              <a href="#" className="hover:text-white transition-colors">Privacy</a>
              <a href="#" className="hover:text-white transition-colors">Terms</a>
              <a href="#" className="hover:text-white transition-colors">GitHub</a>
            </div>
            <button onClick={onAction} className="text-[10px] text-white/20 hover:text-white/40 transition-colors text-left uppercase tracking-[0.4em] font-mono">
               &copy; {new Date().getFullYear()} SOFT_TECH_SOLUTION // SYSTEM_ROOT
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}

