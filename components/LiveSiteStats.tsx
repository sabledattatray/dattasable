'use client';
import { motion } from 'framer-motion';
import { Database, Smartphone, Globe, BookOpen } from 'lucide-react';
import { useState, useEffect } from 'react';

const stats = [
  {
    label: 'Knowledge Assets',
    count: '33+',
    icon: <BookOpen size={18} />,
    sub: 'Technical Case Studies',
  },
  {
    label: 'Data Integrations',
    count: '12',
    icon: <Database size={18} />,
    sub: 'SQL / SAP / API / Flat',
  },
  {
    label: 'Ecosystem Sync',
    count: 'Dual',
    icon: <Smartphone size={18} />,
    sub: 'Web & Native Android',
  },
  {
    label: 'Edge Runtime',
    count: '99.9%',
    icon: <Globe size={18} />,
    sub: 'Global Availability',
  },
];

export default function LiveSiteStats() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="w-full py-12">
      {/* Label Header */}
      <div className="flex items-center gap-3 mb-8 px-1">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--accent)] opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--accent)]"></span>
        </span>
        <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-[var(--accent)] mono">
          LIVE_PLATFORM_ANALYTICS_FEED
        </span>
      </div>

      {/* Identical Grid Styling */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
        gap: '1px', 
        background: 'var(--border)', 
        border: '1px solid var(--border)',
        marginBottom: '2rem',
        overflow: 'hidden'
      }}>
        {stats.map((item, index) => (
          <motion.div 
            key={item.label} 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: index * 0.1 }}
            style={{ background: 'var(--bg)', padding: '1.5rem', position: 'relative' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyBetween: 'space-between', marginBottom: '1rem' }}>
              <span style={{ color: 'var(--accent)', opacity: 0.8 }}>{item.icon}</span>
              <span className="mono" style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--accent)', marginLeft: 'auto' }}>{item.count}</span>
            </div>
            <div style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--text)', marginBottom: '4px' }}>{item.label}</div>
            <div style={{ fontSize: '10px', color: 'var(--muted)', letterSpacing: '0.05em' }}>{item.sub}</div>
            
            {/* The signature bottom-left accent bar */}
            <div style={{ position: 'absolute', bottom: 0, left: 0, width: '40px', height: '2px', background: 'var(--accent)', opacity: 0.4 }} />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
