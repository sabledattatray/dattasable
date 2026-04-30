'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Table, Database, BarChart3, Layers, Code2 } from 'lucide-react';

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
      className="section"
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
        className="absolute top-[45%] right-0 -translate-y-1/2 w-full lg:w-[55%] z-0 opacity-30 lg:opacity-100 pointer-events-none"
        style={{ 
          aspectRatio: '800/600', 
          // Removed background color for a cleaner, seamless look
          // Web: No gradient (clean) | App: Stronger vibrant gradient
          backgroundImage: isApp 
            ? 'radial-gradient(circle at center, var(--accent) 0%, var(--accent) 50%, transparent 85%)'
            : 'none',
          backgroundSize: '100% 100%',
          opacity: isApp ? 0.8 : 1.0
        }}
      >
        <div className="hidden lg:block w-full h-full">
          <Image 
            src="/hero-bg.webp"
            alt="Advanced Technical Data Visualization"
            width={800}
            height={600}
            priority
            fetchPriority="high"
            decoding="sync"
            quality={25}
            sizes="55vw"
            className="w-full h-auto"
          />
        </div>
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to right, var(--hero-overlay-start) 0%, var(--hero-overlay-mid) 30%, var(--hero-overlay-end) 65%, transparent 100%)',
          zIndex: 1,
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
          <TechLabel>Technical Architecture</TechLabel>
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
            Engineering data into<br />strategic assets
          </h1>
          <p style={{ color: 'var(--text)', fontSize: '1.05rem', marginBottom: '3rem', lineHeight: 1.6, opacity: 0.8 }}>
            High-fidelity analytics, technical automation, and scalable dashboard structures built for enterprise-grade growth.
          </p>
          <div className="flex flex-col xs:flex-row flex-wrap gap-4">
            <Link href="/portfolio" className="btn-primary w-full xs:w-auto text-center" style={{ textDecoration: 'none' }}>
              INITIALIZE SYSTEM
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
