import { motion } from 'motion/react';

const ROW1 = [
  { name: 'React', color: '#61DAFB' },
  { name: 'TypeScript', color: '#3178C6' },
  { name: 'Next.js', color: '#0f172a' },
  { name: 'Node.js', color: '#68A063' },
  { name: 'Firebase', color: '#FFCA28' },
  { name: 'PostgreSQL', color: '#4169E1' },
  { name: 'OpenAI', color: '#10A37F' },
  { name: 'AWS', color: '#FF9900' },
  { name: 'Docker', color: '#2496ED' },
  { name: 'Python', color: '#FFD43B' },
];

const ROW2 = [
  { name: 'Tailwind CSS', color: '#06B6D4' },
  { name: 'GraphQL', color: '#E10098' },
  { name: 'Redis', color: '#DC382D' },
  { name: 'Kubernetes', color: '#326CE5' },
  { name: 'Gemini AI', color: '#8B5CF6' },
  { name: 'React Native', color: '#61DAFB' },
  { name: 'MongoDB', color: '#47A248' },
  { name: 'Stripe', color: '#635BFF' },
  { name: 'Vercel', color: '#0f172a' },
  { name: 'Flutter', color: '#54C5F8' },
];

function MarqueeRow({ items, reverse = false }: { items: typeof ROW1; reverse?: boolean }) {
  const doubled = [...items, ...items];
  return (
    <div className="overflow-hidden">
      <motion.div
        animate={{ x: reverse ? ['-50%', '0%'] : ['0%', '-50%'] }}
        transition={{ duration: 32, repeat: Infinity, ease: 'linear' }}
        className="flex gap-4 w-max"
      >
        {doubled.map((tech, i) => (
          <div
            key={i}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-slate-900/10 bg-slate-50 whitespace-nowrap"
          >
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: tech.color, boxShadow: `0 0 6px ${tech.color}60` }} />
            <span className="text-[11px] font-mono font-bold text-slate-600 uppercase tracking-widest">{tech.name}</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}

export default function ClientLogos() {
  return (
    <section className="py-16 px-6 relative bg-[#f8fafc]">
      <div className="max-w-6xl mx-auto">
        {/* White rounded card with subtle border */}
        <div className="rounded-3xl bg-white border border-slate-900/10 shadow-[0_20px_50px_-25px_rgba(15,23,42,0.12)] py-10 px-6 overflow-hidden">
          <div className="mb-8 text-center">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-[0.35em]">Technologies We Master</span>
          </div>

          {/* Marquee rows with linear-gradient mask fade on both edges */}
          <div
            className="space-y-4"
            style={{
              WebkitMaskImage: 'linear-gradient(to right, transparent 0%, #000 10%, #000 90%, transparent 100%)',
              maskImage: 'linear-gradient(to right, transparent 0%, #000 10%, #000 90%, transparent 100%)',
            }}
          >
            <MarqueeRow items={ROW1} />
            <MarqueeRow items={ROW2} reverse />
          </div>
        </div>
      </div>
    </section>
  );
}
