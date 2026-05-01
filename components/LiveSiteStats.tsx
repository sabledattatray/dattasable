'use client';
import { motion } from 'framer-motion';
import { BookOpen, Database, Smartphone, Globe, Cpu, Activity } from 'lucide-react';
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

const skills = [
  { name: 'SQL & DATA ENGINEERING', level: 95 },
  { name: 'POWER BI & TABLEAU', level: 98 },
  { name: 'ADVANCED EXCEL (POWER QUERY)', level: 100 },
  { name: 'NEXT.JS & FULL-STACK', level: 85 },
];

export default function LiveSiteStats() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="space-y-12 py-12">
      {/* Live Status Header */}
      <div className="flex items-center gap-3 px-4 py-1.5 bg-[rgba(201,243,29,0.05)] border border-[rgba(201,243,29,0.2)] rounded-none w-fit mx-auto lg:mx-0 mb-8">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--accent)] opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--accent)]"></span>
        </span>
        <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[var(--accent)] mono">
          LIVE_PLATFORM_ANALYTICS_FEED
        </span>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0 border border-[var(--border)] bg-[var(--border)] overflow-hidden">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: index * 0.1 }}
            className="p-8 bg-[var(--bg)] hover:bg-[var(--surface)] transition-colors duration-300 relative group"
          >
            <div className="flex items-center justify-between mb-6">
              <stat.icon size={20} className="text-[var(--accent)] opacity-70 group-hover:opacity-100 transition-opacity" />
              <div className="text-[10px] mono text-[var(--accent)] opacity-30">0{index + 1}</div>
            </div>
            <div className="text-4xl font-bold text-[var(--text)] mb-1 tracking-tighter mono">
              {stat.value}
            </div>
            <div className="text-[10px] font-bold text-[var(--text)] mb-2 uppercase tracking-[0.2em] mono">
              {stat.label}
            </div>
            <p className="text-[10px] text-[var(--muted)] uppercase tracking-wider mono opacity-60">
              {stat.description}
            </p>
            <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-[var(--accent)] group-hover:w-full transition-all duration-500" />
          </motion.div>
        ))}
      </div>

      {/* Skill Matrix Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-12">
        <div className="lg:col-span-7 p-10 bg-[var(--surface)] border border-[var(--border)] relative overflow-hidden">
          <div className="absolute top-[-20%] right-[-10%] opacity-[0.03] rotate-12">
            <Cpu size={300} />
          </div>
          <h3 className="text-xl font-bold mb-10 flex items-center gap-4 mono tracking-tight">
            <span className="w-10 h-[1px] bg-[var(--accent)]"></span>
            SKILL_DISTRIBUTION_MATRIX
          </h3>
          <div className="space-y-8">
            {skills.map((skill) => (
              <div key={skill.name}>
                <div className="flex justify-between text-[10px] mb-3 font-bold mono tracking-widest uppercase">
                  <span className="text-[var(--text)]">{skill.name}</span>
                  <span className="text-[var(--accent)]">{skill.level}%</span>
                </div>
                <div className="h-[2px] w-full bg-[rgba(255,255,255,0.05)] overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${skill.level}%` }}
                    transition={{ duration: 2, ease: "circOut" }}
                    className="h-full bg-[var(--accent)]"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-5 p-10 bg-[var(--bg)] border border-[var(--border)] flex flex-col justify-between items-start text-left relative group">
          <div className="absolute top-0 right-0 p-6 opacity-10">
            <Activity className="text-[var(--accent)]" size={40} />
          </div>
          <div>
            <h3 className="text-xl font-bold mb-6 italic tracking-tight">ECOSYSTEM_READINESS</h3>
            <p className="text-xs text-[var(--muted)] mb-8 max-w-sm leading-relaxed uppercase tracking-wide mono">
              Platform synchronized across Web (Next.js) & Android (Capacitor) hardware layers.
            </p>
          </div>
          <div className="w-full space-y-4">
            <div className="flex items-center justify-between p-4 bg-[var(--surface)] border border-[var(--border)]">
              <span className="text-[10px] font-bold mono tracking-widest text-[var(--muted)]">WEB_LAYER</span>
              <span className="text-[10px] font-bold mono text-[var(--accent)]">ACTIVE_SYNC</span>
            </div>
            <div className="flex items-center justify-between p-4 bg-[var(--surface)] border border-[var(--border)]">
              <span className="text-[10px] font-bold mono tracking-widest text-[var(--muted)]">ANDROID_NATIVE</span>
              <span className="text-[10px] font-bold mono text-[var(--accent)]">ACTIVE_SYNC</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

