'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Image from 'next/image';
import { ExternalLink, GitBranch, X, ChevronRight } from 'lucide-react';

import Crosshair from '@/components/Crosshair';

const categories = ['All', 'Dashboard', 'Report', 'Analysis', 'Automation'];

const projects = [
  {
    id: 10,
    title: 'Surgical Analytics Forge (SDR-9 Engine)',
    category: 'Analysis',
    image: '/images/portfolio/surgical_forge.png',
    color: '#FF3B30',
    tools: ['Python', 'DuckDB', 'Next.js', 'Heuristic Logic'],
    client: 'Industrial Big Data Audit',
    desc: 'An autonomous, high-performance BI engine capable of auditing 10M+ records in sub-60 seconds using in-memory OLAP (DuckDB).',
    problem: 'Traditional BI tools struggle with massive datasets (500MB+), leading to laggy dashboards and high memory usage.',
    solution: 'Engineered a surgical Python bridge with DuckDB integration, capable of generating high-fidelity HTML dashboards and neural summaries autonomously.',
    impact: '10M Records Processed, Sub-60s Latency, 212k records/sec Speed',
    github: 'https://github.com/sabledattatray/forge-bi-engine',
    live: 'https://github.com/sabledattatray/forge-bi-engine',
  },
  {
    id: 9,
    title: 'Flagship Enterprise BI Engine (MTD/LMTD)',
    category: 'Analysis',
    image: '/images/dashboards/financial_pnl.png',
    color: 'var(--accent)',
    tools: ['Power BI', 'Advanced DAX', 'MTD/LMTD Logic', 'Executive Suite'],
    client: 'High-Fidelity Enterprise Showcase',
    desc: 'The technical magnum opus: A 3-page executive engine featuring complex time-intelligence DAX (MTD, LMTD) and seamless cross-page navigation.',
    problem: 'Executives needed multi-period comparisons (Month-over-Month) with sub-second recalculation across millions of regional records.',
    solution: 'This dashboard helps businesses track performance trends in real-time by comparing current sales (MTD) with last month\'s performance (LMTD) at the same point in time. It provides 10-second clarity for executive decision-making.',
    impact: '7-Day Technical Sprint, Complex DAX Orchestration, Flagship Status',
    github: 'https://github.com/sabledattatray/dattasable',
    live: 'https://app.powerbi.com/reportEmbed?reportId=31b010f4-3f62-4cbe-8524-9238cc2ebaca&autoAuth=true&embeddedDemo=true',
  },
  {
    id: 0,
    title: 'Production Performance Engine (Sept 2025)',
    category: 'Dashboard',
    image: '/images/dashboards/dashboard_1.png',
    color: 'var(--accent)',
    tools: ['Power BI', 'SQL', 'DAX', 'Real-Time Analytics'],
    client: 'Live Production Deployment',
    desc: 'An end-to-end performance benchmarking system delivering real-time strategic insights for 2025 production environments.',
    problem: 'Need for sub-second visibility into cross-departmental performance metrics with absolute data integrity.',
    solution: 'Engineered a high-performance Power BI architecture with optimized DAX measures and direct live-data integration.',
    impact: 'Live Production Proof, Sept 2025 Benchmarks, Sub-Second Latency',
    github: 'https://github.com/sabledattatray/dattasable',
    live: 'https://app.powerbi.com/view?r=eyJrIjoiOWJlMjkwZTUtMTBiZS00ZDVmLTkxNTItMThhZTY0MTE1N2ViIiwidCI6ImE4MDkzYjljLTFiYWUtNGExNS1hNTRjLTY4NDc5ZDFmMjVkZiJ9',
  },
  {
    id: 1,
    title: 'Sales Performance Ecosystem (Feb 2026)',
    category: 'Dashboard',
    image: '/images/dashboards/global_sales_kpi.png',
    color: 'var(--accent)',
    tools: ['Power BI', 'SQL', 'DAX', 'Sales Analytics'],
    client: 'Verified Production Asset',
    desc: 'A comprehensive sales tracking infrastructure identifying revenue leaks and growth opportunities across multi-regional datasets.',
    problem: 'Siloed sales data led to misallocated marketing budgets and missed quarterly targets.',
    solution: 'Developed a verified Power BI ecosystem featuring the "Datta Sable" architectural signature for executive transparency.',
    impact: 'Identity Verified, Feb 2026 Deployment, 100% Data Accuracy',
    github: 'https://github.com/sabledattatray/dattasable',
    live: 'https://app.powerbi.com/view?r=eyJrIjoiYzcyYzJkNWUtM2ZjNS00OWIxLWE5OWUtOWM2MmJlMTAyMjQwIiwidCI6ImE4MDkzYjljLTFiYWUtNGExNS1hNTRjLTY4NDc5ZDFmMjVkZiJ9',
  },
  {
    id: 7,
    title: 'Telecom Collection Intelligence (Vodafone)',
    category: 'Analysis',
    image: '/images/dashboards/fleet_logistics.png',
    color: 'var(--accent)',
    tools: ['Power BI', 'Telecom CRM', 'SQL', 'Predictive Analysis'],
    client: 'Telecom Sector (Postpaid)',
    desc: 'Real-time collection summary engine for postpaid telecom customer portfolios, optimizing recovery rates and identifying high-risk segments.',
    problem: 'Manual tracking of postpaid collections led to high aging buckets and inefficient recovery efforts.',
    solution: 'Engineered a unified collection dashboard for Vodafone postpaid datasets with automated aging analysis and recovery forecasting.',
    impact: 'Telecom Vertical Proof, Real-Time Aging Logic, Optimized Recovery',
    github: 'https://github.com/sabledattatray/dattasable',
    live: 'https://app.powerbi.com/view?r=eyJrIjoiN2IyNDg5MzEtNmUyYS00MjZlLWFkYmEtYjM4ZjA5ZjVjZDcxIiwidCI6ImE4MDkzYjljLTFiYWUtNGExNS1hNTRjLTY4NDc5ZDFmMjVkZiJ9',
  },
  {
    id: 8,
    title: 'Q-Commerce Performance Engine (Beta)',
    category: 'Dashboard',
    image: '/images/dashboards/ecommerce_journey.png',
    color: '#F9D100',
    tools: ['Power BI', 'ETL', 'Retail Analytics', 'WIP'],
    client: 'Blinkit Strategy Study',
    desc: 'An in-progress architectural study into quick-commerce revenue generation, analyzing average order value and sales velocity across dynamic SKU categories.',
    problem: 'Q-Commerce requires sub-minute decision fidelity to manage highly perishable inventory and rapid delivery windows.',
    solution: 'Beta-stage development of a real-time revenue engine focusing on SKU-level performance and delivery latency (40% Architectural Completion).',
    impact: 'WIP: Revenue Logic Established, Category Mapping Complete, Beta-Live',
    github: 'https://github.com/sabledattatray/dattasable',
    live: 'https://app.powerbi.com/view?r=eyJrIjoiMTQxZTc5NzctMjBiZi00OTJjLThmMDYtMjRmMWE2OTAyMWU1IiwidCI6ImE4MDkzYjljLTFiYWUtNGExNS1hNTRjLTY4NDc5ZDFmMjVkZiJ9',
  },
  {
    id: 2,
    title: 'Supply Chain Intelligence',
    category: 'Analysis',
    image: '/images/portfolio/supply_chain.jpg',
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
    image: '/images/portfolio/hr.jpg',
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
    image: '/images/portfolio/finance.jpg',
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
    image: '/images/portfolio/marketing.jpg',
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
    image: '/images/blog/python_scraper_hero_1777410123458.webp',
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
    id: 13,
    title: 'Warehouse IoT Monitoring',
    category: 'Automation',
    image: '/images/portfolio/iot.jpg',
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
    id: 14,
    title: 'Retail Demand Forecaster',
    category: 'Analysis',
    image: '/images/portfolio/retail.jpg',
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
    id: 15,
    title: 'Legal Document Classifier',
    category: 'Automation',
    image: '/images/portfolio/legal.jpg',
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
    id: 16,
    title: 'Healthcare Patient Flow',
    category: 'Dashboard',
    image: '/images/portfolio/healthcare.jpg',
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
    id: 17,
    title: 'SaaS Churn Analytics',
    category: 'Report',
    image: '/images/portfolio/saas.jpg',
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
    id: 18,
    title: 'Energy Grid Load Forecast',
    category: 'Analysis',
    image: '/images/portfolio/energy.jpg',
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

export default function PortfolioPage({ searchParams }: { searchParams: any }) {
  // Use a hack for client components to get search params if needed, or just use useSearchParams
  const [active, setActive] = useState('All');
  const [selected, setSelected] = useState<typeof projects[0] | null>(null);

  // We'll use useEffect to handle the search params since this is a client component
  useState(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const cat = params.get('category');
      if (cat && categories.includes(cat)) {
        setActive(cat);
      }
    }
  });

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
              Project <span className="hero-title">Portfolio</span>
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
                  color: active === cat ? 'var(--btn-primary-text)' : 'var(--muted)',
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
            style={{ marginBottom: '6rem' }}
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
                  className="card group"
                  style={{ 
                    overflow: 'hidden',
                    borderLeft: '2px solid',
                    borderImage: `linear-gradient(to bottom, ${p.color}, #00C9F2) 1`,
                    cursor: 'pointer'
                  }}
                  onClick={() => setSelected(p)}
                >
                  {/* Image area */}
                  <div style={{ height: 180, overflow: 'hidden', position: 'relative' }}>
                    <Image 
                      src={p.image} 
                      alt={p.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      style={{ objectFit: 'cover' }}
                      className="transition-transform duration-500 group-hover:scale-110"
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

          {/* Peer Reviews / System Validation */}
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            style={{ 
              padding: '4rem', 
              background: 'var(--surface2)', 
              border: '1px solid var(--border)',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            <div className="label-tech mb-8" style={{ justifyContent: 'center' }}>SYSTEM-VALIDATION</div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { name: "Senior VP, Operations", company: "RetailMax Corp", text: "The Sales Performance Ecosystem transformed our regional reporting. Data that took days to compile is now available in real-time." },
                { name: "Chief Financial Officer", company: "Fintech Co.", text: "Datta's automation suite reduced our monthly close by 80%. Unprecedented accuracy and technical precision." },
                { name: "HR Director", company: "Tech Ventures", text: "The attrition prediction models allowed us to proactively retain top talent. A game-changer for our workforce strategy." }
              ].map((rev, idx) => (
                <div key={idx} style={{ position: 'relative' }}>
                  <div style={{ fontSize: '2rem', color: 'var(--accent)', opacity: 0.2, marginBottom: '-1rem' }}>"</div>
                  <p style={{ color: 'var(--muted)', fontSize: '0.9rem', lineHeight: 1.7, fontStyle: 'italic', marginBottom: '1.5rem' }}>{rev.text}</p>
                  <div className="mono" style={{ fontSize: '10px', fontWeight: 700, color: 'var(--text)', letterSpacing: '0.1em' }}>{rev.name.toUpperCase()}</div>
                  <div className="mono" style={{ fontSize: '9px', color: 'var(--accent)', letterSpacing: '0.05em' }}>// {rev.company}</div>
                </div>
              ))}
            </div>
            {/* Background pattern */}
            <div style={{ position: 'absolute', top: 0, right: 0, width: '150px', height: '150px', background: 'radial-gradient(circle at top right, var(--accent) 0%, transparent 70%)', opacity: 0.05 }} />
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
              position: 'fixed', inset: 0, background: 'var(--navbar-bg)', backdropFilter: 'blur(10px)', zIndex: 1000,
              display: 'flex', alignItems: 'flex-start', justifyContent: 'center',
              padding: 'clamp(0.5rem, 3vw, 2rem)',
              overflowY: 'auto',
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
                maxWidth: 900, width: '100%',
                position: 'relative',
                marginTop: 'auto',
                marginBottom: 'auto',
              }}
            >
              <button
                onClick={() => setSelected(null)}
                className="absolute w-10 h-10 flex items-center justify-center z-10"
                style={{ top: 'clamp(0.75rem, 3vw, 1.5rem)', right: 'clamp(0.75rem, 3vw, 1.5rem)', background: 'var(--tag-bg)', border: '1px solid var(--border)', color: 'var(--muted)', cursor: 'pointer' }}
              >
                <X size={20} />
              </button>

              <div style={{ height: 'clamp(180px, 35vw, 300px)', overflow: 'hidden', position: 'relative' }}>
                <Image 
                  src={selected.image} 
                  alt={selected.title} 
                  fill
                  style={{ objectFit: 'cover', opacity: 0.4 }} 
                />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, var(--bg), transparent)' }} />
                <div style={{ position: 'absolute', bottom: 'clamp(12px, 3vw, 30px)', left: 'clamp(12px, 4vw, 30px)', right: '3.5rem' }}>
                  <div className="label-tech mb-2" style={{ color: selected.color }}>{selected.category} CASE_STUDY</div>
                  <h2 style={{ fontSize: 'clamp(1.2rem, 4vw, 2.5rem)', color: 'var(--text)', fontWeight: 700 }}>{selected.title}</h2>
                  <div className="mono" style={{ color: 'var(--muted)', fontSize: 'clamp(0.75rem, 2.5vw, 0.9rem)' }}>Architected for: {selected.client}</div>
                </div>
              </div>

              <div style={{ padding: 'clamp(1rem, 5vw, 2.5rem)' }}>
                <p style={{ color: 'var(--text)', fontSize: 'clamp(0.9rem, 2.5vw, 1.1rem)', lineHeight: 1.8, marginBottom: '2.5rem', opacity: 0.9 }}>{selected.desc}</p>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 380px), 1fr))', gap: '2rem', marginBottom: '2.5rem' }}>
                  {[
                    { label: '🔴 THE CHALLENGE', text: selected.problem, color: 'var(--accent)' },
                    { label: '✅ THE ARCHITECTURE', text: selected.solution, color: 'var(--accent)' },
                  ].map(item => (
                    <div key={item.label} style={{ borderLeft: `2px solid ${item.color}`, paddingLeft: '1.5rem' }}>
                      <div className="mono" style={{ fontWeight: 800, marginBottom: '1rem', fontSize: '0.8rem', color: item.color, letterSpacing: '0.2em' }}>{item.label}</div>
                      <p style={{ color: 'var(--muted)', fontSize: '0.95rem', lineHeight: 1.8 }}>{item.text}</p>
                    </div>
                  ))}
                </div>

                <div
                  style={{ background: 'var(--surface2)', border: `1px solid var(--border)`, padding: 'clamp(1rem, 4vw, 2rem)', marginBottom: '2.5rem', display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}
                >
                  <div style={{ fontSize: 'clamp(1.75rem, 5vw, 2.5rem)' }}>🎯</div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div className="label-tech" style={{ fontSize: '10px', marginBottom: '0.5rem' }}>BUSINESS_IMPACT</div>
                    <div className="mono" style={{ color: selected.color, fontWeight: 700, fontSize: 'clamp(0.9rem, 3vw, 1.2rem)', wordBreak: 'break-word' }}>{selected.impact}</div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-8">
                  {selected.tools.map(t => <span key={t} className="tag" style={{ padding: '0.4rem 1rem' }}>{t}</span>)}
                </div>

                <div className="flex flex-wrap gap-3">
                  <a href={selected.github} className="btn-outline flex items-center gap-3" style={{ textDecoration: 'none', padding: 'clamp(0.65rem, 2vw, 1rem) clamp(1rem, 4vw, 2rem)', flex: '1 1 auto', justifyContent: 'center' }}>
                    <GitBranch size={18} /> Documentation
                  </a>
                  <a href={selected.live} className="btn-primary flex items-center gap-3" style={{ textDecoration: 'none', padding: 'clamp(0.65rem, 2vw, 1rem) clamp(1rem, 4vw, 2rem)', position: 'relative', zIndex: 1, flex: '1 1 auto', justifyContent: 'center' }}>
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
