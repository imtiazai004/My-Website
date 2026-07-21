import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Quote, Send, CheckCircle } from "lucide-react";
import { TestimonialsColumn } from "./ui/testimonials-columns-1";
import { subscribeToTestimonials, submitTestimonial } from "../services/dataService";

type CardData = { text: string; image: string; name: string; role: string };

const fallback: CardData[] = [
  { text: "This ERP revolutionized our operations, streamlining finance and inventory. The cloud-based platform keeps us productive, even remotely.", image: "https://randomuser.me/api/portraits/women/1.jpg", name: "Briana Patton", role: "Operations Manager" },
  { text: "Implementing this ERP was smooth and quick. The customizable, user-friendly interface made team training effortless.", image: "https://randomuser.me/api/portraits/men/2.jpg", name: "Bilal Ahmed", role: "IT Manager" },
  { text: "The support team is exceptional, guiding us through setup and providing ongoing assistance, ensuring our satisfaction.", image: "https://randomuser.me/api/portraits/women/3.jpg", name: "Saman Malik", role: "Customer Support Lead" },
  { text: "This ERP's seamless integration enhanced our business operations and efficiency. Highly recommend for its intuitive interface.", image: "https://randomuser.me/api/portraits/men/4.jpg", name: "Omar Raza", role: "CEO" },
  { text: "Its robust features and quick support have transformed our workflow, making us significantly more efficient.", image: "https://randomuser.me/api/portraits/women/5.jpg", name: "Zainab Hussain", role: "Project Manager" },
  { text: "The smooth implementation exceeded expectations. It streamlined processes, improving overall business performance.", image: "https://randomuser.me/api/portraits/women/6.jpg", name: "Aliza Khan", role: "Business Analyst" },
  { text: "Our business functions improved with a user-friendly design and positive customer feedback.", image: "https://randomuser.me/api/portraits/men/7.jpg", name: "Farhan Siddiqui", role: "Marketing Director" },
  { text: "They delivered a solution that exceeded expectations, understanding our needs and enhancing our operations.", image: "https://randomuser.me/api/portraits/women/8.jpg", name: "Sana Sheikh", role: "Sales Manager" },
  { text: "Using this ERP, our online presence and conversions significantly improved, boosting business performance.", image: "https://randomuser.me/api/portraits/men/9.jpg", name: "Hassan Ali", role: "E-commerce Manager" },
];

const inputClass = "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-brand-accent/60 transition-colors text-sm";

export default function Testimonials() {
  const [cards, setCards] = useState<CardData[]>(fallback);
  const [form, setForm] = useState({ name: "", role: "", company: "", content: "" });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    return subscribeToTestimonials((ts) => {
      if (ts.length > 0) {
        setCards(ts.map(t => ({ text: t.content, image: t.avatarUrl, name: t.name, role: t.role })));
      }
    });
  }, []);

  const col1 = cards.filter((_, i) => i % 3 === 0);
  const col2 = cards.filter((_, i) => i % 3 === 1);
  const col3 = cards.filter((_, i) => i % 3 === 2);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    try {
      await submitTestimonial(form);
      setSubmitted(true);
      setForm({ name: "", role: "", company: "", content: "" });
    } catch {
      setError("Failed to submit. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="testimonials" className="py-40 px-6 relative overflow-hidden bg-[#030712]">
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(circle, rgba(15,23,42,0.5) 1px, transparent 1px)', backgroundSize: '40px 40px' }}
      />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-accent/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          viewport={{ once: true }}
          className="text-center space-y-6 max-w-3xl mx-auto mb-20"
        >
          <div className="pill-badge mx-auto">
            <Quote className="w-3 h-3 fill-brand-accent" />
            PARTNER ECOSYSTEM
          </div>
          <h2 className="heading-lg text-white">
            A Global Standard <br /> of Excellence.
          </h2>
          <p className="text-white/50 text-xl font-light">
            We don't just build software; we build relationships. Hear from the leaders we've partnered with.
          </p>
        </motion.div>

        <div className="flex justify-center gap-6 mt-10 [mask-image:linear-gradient(to_bottom,transparent,black_15%,black_85%,transparent)] max-h-[740px] overflow-hidden">
          <TestimonialsColumn testimonials={col1} duration={15} />
          <TestimonialsColumn testimonials={col2} className="hidden md:block" duration={19} />
          <TestimonialsColumn testimonials={col3} className="hidden lg:block" duration={17} />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          viewport={{ once: true }}
          className="mt-24 max-w-xl mx-auto"
        >
          <div className="p-8 rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-xl">
            <h3 className="text-white text-xl font-semibold text-center mb-1">Share Your Experience</h3>
            <p className="text-white/40 text-sm text-center mb-8">Your testimonial will appear instantly above.</p>

            {submitted ? (
              <div className="text-center space-y-4 py-6">
                <CheckCircle className="w-12 h-12 text-brand-accent mx-auto" />
                <p className="text-white font-medium">Your testimonial has been published!</p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="text-brand-accent text-sm underline underline-offset-2 hover:opacity-80 transition-opacity"
                >
                  Submit another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    required
                    maxLength={100}
                    className={inputClass}
                  />
                  <input
                    name="role"
                    value={form.role}
                    onChange={handleChange}
                    placeholder="Your role"
                    required
                    maxLength={100}
                    className={inputClass}
                  />
                </div>
                <input
                  name="company"
                  value={form.company}
                  onChange={handleChange}
                  placeholder="Company"
                  required
                  maxLength={100}
                  className={inputClass}
                />
                <textarea
                  name="content"
                  value={form.content}
                  onChange={handleChange}
                  placeholder="Write your testimonial..."
                  required
                  maxLength={1000}
                  rows={4}
                  className={`${inputClass} resize-none`}
                />
                {error && <p className="text-red-400 text-sm">{error}</p>}
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full flex items-center justify-center gap-2 bg-brand-accent text-white rounded-xl px-6 py-3 font-semibold text-sm hover:bg-brand-accent/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="w-4 h-4" />
                  {submitting ? "Publishing..." : "Publish Testimonial"}
                </button>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
