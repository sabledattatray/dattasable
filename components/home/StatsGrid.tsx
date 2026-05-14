'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { BarChart3, Users, Clock, Database, LucideIcon } from 'lucide-react';

interface Stat {
  value: number;
  suffix: string;
  label: string;
  code: string;
  icon: LucideIcon;
}

const stats: Stat[] = [
  { value: 50, suffix: '+', label: 'Projects Delivered', code: 'PRJ-OK', icon: BarChart3 },
  { value: 30, suffix: '+', label: 'Happy Clients', code: 'CLI-SAT', icon: Users },
  { value: 10, suffix: '+', label: 'Years Experience', code: 'EXP-YR', icon: Clock },
  { value: 100, suffix: 'K+', label: 'Rows Analyzed', code: 'DAT-ROW', icon: Database },
];

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 2000;
    const step = (timestamp: number, startTime: number) => {
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(ease * value));
      if (progress < 1) requestAnimationFrame(ts => step(ts, startTime));
    };
    requestAnimationFrame(ts => step(ts, ts));
  }, [inView, value]);

  return <div ref={ref}>{count}{suffix}</div>;
}

function TechLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-4 mb-6">
      <p className="label-tech">{children}</p>
    </div>
  );
}

export default function StatsGrid() {
  return (
    <section className="section" style={{ background: 'var(--surface2)', padding: '6rem 0', position: 'relative', overflow: 'hidden' }}>
      {/* Subtle Grid Background */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(var(--accent) 1px, transparent 1px)', backgroundSize: '32px 32px' }} />

      <div className="container relative z-10">
        <div className="flex flex-col gap-8 mb-20">
          <TechLabel>Performance Metrics</TechLabel>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-end">
            <div>
              <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', lineHeight: 1, fontFamily: "'Syne', sans-serif", fontWeight: 800 }}>
                Operational <span style={{ color: 'var(--accent)' }}>Excellence.</span>
              </h2>
            </div>
            
            <div className="flex items-start gap-6 border-l border-[var(--border)] pl-8 md:mb-2">
              <p style={{ color: 'var(--muted)', fontSize: '1rem', maxWidth: '400px', lineHeight: 1.6, fontFamily: "'Inter', sans-serif" }}>
                High-fidelity data metrics from live deployment environments across global territories.
              </p>
            </div>
          </div>
        </div>

        <div className="metrics-grid">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -5, borderColor: 'var(--accent)' }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
              className="card group"
              style={{ 
                padding: '2.5rem 2rem',
                background: 'var(--surface)',
                border: '1px solid var(--border)',
                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                display: 'flex',
                flexDirection: 'column',
                gap: '1.5rem'
              }}
            >
              {/* Card Header: Icon & Tech ID */}
              <div className="flex items-start justify-between">
                <div className="p-3 bg-[var(--tag-bg)] rounded-sm group-hover:bg-[var(--accent)] group-hover:text-black transition-colors duration-500">
                  <s.icon size={22} strokeWidth={1.5} />
                </div>
                <div className="mono text-[10px] px-2 py-1 bg-[var(--border)] text-[var(--muted)] tracking-widest uppercase">
                  {s.code}
                </div>
              </div>

              {/* Value & Counter */}
              <div>
                <div style={{ fontSize: '3rem', fontWeight: 700, color: 'var(--text)', lineHeight: 1, letterSpacing: '-0.03em', fontFamily: "'Syne', sans-serif" }}>
                  <Counter value={s.value} suffix={s.suffix} />
                </div>
                <div className="mt-2 text-[var(--muted)] text-[12px] uppercase tracking-[0.2em] font-bold">
                  {s.label}
                </div>
              </div>

              {/* Bottom Progress Line (Visual only) */}
              <div className="w-full h-[1px] bg-[var(--border)] relative overflow-hidden mt-2">
                <motion.div 
                  initial={{ x: '-100%' }}
                  whileInView={{ x: '0%' }}
                  transition={{ delay: 0.5 + (i * 0.1), duration: 1 }}
                  className="absolute inset-0 bg-[var(--accent)] opacity-30" 
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
