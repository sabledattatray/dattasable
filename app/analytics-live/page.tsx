'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { Database, Smartphone, Globe, BookOpen, Activity, RefreshCw, Zap, Shield, TrendingUp, Cpu } from 'lucide-react';
import { useState, useEffect } from 'react';

const REFRESH_INTERVAL = 5; 

export default function AnalyticsLivePage() {
  const [mounted, setMounted] = useState(false);
  const [tick, setTick] = useState(0);
  const [syncTime, setSyncTime] = useState('--:--:--');

  useEffect(() => {
    setMounted(true);
    setSyncTime(new Date().toLocaleTimeString());
    
    const interval = setInterval(() => {
      setTick(t => t + 1);
      setSyncTime(new Date().toLocaleTimeString());
    }, REFRESH_INTERVAL * 1000);

    return () => clearInterval(interval);
  }, []);

  if (!mounted) return null;

  const metrics = [
    { label: 'Cloud Knowledge Assets', value: `33.${tick % 9}k+`, sub: 'Case Studies Index', icon: <BookOpen size={20} />, trend: '+4.2%' },
    { label: 'Active Data Pipelines', value: (11 + (tick % 3)).toString(), sub: 'SQL / SAP / API Gateways', icon: <Database size={20} />, trend: 'Stable' },
    { label: 'Cross-Platform Sync', value: tick % 2 === 0 ? 'SYNCED' : 'ACTIVE', sub: 'Web + Android Ecosystem', icon: <Smartphone size={20} />, trend: '99.9%' },
    { label: 'Global Edge Runtime', value: (99.9 + (tick % 10) * 0.01).toFixed(2) + '%', sub: 'Vercel Edge Network', icon: <Globe size={20} />, trend: 'Optimized' },
    { label: 'API Latency', value: (18 + (tick % 12)).toString() + 'ms', sub: 'Avg Response Time', icon: <Zap size={20} />, trend: '-2ms' },
    { label: 'Security Firewall', value: 'PROTECTED', sub: 'Active Mitigation', icon: <Shield size={20} />, trend: '100%' },
    { label: 'Compute Utilization', value: (45 + (tick % 10)).toString() + '%', sub: 'Serverless Functions', icon: <Cpu size={20} />, trend: 'Nominal' },
    { label: 'Traffic Index', value: (1.2 + (tick % 5) * 0.1).toFixed(1) + 'k', sub: 'Live Session Volume', icon: <TrendingUp size={20} />, trend: '+12%' },
  ];

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)] font-sans">
      <div className="border-b border-[var(--border)] bg-[var(--surface)] px-6 py-6 flex flex-col md:flex-row md:items-center justify-between gap-4 sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <Activity size={24} className="text-[var(--accent)]" />
          <div>
            <h1 className="text-sm font-black uppercase tracking-widest">Platform Intelligence</h1>
            <p className="text-[10px] text-[var(--muted)] mono uppercase">Live Sync: {syncTime}</p>
          </div>
        </div>
        <div className="flex items-center gap-2 mono text-[10px] text-[var(--accent)] bg-[var(--bg)] px-3 py-1 border border-[var(--border)]">
          <RefreshCw size={12} className="animate-spin" />
          ACTIVE_REFRESH_CYCLE_{tick}
        </div>
      </div>

      <main className="p-6 max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics.map((metric, index) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-[var(--surface)] border border-[var(--border)] p-6 relative overflow-hidden"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="text-[var(--accent)]">{metric.icon}</div>
                <div className="text-[10px] mono text-[var(--muted)]">MT-{index + 1}</div>
              </div>
              <div className="text-[10px] font-bold text-[var(--muted)] uppercase tracking-widest mb-1">{metric.label}</div>
              <AnimatePresence mode="wait">
                <motion.div
                  key={metric.value}
                  initial={{ opacity: 0, x: -5 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 5 }}
                  className="text-3xl font-black italic tracking-tighter"
                >
                  {metric.value}
                </motion.div>
              </AnimatePresence>
              <div className="text-[10px] text-[var(--muted)] mt-2">{metric.sub}</div>
              <div className="mt-4 pt-4 border-t border-[var(--border)] flex justify-between items-center">
                <div className="flex items-center gap-1">
                  <div className="w-1 h-1 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-[8px] mono uppercase text-green-500">Live</span>
                </div>
                <div className="text-[8px] mono font-bold text-[var(--accent)]">{metric.trend}</div>
              </div>
              <div className="absolute bottom-0 left-0 w-12 h-[2px] bg-[var(--accent)] opacity-50" />
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  );
}
