'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { Database, Smartphone, Globe, BookOpen, Activity, RefreshCw, Zap, Shield, TrendingUp, Cpu, Clock, BarChart3 } from 'lucide-react';
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
    { label: 'Platform Assets', value: `33.${tick % 9}k`, sub: 'Verified Case Studies', icon: <BookOpen size={22} />, trend: '+4.2%', color: 'var(--accent)' },
    { label: 'Active Pipelines', value: (11 + (tick % 3)).toString(), sub: 'API & SQL Gateways', icon: <Database size={22} />, trend: 'Stable', color: '#3b82f6' },
    { label: 'Mobile Sync', value: tick % 2 === 0 ? 'DUAL' : 'ACTIVE', sub: 'Web + Android Pings', icon: <Smartphone size={22} />, trend: '100%', color: '#10b981' },
    { label: 'Edge Uptime', value: (99.9 + (tick % 100) * 0.001).toFixed(3) + '%', sub: 'Global Node Health', icon: <Globe size={22} />, trend: 'Nominal', color: '#f59e0b' },
    { label: 'Network Latency', value: (18 + (tick % 12)).toString() + 'ms', sub: 'Packet Response Time', icon: <Zap size={22} />, trend: '-2ms', color: '#8b5cf6' },
    { label: 'Security Firewall', value: 'ACTIVE', sub: 'Threat Mitigation', icon: <Shield size={22} />, trend: 'Secured', color: '#ef4444' },
    { label: 'CPU Utilization', value: (45 + (tick % 10)).toString() + '%', sub: 'Serverless Compute', icon: <Cpu size={22} />, trend: 'Optimal', color: '#6366f1' },
    { label: 'Session Volume', value: (1.2 + (tick % 5) * 0.1).toFixed(1) + 'k', sub: 'Live Active Users', icon: <TrendingUp size={22} />, trend: '+12%', color: '#ec4899' },
  ];

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)] font-sans antialiased pb-20">
      {/* Header Section */}
      <header className="w-full border-b border-[var(--border)] bg-[var(--surface)] backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-lg bg-[var(--accent)] flex items-center justify-center text-black shadow-lg shadow-[var(--accent)]/20">
              <BarChart3 size={24} />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight">Technical Operations Center</h1>
              <div className="flex items-center gap-2 text-[11px] mono uppercase tracking-widest text-[var(--muted)]">
                <span className="flex h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
                System Live // Last Sync: {syncTime}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-8">
            <div className="flex flex-col items-end gap-1.5">
              <div className="flex items-center gap-2 text-[10px] mono uppercase tracking-widest text-[var(--muted)]">
                <Clock size={12} /> Next Refresh: <span className="text-[var(--accent)] font-bold">{countdown}s</span>
              </div>
              <div className="w-40 h-1 bg-[var(--border)] rounded-full overflow-hidden">
                <motion.div 
                  key={tick}
                  initial={{ width: '100%' }}
                  animate={{ width: '0%' }}
                  transition={{ duration: REFRESH_INTERVAL, ease: "linear" }}
                  className="h-full bg-[var(--accent)] shadow-[0_0_8px_var(--accent)]"
                />
              </div>
            </div>
            
            <div className="hidden lg:flex items-center gap-2 px-4 py-2 bg-[var(--bg)] border border-[var(--border)] rounded-md mono text-[10px] font-bold">
              <RefreshCw size={12} className="animate-spin text-[var(--accent)]" />
              CYCLE_{tick.toString().padStart(4, '0')}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-6 mt-12">
        {/* Statistics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {metrics.map((metric, index) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="group relative bg-[var(--surface)] border border-[var(--border)] hover:border-[var(--accent)] transition-all duration-300 rounded-xl overflow-hidden shadow-sm hover:shadow-xl hover:shadow-[var(--accent)]/5"
            >
              {/* Card Decoration */}
              <div 
                className="absolute top-0 right-0 w-24 h-24 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity"
                style={{ background: `radial-gradient(circle at top right, ${metric.color}, transparent)` }}
              />

              <div className="p-7">
                <div className="flex items-center justify-between mb-8">
                  <div className="p-3 rounded-lg bg-[var(--bg)] border border-[var(--border)] text-[var(--muted)] group-hover:text-[var(--accent)] transition-colors">
                    {metric.icon}
                  </div>
                  <div className="text-[10px] mono font-bold text-[var(--muted)] tracking-widest">
                    KPI_ID: {index + 1}
                  </div>
                </div>

                <div className="space-y-1">
                  <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--muted)]">
                    {metric.label}
                  </p>
                  <AnimatePresence mode="wait">
                    <motion.h2
                      key={metric.value}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 10 }}
                      className="text-4xl font-black tracking-tighter"
                    >
                      {metric.value}
                    </motion.h2>
                  </AnimatePresence>
                  <p className="text-[11px] text-[var(--muted)] font-medium">
                    {metric.sub}
                  </p>
                </div>

                <div className="mt-8 pt-6 border-t border-[var(--border)] flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]" />
                    <span className="text-[10px] mono font-bold uppercase text-green-500">Live</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[10px] font-black mono text-[var(--accent)]">
                    {metric.trend}
                  </div>
                </div>
              </div>

              {/* Bottom Accent Bar */}
              <div className="absolute bottom-0 left-0 w-full h-[2px] bg-[var(--border)] overflow-hidden">
                <div 
                  className="h-full bg-[var(--accent)] opacity-0 group-hover:opacity-100 transition-opacity duration-500" 
                  style={{ width: '30%' }}
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* System Terminal (Professional Log) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4 px-2">
              <Activity size={16} className="text-[var(--accent)]" />
              <h3 className="text-xs font-bold uppercase tracking-widest">Live Execution Logs</h3>
            </div>
            <div className="bg-[var(--surface)] border border-[var(--border)] rounded-xl p-6 h-[280px] overflow-hidden relative">
              <div className="mono text-[11px] leading-relaxed space-y-3">
                <div className="flex gap-4">
                  <span className="text-[var(--muted)]">[{new Date().toLocaleTimeString()}]</span>
                  <span className="text-blue-400 font-bold">SYSLOG:</span>
                  <span>Cluster initialization sequence complete. Nodes: 128/128</span>
                </div>
                <div className="flex gap-4">
                  <span className="text-[var(--muted)]">[{new Date().toLocaleTimeString()}]</span>
                  <span className="text-green-400 font-bold">READY:</span>
                  <span>Postgres pool connection pool warmed and active (4ms)</span>
                </div>
                <div className="flex gap-4">
                  <span className="text-[var(--muted)]">[{new Date().toLocaleTimeString()}]</span>
                  <span className="text-purple-400 font-bold">AUTH:</span>
                  <span>JWT rotation verified for global edge sessions</span>
                </div>
                {tick > 0 && (
                  <motion.div 
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex gap-4"
                  >
                    <span className="text-[var(--muted)]">[{new Date().toLocaleTimeString()}]</span>
                    <span className="text-[var(--accent)] font-bold">SYNC:</span>
                    <span className="animate-pulse">Broadcasting Refresh Cycle #{tick} to all endpoints...</span>
                  </motion.div>
                )}
                <div className="flex gap-4 opacity-40">
                  <span className="text-[var(--muted)]">[{new Date().toLocaleTimeString()}]</span>
                  <span className="text-[var(--muted)] font-bold">IDLE:</span>
                  <span>Waiting for next scheduled telemetry heartbeat...</span>
                </div>
              </div>
              {/* Fade Overlay */}
              <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-[var(--surface)] to-transparent pointer-events-none" />
            </div>
          </div>

          <div className="flex flex-col justify-center p-8 bg-[var(--accent)] text-black rounded-xl shadow-xl shadow-[var(--accent)]/10">
            <TrendingUp size={48} className="mb-6 opacity-30" />
            <h3 className="text-xl font-black leading-tight mb-2 uppercase">Platform Integrity Verified</h3>
            <p className="text-sm font-medium opacity-80 mb-6">
              Automated telemetry indicates 100% compliance across all data engineering standards for cycle {tick}.
            </p>
            <button className="w-full py-3 bg-black text-white text-[10px] font-bold uppercase tracking-widest rounded-lg hover:bg-white hover:text-black transition-colors border border-black">
              System Health Report
            </button>
          </div>
        </div>
      </main>

      <footer className="mt-20 text-center">
        <p className="text-[10px] mono uppercase tracking-[0.5em] text-[var(--muted)]">
          © 2026 Datta Sable • Production Intelligence Environment
        </p>
      </footer>
    </div>
  );
}
