'use client';

import { motion } from 'framer-motion';
import { PencilRuler, Zap, Rocket } from 'lucide-react';

export default function HowItWorks() {
  const steps = [
    {
      icon: <PencilRuler size={32} />,
      title: "1. Design",
      desc: "Define structured prompts and operator intent logic.",
      color: "var(--accent)"
    },
    {
      icon: <Zap size={32} />,
      title: "2. Automate",
      desc: "Connect individual prompts into repeatable systems.",
      color: "#fff134"
    },
    {
      icon: <Rocket size={32} />,
      title: "3. Scale",
      desc: "Deploy AI execution chains for high-volume output.",
      color: "#00d4ff"
    }
  ];

  return (
    <section className="section" style={{ background: 'var(--bg)', paddingTop: '2.5rem', paddingBottom: '2.5rem' }}>
      <div className="container">
        <div className="flex flex-col items-center mb-20 text-center">
          <div className="label-tech mb-6">Execution Lifecycle</div>
          <h2 style={{ fontSize: '2.5rem', fontFamily: "'Syne', sans-serif" }}>
            3 steps to <span style={{ color: 'var(--accent)' }}>structured AI execution.</span>
          </h2>
        </div>

        <div className="relative">
          {/* Connecting Line (Desktop) */}
          <div className="hidden lg:block absolute top-[45px] left-[15%] right-[15%] h-[1px] bg-[var(--border)] z-0" />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 relative z-10">
            {steps.map((step, i) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.2 }}
                viewport={{ once: true }}
                className="flex flex-col items-center text-center"
              >
                <div 
                  className="w-[90px] h-[90px] rounded-full flex items-center justify-center mb-8 bg-[var(--surface)] border border-[var(--border)] shadow-[0_0_30px_rgba(201,243,29,0.05)]"
                  style={{ color: step.color }}
                >
                  {step.icon}
                </div>
                <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', fontWeight: 700 }}>{step.title}</h3>
                <p style={{ color: 'var(--muted)', maxWidth: '280px', lineHeight: 1.6 }}>{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
