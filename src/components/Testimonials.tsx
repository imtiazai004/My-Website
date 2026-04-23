import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Quote } from 'lucide-react';
import { TESTIMONIALS as INITIAL_TESTIMONIALS } from '../constants';
import { subscribeToTestimonials } from '../services/dataService';
import { Testimonial } from '../types';

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>(INITIAL_TESTIMONIALS);

  useEffect(() => {
    const unsubscribe = subscribeToTestimonials((data) => {
      if (data.length > 0) {
        setTestimonials(data);
      }
    });
    return unsubscribe;
  }, []);

  return (
    <section id="testimonials" className="py-24 px-6 bg-brand-bg">
      <div className="max-w-7xl mx-auto space-y-16">
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 text-brand-accent font-bold uppercase tracking-[0.2em] text-[10px]">
             Trusted Feedback
          </div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Standard of Excellence</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {(testimonials || []).map((testimonial, index) => (
            <motion.div 
              key={testimonial.id}
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.2 }}
              className="bg-gradient-to-br from-brand-accent/5 to-transparent border border-brand-accent/20 rounded-2xl p-10 space-y-8 relative overflow-hidden"
            >
              <Quote className="absolute top-6 right-8 w-12 h-12 text-brand-accent/10" />
              <p className="text-xl text-brand-text-muted italic leading-relaxed relative z-10 font-light">
                "{testimonial.content}"
              </p>
              
              <div className="flex items-center gap-4 pt-6 border-t border-brand-border">
                <img 
                  src={testimonial.avatarUrl} 
                  alt={testimonial.name} 
                  className="w-12 h-12 rounded-full object-cover border border-brand-border p-1"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <h4 className="font-bold text-white text-base tracking-tight">{testimonial.name}</h4>
                  <p className="text-[10px] text-brand-text-dim font-bold uppercase tracking-[0.2em]">{testimonial.role} @ {testimonial.company}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}


