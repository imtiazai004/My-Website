import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageCircle, X, Send, Loader2, Bot, User, ChevronDown } from 'lucide-react';
import { sendContactMessage } from '../services/dataService';

type Message = { role: 'user' | 'assistant'; content: string };

const GREETING: Message = {
  role: 'assistant',
  content: "Hi! I'm the AI assistant for AI Soft Tech Solution. Ask me anything about our services, or tell me about your project idea! 👋",
};

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([GREETING]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [showLeadForm, setShowLeadForm] = useState(false);
  const [leadCaptured, setLeadCaptured] = useState(false);
  const [leadForm, setLeadForm] = useState({ name: '', email: '' });
  const [leadSaving, setLeadSaving] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, showLeadForm, loading]);

  const sendMessage = async () => {
    const text = input.trim();
    if (!text || loading) return;

    const userMsg: Message = { role: 'user', content: text };
    const updated = [...messages, userMsg];
    setMessages(updated);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: updated }),
      });
      const data = await res.json();
      setMessages(prev => [...prev, { role: 'assistant', content: data.message }]);
      if (data.requestContact && !leadCaptured && !showLeadForm) {
        setTimeout(() => setShowLeadForm(true), 400);
      }
    } catch {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: 'Something went wrong. Please try again or contact us directly through our website.',
      }]);
    } finally {
      setLoading(false);
    }
  };

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadForm.email.trim()) return;
    setLeadSaving(true);
    try {
      await sendContactMessage(
        leadForm.email.trim(),
        `[Chat Lead] Name: ${leadForm.name || 'Not provided'} — Interested visitor from AI chat widget.`
      );
      setLeadCaptured(true);
      setShowLeadForm(false);
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: `Thank you${leadForm.name ? `, ${leadForm.name}` : ''}! We'll reach out to you at ${leadForm.email} very soon. Is there anything else I can help you with?`,
      }]);
    } catch {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: 'Sorry, there was an issue. Please try our contact form on the website.',
      }]);
    } finally {
      setLeadSaving(false);
    }
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.97 }}
            transition={{ duration: 0.18 }}
            className="fixed bottom-24 right-5 z-50 w-[360px] bg-[#09090f] border border-white/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden"
            style={{ maxHeight: 'min(560px, calc(100vh - 120px))' }}
          >
            {/* Header */}
            <div className="p-4 border-b border-white/10 bg-brand-accent/10 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-brand-accent/20 border border-brand-accent/40 rounded-full flex items-center justify-center">
                  <Bot className="w-4 h-4 text-brand-accent" />
                </div>
                <div>
                  <p className="text-sm font-bold text-white leading-none">AI Assistant</p>
                  <p className="text-[10px] text-brand-accent mt-0.5">AI Soft Tech Solution</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1.5 text-[10px] text-green-400 font-mono">
                  <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                  Online
                </span>
                <button onClick={() => setIsOpen(false)} className="p-1.5 hover:bg-white/5 rounded-lg transition-colors">
                  <ChevronDown className="w-4 h-4 text-white/40" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.map((msg, i) => (
                <div key={i} className={`flex gap-2 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                  <div className={`w-6 h-6 rounded-full shrink-0 mt-0.5 flex items-center justify-center border ${
                    msg.role === 'assistant'
                      ? 'bg-brand-accent/20 border-brand-accent/30'
                      : 'bg-white/10 border-white/20'
                  }`}>
                    {msg.role === 'assistant'
                      ? <Bot className="w-3 h-3 text-brand-accent" />
                      : <User className="w-3 h-3 text-white/60" />}
                  </div>
                  <div className={`max-w-[78%] px-3 py-2 rounded-xl text-sm leading-relaxed ${
                    msg.role === 'assistant'
                      ? 'bg-white/5 border border-white/10 text-white/90 rounded-tl-none'
                      : 'bg-brand-accent text-white rounded-tr-none'
                  }`}>
                    {msg.content}
                  </div>
                </div>
              ))}

              {loading && (
                <div className="flex gap-2">
                  <div className="w-6 h-6 rounded-full bg-brand-accent/20 border border-brand-accent/30 flex items-center justify-center shrink-0">
                    <Bot className="w-3 h-3 text-brand-accent" />
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-xl rounded-tl-none px-4 py-3 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-brand-accent/60 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-1.5 h-1.5 bg-brand-accent/60 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-1.5 h-1.5 bg-brand-accent/60 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              )}

              {showLeadForm && !leadCaptured && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-brand-accent/10 border border-brand-accent/30 rounded-xl p-4"
                >
                  <p className="text-xs font-semibold text-brand-accent mb-3">
                    Share your details and we'll get back to you!
                  </p>
                  <form onSubmit={handleLeadSubmit} className="space-y-2">
                    <input
                      type="text"
                      placeholder="Your name (optional)"
                      value={leadForm.name}
                      onChange={e => setLeadForm(p => ({ ...p, name: e.target.value }))}
                      className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-xs placeholder:text-white/30 focus:outline-none focus:border-brand-accent/50 transition-colors"
                    />
                    <input
                      type="email"
                      placeholder="Your email *"
                      value={leadForm.email}
                      onChange={e => setLeadForm(p => ({ ...p, email: e.target.value }))}
                      className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-xs placeholder:text-white/30 focus:outline-none focus:border-brand-accent/50 transition-colors"
                      required
                    />
                    <div className="flex gap-2 pt-1">
                      <button
                        type="submit"
                        disabled={leadSaving}
                        className="flex-1 bg-brand-accent text-white text-xs font-bold py-2 rounded-lg hover:bg-brand-accent/90 transition-colors disabled:opacity-60"
                      >
                        {leadSaving ? 'Saving...' : "Let's Connect"}
                      </button>
                      <button
                        type="button"
                        onClick={() => setShowLeadForm(false)}
                        className="px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white/40 text-xs hover:text-white transition-colors"
                      >
                        Skip
                      </button>
                    </div>
                  </form>
                </motion.div>
              )}

              <div ref={bottomRef} />
            </div>

            {/* Input */}
            <div className="p-3 border-t border-white/10 shrink-0">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && !e.shiftKey && sendMessage()}
                  placeholder="Type your message..."
                  className="flex-1 px-3 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-brand-accent/50 transition-colors"
                />
                <button
                  onClick={sendMessage}
                  disabled={loading || !input.trim()}
                  className="p-2.5 bg-brand-accent rounded-xl text-white hover:bg-brand-accent/90 transition-colors disabled:opacity-40 disabled:cursor-not-allowed shrink-0"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
              <p className="text-[9px] text-white/20 text-center mt-2 font-mono">Powered by Gemini AI</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Button */}
      <motion.button
        onClick={() => setIsOpen(p => !p)}
        className="fixed bottom-5 right-5 z-50 w-14 h-14 bg-brand-accent rounded-full shadow-xl flex items-center justify-center hover:bg-brand-accent/90 transition-colors"
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
        aria-label="Open chat"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
              <X className="w-6 h-6 text-white" />
            </motion.span>
          ) : (
            <motion.span key="chat" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
              <MessageCircle className="w-6 h-6 text-white" />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>
    </>
  );
}
