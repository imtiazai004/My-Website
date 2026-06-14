import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Minus } from 'lucide-react';
import { FAQS as DEFAULT_FAQS } from '../constants';
import { subscribeToFAQs } from '../services/dataService';
import { FAQ as FAQType } from '../types';

export default function FAQ() {
  const [faqs, setFaqs] = useState<FAQType[]>(DEFAULT_FAQS);
  const [openId, setOpenId] = useState<string | null>(null);

  useEffect(() => {
    const unsub = subscribeToFAQs((data) => {
      if (data.length > 0) setFaqs(data);
    });
    return unsub;
  }, []);

  return (
    <section id="faq" className="py-32 px-6 relative overflow-hidden bg-[#f8fafc]">
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(circle, rgba(15,23,42,0.5) 1px, transparent 1px)', backgroundSize: '40px 40px' }}
      />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-900/10 to-transparent" />
      <div className="absolute bottom-1/3 right-0 w-[500px] h-[500px] bg-brand-accent/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center space-y-6 mb-20"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-slate-900/10 bg-slate-900/[0.04] text-[10px] font-bold tracking-[0.2em] text-slate-500">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-accent animate-pulse" />
            COMMON QUESTIONS
          </div>
          <h2 className="text-5xl md:text-6xl font-display font-medium text-slate-900 tracking-tight leading-tight">
            Everything You <br />
            <span className="text-brand-accent italic">Need to Know</span>
          </h2>
          <p className="text-slate-500 text-xl font-light max-w-xl mx-auto">
            Clear answers to the questions we hear most often. Still curious? Start a conversation.
          </p>
        </motion.div>

        {/* Accordion */}
        <div className="space-y-3">
          {faqs.map((faq, i) => {
            const isOpen = openId === faq.id;
            return (
              <motion.div
                key={faq.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className={`border rounded-2xl overflow-hidden transition-all duration-300 ${
                  isOpen ? 'border-brand-accent/30 bg-brand-accent/[0.04]' : 'border-slate-900/10 bg-slate-900/[0.02] hover:border-slate-900/20'
                }`}
              >
                <button
                  onClick={() => setOpenId(isOpen ? null : faq.id)}
                  className="w-full flex items-center justify-between gap-6 p-6 text-left"
                >
                  <span className={`text-base font-medium leading-snug transition-colors ${isOpen ? 'text-slate-900' : 'text-slate-600'}`}>
                    {faq.question}
                  </span>
                  <div className={`w-8 h-8 rounded-full border flex items-center justify-center shrink-0 transition-all ${
                    isOpen ? 'bg-brand-accent border-brand-accent text-white' : 'border-slate-900/10 text-slate-500'
                  }`}>
                    {isOpen ? <Minus className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                  </div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 pt-0">
                        <div className="h-px bg-slate-900/[0.04] mb-5" />
                        <p className="text-slate-500 font-light leading-relaxed">{faq.answer}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center space-y-6"
        >
          <p className="text-slate-500 text-sm">Still have questions?</p>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-10 py-4 bg-brand-accent text-slate-900 font-bold uppercase tracking-widest text-[11px] hover:bg-indigo-400 transition-all rounded-2xl"
          >
            Get a Free Consultation
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
