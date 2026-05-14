'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Crosshair from '@/components/Crosshair';
import { motion } from 'framer-motion';
import { Shield, Zap, Cpu, Network, Database, Terminal } from 'lucide-react';

export default function ArchitecturePage() {
  const layers = [
    {
      title: "Layer 01: Intent Mapping",
      icon: <Terminal size={24} />,
      desc: "Capturing unstructured operator goals and translating them into deterministic logic schemas.",
      features: ["Logic Decomposition", "Context Windows", "Intent Validation"]
    },
    {
      title: "Layer 02: Prompt Infrastructure",
      icon: <Cpu size={24} />,
      desc: "Structured prompt systems utilizing modular architecture for consistent, high-fidelity AI output.",
      features: ["Prompt Templating", "Chain-of-Thought", "Dynamic Variables"]
    },
    {
      title: "Layer 03: Execution Chains",
      icon: <Network size={24} />,
      desc: "Sequential and parallel AI operations connected through hardened data pipelines.",
      features: ["State Management", "Error Handling", "Pipeline Scaling"]
    }
  ];

  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>
      <Navbar />
      
      <div className="boxed-wrapper pt-32 pb-24">
        <Crosshair position="tl" />
        
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="label-tech mb-8">System Infrastructure</div>
            <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontFamily: "'Syne', sans-serif", fontWeight: 800, marginBottom: '2rem', lineHeight: 1.1 }}>
              Surgical AI <span style={{ color: 'var(--accent)' }}>Architecture.</span>
            </h1>
            <p style={{ color: 'var(--muted)', fontSize: '1.2rem', marginBottom: '5rem', lineHeight: 1.6 }}>
              A technical deep-dive into the deterministic infrastructure powering modern AI workflows. 
              Our architecture moves beyond "chatting" into high-fidelity execution systems.
            </p>

            {/* Visual Blueprint */}
            <div className="relative mb-32 p-8 lg:p-16 border border-[var(--border)] bg-[var(--surface2)] rounded-sm overflow-hidden">
              <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, var(--accent) 1px, transparent 0)', backgroundSize: '40px 40px' }} />
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
                {layers.map((layer, i) => (
                  <motion.div
                    key={layer.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.2 }}
                    viewport={{ once: true }}
                    className="card flex flex-col p-8"
                    style={{ background: 'var(--bg)', border: '1px solid var(--border)' }}
                  >
                    <div className="mb-6 text-[var(--accent)]">{layer.icon}</div>
                    <h3 className="mono text-[14px] uppercase tracking-widest mb-4">{layer.title}</h3>
                    <p style={{ fontSize: '0.9rem', color: 'var(--muted)', lineHeight: 1.6, marginBottom: '2rem' }}>{layer.desc}</p>
                    
                    <div className="mt-auto pt-6 border-t border-[var(--border)]">
                      <ul className="space-y-3">
                        {layer.features.map(f => (
                          <li key={f} className="flex items-center gap-2 text-[10px] mono uppercase opacity-60">
                            <Zap size={10} className="text-[var(--accent)]" />
                            {f}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              <div>
                <h2 style={{ fontSize: '1.75rem', marginBottom: '1.5rem', fontWeight: 700 }}>Deterministic Workflow Scaling</h2>
                <p style={{ color: 'var(--muted)', lineHeight: 1.8, marginBottom: '1.5rem' }}>
                  The core challenge of modern AI is consistency. Our architecture utilizes <strong>Prompt Hardening™</strong> and 
                  <strong>System-Led Execution</strong> to ensure that every workflow scale is reproducible.
                </p>
                <div className="p-6 bg-[var(--surface2)] border-l-2 border-[var(--accent)]">
                  <p className="mono text-[12px] leading-relaxed">
                    "We don't build prompts; we build software that happens to use Large Language Models as logic processors."
                  </p>
                </div>
              </div>
              <div>
                <h2 style={{ fontSize: '1.75rem', marginBottom: '1.5rem', fontWeight: 700 }}>Security & State Management</h2>
                <p style={{ color: 'var(--muted)', lineHeight: 1.8 }}>
                  Our pipelines are built on top of robust state management layers. This allows for complex, long-running 
                  AI operations that can recover from errors, maintain context across days, and scale across global deployment zones.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <Crosshair position="br" />
      </div>
      
      <Footer />
    </div>
  );
}
