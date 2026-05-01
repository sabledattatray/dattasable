'use client';
import { motion } from 'framer-motion';
import { BookOpen, Database, Smartphone, Globe, Cpu, Activity, Zap, ShieldCheck } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function LiveSiteStats() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="w-full py-16 px-4 lg:px-0">
      {/* ── Technical Background Elements ── */}
      <div className="relative w-full max-w-7xl mx-auto">
        <div className="absolute -top-24 -left-12 w-64 h-64 bg-[var(--accent)] opacity-[0.03] blur-[100px] rounded-full" />
        <div className="absolute -bottom-24 -right-12 w-64 h-64 bg-blue-500 opacity-[0.02] blur-[100px] rounded-full" />

        {/* ── Header System ── */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 gap-6 border-b border-[var(--border)] pb-8">
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="h-[1px] w-12 bg-[var(--accent)] opacity-50" />
              <span className="mono text-[10px] font-black uppercase tracking-[0.4em] text-[var(--accent)]">
                SYSTEM_METRICS_V1.0
              </span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-black tracking-tighter uppercase italic">
              Platform <span className="text-[var(--accent)]">Intelligence</span>
            </h2>
          </div>
          <div className="flex items-center gap-6">
            <div className="flex flex-col items-end">
              <span className="mono text-[10px] text-[var(--muted)] uppercase tracking-widest">Global Status</span>
              <span className="mono text-sm font-bold text-[var(--accent)]">ENCRYPTED_&_ACTIVE</span>
            </div>
            <div className="h-12 w-[1px] bg-[var(--border)]" />
            <div className="p-3 bg-[var(--surface)] border border-[var(--border)] rounded-sm">
              <Activity className="text-[var(--accent)] animate-pulse" size={20} />
            </div>
          </div>
        </div>

        {/* ── Main Data Grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left: Hero KPI Card */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="lg:col-span-4 p-8 bg-[var(--surface)] border border-[var(--border)] relative group overflow-hidden flex flex-col justify-between min-h-[400px] shadow-2xl"
          >
            <div className="absolute top-0 right-0 p-4 mono text-[60px] font-black opacity-[0.03] select-none italic">
              33+
            </div>
            <div className="relative z-10">
              <Zap className="text-[var(--accent)] mb-6" size={32} />
              <h3 className="text-xs mono font-bold uppercase tracking-[0.3em] text-[var(--accent)] mb-2">Primary Asset Cluster</h3>
              <div className="text-6xl font-black italic tracking-tighter mb-4 mono">
                33<span className="text-[var(--accent)]">+</span>
              </div>
              <p className="text-sm text-[var(--muted)] leading-relaxed uppercase mono opacity-70">
                Validated technical frameworks and enterprise case studies integrated into the core ecosystem.
              </p>
            </div>
            <div className="pt-8 border-t border-[var(--border)] flex items-center justify-between">
              <div className="flex -space-x-2">
                {[1,2,3,4].map(i => (
                  <div key={i} className="w-8 h-8 rounded-full border-2 border-[var(--bg)] bg-[var(--surface2)] flex items-center justify-center text-[10px] mono">
                    {i}
                  </div>
                ))}
              </div>
              <span className="text-[10px] mono font-bold text-[var(--accent)]">NODE_READY</span>
            </div>
          </motion.div>

          {/* Right: Technical Matrix */}
          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Skill Matrix */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="p-8 bg-[var(--bg)] border border-[var(--border)] relative group"
            >
              <div className="flex items-center gap-3 mb-8">
                <Cpu size={18} className="text-[var(--accent)]" />
                <span className="text-xs font-bold uppercase tracking-widest mono">Skill Optimization</span>
              </div>
              <div className="space-y-6">
                {[
                  { name: 'SQL Architecture', val: 95 },
                  { name: 'BI Visualization', val: 98 },
                  { name: 'Data Engineering', val: 92 }
                ].map(s => (
                  <div key={s.name} className="space-y-2">
                    <div className="flex justify-between text-[10px] mono font-bold opacity-60 uppercase">
                      <span>{s.name}</span>
                      <span>{s.val}%</span>
                    </div>
                    <div className="h-[3px] w-full bg-[var(--border)] overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: `${s.val}%` }}
                        transition={{ duration: 1.5 }}
                        className="h-full bg-[var(--accent)]"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Ecosystem Status */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="p-8 bg-[var(--bg)] border border-[var(--border)] flex flex-col justify-between"
            >
              <div className="flex items-center gap-3 mb-6">
                <Globe size={18} className="text-blue-400" />
                <span className="text-xs font-bold uppercase tracking-widest mono">Environment Sync</span>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-[var(--surface)] border border-[var(--border)] group-hover:border-[var(--accent)] transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]" />
                    <span className="text-[10px] mono font-bold">NEXT_JS_PRODUCTION</span>
                  </div>
                  <span className="text-[10px] mono opacity-40">STABLE</span>
                </div>
                <div className="flex items-center justify-between p-4 bg-[var(--surface)] border border-[var(--border)]">
                  <div className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]" />
                    <span className="text-[10px] mono font-bold">ANDROID_NATIVE_SYNC</span>
                  </div>
                  <span className="text-[10px] mono opacity-40">ACTIVE</span>
                </div>
              </div>
            </motion.div>

            {/* Bottom Row Feature Card */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="md:col-span-2 p-8 bg-[var(--surface)] border border-[var(--border)] relative overflow-hidden flex items-center gap-8"
            >
              <div className="p-4 bg-[var(--bg)] border border-[var(--border)] rounded-full">
                <ShieldCheck size={32} className="text-[var(--accent)]" />
              </div>
              <div className="flex-1">
                <h4 className="text-xs mono font-black uppercase tracking-[0.2em] mb-1">Architecture integrity</h4>
                <p className="text-[10px] text-[var(--muted)] mono uppercase tracking-wider leading-relaxed">
                  99.9% availability powered by global edge-runtime and cryptographically signed mobile delivery.
                </p>
              </div>
              <div className="hidden md:block h-12 w-[1px] bg-[var(--border)] mx-4" />
              <div className="hidden md:block">
                <span className="text-[10px] mono text-[var(--muted)] block mb-1 uppercase">Latency</span>
                <span className="text-xl font-bold mono tracking-tighter">&lt;350ms</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}


