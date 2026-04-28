'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ExternalLink, Filter, BarChart3, TrendingUp, PieChart, Activity } from 'lucide-react';

const dashboards = [
  // --- SALES (4) ---
  {
    id: 1,
    title: 'Global Sales KPI Tracker',
    category: 'Sales',
    tool: 'Tableau',
    color: 'var(--accent)',
    icon: '📊',
    image: '/images/dashboards/dashboard_1.png',
    desc: 'Real-time tracking of $12M+ in annual revenue with region/product/rep drilldown and YoY trend forecasting.',
    embed: 'https://public.tableau.com/views/SuperStoreSalesDashboard_16874839032190/Dashboard1?:embed=y&:showVizHome=no&:display_count=n&:origin=viz_share_link',
    tags: ['Revenue', 'KPI', 'Trend'],
    metrics: ['$12M+ tracked', '15 markets', '200+ SKUs'],
  },
  {
    id: 7,
    title: 'Sales Pipeline Velocity',
    category: 'Sales',
    tool: 'Power BI',
    color: 'var(--accent)',
    icon: '📈',
    image: '/images/blog/sql-window.webp',
    desc: 'Analysis of deal movement through the funnel, identifying bottlenecks and predicting quarterly closure rates.',
    embed: null,
    tags: ['Pipeline', 'Forecasting', 'Funnel'],
    metrics: ['+22% Velocity', '$4.5M Pipeline', '85% Accuracy'],
  },
  {
    id: 8,
    title: 'Customer Churn Prediction',
    category: 'Sales',
    tool: 'Python',
    color: 'var(--accent)',
    icon: '📉',
    image: '/images/blog/tableau-vs-powerbi.webp',
    desc: 'ML-driven churn risk assessment integrated with Tableau for proactive account management and retention.',
    embed: null,
    tags: ['Churn', 'Retention', 'ML'],
    metrics: ['-15% Churn', 'Risk Scoring', '90% Precision'],
  },
  {
    id: 9,
    title: 'Regional Sales Performance',
    category: 'Sales',
    tool: 'Looker',
    color: 'var(--accent)',
    icon: '🗺️',
    image: '/images/blog/retail_analytics_hero_1777410051638.webp',
    desc: 'Geospatial analysis of sales performance across 50 states, correlated with local economic indicators.',
    embed: null,
    tags: ['Geo-spatial', 'Regional', 'Growth'],
    metrics: ['50 States', 'Live Updates', 'Zip-level Drill'],
  },

  // --- OPERATIONS (4) ---
  {
    id: 2,
    title: 'Supply Chain Performance',
    category: 'Operations',
    tool: 'Power BI',
    color: 'var(--accent2)',
    icon: '🔗',
    image: '/images/dashboards/dashboard_2.png',
    desc: 'End-to-end supply chain visibility — inventory, supplier SLA, logistics cost and demand forecasting.',
    embed: null,
    tags: ['Supply Chain', 'Inventory', 'Logistics'],
    metrics: ['500+ SKUs', '3 countries', '-18% cost'],
  },
  {
    id: 10,
    title: 'Warehouse Throughput Monitor',
    category: 'Operations',
    tool: 'Tableau',
    color: 'var(--accent2)',
    icon: '📦',
    image: '/images/blog/bi_performance_hero_1777410226286.webp',
    desc: 'Real-time monitoring of warehouse efficiency, picker performance, and order-to-shipment latency.',
    embed: null,
    tags: ['Warehouse', 'Efficiency', 'Logistics'],
    metrics: ['2.4k orders/hr', '99.8% Accuracy', '-12m Latency'],
  },
  {
    id: 11,
    title: 'Predictive Maintenance Log',
    category: 'Operations',
    tool: 'Python',
    color: 'var(--accent2)',
    icon: '⚙️',
    image: '/images/blog/python_automation_hero_1777410033671.webp',
    desc: 'IoT sensor data analysis to predict equipment failure before it occurs, reducing unplanned downtime.',
    embed: null,
    tags: ['IoT', 'Maintenance', 'Predictive'],
    metrics: ['-30% Downtime', '$200k Saved', 'Live Sensors'],
  },
  {
    id: 12,
    title: 'Fleet Logistics Optimization',
    category: 'Operations',
    tool: 'Power BI',
    color: 'var(--accent2)',
    icon: '🚛',
    image: '/images/blog/sql_joins_hero_1777410104986.webp',
    desc: 'Route optimization and fuel efficiency tracking for a 500-vehicle fleet across international borders.',
    embed: null,
    tags: ['Fleet', 'Routing', 'Fuel'],
    metrics: ['500 Vehicles', '-15% Fuel', 'GPS Integrated'],
  },

  // --- HR (4) ---
  {
    id: 3,
    title: 'HR Workforce Analytics',
    category: 'HR',
    tool: 'Tableau',
    color: 'var(--accent3)',
    icon: '👥',
    image: '/images/dashboards/dashboard_3.webp',
    desc: 'Attrition prediction, headcount planning, performance distribution, and diversity metrics.',
    embed: null,
    tags: ['Attrition', 'Headcount', 'D&I'],
    metrics: ['2,000+ employees', '97% time saved', '12 KPIs'],
  },
  {
    id: 13,
    title: 'Talent Acquisition Funnel',
    category: 'HR',
    tool: 'Looker',
    color: 'var(--accent3)',
    icon: '🎯',
    image: '/images/blog/data-storytelling.webp',
    desc: 'Tracking recruitment efficiency, time-to-hire, and cost-per-hire across multiple sourcing channels.',
    embed: null,
    tags: ['Recruitment', 'Hiring', 'ROI'],
    metrics: ['-20% Time-to-Hire', '5 Channels', 'ATS Integrated'],
  },
  {
    id: 14,
    title: 'Employee Performance Matrix',
    category: 'HR',
    tool: 'Power BI',
    color: 'var(--accent3)',
    icon: '🌟',
    image: '/images/blog/bi-career.webp',
    desc: 'Automated 9-box grid for succession planning and performance vs. potential analysis.',
    embed: null,
    tags: ['Performance', 'Succession', 'Growth'],
    metrics: ['100% Automated', 'Bias-Free', 'Quarterly Review'],
  },
  {
    id: 15,
    title: 'Workplace Diversity Pulse',
    category: 'HR',
    tool: 'Tableau',
    color: 'var(--accent3)',
    icon: '🌍',
    image: '/images/blog/data_democratization_hero_1777410089898.webp',
    desc: 'Real-time D&I reporting, ensuring compliance with global standards and tracking equity benchmarks.',
    embed: null,
    tags: ['Diversity', 'Equity', 'Inclusion'],
    metrics: ['Global Compliance', 'Live Pulse', 'Pay Equity'],
  },

  // --- FINANCE (4) ---
  {
    id: 5,
    title: 'Financial P&L Dashboard',
    category: 'Finance',
    tool: 'Power BI',
    color: 'var(--accent2)',
    icon: '💰',
    image: '/images/dashboards/dashboard_5.webp',
    desc: 'Board-ready P&L, cash flow waterfall, budget variance heatmap, and departmental cost breakdown.',
    embed: null,
    tags: ['P&L', 'Cash Flow', 'Budget'],
    metrics: ['5-day → 4hr close', '18mo zero errors', 'CFO 9.5/10'],
  },
  {
    id: 16,
    title: 'Cash Flow Forecasting',
    category: 'Finance',
    tool: 'Power BI',
    color: 'var(--accent2)',
    icon: '🌊',
    image: '/images/blog/financial_bi_hero_1777410069046.webp',
    desc: '12-month rolling cash flow forecast with multiple sensitivity analysis scenarios for executive planning.',
    embed: null,
    tags: ['Cash Flow', 'Forecast', 'Scenarios'],
    metrics: ['$50M+ Managed', '95% Accuracy', 'Rolling 12M'],
  },
  {
    id: 17,
    title: 'SaaS Unit Economics',
    category: 'Finance',
    tool: 'Looker',
    color: 'var(--accent2)',
    icon: '📊',
    image: '/images/blog/postgres_vs_snowflake_hero_1777410017107.webp',
    desc: 'Real-time LTV/CAC, MRR movements, and cohort-based retention analysis for high-growth startups.',
    embed: null,
    tags: ['SaaS', 'LTV', 'CAC'],
    metrics: ['Live MRR', 'Cohort Analysis', '+4.5x LTV/CAC'],
  },
  {
    id: 18,
    title: 'Expense Audit & Control',
    category: 'Finance',
    tool: 'Python',
    color: 'var(--accent2)',
    icon: '🔎',
    image: '/images/blog/ai_governance_hero_1777410191025.webp',
    desc: 'AI-powered anomaly detection in corporate expenses, identifying potential fraud or waste instantly.',
    embed: null,
    tags: ['Audit', 'Fraud', 'Control'],
    metrics: ['-25% Waste', 'Instant Alerts', 'Full Audit Trail'],
  },

  // --- MARKETING (4) ---
  {
    id: 4,
    title: 'E-Commerce Customer Journey',
    category: 'Marketing',
    tool: 'Tableau',
    color: 'var(--accent)',
    icon: '🛒',
    image: '/images/dashboards/dashboard_4.webp',
    desc: 'Omnichannel attribution, customer lifetime value cohorts, funnel analysis, and campaign ROI tracking.',
    embed: null,
    tags: ['Attribution', 'LTV', 'Funnel'],
    metrics: ['+35% ROAS', '-22% CAC', '4 channels'],
  },
  {
    id: 6,
    title: 'Marketing Campaign Analytics',
    category: 'Marketing',
    tool: 'Looker',
    color: 'var(--accent3)',
    icon: '📢',
    image: '/images/dashboards/dashboard_6.webp',
    desc: 'Multi-channel campaign performance, A/B test results, audience segmentation, and real-time spend tracking.',
    embed: null,
    tags: ['Campaigns', 'A/B Testing', 'Segments'],
    metrics: ['8 channels', '$500K spend', 'Real-time'],
  },
  {
    id: 19,
    title: 'Social Media Sentiment Engine',
    category: 'Marketing',
    tool: 'Python',
    color: 'var(--accent3)',
    icon: '🔥',
    image: '/images/blog/nlq_engines_hero_1777410174899.webp',
    desc: 'Real-time sentiment analysis of brand mentions across Twitter, Reddit, and LinkedIn using NLP.',
    embed: null,
    tags: ['NLP', 'Social', 'Sentiment'],
    metrics: ['10k mentions/day', '85% Sentiment Acc', 'Live Alerts'],
  },
  {
    id: 20,
    title: 'SEO Performance Master',
    category: 'Marketing',
    tool: 'Looker',
    color: 'var(--accent3)',
    icon: '🚀',
    image: '/images/blog/generative_ai_hero_1777410154583.webp',
    desc: 'Comprehensive SEO health tracking, keyword rankings, backlink profiles, and organic traffic growth.',
    embed: null,
    tags: ['SEO', 'Keywords', 'Traffic'],
    metrics: ['+150% Traffic', 'Top 3 Ranking', 'Full GSC Integration'],
  },
];

const categories = ['All', 'Sales', 'Operations', 'HR', 'Finance', 'Marketing'];
const tools = ['All Tools', 'Tableau', 'Power BI', 'Looker', 'Python'];

const toolColors: Record<string, string> = {
  Tableau: 'var(--accent)',
  'Power BI': 'var(--accent2)',
  Looker: 'var(--accent3)',
  Python: '#3776ab',
};

export default function DashboardsPage() {
  const [activeCat, setActiveCat] = useState('All');
  const [activeTool, setActiveTool] = useState('All Tools');
  const [preview, setPreview] = useState<typeof dashboards[0] | null>(null);

  const filtered = dashboards.filter(d => {
    const catMatch = activeCat === 'All' || d.category === activeCat;
    const toolMatch = activeTool === 'All Tools' || d.tool === activeTool;
    return catMatch && toolMatch;
  });

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
          {/* Header */}
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} style={{ marginBottom: '3rem' }}>
            <div className="label-tech mb-4" style={{ letterSpacing: '0.3em' }}>INTERACTIVE-ANALYTICS</div>
            <h1 style={{ 
              fontSize: 'clamp(2.5rem, 6vw, 48px)', 
              fontWeight: 600,
              lineHeight: 1.1,
              marginBottom: '1.5rem',
              letterSpacing: '-0.02em'
            }}>
              Dashboard <span style={{ 
                background: 'linear-gradient(135deg, #c9f31d 0%, #fff134 20%, #00d4ff 40%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}>Showcase</span>
            </h1>
            <p style={{ color: 'var(--muted)', maxWidth: 560, lineHeight: 1.8, marginBottom: '2.5rem', fontSize: '1.05rem' }}>
              Real-world analytics platforms engineered for high-stakes decision making. Filter by industry or stack.
            </p>

            {/* Tool stats grid */}
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
              gap: '1px', 
              background: 'var(--border)', 
              border: '1px solid var(--border)',
              marginBottom: '3.5rem',
              overflow: 'hidden'
            }}>
              {[
                { icon: <BarChart3 size={18} />, label: 'Tableau Deployment', count: '30+', color: '#c9f31d', sub: 'Enterprise Visuals' },
                { icon: <Activity size={18} />, label: 'Power BI Ecosystem', count: '15+', color: '#00C9F2', sub: 'M365 Integrated' },
                { icon: <PieChart size={18} />, label: 'Looker Analytics', count: '5+', color: '#00d4ff', sub: 'BigQuery Ready' },
                { icon: <TrendingUp size={18} />, label: 'Aggregate Logic', count: '50+', color: '#fff', sub: 'Verified Logs' },
              ].map(item => (
                <div key={item.label} style={{ background: 'var(--bg)', padding: '1.5rem', position: 'relative' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                    <span style={{ color: item.color, opacity: 0.8 }}>{item.icon}</span>
                    <span className="mono" style={{ fontSize: '1.5rem', fontWeight: 700, color: item.color }}>{item.count}</span>
                  </div>
                  <div style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--text)', marginBottom: '4px' }}>{item.label}</div>
                  <div style={{ fontSize: '10px', color: 'var(--muted)', letterSpacing: '0.05em' }}>{item.sub}</div>
                  <div style={{ position: 'absolute', bottom: 0, left: 0, width: '40px', height: '2px', background: item.color, opacity: 0.4 }} />
                </div>
              ))}
            </div>

            {/* Filter Control Center */}
            <div style={{ 
              background: 'rgba(8,8,8,0.3)', 
              border: '1px solid var(--border)', 
              padding: '1.5rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '1.25rem'
            }}>
              <div className="flex flex-wrap items-center gap-4">
                <div className="mono" style={{ fontSize: '9px', fontWeight: 700, color: 'var(--accent)', background: 'rgba(201,243,29,0.1)', padding: '2px 8px', border: '1px solid rgba(201,243,29,0.2)' }}>
                  CAT_FILTER:
                </div>
                <div className="flex flex-wrap gap-2">
                  {categories.map(cat => (
                    <button 
                      key={cat} 
                      className={`filter-tab ${activeCat === cat ? 'active' : ''}`} 
                      onClick={() => setActiveCat(cat)}
                      style={{
                        padding: '0.4rem 1rem',
                        fontSize: '10px',
                        fontWeight: 600,
                        textTransform: 'uppercase',
                        letterSpacing: '0.1em',
                        background: activeCat === cat ? 'var(--accent)' : 'transparent',
                        color: activeCat === cat ? '#000' : 'var(--muted)',
                        border: '1px solid var(--border)',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        borderRadius: 0
                      }}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              <div style={{ height: '1px', background: 'var(--border)', opacity: 0.5 }} />

              <div className="flex flex-wrap items-center gap-4">
                <div className="mono" style={{ fontSize: '9px', fontWeight: 700, color: 'var(--accent2)', background: 'rgba(139,92,246,0.1)', padding: '2px 8px', border: '1px solid rgba(139,92,246,0.2)' }}>
                  TOOL_FILTER:
                </div>
                <div className="flex flex-wrap gap-2">
                  {tools.map(t => (
                    <button 
                      key={t} 
                      className={`filter-tab ${activeTool === t ? 'active' : ''}`} 
                      onClick={() => setActiveTool(t)}
                      style={{
                        padding: '0.4rem 1rem',
                        fontSize: '10px',
                        fontWeight: 600,
                        textTransform: 'uppercase',
                        letterSpacing: '0.1em',
                        background: activeTool === t ? 'var(--accent2)' : 'transparent',
                        color: activeTool === t ? '#fff' : 'var(--muted)',
                        border: '1px solid var(--border)',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        borderRadius: 0
                      }}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Dashboard grid */}
          <motion.div layout style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '1.5rem' }}>
            <AnimatePresence>
              {filtered.map((d, i) => (
                  <motion.div
                  key={d.id}
                  layout
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ delay: i * 0.06 }}
                  className="card"
                  style={{ 
                    overflow: 'hidden',
                    borderLeft: '2px solid',
                    borderImage: `linear-gradient(to bottom, ${d.color}, #00C9F2) 1`,
                    background: 'rgba(8,8,8,0.5)'
                  }}
                >
                  {/* Preview area */}
                  <div
                    style={{
                      height: 200,
                      background: 'var(--tag-bg)',
                      border: `1px solid ${d.color}22`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      position: 'relative',
                      overflow: 'hidden',
                    }}
                  >
                    {d.image ? (
                      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
                        <motion.img 
                          src={d.image} 
                          alt={d.title}
                          whileHover={{ scale: 1.1 }}
                          transition={{ duration: 0.6 }}
                          style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.8 }}
                        />
                        <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(to top, var(--bg), transparent)` }} />
                      </div>
                    ) : (
                      <span style={{ fontSize: '5rem' }}>{d.icon}</span>
                    )}
                    {/* Tool badge */}
                    <div style={{ position: 'absolute', top: 12, right: 12, background: 'var(--bg)', border: `1px solid ${d.color}44`, padding: '0.3rem 0.75rem', fontSize: '10px', fontWeight: 700, color: d.color, textTransform: 'uppercase', fontFamily: 'JetBrains Mono, monospace', zIndex: 2 }}>
                      {d.tool}
                    </div>
                  </div>

                  <div style={{ padding: '1.5rem' }}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="tag" style={{ color: d.color, borderColor: `${d.color}44`, fontSize: '0.7rem' }}>{d.category}</span>
                    </div>
                    <h3 style={{ fontSize: '1.05rem', marginBottom: '0.6rem', color: 'var(--text)' }}>{d.title}</h3>
                    <p style={{ color: 'var(--muted)', fontSize: '0.85rem', lineHeight: 1.7, marginBottom: '1rem' }}>{d.desc}</p>

                    {/* Metrics */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {d.metrics.map(m => (
                        <span key={m} className="mono" style={{ background: 'var(--tag-bg)', border: `1px solid ${d.color}22`, padding: '0.2rem 0.6rem', fontSize: '10px', color: d.color, fontWeight: 700, textTransform: 'uppercase' }}>{m}</span>
                      ))}
                    </div>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {d.tags.map(t => <span key={t} className="tag">{t}</span>)}
                    </div>

                    <button
                      onClick={() => setPreview(d)}
                      className="w-full btn-outline flex items-center justify-center gap-2"
                      style={{ fontSize: '0.85rem' }}
                    >
                      <ExternalLink size={14} /> View Dashboard
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {filtered.length === 0 && (
            <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--muted)' }}>No dashboards match these filters.</div>
          )}
        </div>
      </section>

      {/* Preview modal */}
      <AnimatePresence>
        {preview && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.98)', zIndex: 1000, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}
            onClick={() => setPreview(null)}
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              onClick={e => e.stopPropagation()}
              style={{ width: '100%', maxWidth: 900, background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: 0, overflow: 'hidden' }}
            >
              <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <h3 style={{ fontSize: '1.1rem', color: 'var(--text)', marginBottom: '0.25rem' }}>{preview.title}</h3>
                  <span className="mono" style={{ color: preview.color, fontSize: '0.8rem' }}>{preview.tool} · {preview.category}</span>
                </div>
                <button
                  onClick={() => setPreview(null)}
                  style={{ background: 'var(--tag-bg)', border: '1px solid var(--border)', padding: '0.4rem 0.8rem', cursor: 'pointer', color: 'var(--muted)', fontSize: '10px', fontWeight: 700, textTransform: 'uppercase' }}
                >
                  Close ✕
                </button>
              </div>

              {/* Embed or placeholder */}
              <div style={{ height: 480, background: 'var(--bg)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '1.5rem' }}>
                {preview.embed ? (
                  <iframe
                    src={preview.embed}
                    width="100%"
                    height="480"
                    frameBorder="0"
                    style={{ border: 'none' }}
                    title={preview.title}
                    allowFullScreen
                  />
                ) : (
                  <>
                    <div style={{ fontSize: '5rem' }}>{preview.icon}</div>
                    <div style={{ textAlign: 'center', color: 'var(--muted)', maxWidth: 400, lineHeight: 1.7 }}>
                      <p style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text)', marginBottom: '0.5rem' }}>Live Preview Available on Request</p>
                      <p style={{ fontSize: '0.875rem' }}>This dashboard was built under NDA. Contact me for a live demo walkthrough.</p>
                    </div>
                    <a href="/contact" className="btn-primary" style={{ textDecoration: 'none', fontSize: '0.875rem' }}>Request Demo →</a>
                  </>
                )}
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
