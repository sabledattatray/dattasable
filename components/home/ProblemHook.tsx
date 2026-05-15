'use client';

import { motion } from 'framer-motion';
import { AlertCircle, XCircle, ZapOff } from 'lucide-react';

export default function ProblemHook() {
  const painPoints = [
    {
      icon: <XCircle className="text-[var(--accent)]" size={24} />,
      title: "Disconnected Tools",
      desc: "Manual copying between tabs leads to broken contexts and slow output."
    },
    {
      icon: <ZapOff className="text-[var(--accent)]" size={24} />,
      title: "Unstructured Prompts",
      desc: "Scattered prompt libraries create inconsistent results and zero scalability."
    },
    {
      icon: <AlertCircle className="text-[var(--accent)]" size={24} />,
      title: "Manual Execution",
      desc: "Wasting hours on repetitive AI tasks that should be automated systems."
    }
  ];

  return (
    <section className="section" style={{ background: 'var(--bg)', borderTop: '1px solid var(--border)', paddingTop: '2.5rem', paddingBottom: '2.5rem' }}>
      <div className="container">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          <div className="max-w-xl">
            <div className="label-tech mb-6 text-[var(--accent)]">The Problem</div>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem', fontFamily: "'Syne', sans-serif" }}>
              Stop building <span style={{ color: 'var(--accent)' }}>scattered</span> AI prompts.
            </h2>
            <p style={{ color: 'var(--muted)', fontSize: '1.1rem', lineHeight: 1.6 }}>
              Most creators rely on disconnected tools, manual prompts, and unstructured workflows that don’t scale. 
              The result? <strong>Inconsistent output, wasted time, and zero systemization.</strong>
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-1 gap-6 w-full lg:max-w-md">
            {painPoints.map((p, i) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="card flex gap-6"
                style={{ padding: '1.5rem', background: 'var(--surface2)', border: '1px solid var(--border)' }}
              >
                <div className="flex-shrink-0 mt-1">{p.icon}</div>
                <div>
                  <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem', fontWeight: 600 }}>{p.title}</h3>
                  <p style={{ fontSize: '0.9rem', color: 'var(--muted)', lineHeight: 1.5 }}>{p.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
