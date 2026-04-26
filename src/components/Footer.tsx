import { Terminal, Github, Twitter, Linkedin, Heart, Send, CheckCircle2, Mail, MessageCircle } from 'lucide-react';
import { trackActivity, sendContactMessage } from '../services/dataService';
import { useState } from 'react';

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
    <footer className="bg-brand-bg pt-32 pb-12 px-6 border-t border-brand-border">
      <div className="max-w-7xl mx-auto space-y-24">
        <div id="contact" className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="space-y-8">
            <h2 className="text-5xl md:text-7xl font-bold tracking-tight leading-[0.9] text-white">
              Elevate your <br />
              <span className="text-brand-accent">Soft Tech Solution.</span>
            </h2>
            <p className="text-brand-text-muted text-xl leading-relaxed font-light max-w-md">
              Let's collaborate on building high-performance applications that stand out in the modern web.
            </p>
            <div className="flex items-center gap-6 pt-4">
              <a href="#" className="w-12 h-12 rounded-full border border-brand-border flex items-center justify-center text-brand-text-dim hover:text-white hover:border-white transition-all">
                <Github className="w-5 h-5" />
              </a>
              <a href="#" className="w-12 h-12 rounded-full border border-brand-border flex items-center justify-center text-brand-text-dim hover:text-white hover:border-white transition-all">
                 <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-12 h-12 rounded-full border border-brand-border flex items-center justify-center text-brand-text-dim hover:text-white hover:border-white transition-all">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
            <div className="pt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <a 
                href="mailto:info@aisofttechsolution.com" 
                className="flex items-center gap-4 p-4 bg-brand-surface border border-brand-border rounded-xl hover:border-brand-accent transition-all group"
              >
                <div className="w-10 h-10 rounded-lg bg-brand-accent/10 flex items-center justify-center text-brand-accent group-hover:bg-brand-accent group-hover:text-white transition-colors">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-brand-text-dim uppercase tracking-widest">Email Us</p>
                  <p className="text-sm font-medium">info@aisofttechsolution.com</p>
                </div>
              </a>

              <a 
                href="https://wa.me/447462086661" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 bg-brand-surface border border-brand-border rounded-xl hover:border-green-500/50 transition-all group"
              >
                <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center text-green-500 group-hover:bg-green-500 group-hover:text-white transition-colors">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-brand-text-dim uppercase tracking-widest">WhatsApp</p>
                  <p className="text-sm font-medium">+44 7462 086661</p>
                </div>
              </a>
            </div>
          </div>
          
          <div className="bg-brand-surface border border-brand-border rounded-2xl p-8 md:p-12 space-y-8">
            <h3 className="text-2xl font-bold tracking-tight">Quick Discovery</h3>
            {status === 'sent' ? (
              <div className="flex flex-col items-center justify-center py-12 space-y-4 text-center">
                <CheckCircle2 className="w-16 h-16 text-brand-accent animate-bounce" />
                <div className="space-y-2">
                  <h4 className="text-xl font-bold">Transmission Received</h4>
                  <p className="text-brand-text-dim text-sm">We'll get back to you shortly.</p>
                </div>
              </div>
            ) : (
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="space-y-3">
                  <label className="text-[10px] font-bold text-brand-text-dim uppercase tracking-[0.2em]">Email Address</label>
                  <input 
                    type="email" 
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onFocus={() => trackActivity('FORM_FOCUS', { field: 'email' })}
                    placeholder="hello@aisofttechsolution.com"
                    className="w-full bg-brand-bg border border-brand-border rounded-xl px-4 py-4 text-sm focus:outline-none focus:border-brand-accent transition-colors"
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-bold text-brand-text-dim uppercase tracking-[0.2em]">Project Vision</label>
                  <textarea 
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onFocus={() => trackActivity('FORM_FOCUS', { field: 'vision' })}
                    placeholder="What are we building?"
                    rows={4}
                    className="w-full bg-brand-bg border border-brand-border rounded-xl px-4 py-4 text-sm focus:outline-none focus:border-brand-accent transition-colors resize-none"
                  />
                </div>
                <button 
                  type="submit"
                  disabled={status === 'sending'}
                  className="btn-primary w-full py-5 text-lg flex items-center justify-center gap-3 disabled:opacity-50"
                >
                  {status === 'sending' ? 'TRANSMITTING...' : (
                    <>
                      SEND TRANSMISSION
                      <Send className="w-5 h-5" />
                    </>
                  )}
                </button>
                {status === 'error' && (
                  <p className="text-red-500 text-xs text-center font-bold">Transmission failed. Please try again.</p>
                )}
              </form>
            )}
          </div>
        </div>
        
        <div className="pt-24 border-t border-brand-border flex flex-col md:flex-row justify-between items-start md:items-center gap-12">
          <div className="flex flex-col gap-2">
            <span className="text-[10px] text-brand-text-dim uppercase tracking-[0.2em] font-bold">METRICS.log</span>
            <div className="flex gap-12 font-sans font-black">
              <div className="flex flex-col">
                <span className="text-2xl font-bold tracking-tighter">12</span>
                <span className="text-[10px] text-brand-text-dim uppercase font-bold tracking-widest">SHIPPED</span>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-bold tracking-tighter">99+</span>
                <span className="text-[10px] text-brand-text-dim uppercase font-bold tracking-widest">PERFORMANCE</span>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-bold tracking-tighter">&lt;100ms</span>
                <span className="text-[10px] text-brand-text-dim uppercase font-bold tracking-widest">LATENCY</span>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col md:items-end gap-2 text-[10px] text-brand-text-dim font-bold uppercase tracking-[0.2em]">
            <div className="flex gap-6">
              <a href="#" className="hover:text-white transition-colors">Privacy</a>
              <a href="#" className="hover:text-white transition-colors">Terms</a>
              <a href="#" className="hover:text-white transition-colors">GitHub</a>
            </div>
            <button onClick={onAction} className="hover:text-white transition-colors text-left uppercase">
               &copy; {new Date().getFullYear()} Soft Tech Solution
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}

