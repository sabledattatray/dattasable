'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

interface Stat {
  value: number;
  suffix: string;
  label: string;
  code: string;
}

const stats: Stat[] = [
  { value: 50, suffix: '+', label: 'Projects Delivered', code: 'PRJ-OK' },
  { value: 30, suffix: '+', label: 'Happy Clients', code: 'CLI-SAT' },
  { value: 5, suffix: '+', label: 'Years Experience', code: 'EXP-YR' },
  { value: 100, suffix: 'K+', label: 'Rows Analyzed', code: 'DAT-ROW' },
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
    <section className="section" style={{ background: 'var(--surface2)', padding: '4rem 0' }}>
      <div className="container">
        <TechLabel>Performance Metrics</TechLabel>
        <div className="metrics-grid">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="card"
              style={{ 
                padding: '2rem 1.5rem',
              }}
            >
              <div className="mono text-[12px] text-[var(--muted)] mb-4">{s.code}</div>
              <div style={{ fontSize: '2.5rem', fontWeight: 600, color: 'var(--text)', lineHeight: 1, letterSpacing: '-0.02em' }}>
                <Counter value={s.value} suffix={s.suffix} />
              </div>
              <div className="label-tech mt-4" style={{ letterSpacing: '0.1em' }}>{s.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
