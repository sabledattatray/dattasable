'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Crosshair from '@/components/Crosshair';
import { motion } from 'framer-motion';
import { Scale, ArrowRight, Zap, Shield, Target, Activity, FileText } from 'lucide-react';
import Link from 'next/link';

export default function ComparisonsPage() {
  const comparisons = [
    {
      title: "Prompt Hardening vs. Engineering",
      id: "PH-GE",
      abstract: "Analyzing the transition from creative prompt engineering to structural logic hardening for enterprise stability.",
      left: { label: "Prompt Engineering", points: ["Non-deterministic output", "Natural language bias", "High drift potential", "Art-based"] },
      right: { label: "Prompt Hardening", points: ["Deterministic logic", "Schema-enforced", "Zero-drift target", "Engineering-based"] }
    },
    {
      title: "Execution Chains vs. Agent Loops",
      id: "EC-AL",
      abstract: "Why linear execution chains outperform autonomous agent loops in high-fidelity production environments.",
      left: { label: "Agent Loops", points: ["Recursive hallucination", "High token waste", "Logic fragmentation", "Opaque process"] },
      right: { label: "Execution Chains", points: ["Hardened nodes", "Token efficient", "State persistence", "Transparent audit"] }
    },
    {
      title: "Deterministic vs. Autonomous",
      id: "DT-AT",
      abstract: "A comparative framework for choosing between surgical precision and autonomous exploration in AI systems.",
      left: { label: "Autonomous AI", points: ["Exploration focused", "Creative discovery", "Broad intent", "Variable reliability"] },
      right: { label: "Deterministic AI", points: ["Execution focused", "Structural fidelity", "Mapped intent", "Extreme reliability"] }
    }
  ];

  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>
      <Navbar />
      
      <div className="boxed-wrapper pt-32 pb-24">
        <Crosshair position="tl" />
        
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="label-tech mb-8 text-amber-500">Engineering Analysis</div>
            <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontFamily: "'Syne', sans-serif", fontWeight: 600, marginBottom: '2rem', lineHeight: 1.1 }}>
              Framework <span className="text-amber-500">Comparisons.</span>
            </h1>
            <p style={{ color: 'var(--muted)', fontSize: '1.2rem', marginBottom: '5rem', lineHeight: 1.6 }}>
              A technical analysis positioning Surgical AI standards against broader industry 
              methodologies. We prioritize deterministic reliability over autonomous exploration.
            </p>

            <div className="space-y-24 mb-32">
              {comparisons.map((c, i) => (
                <motion.div
                  key={c.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <h2 className="text-2xl font-bold mb-4">{c.title}</h2>
                  <p className="text-sm text-[var(--muted)] mb-12 leading-relaxed max-w-2xl">{c.abstract}</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[var(--border)] border border-[var(--border)] rounded-sm overflow-hidden">
                    <div className="p-8 bg-[var(--surface1)]">
                      <div className="flex items-center gap-2 mb-8 opacity-40">
                        <Scale size={14} />
                        <span className="mono text-[10px] uppercase font-bold tracking-widest">{c.left.label}</span>
                      </div>
                      <ul className="space-y-4">
                        {c.left.points.map(p => (
                          <li key={p} className="flex items-center gap-3 text-[13px] text-[var(--muted)]">
                            <div className="w-1 h-1 rounded-full bg-[var(--border)]" /> {p}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="p-8 bg-[var(--surface2)]">
                      <div className="flex items-center gap-2 mb-8 text-amber-500">
                        <Scale size={14} />
                        <span className="mono text-[10px] uppercase font-bold tracking-widest">{c.right.label}</span>
                      </div>
                      <ul className="space-y-4">
                        {c.right.points.map(p => (
                          <li key={p} className="flex items-center gap-3 text-[13px]">
                            <Zap size={14} className="text-amber-500" /> {p}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="p-12 border border-[var(--border)] bg-[var(--surface1)] rounded-sm mb-32">
              <div className="flex flex-col lg:flex-row gap-12 items-center">
                <div className="flex-1">
                  <h2 className="text-2xl font-bold mb-6">Detailed Whitepapers</h2>
                  <p className="text-[var(--muted)] leading-relaxed mb-6">
                    Looking for a more granular engineering breakdown? Our whitepapers explore the 
                    mathematical and logical foundations of deterministic AI systems.
                  </p>
                  <button className="btn-primary py-3 px-8 flex items-center gap-2">
                    <FileText size={16} /> View Whitepapers
                  </button>
                </div>
                <div className="w-full lg:w-1/3 grid grid-cols-2 gap-4">
                  <div className="aspect-square bg-[var(--surface2)] border border-[var(--border)] flex items-center justify-center p-4 text-center">
                    <span className="mono text-[10px] opacity-40">LATENCY_ANALYSIS.pdf</span>
                  </div>
                  <div className="aspect-square bg-[var(--surface2)] border border-[var(--border)] flex items-center justify-center p-4 text-center">
                    <span className="mono text-[10px] opacity-40">SCHEMA_FIDELITY.pdf</span>
                  </div>
                </div>
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
