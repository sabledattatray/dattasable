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
  const [liveStats, setLiveStats] = useState(stats);
  const [lastRefresh, setLastRefresh] = useState(new Date());

  useEffect(() => {
    setMounted(true);
    
    // Auto-refresh logic (every 8 seconds)
    const interval = setInterval(() => {
      setLiveStats(current => current.map(s => {
        if (s.label === 'Edge Runtime') {
          return { ...s, count: (99.9 + (Math.random() * 0.05)).toFixed(2) + '%' };
        }
        return s;
      }));
      setLastRefresh(new Date());
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  if (!mounted) return null;

  return (
    <div className="w-full py-16">
      {/* Label Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10 px-6">
        <div className="flex items-center gap-3">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--accent)] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--accent)]"></span>
          </span>
          <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-[var(--accent)] mono">
            LIVE_PLATFORM_ANALYTICS_FEED
          </span>
        </div>
        <div className="flex items-center gap-2 mono text-[9px] text-[var(--muted)] uppercase tracking-widest">
          <span className="w-1 h-1 bg-[var(--accent)] rounded-full animate-pulse" />
          Last Sync: {lastRefresh.toLocaleTimeString()}
        </div>
      </div>

      {/* Identical Grid Styling */}
      <div className="mx-6" style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
        gap: '1px', 
        background: 'var(--border)', 
        border: '1px solid var(--border)',
        marginBottom: '2rem',
        overflow: 'hidden'
      }}>
        {liveStats.map((item, index) => (
          <motion.div 
            key={item.label} 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: index * 0.1 }}
            style={{ background: 'var(--bg)', padding: '1.5rem', position: 'relative' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <span style={{ color: 'var(--accent)', opacity: 0.8 }}>{item.icon}</span>
              <motion.span 
                key={item.count}
                initial={{ opacity: 0.5, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="mono" 
                style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--accent)', marginLeft: 'auto' }}
              >
                {item.count}
              </motion.span>
            </div>
            <div style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--text)', marginBottom: '4px' }}>{item.label}</div>
            <div style={{ fontSize: '10px', color: 'var(--muted)', letterSpacing: '0.05em', marginBottom: '1.5rem' }}>{item.sub}</div>
            
            {/* High-Visibility Running Bars */}
            <div className="space-y-3">
              {[
                { n: 'SQL Architecture', v: '95%' },
                { n: 'Data Engineering', v: '92%' }
              ].map(bar => (
                <div key={bar.n} className="space-y-1">
                  <div className="flex justify-between text-[8px] mono font-bold opacity-60 uppercase">
                    <span>{bar.n}</span>
                    <span>{bar.v}</span>
                  </div>
                  <div className="h-[2px] w-full bg-[var(--border)] overflow-hidden">
                    <motion.div 
                      key={lastRefresh.getTime()} // Force animation reset on refresh
                      initial={{ width: 0 }}
                      whileInView={{ width: bar.v }}
                      transition={{ duration: 1.5, ease: "easeOut" }}
                      className="h-full bg-[var(--accent)] shadow-[0_0_8px_var(--accent)]"
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* The signature bottom-left accent bar */}
            <div style={{ position: 'absolute', bottom: 0, left: 0, width: '40px', height: '2px', background: 'var(--accent)', opacity: 0.4 }} />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
