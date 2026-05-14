'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function FinalCTA() {
  return (
    <section className="section" style={{ background: 'var(--bg)', borderTop: '1px solid var(--border)' }}>
      <div className="container">
        <div className="relative overflow-hidden bg-[var(--surface2)] p-12 lg:p-24 border border-[var(--border)] rounded-sm">
          {/* Background Pulse Effect */}
          <div className="absolute inset-0 opacity-10 pointer-events-none" 
               style={{ backgroundImage: 'radial-gradient(circle at center, var(--accent) 0%, transparent 70%)' }} />

          <div className="relative z-10 text-center max-w-2xl mx-auto">
            <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontFamily: "'Syne', sans-serif", lineHeight: 1.1, marginBottom: '2rem' }}>
              Ready to build your <span style={{ color: 'var(--accent)' }}>AI system?</span>
            </h2>
            <p style={{ color: 'var(--muted)', fontSize: '1.2rem', marginBottom: '3rem', lineHeight: 1.6 }}>
              Stop guessing. Start engineering. Deploy your own structured AI infrastructure in minutes.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <Link href="/tools" className="btn-primary flex items-center justify-center gap-3 py-5 px-10">
                START BUILDING WORKFLOWS <ArrowRight size={18} />
              </Link>
              <Link href="/tools/demo" className="btn-outline flex items-center justify-center py-5 px-10">
                VIEW DEMO SYSTEM
              </Link>
            </div>

            <div className="mt-12 pt-12 border-t border-[var(--border)]">
              <p className="mono text-[10px] text-[var(--muted)] tracking-[0.3em] uppercase">
                System Thinking • Structured Logic • Automated Authority
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
