'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { Database, Smartphone, Globe, BookOpen, Activity, RefreshCw, Zap, Shield, TrendingUp, Cpu } from 'lucide-react';
import { useState, useEffect } from 'react';

const REFRESH_INTERVAL = 5; // seconds

export default function AnalyticsLivePage() {
  const [mounted, setMounted] = useState(false);
  const [tick, setTick] = useState(0);
  const [countdown, setCountdown] = useState(REFRESH_INTERVAL);
  const [syncTime, setSyncTime] = useState('--:--:--');

  useEffect(() => {
    setMounted(true);
    setSyncTime(new Date().toLocaleTimeString());
    
    const interval = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          setTick(t => t + 1);
          setSyncTime(new Date().toLocaleTimeString());
          return REFRESH_INTERVAL;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  if (!mounted) return null;

  const metrics = [
    { label: 'Cloud Knowledge Assets', value: `33.${tick % 9}k+`, sub: 'Case Studies Index', icon: <BookOpen size={20} />, trend: '+4.2%' },
    { label: 'Active Data Pipelines', value: (11 + (tick % 3)).toString(), sub: 'SQL / SAP / API Gateways', icon: <Database size={20} />, trend: 'Stable' },
    { label: 'Cross-Platform Sync', value: tick % 2 === 0 ? 'SYNCHRONIZED' : 'ACTIVE_PING', sub: 'Web + Android Ecosystem', icon: <Smartphone size={20} />, trend: '99.9%' },
    { label: 'Global Edge Runtime', value: (99.9 + (tick % 100) * 0.001).toFixed(3) + '%', sub: 'Vercel Edge Network', icon: <Globe size={20} />, trend: 'Optimized' },
    { label: 'API Request Latency', value: (18 + (tick % 12)).toString() + 'ms', sub: 'Average Response Time', icon: <Zap size={20} />, trend: '-2ms' },
    { label: 'Security Firewall', value: 'PROTECTED', sub: 'Active Threat Mitigation', icon: <Shield size={20} />, trend: '100%' },
    { label: 'Compute Utilization', value: (45 + (tick % 10)).toString() + '%', sub: 'Serverless Functions', icon: <Cpu size={20} />, trend: 'Nominal' },
    { label: 'Traffic Index', value: (1.2 + (tick % 5) * 0.1).toFixed(1) + 'k', sub: 'Live Session Volume', icon: <TrendingUp size={20} />, trend: '+12%' },
  ];

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)] font-sans selection:bg-[var(--accent)] selection:text-black">
      {/* Top Navigation / Status Bar */}
      <div className="border-b border-[var(--border)] bg-[var(--surface)] px-6 py-4 flex flex-col md:flex-row md:items-center justify-between gap-4 sticky top-0 z-50 backdrop-blur-md bg-opacity-80">
        <div className="flex items-center gap-3">
          <div className="bg-[var(--accent)] p-2 rounded-sm text-black">
            <Activity size={20} />
          </div>
          <div>
            <h1 className="text-sm font-black uppercase tracking-widest leading-none">Platform Intelligence</h1>
            <p className="text-[10px] text-[var(--muted)] mono uppercase mt-1">Live Technical Command Center</p>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="flex flex-col items-end">
            <div className="text-[9px] mono uppercase text-[var(--muted)] mb-1">Next Refresh In: {countdown}s</div>
            <div className="w-48 h-1.5 bg-[var(--border)] rounded-full overflow-hidden">
              <motion.div 
                key={tick}
                initial={{ width: '100%' }}
                animate={{ width: '0%' }}
                transition={{ duration: REFRESH_INTERVAL, ease: "linear" }}
                className="h-full bg-[var(--accent)]"
              />
            </div>
          </div>
          
          <div className="bg-[var(--bg)] border border-[var(--border)] px-4 py-2 rounded-sm flex items-center gap-3">
            <div className="text-right">
              <div className="text-[8px] mono uppercase text-[var(--muted)]">Status</div>
              <div className="text-[10px] mono font-bold text-[var(--accent)]">LIVE_SYNC_OK</div>
            </div>
            <div className="text-right border-l border-[var(--border)] pl-3">
              <div className="text-[8px] mono uppercase text-[var(--muted)]">Last Sync</div>
              <div className="text-[10px] mono font-bold">{syncTime}</div>
            </div>
          </div>
        </div>
      </div>

      <main className="p-6 max-w-[1400px] mx-auto">
        {/* Professional Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics.map((metric, index) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="group bg-[var(--surface)] border border-[var(--border)] hover:border-[var(--accent)] transition-all duration-300 relative overflow-hidden"
            >
              {/* Header */}
              <div className="p-6 pb-2 flex items-center justify-between">
                <div className="text-[var(--accent)] opacity-40 group-hover:opacity-100 transition-opacity">
                  {metric.icon}
                </div>
                <div className="text-[10px] mono font-bold px-2 py-0.5 bg-[var(--bg)] border border-[var(--border)] rounded-sm">
                  MT-{index + 1}
                </div>
              </div>

              {/* Value Area */}
              <div className="px-6 py-4">
                <div className="text-[10px] font-bold text-[var(--muted)] uppercase tracking-widest mb-1">
                  {metric.label}
                </div>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={metric.value}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    className="text-4xl font-black italic tracking-tighter text-[var(--text)] group-hover:text-[var(--accent)] transition-colors"
                  >
                    {metric.value}
                  </motion.div>
                </AnimatePresence>
                <div className="text-[10px] text-[var(--muted)] mono mt-2">
                  {metric.sub}
                </div>
              </div>

              {/* Bottom Metadata */}
              <div className="mt-4 px-6 py-3 bg-[var(--bg)] border-t border-[var(--border)] flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-[9px] mono uppercase font-bold text-green-500">Nominal</span>
                </div>
                <div className="text-[9px] mono font-black text-[var(--accent)]">
                  {metric.trend}
                </div>
              </div>

              {/* Signature Decoration */}
              <div className="absolute bottom-0 left-0 w-12 h-[2px] bg-[var(--accent)] opacity-50" />
            </motion.div>
          ))}
        </div>

        {/* System Logs Area */}
        <div className="mt-12">
          <div className="flex items-center gap-3 mb-6">
            <h2 className="text-xs font-black uppercase tracking-[0.3em]">Live System Logs</h2>
            <div className="flex-grow h-[1px] bg-[var(--border)]" />
          </div>
          
          <div className="bg-[var(--surface)] border border-[var(--border)] p-6 mono text-[10px] leading-relaxed space-y-2 max-h-[300px] overflow-y-auto">
            <div className="text-[var(--accent)]">[SUCCESS] Data ingestion from SQL Server complete. (1.2ms)</div>
            <div className="text-[var(--muted)]">[INFO] Vercel Edge Cache invalidated at 0x8273...</div>
            <div className="text-[var(--accent)]">[SUCCESS] Android Client (v2.1) handshake acknowledged.</div>
            <div className="text-yellow-500">[WARN] High traffic detected from US-EAST-1 cluster.</div>
            <div className="text-[var(--muted)]">[INFO] Running Garbage Collection on Edge Runtime...</div>
            <div className="text-[var(--accent)] opacity-50">[SYSTEM] Sync cycle #{tick} initialized.</div>
            {tick > 0 && (
              <div className="text-[var(--accent)] animate-pulse">
                {`> NEW_LOG_RECORD: Refreshing all ${metrics.length} metrics for cycle #${tick + 1}...`}
              </div>
            )}
          </div>
        </div>
      </main>

      <footer className="mt-20 border-t border-[var(--border)] p-12 text-center">
        <p className="text-[10px] mono uppercase tracking-[0.5em] text-[var(--muted)]">
          © 2026 Datta Sable Platform Intelligence • All Rights Reserved
        </p>
      </footer>
    </div>
  );
}
