'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ExternalLink, GitBranch, X, ChevronRight } from 'lucide-react';

const categories = ['All', 'Dashboard', 'Report', 'Analysis', 'Automation'];

const projects = [
  {
    id: 1,
    title: 'Sales Performance Dashboard',
    category: 'Dashboard',
    cover: '📊',
    color: 'var(--accent)',
    tools: ['Tableau', 'SQL', 'PostgreSQL'],
    client: 'RetailMax Corp',
    desc: 'Real-time sales tracking dashboard covering $12M+ in annual revenue. Includes drill-down by region, product, and salesperson with trend forecasting.',
    problem: 'The client had 15+ disconnected Excel reports with no unified view of revenue performance. Senior leadership spent 8 hours weekly consolidating data.',
    solution: 'Built a unified Tableau dashboard connected to a PostgreSQL data warehouse. Automated daily ETL with Python, giving leadership a real-time single source of truth.',
    impact: '+28% decision speed, -8 hours/week manual work, 95% exec adoption rate',
    github: '#',
    live: '#',
  },
  {
    id: 2,
    title: 'Supply Chain Analytics Platform',
    category: 'Analysis',
    cover: '🔗',
    color: 'var(--accent2)',
    tools: ['Power BI', 'SQL', 'DAX', 'Python'],
    client: 'Global Manufacturing Ltd',
    desc: 'End-to-end supply chain visibility platform tracking 500+ SKUs, warehouse inventory, and supplier performance across 3 countries.',
    problem: 'Inventory overstock cost the company $400K annually. Procurement decisions were based on gut feeling without data backing.',
    solution: 'Built Power BI dashboards with demand forecasting models in Python. Implemented automated reorder alerts via Power Automate.',
    impact: '-18% inventory cost, $72K annual savings, 100% automated reorder process',
    github: '#',
    live: '#',
  },
  {
    id: 3,
    title: 'HR Workforce Intelligence',
    category: 'Report',
    cover: '👥',
    color: 'var(--accent3)',
    tools: ['Python', 'Excel', 'Tableau'],
    client: 'HR Tech Startup',
    desc: 'Automated HR reporting system transforming 40-hour manual monthly reports into a 10-minute automated refresh with 12 KPI dashboards.',
    problem: '2 HR analysts spent full weeks each month manually compiling payroll, attrition, and performance reports from 5 systems.',
    solution: 'Python scripts to extract, clean, and merge data from all HR systems. Tableau dashboards auto-refresh via REST API connections.',
    impact: '97% time saved, 2 FTEs freed for strategic work, zero data errors',
    github: '#',
    live: '#',
  },
  {
    id: 4,
    title: 'Financial KPI Automation',
    category: 'Automation',
    cover: '💰',
    color: 'var(--accent)',
    tools: ['Excel', 'VBA', 'Python', 'SQL'],
    client: 'Fintech Company',
    desc: 'Automated financial reporting suite covering P&L, cash flow, and budget variance with one-click report generation for CFO and board.',
    problem: 'Monthly financial close took 5 days with manual Excel work. High error risk with formulas across 50+ workbooks.',
    solution: 'Python-powered automation with Excel templates and a SQL backend. Report generation reduced from 5 days to 4 hours.',
    impact: '-80% close time, zero errors in 18 months, CFO satisfaction score 9.5/10',
    github: '#',
    live: '#',
  },
  {
    id: 5,
    title: 'E-Commerce Analytics Suite',
    category: 'Dashboard',
    cover: '🛒',
    color: 'var(--accent2)',
    tools: ['Tableau', 'Google Analytics', 'SQL', 'Python'],
    client: 'D2C Brand',
    desc: 'Omnichannel analytics combining website, social, and sales data into one dashboard. Tracks customer journey from first touch to repeat purchase.',
    problem: 'Marketing team had no visibility into which channels drove revenue. Ad spend was allocated based on assumptions.',
    solution: 'Unified Tableau dashboard pulling from GA4, Meta Ads API, Shopify, and CRM via Python ETL. First-touch and multi-touch attribution models.',
    impact: '+35% ROAS improvement, 22% reduction in CAC, data-driven budget reallocation',
    github: '#',
    live: '#',
  },
  {
    id: 6,
    title: 'Executive Market Analysis',
    category: 'Analysis',
    cover: '📈',
    color: 'var(--accent3)',
    tools: ['Python', 'Pandas', 'Tableau', 'SQL'],
    client: 'Strategy Consulting Firm',
    desc: 'Competitor benchmarking and market sizing analysis for a $500M expansion decision. Includes Python-powered web scraping and statistical modeling.',
    problem: 'Executive team needed a comprehensive market view before committing to a new geography. Existing market research was 3 years old.',
    solution: 'Python scrapers for competitor pricing and positioning data. Statistical models for TAM/SAM/SOM estimation. Interactive Tableau story for board presentation.',
    impact: 'Decision made with confidence — $500M expansion greenlit. Competitor gaps identified, strategy refined.',
    github: '#',
    live: '#',
  },
];

export default function PortfolioPage() {
  const [active, setActive] = useState('All');
  const [selected, setSelected] = useState<typeof projects[0] | null>(null);

  const filtered = active === 'All' ? projects : projects.filter(p => p.category === active);

  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>
      <Navbar />
      <div className="boxed-wrapper" style={{ position: 'relative', marginBottom: '40px' }}>
        {/* ── Top-left Precision Crosshair ── */}
        <div style={{ position: 'absolute', top: '-20px', left: '-20px', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10 }}>
          <div style={{ position: 'absolute', width: '100%', height: '100%', border: '1px solid rgba(201, 243, 29, 0.4)', borderRadius: '50%' }} />
          <div style={{ position: 'absolute', width: '1px', height: '24px', background: 'linear-gradient(to bottom, #c9f31d, #00C9F2)' }} />
          <div style={{ position: 'absolute', width: '24px', height: '1px', background: 'linear-gradient(to right, #c9f31d, #00C9F2)' }} />
          <div style={{ position: 'absolute', width: '4px', height: '4px', background: '#c9f31d', borderRadius: '50%', boxShadow: '0 0 10px #c9f31d' }} />
        </div>

        <section className="section" style={{ paddingTop: 'clamp(8rem, 12vw, 10rem)' }}>
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} style={{ marginBottom: '3rem' }}>
            <div className="label-tech mb-4" style={{ letterSpacing: '0.3em' }}>PRO-PROJECTS</div>
            <h1 style={{ 
              fontSize: 'clamp(2.5rem, 6vw, 48px)', 
              fontWeight: 600,
              lineHeight: 1.1,
              marginBottom: '1.5rem',
              letterSpacing: '-0.02em'
            }}>
              Project <span style={{ 
                background: 'linear-gradient(135deg, #c9f31d 0%, #fff134 20%, #00d4ff 40%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}>Portfolio</span>
            </h1>
            <p style={{ color: 'var(--muted)', maxWidth: 560, lineHeight: 1.8, fontSize: '1.05rem' }}>
              High-fidelity analytics, technical automation, and scalable dashboard structures built for enterprise-grade growth.
            </p>
          </motion.div>

          {/* Filter tabs */}
          <div className="flex flex-wrap gap-3" style={{ marginBottom: '2.5rem' }}>
            {categories.map(cat => (
              <button
                key={cat}
                className={`filter-tab ${active === cat ? 'active' : ''}`}
                onClick={() => setActive(cat)}
                style={{
                  padding: '0.6rem 1.5rem',
                  fontSize: '11px',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  background: active === cat ? 'var(--accent)' : 'var(--tag-bg)',
                  color: active === cat ? '#000' : 'var(--muted)',
                  border: '1px solid var(--border)',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Grid */}
          <motion.div
            layout
            style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.5rem' }}
          >
            <AnimatePresence>
              {filtered.map((p) => (
                <motion.div
                  key={p.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.25 }}
                  className="card"
                  style={{ 
                    padding: '2rem',
                    borderLeft: '2px solid',
                    borderImage: 'linear-gradient(to bottom, #c9f31d, #00C9F2) 1',
                    background: 'rgba(8,8,8,0.5)',
                    cursor: 'pointer'
                  }}
                  onClick={() => setSelected(p)}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className="w-14 h-14 flex items-center justify-center text-2xl"
                      style={{ background: 'var(--tag-bg)', border: `1px solid ${p.color}33` }}
                    >
                      {p.cover}
                    </div>
                    <span className="tag" style={{ color: p.color, borderColor: `${p.color}44` }}>{p.category}</span>
                  </div>
                  <h3 style={{ fontSize: '1.05rem', marginBottom: '0.75rem', color: 'var(--text)' }}>{p.title}</h3>
                  <p style={{ color: 'var(--muted)', fontSize: '0.875rem', lineHeight: 1.7, marginBottom: '1.25rem' }}>
                    {p.desc.slice(0, 100)}…
                  </p>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {p.tools.map(t => <span key={t} className="tag">{t}</span>)}
                  </div>
                  <div className="flex items-center gap-1" style={{ color: p.color, fontSize: '0.875rem', fontWeight: 600 }}>
                    View Case Study <ChevronRight size={14} />
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.95)', zIndex: 1000,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              padding: '2rem',
            }}
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              onClick={e => e.stopPropagation()}
              style={{
                background: 'var(--surface)', border: '1px solid var(--border)',
                borderRadius: 'calc(var(--radius) * 1.5)', padding: 'clamp(1.5rem, 3vw, 2.5rem)',
                maxWidth: 720, width: '100%', maxHeight: '90vh', overflowY: 'auto',
                position: 'relative',
              }}
            >
              <button
                onClick={() => setSelected(null)}
                className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center"
                style={{ background: 'var(--tag-bg)', border: '1px solid var(--border)', color: 'var(--muted)', cursor: 'pointer' }}
              >
                <X size={16} />
              </button>

              <div className="flex items-center gap-4 mb-6">
                <div
                  className="w-16 h-16 flex items-center justify-center text-3xl"
                  style={{ background: 'var(--tag-bg)', border: `1px solid ${selected.color}33` }}
                >
                  {selected.cover}
                </div>
                <div>
                  <span className="tag" style={{ color: selected.color, borderColor: `${selected.color}44`, marginBottom: '0.5rem', display: 'inline-block' }}>{selected.category}</span>
                  <h2 style={{ fontSize: '1.4rem', color: 'var(--text)' }}>{selected.title}</h2>
                  <div className="mono" style={{ color: 'var(--muted)', fontSize: '0.8rem' }}>Client: {selected.client}</div>
                </div>
              </div>

              <p style={{ color: 'var(--muted)', lineHeight: 1.8, marginBottom: '1.5rem' }}>{selected.desc}</p>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
                {[
                  { label: '🔴 Problem', text: selected.problem },
                  { label: '✅ Solution', text: selected.solution },
                ].map(item => (
                  <div key={item.label} className="card" style={{ padding: '1.25rem' }}>
                    <div style={{ fontWeight: 700, marginBottom: '0.75rem', fontSize: '0.9rem', color: 'var(--text)' }}>{item.label}</div>
                    <p style={{ color: 'var(--muted)', fontSize: '0.85rem', lineHeight: 1.7 }}>{item.text}</p>
                  </div>
                ))}
              </div>

              <div
                className="flex items-center gap-2 px-4 py-3 mb-5"
                style={{ background: 'var(--tag-bg)', border: `1px solid ${selected.color}22` }}
              >
                <span style={{ fontSize: '1rem' }}>🎯</span>
                <div>
                  <div style={{ color: 'var(--muted)', fontSize: '0.75rem', marginBottom: '0.25rem' }}>Impact</div>
                  <div className="mono" style={{ color: selected.color, fontWeight: 700, fontSize: '0.9rem' }}>{selected.impact}</div>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-6">
                {selected.tools.map(t => <span key={t} className="tag">{t}</span>)}
              </div>

              <div className="flex gap-3">
                <a href={selected.github} className="btn-outline flex items-center gap-2" style={{ textDecoration: 'none', fontSize: '0.875rem' }}>
                  <GitBranch size={14} /> View Code
                </a>
                <a href={selected.live} className="btn-primary flex items-center gap-2" style={{ textDecoration: 'none', fontSize: '0.875rem', position: 'relative', zIndex: 1 }}>
                  <ExternalLink size={14} /> Live Preview
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
        {/* ── Bottom-right Precision Crosshair ── */}
        <div style={{ position: 'absolute', bottom: '-20px', right: '-20px', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10 }}>
          <div style={{ position: 'absolute', width: '100%', height: '100%', border: '1px solid rgba(201, 243, 29, 0.4)', borderRadius: '50%' }} />
          <div style={{ position: 'absolute', width: '1px', height: '24px', background: 'linear-gradient(to bottom, #c9f31d, #00C9F2)' }} />
          <div style={{ position: 'absolute', width: '24px', height: '1px', background: 'linear-gradient(to right, #c9f31d, #00C9F2)' }} />
          <div style={{ position: 'absolute', width: '4px', height: '4px', background: '#c9f31d', borderRadius: '50%', boxShadow: '0 0 10px #c9f31d' }} />
        </div>
      </div>
      <Footer />
    </div>
  );
}
