import { Terminal, Github, Twitter, Linkedin, Heart } from 'lucide-react';
import { trackActivity } from '../services/dataService';

interface FooterProps {
  onAction?: () => void;
}

export default function Footer({ onAction }: FooterProps) {
  return (
    <footer className="bg-brand-bg pt-32 pb-12 px-6 border-t border-brand-border">
      <div className="max-w-7xl mx-auto space-y-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="space-y-8">
            <h2 className="text-5xl md:text-7xl font-bold tracking-tight leading-[0.9] text-white">
              Elevate your <br />
              <span className="text-brand-accent">Digital Vibe.</span>
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
          </div>
          
          <div className="bg-brand-surface border border-brand-border rounded-2xl p-8 md:p-12 space-y-8">
            <h3 className="text-2xl font-bold tracking-tight">Quick Discovery</h3>
            <form className="space-y-6" onSubmit={e => e.preventDefault()}>
              <div className="space-y-3">
                <label className="text-[10px] font-bold text-brand-text-dim uppercase tracking-[0.2em]">Email Address</label>
                <input 
                  type="email" 
                  onFocus={() => trackActivity('FORM_FOCUS', { field: 'email' })}
                  placeholder="hello@vibe.code"
                  className="w-full bg-brand-bg border border-brand-border rounded-xl px-4 py-4 text-sm focus:outline-none focus:border-brand-accent transition-colors"
                />
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-bold text-brand-text-dim uppercase tracking-[0.2em]">Project Vision</label>
                <textarea 
                  onFocus={() => trackActivity('FORM_FOCUS', { field: 'vision' })}
                  placeholder="What are we building?"
                  rows={4}
                  className="w-full bg-brand-bg border border-brand-border rounded-xl px-4 py-4 text-sm focus:outline-none focus:border-brand-accent transition-colors resize-none"
                />
              </div>
              <button className="btn-primary w-full py-5 text-lg">
                SEND TRANSMISSION
              </button>
            </form>
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
               &copy; {new Date().getFullYear()} VIBE.CODE ARC-01
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}

