import { motion } from 'motion/react';

const ROW1 = [
  { name: 'React', color: '#61DAFB' },
  { name: 'TypeScript', color: '#3178C6' },
  { name: 'Next.js', color: '#ffffff' },
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
  { name: 'Vercel', color: '#ffffff' },
  { name: 'Flutter', color: '#54C5F8' },
];

function MarqueeRow({ items, reverse = false }: { items: typeof ROW1; reverse?: boolean }) {
  const doubled = [...items, ...items];
  return (
    <div className="overflow-hidden">
      <motion.div
        animate={{ x: reverse ? ['0%', '50%'] : ['0%', '-50%'] }}
        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
        className="flex gap-4 w-max"
      >
        {doubled.map((tech, i) => (
          <div
            key={i}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/[0.06] bg-white/[0.03] whitespace-nowrap"
          >
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: tech.color, boxShadow: `0 0 6px ${tech.color}60` }} />
            <span className="text-[11px] font-mono font-bold text-white/40 uppercase tracking-widest">{tech.name}</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}

export default function ClientLogos() {
  return (
    <section className="py-16 relative overflow-hidden bg-[#020617] border-y border-white/5">
      <div className="absolute inset-0 bg-gradient-to-r from-[#020617] via-transparent to-[#020617] z-10 pointer-events-none" />

      <div className="mb-8 text-center">
        <span className="text-[10px] font-mono font-bold text-white/20 uppercase tracking-[0.5em]">TECHNOLOGIES WE MASTER</span>
      </div>

      <div className="space-y-4">
        <MarqueeRow items={ROW1} />
        <MarqueeRow items={ROW2} reverse />
      </div>
    </section>
  );
}
