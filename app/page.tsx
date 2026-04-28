'use client';
import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AuthModal from '@/components/AuthModal';
import {
  ArrowRight, BarChart3, Database, ChevronRight, Target,
  Activity, Globe, Layers, Table, Code2
} from 'lucide-react';
import { useSession, signIn } from 'next-auth/react';
import Crosshair from '@/components/Crosshair';

/* ── data ── */
const stats = [
  { value: 50, suffix: '+', label: 'Projects Delivered', code: 'PRJ-OK' },
  { value: 30, suffix: '+', label: 'Happy Clients', code: 'CLI-SAT' },
  { value: 5, suffix: '+', label: 'Years Experience', code: 'EXP-YR' },
  { value: 100, suffix: 'K+', label: 'Rows Analyzed', code: 'DAT-ROW' },
];

const projects = [
  {
    title: 'Sales Performance Dashboard',
    category: 'Dashboard',
    desc: 'Real-time Tableau dashboard tracking $12M+ in revenue with drill-down KPIs and trend forecasting.',
    tools: ['Tableau', 'SQL', 'Python'],
    impact: '+28% decision speed',
    color: '#c9f31d',
    color2: '#00C9F2',
    icon: <BarChart3 size={20} />,
  },
  {
    title: 'Supply Chain Analytics',
    category: 'Analysis',
    desc: 'End-to-end SQL + Power BI solution reducing inventory costs by 18% through predictive analytics.',
    tools: ['Power BI', 'SQL', 'DAX'],
    impact: '-18% inventory cost',
    color: '#c9f31d',
    color2: '#00C9F2',
    icon: <Database size={20} />,
  },
  {
    title: 'HR Workforce Insights',
    category: 'Report',
    desc: 'Python + Excel automation that transforms 40-hour manual reporting into a 10-minute refresh.',
    tools: ['Python', 'Excel', 'Tableau'],
    impact: '97% time saved',
    color: '#c9f31d',
    color2: '#00C9F2',
    icon: <Target size={20} />,
  },
  {
    title: 'Financial KPI Automation',
    category: 'Automation',
    desc: 'Python-powered financial reporting suite that reduced monthly close cycle from 5 days to 4 hours.',
    tools: ['Python', 'SQL', 'Excel'],
    impact: '-80% close time',
    color: '#c9f31d',
    color2: '#00C9F2',
    icon: <Activity size={20} />,
  },
];

/* ── Counter ── */
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

/* ── Technical Label ── */
function TechLabel({ children, index }: { children: React.ReactNode; index?: string }) {
  return (
    <div className="flex items-center gap-4 mb-6">
      {index && <span className="mono text-[10px] text-[var(--muted)]">{index}</span>}
      <p className="label-tech">{children}</p>
    </div>
  );
}

export default function HomePage() {
  const { data: session, status } = useSession();

  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>
      <AuthModal />
      <Navbar />

      <div className="boxed-wrapper" style={{ position: 'relative', marginBottom: '40px' }}>
        <Crosshair position="tl" />

        {/* ── COMPOSITIONAL HERO ── */}
        <section
          className="section hero-grid"
          style={{ 
            minHeight: '800px', 
            height: 'auto',
            display: 'flex', 
            alignItems: 'center', 
            position: 'relative', 
            overflow: 'hidden', 
            opacity: 0.95, 
            padding: '4rem 0' 
          }}
        >

          {/* Layer 1: Right-Side Visual - Now visible on mobile */}
          <div className="block absolute top-1/2 right-0 -translate-y-1/2 w-full lg:w-[55%] z-0 opacity-30 lg:opacity-100 pointer-events-none">
            <Image 
              src="/hero-bg.png"
              alt="Technical Data Visualization"
              width={800}
              height={600}
              priority
              className="w-full h-auto opacity-95"
              style={{ filter: 'contrast(1.1) brightness(1.05)' }}
            />
            {/* Dark gradient overlay */}
            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to right, var(--hero-overlay-start) 0%, var(--hero-overlay-mid) 30%, var(--hero-overlay-end) 65%, transparent 100%)',
              zIndex: 1,
            }} />
            {/* Mobile bottom fade */}
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
              transition={{ duration: 1, ease: 'easeOut' }}
              style={{ maxWidth: 640 }}
            >
              <TechLabel>Technical Architecture</TechLabel>
              <h1 style={{ 
                fontSize: 'clamp(2rem, 6vw, 48px)', 
                fontWeight: 600, 
                letterSpacing: '-0.02em', 
                lineHeight: 1.1, 
                marginBottom: '1.5rem', 
                background: 'linear-gradient(135deg, #c9f31d 0%, #fff134 20%, #00d4ff 40%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                display: 'inline-block'
              }}>
                Engineering data into<br />strategic assets
              </h1>
              <p style={{ color: 'var(--text)', fontSize: '1.05rem', marginBottom: '3rem', lineHeight: 1.6, opacity: 0.8 }}>
                High-fidelity analytics, technical automation, and scalable dashboard structures built for enterprise-grade growth.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/portfolio" className="btn-primary" style={{ textDecoration: 'none' }}>
                  INITIALIZE SYSTEM
                </Link>
                <Link href="/contact" className="btn-outline" style={{ textDecoration: 'none' }}>
                  ESTABLISH CONTACT
                </Link>
              </div>

              {/* Spacer */}
              <div style={{ height: '5rem' }} />

              {/* Tool Icons - Marquee on Mobile, Static on Desktop */}
              <div className="relative w-full overflow-hidden no-scrollbar py-4">
                {/* Desktop Static View */}
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

                {/* Mobile Marquee View */}
                <div className="flex lg:hidden overflow-hidden">
                  <div className="animate-marquee flex items-center gap-x-8 pr-8">
                    {[
                      { icon: <Table size={18} />, label: 'Excel' },
                      { icon: <Database size={18} />, label: 'SQL' },
                      { icon: <BarChart3 size={18} />, label: 'Power BI' },
                      { icon: <Layers size={18} />, label: 'Tableau' },
                      { icon: <Code2 size={18} />, label: 'Python' },
                      // Duplicate for seamless loop
                      { icon: <Table size={18} />, label: 'Excel' },
                      { icon: <Database size={18} />, label: 'SQL' },
                      { icon: <BarChart3 size={18} />, label: 'Power BI' },
                      { icon: <Layers size={18} />, label: 'Tableau' },
                      { icon: <Code2 size={18} />, label: 'Python' },
                    ].map((tool, idx) => (
                      <div key={`${tool.label}-${idx}`} className="flex items-center gap-2 flex-shrink-0">
                        <div style={{ color: 'var(--accent)' }}>{tool.icon}</div>
                        <span className="mono text-[10px] text-[var(--text)] uppercase tracking-[0.2em] whitespace-nowrap">{tool.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── DATA METRICS ── */}
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
                  style={{ 
                    background: 'var(--bg)', 
                    padding: '2rem 1.5rem',
                    border: '1px solid',
                    borderImage: 'linear-gradient(135deg, #c9f31d, #00C9F2) 1'
                  }}
                >
                  <div className="mono text-[10px] text-[var(--muted)] mb-4">{s.code}</div>
                  <div style={{ fontSize: '2.5rem', fontWeight: 600, color: 'var(--text)', lineHeight: 1, letterSpacing: '-0.02em' }}>
                    <Counter value={s.value} suffix={s.suffix} />
                  </div>
                  <div className="label-tech mt-4" style={{ letterSpacing: '0.1em' }}>{s.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── PROJECTS ── */}
        <section className="section" style={{ background: 'var(--surface2)', padding: '8rem 0' }}>
          <div className="container">
            <div className="mb-12">
              <TechLabel>Active Deployments</TechLabel>
              <h2 className="sr-only">Featured BI Projects</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {projects.map((p, i) => (
                <motion.div
                  key={p.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="card"
                  style={{ borderLeft: `2px solid`, borderImage: `linear-gradient(to bottom, ${p.color}, ${p.color2}) 1`, position: 'relative', overflow: 'hidden', opacity: 0.95 }}
                >
                  {/* Top colour strip */}
                  <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: `linear-gradient(to right, ${p.color}, ${p.color2})`, opacity: 0.5 }} />
                  <div className="flex justify-between items-start mb-8" style={{ marginTop: '0.5rem' }}>
                    <div style={{ color: p.color }}>{p.icon}</div>
                    <span className="mono text-[10px] py-1 px-3 border text-[var(--muted)]"
                      style={{ borderColor: p.color2, color: p.color2, background: `${p.color2}18` }}>
                      {p.category.toUpperCase()}
                    </span>
                  </div>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '1rem' }}>{p.title}</h3>
                  <p style={{ color: 'var(--muted)', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '2rem', height: '3.2rem', overflow: 'hidden' }}>{p.desc}</p>
                  <div className="flex flex-wrap gap-2 mb-8">
                    {p.tools.map(t => (
                      <span key={t} className="mono text-[10px] py-1 px-2"
                        style={{ color: p.color2, background: `${p.color2}15`, border: `1px solid ${p.color2}40` }}>
                        {t}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between border-t border-[var(--border)] pt-6">
                    <div className="flex items-center gap-2">
                      <Target size={14} style={{ color: p.color }} />
                      <span className="mono text-[11px] font-normal" style={{ color: p.color }}>{p.impact}</span>
                    </div>
                    <Link 
                      href="/portfolio" 
                      className="text-[var(--text)] hover:text-[var(--accent)] transition-colors"
                      aria-label={`View details for ${p.title}`}
                    >
                      <ArrowRight size={18} />
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>



        <Crosshair position="br" />
      </div>
      <Footer />
    </div>
  );
}
