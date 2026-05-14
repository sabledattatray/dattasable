'use client';

import { motion } from 'framer-motion';
import { Box, FileCode, GitBranch, Layout } from 'lucide-react';

export default function ProductValue() {
  const values = [
    {
      icon: <Box size={24} />,
      title: "AI Workflow Builder System",
      desc: "Full-stack infrastructure for creating, testing, and deploying custom AI systems."
    },
    {
      icon: <FileCode size={24} />,
      title: "Prompt Architecture Framework",
      desc: "Standardized templates for high-fidelity prompt engineering and logic mapping."
    },
    {
      icon: <Cpu className="w-8 h-8" />,
      title: "Automation Pipelines",
      desc: "Turn scattered prompts into repeatable, automated data workflows."
    },
    {
      icon: <Network className="w-8 h-8" />,
      title: "Reliable Systems",
      desc: "Systems built for precision and verifiable output consistency."
    }
  ];

  return (
    <section className="section" style={{ background: 'var(--bg)', borderTop: '1px solid var(--border)' }}>
      <div className="container">
        <div className="mb-16">
          <div className="label-tech mb-6">Product Value</div>
          <h2 style={{ fontSize: '2.5rem', fontFamily: "'Syne', sans-serif" }}>
            The <span style={{ color: 'var(--accent)' }}>Surgical Arsenal.</span>
          </h2>
          <p style={{ color: 'var(--muted)', fontSize: '1.1rem', marginTop: '1rem', maxWidth: '600px' }}>
            Everything you need to move from scattered prompts to a production-grade AI infrastructure.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((v, i) => (
            <motion.div
              key={v.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="mb-6 text-[var(--accent)] group-hover:scale-110 transition-transform duration-500">
                {v.icon}
              </div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '1rem' }}>{v.title}</h3>
              <p style={{ color: 'var(--muted)', fontSize: '0.9rem', lineHeight: 1.6 }}>{v.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
