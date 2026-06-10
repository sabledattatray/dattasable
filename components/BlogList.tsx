'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { Search, Clock, ArrowRight } from 'lucide-react';

import Newsletter from './Newsletter';

interface Post {
  id: string;
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  content: string;
  readTime: number;
  date: string;
  color: string | null;
  icon: string | null;
  image: string | null;
}

const PRIORITY_READING_LINKS = [
  {
    title: 'Dashboard Psychology',
    href: '/blog/psychology-of-high-fidelity-dashboard-design',
    context: 'High-fidelity BI design'
  },
  {
    title: 'Execution Chain Infrastructure',
    href: '/blog/execution-chain-infrastructure-explained',
    context: 'Agent workflow systems'
  },
  {
    title: 'Natural Language Query Engines',
    href: '/blog/natural-language-query-engines',
    context: 'Conversational analytics'
  },
  {
    title: 'Autonomous AI Agent Workflows',
    href: '/blog/mastering-autonomous-ai-agents-workflows-2026',
    context: 'AI orchestration'
  },
  {
    title: 'AI Agents Replacing Apps',
    href: '/blog/how-ai-agents-are-replacing-apps-2026',
    context: 'Product architecture'
  },
  {
    title: 'Next.js Performance Manifesto',
    href: '/blog/nextjs-15-react-19-performance-manifesto-2026',
    context: 'Web performance'
  },
  {
    title: 'Deep Work Protocol',
    href: '/blog/deep-work-protocol-technical-focus-2026',
    context: 'Technical focus'
  }
];

export default function BlogList({ initialPosts, initialCategory = 'All' }: { initialPosts: Post[], initialCategory?: string }) {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState(initialCategory);


  const categoryCounts = initialPosts.reduce((acc, p) => {
    acc[p.category] = (acc[p.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const categories = ['All', ...Object.keys(categoryCounts)];
  const filtered = initialPosts.filter(p => {
    const matchesSearch = p.title.toLowerCase().includes(search.toLowerCase()) || 
                         p.excerpt?.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = activeCategory === 'All' || p.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="container">
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} style={{ marginBottom: '4rem' }}>
        <div className="label-tech mb-4" style={{ letterSpacing: '0.3em' }}>KNOWLEDGE-HUB</div>
        <h1 style={{ 
          fontSize: 'clamp(2.5rem, 6vw, 48px)', 
          fontWeight: 600,
          lineHeight: 1.1,
          marginBottom: '1.5rem',
          letterSpacing: '-0.02em'
        }}>
          Insights & <span className="hero-title">Technical Logs</span>
        </h1>
        <p style={{ color: 'var(--muted)', maxWidth: 560, lineHeight: 1.8, fontSize: '1.05rem' }}>
          Documenting my journey through data architecture, BI strategy, and automated analytics. Read the latest technical insights.
        </p>
      </motion.div>

      {activeCategory === 'All' && !search && (
        <div className="mb-16 border border-[var(--border)] bg-[var(--surface2)] p-6">
          <div className="label-tech mb-5 text-[var(--accent)]">Priority Reading Paths</div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {PRIORITY_READING_LINKS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="no-underline group border border-[var(--border)] bg-[var(--bg)] p-4 hover:border-[var(--accent)] transition-colors"
              >
                <span className="mono text-[9px] text-[var(--muted)] uppercase tracking-widest">{item.context}</span>
                <div className="mt-2 flex items-center justify-between gap-3 text-[var(--text)]">
                  <span className="text-sm font-bold group-hover:text-[var(--accent)] transition-colors">{item.title}</span>
                  <ArrowRight size={13} className="text-[var(--accent)] group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Featured Log Highlight */}
      {initialPosts.length > 0 && activeCategory === 'All' && !search && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          style={{ marginBottom: '4rem' }}
        >
          <Link href={`/blog/${initialPosts[0].slug}`} style={{ textDecoration: 'none' }}>
            <div className="card group" style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: 0,
              padding: 0,
              overflow: 'hidden',
              borderLeft: '4px solid var(--accent)'
            }}>
              <div style={{ height: '350px', position: 'relative' }}>
                <Image 
                  src={initialPosts[0].image || ''} 
                  alt={initialPosts[0].title}
                  fill
                  style={{ objectFit: 'cover' }}
                />

                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, var(--bg) 0%, transparent 100%)', display: 'none' }} className="lg:block" />
              </div>
              <div style={{ padding: '3rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <div className="label-tech mb-4">FEATURED-ANALYSIS</div>
                <h2 style={{ fontSize: '1.8rem', marginBottom: '1.5rem', lineHeight: 1.2 }}>{initialPosts[0].title}</h2>
                <p style={{ color: 'var(--muted)', fontSize: '0.95rem', lineHeight: 1.7, marginBottom: '2rem' }}>{initialPosts[0].excerpt}</p>
                <div className="flex items-center gap-4">
                  <div className="tag">{initialPosts[0].category}</div>
                  <div className="mono text-[11px] font-bold text-[var(--accent)] group-hover:translate-x-1 transition-transform">READ FULL LOG →</div>
                </div>
              </div>
            </div>
          </Link>
        </motion.div>
      )}

      {/* Search and Filter */}
      <div style={{ marginBottom: '3rem' }}>
        <div style={{ position: 'relative', maxWidth: 500, marginBottom: '1.5rem' }}>
          <input 
            type="text" 
            placeholder="SEARCH LOGS..." 
            aria-label="Search logs"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              width: '100%', padding: '0.75rem 1rem 0.75rem 2.75rem',
              background: 'var(--tag-bg)', border: '1px solid var(--border)',
              borderRadius: '0', color: 'var(--text)', fontSize: '12px',
              outline: 'none', fontFamily: 'var(--mono)', letterSpacing: '0.05em'
            }}
          />
          <Search size={16} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--accent)' }} />
        </div>

        <div className="flex flex-wrap gap-2">
          {categories.map(cat => (
            <button 
              key={cat} 
              className={`filter-tab ${activeCategory === cat ? 'active' : ''}`} 
              onClick={() => setActiveCategory(cat)}
              style={{
                padding: '0.5rem 1.2rem',
                fontSize: '10px',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                background: activeCategory === cat ? 'var(--accent)' : 'var(--tag-bg)',
                color: activeCategory === cat ? 'var(--btn-primary-text)' : 'var(--muted)',
                border: '1px solid var(--border)',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
            >
              {cat}
              <span style={{ 
                opacity: 0.6, 
                marginLeft: '6px', 
                fontSize: '9px',
                padding: '1px 5px',
                background: activeCategory === cat ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.05)',
                borderRadius: '10px'
              }}>
                {cat === 'All' ? initialPosts.length : categoryCounts[cat]}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Post Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.5rem', marginBottom: '5rem' }}>
        {filtered.map((p, i) => (
          <Link 
            href={`/blog/${p.slug}`} 
            key={p.slug} 
            style={{ textDecoration: 'none' }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07 }}
              className="card h-full group"
              style={{ 
                padding: '2rem',
                borderLeft: '2px solid',
                borderImage: 'linear-gradient(to bottom, var(--accent), #00C9F2) 1',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              <div
                className="w-full h-48 mb-4 relative overflow-hidden"
                style={{ borderBottom: `1px solid ${p.color}33` }}
              >
                {p.image && (
                  <Image 
                    src={p.image} 
                    alt={p.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    style={{ objectFit: 'cover', transition: 'transform 0.5s ease' }}
                    className="group-hover:scale-110"
                  />
                )}

                <div 
                  style={{ position: 'absolute', top: 12, left: 12, background: `linear-gradient(135deg, ${p.color || 'var(--accent)'}, #00C9F2)`, color: '#000', fontSize: '1.5rem', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                >
                  {p.icon}
                </div>
              </div>
              <div className="flex items-center gap-2 mb-3">
                <span className="tag" style={{ color: p.color || 'var(--accent)', borderColor: `${p.color}44`, fontSize: '10px' }}>{p.category}</span>
                <span className="flex items-center gap-1" style={{ color: 'var(--muted)', fontSize: '0.75rem' }}>
                  <Clock size={12} /> {p.readTime}m
                </span>
                <span style={{ color: 'var(--muted)', fontSize: '0.75rem', marginLeft: 'auto' }}>{p.date}</span>
              </div>
              <h3 style={{ fontSize: '1.15rem', marginBottom: '1rem', lineHeight: 1.4, color: 'var(--text)' }}>{p.title}</h3>
              <p style={{ color: 'var(--muted)', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '2rem', flex: 1 }}>{p.excerpt}</p>
              <div className="flex items-center gap-2 mt-auto" style={{ color: 'var(--accent)', fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em' }}>
                READ LOG <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </motion.div>
          </Link>
        ))}
      </div>

      <Newsletter />
    </div>
  );
}
