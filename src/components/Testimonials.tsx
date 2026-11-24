import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Quote, PenLine } from "lucide-react";
import { Link } from "react-router-dom";
import { TestimonialsColumn } from "./ui/testimonials-columns-1";
import { subscribeToTestimonials } from "../services/dataService";

type CardData = { text: string; image: string; name: string; role: string };

/**
 * Open reviews: anyone can post via /submit-testimonial and it goes live
 * instantly (admin can still hide or delete). No placeholder praise: with zero
 * reviews the section shows only an invitation to write the first one.
 */
export default function Testimonials() {
  const [cards, setCards] = useState<CardData[]>([]);

  useEffect(() => {
    return subscribeToTestimonials((ts) => {
      setCards(
        ts.map((t) => ({
          text: t.content,
          image: t.avatarUrl,
          name: t.name,
          role: [t.role, t.company].filter(Boolean).join(", "),
        }))
      );
    });
  }, []);

  const col1 = cards.filter((_, i) => i % 3 === 0);
  const col2 = cards.filter((_, i) => i % 3 === 1);
  const col3 = cards.filter((_, i) => i % 3 === 2);
  const scrolling = cards.length >= 6;

  return (
    <section id="testimonials" aria-labelledby="testimonials-heading" className="py-32 px-6 relative overflow-hidden bg-[#030712]">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-accent/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          viewport={{ once: true }}
          className="text-center space-y-6 max-w-3xl mx-auto mb-16"
        >
          <div className="pill-badge mx-auto">
            <Quote className="w-3 h-3 fill-brand-accent" aria-hidden="true" />
            Client reviews
          </div>
          <h2 id="testimonials-heading" className="heading-lg text-white">
            What our clients say
          </h2>
          <p className="text-white/70">
            Open to everyone. Every review goes live instantly, unfiltered.
          </p>
          <Link
            to="/submit-testimonial"
            className="inline-flex items-center gap-2 bg-brand-accent hover:bg-brand-accent/90 text-white font-semibold px-7 py-3.5 rounded-full transition-colors"
          >
            <PenLine className="w-4 h-4" aria-hidden="true" />
            {cards.length === 0 ? "Be the first to leave a review" : "Write a review"}
          </Link>
        </motion.div>

        {cards.length === 0 ? null : scrolling ? (
          <div className="flex justify-center gap-6 mt-10 [mask-image:linear-gradient(to_bottom,transparent,black_10%,black_90%,transparent)] max-h-[740px] overflow-hidden">
            <TestimonialsColumn testimonials={col1} duration={15} />
            <TestimonialsColumn testimonials={col2} className="hidden md:block" duration={19} />
            <TestimonialsColumn testimonials={col3} className="hidden lg:block" duration={17} />
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {cards.map((c) => (
              <figure key={c.name + c.text.slice(0, 20)} className="p-8 rounded-3xl border border-white/10 bg-white/[0.04]">
                <blockquote className="text-white/90 leading-relaxed">“{c.text}”</blockquote>
                <figcaption className="mt-6 flex items-center gap-3">
                  <img src={c.image} alt="" width={40} height={40} className="h-10 w-10 rounded-full" loading="lazy" />
                  <div>
                    <p className="font-semibold text-white">{c.name}</p>
                    <p className="text-sm text-white/70">{c.role}</p>
                  </div>
                </figcaption>
              </figure>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
