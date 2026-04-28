'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ExternalLink, GitBranch, X, ChevronRight } from 'lucide-react';
import Crosshair from '@/components/Crosshair';

const categories = ['All', 'Dashboard', 'Report', 'Analysis', 'Automation'];

const projects = [
  {
    id: 1,
    title: 'Sales Performance Ecosystem',
    category: 'Dashboard',
    image: 'https://images.unsplash.com/photo-1551288049-bbda38a5f452?auto=format&fit=crop&q=80&w=1000',
    color: 'var(--accent)',
    tools: ['Tableau', 'SQL', 'PostgreSQL', 'Python'],
    client: 'RetailMax Corp',
    desc: 'Unified sales tracking infrastructure covering $12M+ in annual revenue with automated ETL and predictive forecasting.',
    problem: 'Client had 15+ disconnected Excel reports with no unified view of revenue performance.',
    solution: 'Engineered a unified PostgreSQL data warehouse and Tableau dashboards with Python-automated ETL pipelines.',
    impact: '+28% Decision Velocity, -8hrs/week Manual Work, 95% Exec Adoption',
    github: 'https://github.com/sabledattatray/dattasable',
    live: 'https://dattasable.com/dashboards',
  },
  {
    id: 2,
    title: 'Supply Chain Intelligence',
    category: 'Analysis',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=1000',
    color: 'var(--accent2)',
    tools: ['Power BI', 'SQL', 'DAX', 'Python'],
    client: 'Global Manufacturing Ltd',
    desc: 'End-to-end supply chain visibility platform tracking 500+ SKUs and warehouse latency across 3 countries.',
    problem: 'Inventory overstock was costing $400K/year due to gut-feeling based procurement.',
    solution: 'Implemented demand forecasting models in Python with automated reorder alerts via Power BI.',
    impact: '-18% Inventory Cost, $72K Annual Savings, 100% Automated Reorders',
    github: 'https://github.com/sabledattatray/dattasable',
    live: 'https://dattasable.com/dashboards',
  },
  {
    id: 3,
    title: 'Workforce Retention Engine',
    category: 'Report',
    image: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&q=80&w=1000',
    color: 'var(--accent3)',
    tools: ['Python', 'Excel', 'Tableau'],
    client: 'HR Tech Startup',
    desc: 'ML-powered HR reporting system identifying attrition risks before they happen with automated pulse monitoring.',
    problem: 'HR spent 40 hours/month manually compiling attrition and payroll data from siloed systems.',
    solution: 'Developed custom Python connectors to HR APIs and built an automated Tableau reporting suite.',
    impact: '97% Time Saved, -15% Attrition Rate, Zero Reporting Errors',
    github: 'https://github.com/sabledattatray/dattasable',
    live: 'https://dattasable.com/blog',
  },
  {
    id: 4,
    title: 'Financial Close Automation',
    category: 'Automation',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1000',
    color: 'var(--accent)',
    tools: ['Excel', 'VBA', 'Python', 'SQL'],
    client: 'Fintech Company',
    desc: 'Automated board-ready financial reporting suite reducing monthly close time from 5 days to 4 hours.',
    problem: 'Monthly financial close was manual, error-prone, and took a full work week of executive time.',
    solution: 'Automated P&L and Cash Flow generation using Python/Pandas with a secure SQL backend.',
    impact: '80% Faster Close, 18 Months Error-Free, CFO Approval 9.5/10',
    github: 'https://github.com/sabledattatray/dattasable',
    live: 'https://dattasable.com/dashboards',
  },
  {
    id: 5,
    title: 'Omnichannel Marketing ROI',
    category: 'Dashboard',
    image: 'https://images.unsplash.com/photo-1533750349088-cd871a92f312?auto=format&fit=crop&q=80&w=1000',
    color: 'var(--accent2)',
    tools: ['Tableau', 'GA4', 'Shopify', 'Python'],
    client: 'D2C Brand',
    desc: 'Full-funnel marketing attribution dashboard tracking customer journey from first touch to repeat purchase.',
    problem: 'No visibility into cross-channel marketing ROI, leading to inefficient ad spend allocation.',
    solution: 'Integrated GA4, Meta, and Shopify APIs into a unified Tableau dashboard with custom attribution models.',
    impact: '+35% ROAS improvement, 22% reduction in CAC, Data-Driven Budgets',
    github: 'https://github.com/sabledattatray/dattasable',
    live: 'https://dattasable.com/dashboards',
  },
  {
    id: 6,
    title: 'Market Expansion Scraper',
    category: 'Analysis',
    image: 'https://images.unsplash.com/photo-1558494949-ef0109553f5b?auto=format&fit=crop&q=80&w=1000',
    color: 'var(--accent3)',
    tools: ['Python', 'BeautifulSoup', 'Tableau'],
    client: 'Strategy Consulting',
    desc: 'Competitor benchmarking and market sizing analysis for a $500M expansion decision via custom web scrapers.',
    problem: 'Consultants needed real-time competitor pricing data across 10 global markets.',
    solution: 'Built a distributed web scraping infrastructure in Python to feed a real-time Tableau pricing dashboard.',
    impact: '$500M Expansion Greenlit, Competitor Gaps Identified, Live Pricing',
    github: 'https://github.com/sabledattatray/dattasable',
    live: 'https://dattasable.com/blog',
  },
  {
    id: 7,
    title: 'Warehouse IoT Monitoring',
    category: 'Automation',
    image: 'https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?auto=format&fit=crop&q=80&w=1000',
    color: 'var(--accent)',
    tools: ['Python', 'MQTT', 'SQL', 'Looker'],
    client: 'Logistics Hub',
    desc: 'Real-time IoT sensor integration for monitoring warehouse temperature, humidity, and picker efficiency.',
    problem: 'Perishable goods worth $50k were lost annually due to undetected temperature spikes.',
    solution: 'Connected IoT sensors to a real-time Looker dashboard with instant SMS alerts for threshold breaches.',
    impact: 'Zero Product Loss, 100% Compliance, Real-time Visuals',
    github: 'https://github.com/sabledattatray/dattasable',
    live: 'https://dattasable.com/dashboards',
  },
  {
    id: 8,
    title: 'Retail Demand Forecaster',
    category: 'Analysis',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=1000',
    color: 'var(--accent2)',
    tools: ['Python', 'Scikit-Learn', 'Power BI'],
    client: 'National Fashion Chain',
    desc: 'Predictive modeling for seasonal demand across 200+ retail locations to optimize inventory levels.',
    problem: 'Understocking during peak seasons caused an estimated $1M in missed sales opportunities.',
    solution: 'Developed a random forest forecasting model in Python and deployed it via Power BI.',
    impact: '+12% Seasonal Sales, -15% Stockouts, Accurate Buy-plans',
    github: 'https://github.com/sabledattatray/dattasable',
    live: 'https://dattasable.com/dashboards',
  },
  {
    id: 9,
    title: 'Legal Document Classifier',
    category: 'Automation',
    image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=1000',
    color: 'var(--accent3)',
    tools: ['Python', 'NLP', 'PyPDF2', 'Excel'],
    client: 'Law Firm',
    desc: 'AI-powered document processing system that automatically classifies and extracts data from legal contracts.',
    problem: 'Paralegals spent 20 hours/week manually categorizing and entering data from thousands of PDF contracts.',
    solution: 'Built an NLP-based classification engine in Python that extracts key clauses into a structured database.',
    impact: '90% Processing Speedup, $40k/yr Cost Savings, High Accuracy',
    github: 'https://github.com/sabledattatray/dattasable',
    live: 'https://dattasable.com/blog',
  },
  {
    id: 10,
    title: 'Healthcare Patient Flow',
    category: 'Dashboard',
    image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=1000',
    color: 'var(--accent)',
    tools: ['Tableau', 'SQL', 'HealthConnect'],
    client: 'Regional Hospital',
    desc: 'Real-time patient flow and bed occupancy dashboard for hospital administrators to optimize resource allocation.',
    problem: 'Wait times in the ER were exceeding 6 hours due to poor visibility of bed availability.',
    solution: 'Integrated EMR data into a real-time Tableau dashboard with predictive wait-time models.',
    impact: '-25% ER Wait Times, +18% Bed Turnaround, Improved Care',
    github: 'https://github.com/sabledattatray/dattasable',
    live: 'https://dattasable.com/dashboards',
  },
  {
    id: 11,
    title: 'SaaS Churn Analytics',
    category: 'Report',
    image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&q=80&w=1000',
    color: 'var(--accent2)',
    tools: ['Looker', 'Python', 'BigQuery'],
    client: 'Fintech SaaS',
    desc: 'Deep-dive cohort analysis and churn prediction for a high-growth SaaS platform with $5M ARR.',
    problem: 'Company had high churn in the 3rd month but didn\'t know the underlying product triggers.',
    solution: 'Performed multi-dimensional cohort analysis in BigQuery and visualized findings in Looker.',
    impact: '-20% Churn in Segment A, Identified Product Gaps, Live LTV',
    github: 'https://github.com/sabledattatray/dattasable',
    live: 'https://dattasable.com/blog',
  },
  {
    id: 12,
    title: 'Energy Grid Load Forecast',
    category: 'Analysis',
    image: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&q=80&w=1000',
    color: 'var(--accent3)',
    tools: ['Python', 'XGBoost', 'Power BI'],
    client: 'Municipal Energy',
    desc: 'Machine learning model to predict peak energy demand on the local grid to prevent brownouts.',
    problem: 'Sudden heatwaves were causing localized energy shortages due to inaccurate demand predictions.',
    solution: 'Built an XGBoost regression model using weather and historical usage data, visualized in Power BI.',
    impact: '98% Forecast Accuracy, Zero Brownouts in 2025, Efficient Sourcing',
    github: 'https://github.com/sabledattatray/dattasable',
    live: 'https://dattasable.com/dashboards',
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
        <Crosshair position="tl" />

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
            className="grid-auto-fill-340"
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
                    overflow: 'hidden',
                    borderLeft: '2px solid',
                    borderImage: `linear-gradient(to bottom, ${p.color}, #00C9F2) 1`,
                    background: 'rgba(8,8,8,0.5)',
                    cursor: 'pointer'
                  }}
                  onClick={() => setSelected(p)}
                >
                  {/* Image area */}
                  <div style={{ height: 180, overflow: 'hidden', position: 'relative' }}>
                    <motion.img 
                      src={p.image} 
                      alt={p.title}
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.6 }}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.7 }}
                    />
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, var(--bg), transparent)' }} />
                    <div style={{ position: 'absolute', bottom: 12, left: 12 }}>
                      <span className="tag" style={{ color: p.color, borderColor: `${p.color}44`, background: 'var(--bg)' }}>{p.category}</span>
                    </div>
                  </div>

                  <div style={{ padding: '1.5rem' }}>
                    <h3 style={{ fontSize: '1.05rem', marginBottom: '0.75rem', color: 'var(--text)' }}>{p.title}</h3>
                    <p style={{ color: 'var(--muted)', fontSize: '0.875rem', lineHeight: 1.7, marginBottom: '1.25rem' }}>
                      {p.desc.slice(0, 100)}…
                    </p>
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {p.tools.slice(0, 3).map(t => <span key={t} className="tag">{t}</span>)}
                      {p.tools.length > 3 && <span className="tag">+{p.tools.length - 3}</span>}
                    </div>
                    <div className="flex items-center gap-1" style={{ color: p.color, fontSize: '0.875rem', fontWeight: 600 }}>
                      View Case Study <ChevronRight size={14} />
                    </div>
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
              position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.98)', zIndex: 1000,
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
                background: 'var(--bg)', border: '1px solid var(--border)',
                borderRadius: 0, padding: 0,
                maxWidth: 900, width: '100%', maxHeight: '95vh', overflowY: 'auto',
                position: 'relative',
              }}
            >
              <button
                onClick={() => setSelected(null)}
                className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center z-10"
                style={{ background: 'var(--tag-bg)', border: '1px solid var(--border)', color: 'var(--muted)', cursor: 'pointer' }}
              >
                <X size={20} />
              </button>

              <div style={{ height: 300, overflow: 'hidden', position: 'relative' }}>
                <img src={selected.image} alt={selected.title} style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.4 }} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, var(--bg), transparent)' }} />
                <div style={{ position: 'absolute', bottom: 30, left: 30 }}>
                  <div className="label-tech mb-2" style={{ color: selected.color }}>{selected.category} CASE_STUDY</div>
                  <h2 style={{ fontSize: 'clamp(1.5rem, 4vw, 2.5rem)', color: 'var(--text)', fontWeight: 700 }}>{selected.title}</h2>
                  <div className="mono" style={{ color: 'var(--muted)', fontSize: '0.9rem' }}>Architected for: {selected.client}</div>
                </div>
              </div>

              <div style={{ padding: '2.5rem' }}>
                <p style={{ color: 'var(--text)', fontSize: '1.1rem', lineHeight: 1.8, marginBottom: '2.5rem', opacity: 0.9 }}>{selected.desc}</p>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 380px), 1fr))', gap: '2rem', marginBottom: '2.5rem' }}>
                  {[
                    { label: '🔴 THE CHALLENGE', text: selected.problem, color: '#ff4d4d' },
                    { label: '✅ THE ARCHITECTURE', text: selected.solution, color: 'var(--accent)' },
                  ].map(item => (
                    <div key={item.label} style={{ borderLeft: `2px solid ${item.color}`, paddingLeft: '1.5rem' }}>
                      <div className="mono" style={{ fontWeight: 800, marginBottom: '1rem', fontSize: '0.8rem', color: item.color, letterSpacing: '0.2em' }}>{item.label}</div>
                      <p style={{ color: 'var(--muted)', fontSize: '0.95rem', lineHeight: 1.8 }}>{item.text}</p>
                    </div>
                  ))}
                </div>

                <div
                  style={{ background: 'rgba(201,243,29,0.05)', border: `1px solid ${selected.color}33`, padding: '2rem', marginBottom: '2.5rem', display: 'flex', alignItems: 'center', gap: '1.5rem' }}
                >
                  <div style={{ fontSize: '2.5rem' }}>🎯</div>
                  <div>
                    <div className="label-tech" style={{ fontSize: '10px', marginBottom: '0.5rem' }}>BUSINESS_IMPACT</div>
                    <div className="mono" style={{ color: selected.color, fontWeight: 700, fontSize: '1.2rem' }}>{selected.impact}</div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-8">
                  {selected.tools.map(t => <span key={t} className="tag" style={{ padding: '0.4rem 1rem' }}>{t}</span>)}
                </div>

                <div className="flex gap-4">
                  <a href={selected.github} className="btn-outline flex items-center gap-3" style={{ textDecoration: 'none', padding: '1rem 2rem' }}>
                    <GitBranch size={18} /> Documentation
                  </a>
                  <a href={selected.live} className="btn-primary flex items-center gap-3" style={{ textDecoration: 'none', padding: '1rem 2rem', position: 'relative', zIndex: 1 }}>
                    <ExternalLink size={18} /> Live Deployment
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
        <Crosshair position="br" />
      </div>
      <Footer />
    </div>
  );
}
