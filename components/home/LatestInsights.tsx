'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Clock, Sparkles } from 'lucide-react';
import Image from 'next/image';

interface Post {
  id: string;
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  readTime: number;
  date: string;
  image: string;
}

const LATEST_POSTS: Post[] = [
  {
    id: 'future-web-dev-2026',
    slug: 'future-of-web-development-2026',
    title: 'The Future of Web Development in 2026: Beyond the Hype',
    category: 'Web Dev',
    excerpt: 'Master the shift toward hybrid edge-first architectures. Learn how Next.js 15 and React 19 are redefining performance.',
    readTime: 25,
    date: 'May 08, 2026',
    image: '/images/blog/web_dev_2026_future.webp'
  },
  {
    id: 'performance-manifesto-100-gtmetrix-2026',
    slug: 'how-to-improve-website-performance-100-gtmetrix',
    title: 'The Engineering Guide to a 100/100 GTmetrix Score',
    category: 'Engineering',
    excerpt: 'Master website performance optimization with the "Elite Tier" techniques used to achieve zero blocking time.',
    readTime: 20,
    date: 'May 06, 2026',
    image: '/images/blog/psi_desk_100.webp'
  },
  {
    id: 'fraud-detection-sentinel-2026',
    slug: 'architecting-10m-record-fraud-sentinel',
    title: 'Engineering the Sentinel: Architecting a 10M-Record Fraud System',
    category: 'Engineering',
    excerpt: 'Examining the technical requirements of high-volume BFSI fraud detection and data integrity at scale.',
    readTime: 12,
    date: 'May 03, 2026',
    image: '/images/blog/fraud_sentinel_hero.webp'
  }
];

export default function LatestInsights() {
  return (
    <section className="section" style={{ borderTop: '1px solid var(--border)', paddingBottom: '6rem' }}>
      <div className="container">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div style={{ maxWidth: 500 }}>
            <div className="label-tech mb-4">LATEST-EDITORIALS</div>
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', lineHeight: 1.1, marginBottom: '1rem' }}>
              Technical <span className="hero-title">Insights</span>
            </h2>
            <p style={{ color: 'var(--muted)', lineHeight: 1.6 }}>
              Deep-dives into data architecture, BI strategy, and the future of high-performance web engineering.
            </p>
          </div>
          
          <Link href="/blog" className="flex items-center gap-2 group no-underline" style={{ color: 'var(--accent)', fontWeight: 700, fontSize: '0.9rem', letterSpacing: '0.1em' }}>
            VIEW KNOWLEDGE HUB <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {LATEST_POSTS.map((post, i) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
            >
              <Link href={`/blog/${post.slug}`} className="group no-underline block h-full">
                <div className="card h-full flex flex-col" style={{ padding: '1.5rem', borderLeft: '2px solid var(--border)', transition: 'border-color 0.3s ease' }}>
                  <div className="relative aspect-video mb-6 overflow-hidden">
                    <Image 
                      src={post.image} 
                      alt={post.title} 
                      fill 
                      className="object-cover group-hover:scale-105 transition-transform duration-500" 
                    />
                    <div className="absolute top-3 left-3">
                      <div className="tag" style={{ background: 'var(--bg)', backdropFilter: 'blur(10px)', border: '1px solid var(--border)' }}>
                        {post.category}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 mb-4">
                    <span className="flex items-center gap-1.5 text-[10px] font-bold text-[var(--muted)] mono">
                      <Clock size={12} className="text-[var(--accent)]" /> {post.readTime}M READ
                    </span>
                    <span className="text-[10px] text-[var(--muted)] mono opacity-50 uppercase tracking-widest">{post.date}</span>
                  </div>

                  <h3 style={{ fontSize: '1.25rem', lineHeight: 1.3, marginBottom: '1rem', color: 'var(--text)' }}>
                    {post.title}
                  </h3>
                  
                  <p style={{ color: 'var(--muted)', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '2rem', flex: 1 }}>
                    {post.excerpt}
                  </p>

                  <div className="flex items-center gap-2 text-[var(--accent)] font-bold text-[11px] mono tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                    READ FULL LOG <ArrowRight size={14} />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
