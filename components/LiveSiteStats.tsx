'use client';
import { motion } from 'framer-motion';
import { Database, Smartphone, Globe, BookOpen, Activity } from 'lucide-react';
import { useState, useEffect } from 'react';

const stats = [
  {
    label: 'Knowledge Assets',
    value: '33+',
    icon: BookOpen,
    description: 'Technical Case Studies',
  },
  {
    label: 'Data Integrations',
    value: '12',
    icon: Database,
    description: 'SQL / SAP / API / Flat',
  },
  {
    label: 'Ecosystem Sync',
    value: 'Dual',
    icon: Smartphone,
    description: 'Web & Native Android',
  },
  {
    label: 'Edge Runtime',
    value: '99.9%',
    icon: Globe,
    description: 'Global Availability',
  },
];

export default function LiveSiteStats() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="w-full py-16">
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

      {/* 4-Card Grid with Gaps */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="group relative p-8 bg-[var(--surface)] border border-[var(--border)] hover:border-[var(--accent)] transition-all duration-500 shadow-xl"
          >
            {/* Number Index */}
            <div className="absolute top-4 right-6 mono text-[10px] font-bold opacity-20 text-[var(--accent)] group-hover:opacity-100 transition-opacity">
              0{index + 1}
            </div>

            {/* Icon & Label */}
            <div className="mb-6">
              <div className="p-3 bg-[var(--bg)] border border-[var(--border)] w-fit group-hover:border-[var(--accent)] group-hover:bg-[var(--surface2)] transition-all duration-500">
                <stat.icon size={20} className="text-[var(--accent)]" />
              </div>
            </div>

            {/* Data Point */}
            <div className="space-y-1">
              <div className="text-4xl font-black italic tracking-tighter mono text-[var(--text)]">
                {stat.value}
              </div>
              <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--accent)] mono">
                {stat.label}
              </div>
              <p className="text-[10px] mono text-[var(--muted)] uppercase tracking-wider mt-2 opacity-60">
                {stat.description}
              </p>
            </div>

            {/* Decorative Edge */}
            <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-[var(--accent)] group-hover:w-full transition-all duration-500" />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
