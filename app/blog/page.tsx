'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Search, BookOpen, Clock, Calendar, ArrowRight } from 'lucide-react';
import { posts } from './data';

export default function BlogPage() {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [allPosts, setAllPosts] = useState<any[]>(posts);

  useEffect(() => {
    const saved = localStorage.getItem('admin_posts');
    if (saved) {
      const parsed = JSON.parse(saved);
      const merged = [...parsed];
      posts.forEach(p => {
        if (!merged.find(mp => mp.slug === p.slug)) merged.push(p);
      });
      setAllPosts(merged);
    }
  }, []);

  const categories = ['All', ...Array.from(new Set(allPosts.map(p => p.category)))];
  const filtered = allPosts.filter(p => {
    const matchesSearch = p.title.toLowerCase().includes(search.toLowerCase()) || 
                         p.excerpt?.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = activeCategory === 'All' || p.category === activeCategory;
    return matchesSearch && matchesCategory;
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
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} style={{ marginBottom: '4rem' }}>
              <div className="label-tech mb-4" style={{ letterSpacing: '0.3em' }}>KNOWLEDGE-HUB</div>
              <h1 style={{ 
                fontSize: 'clamp(2.5rem, 6vw, 48px)', 
                fontWeight: 600,
                lineHeight: 1.1,
                marginBottom: '1.5rem',
                letterSpacing: '-0.02em'
              }}>
                Insights & <span style={{ 
                  background: 'linear-gradient(135deg, #c9f31d 0%, #fff134 20%, #00d4ff 40%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}>Technical Logs</span>
              </h1>
              <p style={{ color: 'var(--muted)', maxWidth: 560, lineHeight: 1.8, fontSize: '1.05rem' }}>
                Documenting my journey through data architecture, BI strategy, and automated analytics. Read the latest technical insights.
              </p>
            </motion.div>

            {/* Search and Filter */}
            <div style={{ marginBottom: '3rem' }}>
              <div style={{ position: 'relative', maxWidth: 500, marginBottom: '1.5rem' }}>
                <input 
                  type="text" 
                  placeholder="SEARCH LOGS..." 
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
                      color: activeCategory === cat ? '#000' : 'var(--muted)',
                      border: '1px solid var(--border)',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    {cat}
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
                      borderImage: 'linear-gradient(to bottom, #c9f31d, #00C9F2) 1',
                      background: 'rgba(8,8,8,0.5)',
                      cursor: 'pointer',
                      display: 'flex',
                      flexDirection: 'column'
                    }}
                  >
                    <div
                      className="w-full h-48 mb-4 relative overflow-hidden"
                      style={{ borderBottom: `1px solid ${p.color}33` }}
                    >
                      <img 
                        src={p.image} 
                        alt={p.title}
                        style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }}
                        className="group-hover:scale-110"
                      />
                      <div 
                        style={{ position: 'absolute', top: 12, left: 12, background: `linear-gradient(135deg, ${p.color}, #00C9F2)`, color: '#000', fontSize: '1.5rem', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                      >
                        {p.icon}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="tag" style={{ color: p.color, borderColor: `${p.color}44`, fontSize: '10px' }}>{p.category}</span>
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
          </div>
        </section>

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
