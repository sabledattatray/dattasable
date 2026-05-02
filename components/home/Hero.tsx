'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Table, Database, BarChart3, Layers, Code2, BookOpen } from 'lucide-react';

function TechLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-4 mb-6">
      <p className="label-tech">{children}</p>
    </div>
  );
}

export default function Hero() {
  const [isApp, setIsApp] = useState(false);

  useEffect(() => {
    if ((window as any).Capacitor?.isNative) setIsApp(true);
  }, []);

  return (
    <section
      className="section hero-grid"
      style={{
        minHeight: '600px',
        height: 'auto',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
        padding: '2rem 0',
        backgroundColor: 'var(--bg)',
        border: 'none'
      }}
    >
      {/* Layer 1: Right-Side Visual - Optimized with Mobile-First Strategy */}
      <div
        id="hero-visual-container"
        className="absolute top-[45%] right-0 -translate-y-1/2 w-full lg:w-[55%] z-0 lg:opacity-100 pointer-events-none overflow-hidden"
        style={{
          opacity: isApp ? 0.8 : 'var(--hero-mobile-opacity)',
          backgroundImage: isApp
            ? 'radial-gradient(circle at center, var(--accent) 0%, var(--accent) 50%, transparent 85%)'
            : 'none',
          backgroundSize: '100% 100%'
        }}
      >
        <div className="w-full h-full">
          <Image
            src="/hero-bg.webp"
            alt="Datta Sable | Business Intelligence Expert & Data Strategy Consultant"
            width={800}
            height={600}
            priority
            fetchPriority="high"
            decoding="sync"
            quality={50}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px"
            className="w-full h-auto"
          />
        </div>
        {/* Targeted Dark/Light Overlay: Bottom-Left to Middle-Left */}
        <div
          className="absolute inset-0 z-10 pointer-events-none"
          style={{
            background: 'linear-gradient(45deg, var(--hero-gradient-color) 0%, var(--hero-gradient-color) var(--hero-gradient-solid), transparent var(--hero-gradient-end))'
          }}
        />
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to right, var(--hero-overlay-start) 0%, var(--hero-overlay-mid) 30%, var(--hero-overlay-end) 65%, transparent 100%)',
          zIndex: 1,
          display: isApp ? 'block' : 'none'
        }} />
        <div className="block lg:hidden" style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to bottom, transparent 50%, var(--bg) 100%)',
          zIndex: 2,
        }} />
      </div>

      {/* Layer 2: Content Foreground */}
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          style={{ maxWidth: 640 }}
        >
          <TechLabel>Business Intelligence Expert & Data Strategy Consultant</TechLabel>
          <h1
            className="hero-title"
            style={{
              fontSize: 'clamp(1.5rem, 8vw, 48px)',
              fontWeight: 600,
              letterSpacing: '-0.02em',
              lineHeight: 1.1,
              marginBottom: '1.5rem',
              display: 'inline-block'
            }}
          >
            Engineering data into<br />strategic roadmaps
          </h1>
          <p style={{ color: 'var(--text)', fontSize: '1.05rem', marginBottom: '3rem', lineHeight: 1.6, opacity: 0.8 }}>
            Premier <strong>BI Developer in India</strong>. I simplify complex data ecosystems into actionable executive insights through <strong>SQL Automation</strong>, <strong>Python Data Engineering</strong>, and high-fidelity <strong>Automated Reporting Solutions</strong>.
          </p>
          <div className="flex flex-col xs:flex-row flex-wrap gap-4">
            <Link href="/start-here" className="btn-primary w-full xs:w-auto text-center flex items-center justify-center gap-2" style={{ textDecoration: 'none' }}>
              <BookOpen size={16} /> START HERE
            </Link>
            <Link href="/portfolio" className="btn-outline w-full xs:w-auto text-center" style={{ textDecoration: 'none' }}>
              VIEW PROJECTS
            </Link>
            <Link href="/contact" className="btn-outline w-full xs:w-auto text-center" style={{ textDecoration: 'none' }}>
              ESTABLISH CONTACT
            </Link>
          </div>

          <div style={{ height: '2rem' }} />

          {/* Tool Icons */}
          <div className="relative w-full overflow-hidden no-scrollbar py-4">
            <div className="hidden lg:flex items-center gap-x-12">
              {[
                { icon: <Table size={18} />, label: 'Excel' },
                { icon: <Database size={18} />, label: 'SQL' },
                { icon: <BarChart3 size={18} />, label: 'Power BI' },
                { icon: <Layers size={18} />, label: 'Tableau' },
                { icon: <Code2 size={18} />, label: 'Python' },
              ].map((tool) => (
                <div key={tool.label} className="flex items-center gap-2">
                  <div style={{ color: 'var(--accent)' }}>{tool.icon}</div>
                  <span className="mono text-[12px] text-[var(--text)] uppercase tracking-[0.2em]">{tool.label}</span>
                </div>
              ))}
            </div>

            <div className="flex lg:hidden overflow-hidden">
              <div className="animate-marquee flex items-center gap-x-8 pr-8">
                {[
                  { icon: <Table size={18} />, label: 'Excel' },
                  { icon: <Database size={18} />, label: 'SQL' },
                  { icon: <BarChart3 size={18} />, label: 'Power BI' },
                  { icon: <Layers size={18} />, label: 'Tableau' },
                  { icon: <Code2 size={18} />, label: 'Python' },
                  { icon: <Table size={18} />, label: 'Excel' },
                  { icon: <Database size={18} />, label: 'SQL' },
                  { icon: <BarChart3 size={18} />, label: 'Power BI' },
                  { icon: <Layers size={18} />, label: 'Tableau' },
                  { icon: <Code2 size={18} />, label: 'Python' },
                ].map((tool, idx) => (
                  <div key={`${tool.label}-${idx}`} className="flex items-center gap-2 flex-shrink-0">
                    <div style={{ color: 'var(--accent)' }}>{tool.icon}</div>
                    <span className="mono text-[12px] text-[var(--text)] uppercase tracking-[0.2em] whitespace-nowrap">{tool.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
