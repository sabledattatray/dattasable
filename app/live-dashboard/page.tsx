'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Database, Smartphone, Globe, BookOpen, Activity, 
  RefreshCw, Zap, Shield, TrendingUp, Cpu, Clock, 
  BarChart3, Terminal as TerminalIcon, AlertTriangle, 
  Server, HardDrive, Network
} from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const REFRESH_INTERVAL = 5; // seconds

// Utility for technical corners
const TechnicalCorners = () => (
  <>
    <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-[var(--accent)] opacity-40" />
    <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-[var(--accent)] opacity-40" />
    <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-[var(--accent)] opacity-40" />
    <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-[var(--accent)] opacity-40" />
  </>
);

// Minimal Sparkline Component
const Sparkline = ({ color, tick }: { color: string, tick: number }) => {
  const points = Array.from({ length: 12 }, (_, i) => ({
    x: i * 10,
    y: 20 + Math.sin((i + tick) * 0.5) * 15 + Math.random() * 5
  }));

  return (
    <svg className="w-full h-8 opacity-50" viewBox="0 0 110 40">
      <motion.path
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 2, ease: "easeInOut" }}
        d={`M ${points.map(p => `${p.x},${p.y}`).join(' L ')}`}
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
};

export default function LiveDashboardPage() {
  const [mounted, setMounted] = useState(false);
  const [tick, setTick] = useState(0);
  const [countdown, setCountdown] = useState(REFRESH_INTERVAL);
  const [syncTime, setSyncTime] = useState('--:--:--');
  const [logs, setLogs] = useState<{ id: number, time: string, type: string, msg: string }[]>([]);
  const terminalEndRef = useRef<HTMLDivElement>(null);
  const logIdCounter = useRef(0);

  const logTemplates = [
    { type: 'EXEC', msg: 'Kernel optimization sequence initiated on Node-7' },
    { type: 'AUTH', msg: 'JWT token rotation verified for regional cluster' },
    { type: 'SYNC', msg: 'Broadcasting telemetry heartbeat to edge gateways' },
    { type: 'INFO', msg: 'Postgres pool health: 98% (latency: 4ms)' },
    { type: 'WARN', msg: 'Redundant node failover test in progress...' },
    { type: 'DATA', msg: 'Neural shadow indexing complete for session 0x9AF2' },
  ];

  useEffect(() => {
    setMounted(true);
    setSyncTime(new Date().toLocaleTimeString());
    
    const interval = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          setTick(t => t + 1);
          setSyncTime(new Date().toLocaleTimeString());
          
          const template = logTemplates[Math.floor(Math.random() * logTemplates.length)];
          setLogs(prevLogs => {
            const newLog = { 
              id: logIdCounter.current++, 
              time: new Date().toLocaleTimeString(), 
              ...template 
            };
            return [...prevLogs.slice(-15), newLog];
          });
          
          return REFRESH_INTERVAL;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'auto', block: 'nearest' });
  }, [logs]);

  if (!mounted) return null;

  const metrics = [
    { label: 'Neural Index', value: `33.${tick % 9}k`, sub: 'Verified Data Proofs', icon: <BookOpen size={20} />, trend: '+4.2%', color: 'var(--accent)', id: 'IDX-01' },
    { label: 'Compute Power', value: (11 + (tick % 3)).toString(), sub: 'Active SQL Engines', icon: <Cpu size={20} />, trend: 'Nominal', color: '#3b82f6', id: 'CPU-07' },
    { label: 'Network Flow', value: tick % 2 === 0 ? 'DUAL' : 'STABLE', sub: 'Regional Data Sync', icon: <Network size={20} />, trend: '100%', color: '#10b981', id: 'NET-03' },
    { label: 'Storage Health', value: (99.9 + (tick % 100) * 0.001).toFixed(3) + '%', sub: 'Block Consistency', icon: <HardDrive size={20} />, trend: 'Secure', color: '#f59e0b', id: 'STR-09' },
    { label: 'Edge Latency', value: (18 + (tick % 12)).toString() + 'ms', sub: 'Response Delta', icon: <Zap size={20} />, trend: '-2ms', color: '#8b5cf6', id: 'LTN-12' },
    { label: 'Security Grid', value: 'ACTIVE', sub: 'Threat Intelligence', icon: <Shield size={20} />, trend: 'Locked', color: '#ef4444', id: 'SEC-04' },
    { label: 'System Uptime', value: '99.99%', sub: 'Global Node Uptime', icon: <Activity size={20} />, trend: 'Stable', color: '#6366f1', id: 'UPT-01' },
    { label: 'Live Traffic', value: (1.2 + (tick % 5) * 0.1).toFixed(1) + 'k', sub: 'Session Velocity', icon: <TrendingUp size={20} />, trend: '+12%', color: '#ec4899', id: 'TRF-08' },
  ];

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)] font-sans antialiased overflow-hidden relative">
      <Navbar />

      <main className="boxed-wrapper mt-24 mb-12 mx-[20px] xl:mx-auto relative z-10 overflow-hidden">
        <TechnicalCorners />
        
        {/* Dashboard Sub-Header */}
        <div className="border-b border-[var(--border)] bg-[var(--surface2)]/50 p-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded bg-[var(--accent)] flex items-center justify-center text-black shadow-[0_0_15px_var(--accent)] shadow-opacity-20">
              <BarChart3 size={20} />
            </div>
            <div>
              <h2 className="text-lg font-black uppercase tracking-tighter">Live Intelligence Dashboard</h2>
              <div className="flex items-center gap-3 text-[12px] mono uppercase tracking-widest text-[var(--muted)]">
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                  Status: <span className="text-white">Active</span>
                </span>
                <span className="text-[var(--border)]">|</span>
                <span>Sync: <span className="text-white">{syncTime}</span></span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex flex-col items-end gap-1">
              <div className="text-[11px] mono uppercase tracking-widest text-[var(--muted)]">
                Cycle Progress: <span className="text-[var(--accent)]">{countdown}s</span>
              </div>
              <div className="w-32 h-1 bg-[var(--border)] rounded-full overflow-hidden">
                <motion.div 
                  key={tick}
                  initial={{ width: '100%' }}
                  animate={{ width: '0%' }}
                  transition={{ duration: REFRESH_INTERVAL, ease: "linear" }}
                  className="h-full bg-[var(--accent)]"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Content Area with Padding */}
        <div className="p-8 space-y-8 h-[calc(100vh-280px)] overflow-y-auto custom-scrollbar">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {metrics.map((metric, index) => (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="group relative bg-[var(--surface)] border border-[var(--border)] hover:border-[var(--accent)]/30 transition-all duration-500 rounded p-5 overflow-hidden"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2 rounded bg-[var(--bg)] border border-[var(--border)] text-[var(--muted)] group-hover:text-[var(--accent)] transition-colors">
                    {metric.icon}
                  </div>
                  <div className="text-[10px] mono font-bold text-[var(--muted)]">
                    {metric.id}
                  </div>
                </div>

                <div className="space-y-1">
                  <p className="text-[11px] font-bold uppercase tracking-widest text-[var(--muted)]">
                    {metric.label}
                  </p>
                  <div className="h-8 flex items-center">
                    <AnimatePresence mode="wait">
                      <motion.h3
                        key={metric.value}
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                        className="text-2xl font-black tracking-tighter leading-none"
                      >
                        {metric.value}
                      </motion.h3>
                    </AnimatePresence>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-[11px] text-[var(--muted)]">{metric.sub}</span>
                    <span className="text-[11px] text-[var(--accent)] font-bold">{metric.trend}</span>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-[var(--border)]/50">
                  <Sparkline color={metric.color} tick={tick} />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Lower Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-3">
              <div className="flex items-center gap-2 px-1">
                <TerminalIcon size={12} className="text-[var(--accent)]" />
                <h4 className="text-[12px] font-bold uppercase tracking-widest text-[var(--muted)]">Neural Execution Logs</h4>
              </div>
              <div className="bg-[var(--surface)] border border-[var(--border)] rounded p-5 h-[280px] overflow-hidden relative">
                <div className="mono text-[12px] leading-relaxed space-y-2 overflow-y-auto h-full pr-2 custom-scrollbar">
                  {logs.map((log) => (
                    <div key={log.id} className="flex gap-4 opacity-80 hover:opacity-100 transition-opacity border-b border-[var(--border)]/30 pb-2 last:border-0">
                      <span className="text-[var(--muted)]">[{log.time}]</span>
                      <span className={`font-bold ${
                        log.type === 'EXEC' ? 'text-blue-400' :
                        log.type === 'AUTH' ? 'text-purple-400' :
                        'text-[var(--accent)]'
                      }`}>{log.type}:</span>
                      <span className="text-[var(--muted)]">{log.msg}</span>
                    </div>
                  ))}
                  <div ref={terminalEndRef} />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-[var(--accent)] text-black rounded p-6">
                <Activity size={24} className="mb-4" />
                <h4 className="text-sm font-black uppercase mb-1">Integrity: 100%</h4>
                <p className="text-[12px] opacity-80 mb-6">All regional nodes responding within nominal latency parameters.</p>
                <button className="w-full py-2 bg-black text-white text-[10px] font-black uppercase tracking-widest rounded hover:opacity-80 transition-opacity">
                  View Full Report
                </button>
              </div>

              <div className="bg-[var(--surface)] border border-[var(--border)] rounded p-5 space-y-4">
                <div className="flex items-center gap-2">
                  <Server size={12} className="text-[var(--accent)]" />
                  <span className="text-[11px] font-bold uppercase tracking-widest text-[var(--muted)]">System Load</span>
                </div>
                {[
                  { label: 'Cluster', val: 74 },
                  { label: 'Memory', val: 38 }
                ].map(res => (
                  <div key={res.label} className="space-y-1.5">
                    <div className="flex justify-between text-[10px] mono">
                      <span className="text-[var(--muted)]">{res.label}</span>
                      <span>{res.val}%</span>
                    </div>
                    <div className="h-1 bg-[var(--border)] rounded-full overflow-hidden">
                      <div className="h-full bg-[var(--accent)]" style={{ width: `${res.val}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 2px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: var(--border);
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: var(--accent);
        }
      `}</style>
    </div>
  );
}
