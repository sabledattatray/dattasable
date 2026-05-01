'use client';
import { motion } from 'framer-motion';
import { Database, Smartphone, Globe, Zap } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function LiveSiteStats() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="w-full py-12">
      <div className="relative p-1 bg-[var(--surface)] border border-[var(--border)] overflow-hidden">
        {/* Decorative Corner Accents */}
        <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-[var(--accent)]" />
        <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-[var(--accent)]" />
        <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-[var(--accent)]" />
        <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-[var(--accent)]" />

        <div className="bg-[var(--bg)] p-12 border border-[var(--border)]">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-8">
            
            {/* Brand Indicator */}
            <div className="flex flex-col gap-2 min-w-[200px]">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-[var(--accent)] animate-pulse" />
                <span className="mono text-[10px] font-bold tracking-[0.4em] text-[var(--accent)] uppercase">Live_Nodes</span>
              </div>
              <h3 className="text-3xl font-black italic tracking-tighter mono">33<span className="text-[var(--accent)]">+</span> ASSETS</h3>
              <p className="text-[10px] mono text-[var(--muted)] uppercase tracking-widest leading-loose">Validated Knowledge Base</p>
            </div>

            <div className="hidden lg:block w-[1px] h-16 bg-[var(--border)] opacity-50" />

            {/* Metrics Ribbon */}
            <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-12 w-full lg:w-auto">
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2 text-[var(--muted)] mb-2">
                  <Database size={14} className="text-[var(--accent)]" />
                  <span className="text-[10px] mono font-bold tracking-widest uppercase">Integrations</span>
                </div>
                <span className="text-2xl font-bold mono tracking-tighter text-[var(--text)]">12 SQL/SAP</span>
                <div className="h-[2px] w-12 bg-[var(--accent)]" />
              </div>

              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2 text-[var(--muted)] mb-2">
                  <Globe size={14} className="text-[var(--accent)]" />
                  <span className="text-[10px] mono font-bold tracking-widest uppercase">Uptime</span>
                </div>
                <span className="text-2xl font-bold mono tracking-tighter text-[var(--text)]">99.9% EDGE</span>
                <div className="h-[2px] w-12 bg-[var(--accent)]" />
              </div>

              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2 text-[var(--muted)] mb-2">
                  <Smartphone size={14} className="text-[var(--accent)]" />
                  <span className="text-[10px] mono font-bold tracking-widest uppercase">Ecosystem</span>
                </div>
                <span className="text-2xl font-bold mono tracking-tighter text-[var(--text)]">DUAL_SYNC</span>
                <div className="h-[2px] w-12 bg-[var(--accent)]" />
              </div>
            </div>

            <div className="hidden lg:block w-[1px] h-16 bg-[var(--border)] opacity-50" />

            {/* Status Badge */}
            <div className="bg-[var(--surface)] border border-[var(--border)] p-6 flex flex-col items-center justify-center min-w-[180px] group hover:border-[var(--accent)] transition-all duration-500">
              <Zap size={24} className="text-[var(--accent)] mb-2 animate-bounce" />
              <span className="text-[10px] mono font-black tracking-[0.2em] uppercase">System_Stable</span>
              <span className="text-[9px] mono text-[var(--muted)] uppercase mt-1">Latency: 350ms</span>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
