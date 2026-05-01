'use client';
import { motion } from 'framer-motion';
import { BookOpen, Database, Smartphone, Globe, Cpu, Activity } from 'lucide-react';
import { useState, useEffect } from 'react';

const stats = [
  {
    label: 'Knowledge Hub Assets',
    value: '33+',
    icon: BookOpen,
    color: '#3b82f6',
    description: 'Technical case studies & documentation',
  },
  {
    label: 'Data Source Integrations',
    value: '12',
    icon: Database,
    color: '#10b981',
    description: 'SQL, SAP, API, and Flat-file connections',
  },
  {
    label: 'App Ecosystem Status',
    value: 'Dual-Sync',
    icon: Smartphone,
    color: '#f59e0b',
    description: 'Web platform & Native Android client',
  },
  {
    label: 'Global Edge Runtime',
    value: '99.9%',
    icon: Globe,
    color: '#8b5cf6',
    description: 'Vercel edge-caching & performance',
  },
];

const skills = [
  { name: 'SQL & Data Engineering', level: 95 },
  { name: 'Power BI & Tableau', level: 98 },
  { name: 'Advanced Excel', level: 100 },
  { name: 'Next.js & Frontend', level: 85 },
];

export default function LiveSiteStats() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="space-y-12 py-8">
      {/* Live Status Header */}
      <div className="flex items-center justify-between px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full w-fit mx-auto lg:mx-0">
        <span className="relative flex h-3 w-3 mr-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
        </span>
        <span className="text-xs font-semibold uppercase tracking-wider text-blue-400">
          Live Platform Analytics Feed
        </span>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="p-6 rounded-2xl bg-[var(--surface)] border border-[var(--border)] hover:border-blue-500/50 transition-all duration-300 group shadow-lg"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-xl bg-blue-500/10 text-blue-500 group-hover:bg-blue-500 group-hover:text-white transition-colors duration-500">
                <stat.icon size={24} />
              </div>
              <Activity className="text-gray-500/30" size={16} />
            </div>
            <div className="text-3xl font-bold text-[var(--text)] mb-1 tracking-tight">
              {stat.value}
            </div>
            <div className="text-sm font-medium text-[var(--text-muted)] mb-2 uppercase tracking-wide italic">
              {stat.label}
            </div>
            <p className="text-xs text-[var(--text-muted)] leading-relaxed opacity-70">
              {stat.description}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Skill Matrix Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-12">
        <div className="p-8 rounded-3xl bg-[var(--surface)] border border-[var(--border)] shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-5">
            <Cpu size={120} />
          </div>
          <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
            <Activity className="text-blue-500" />
            Skill Distribution Matrix
          </h3>
          <div className="space-y-6">
            {skills.map((skill) => (
              <div key={skill.name}>
                <div className="flex justify-between text-sm mb-2 font-medium">
                  <span className="text-[var(--text)]">{skill.name}</span>
                  <span className="text-blue-400">{skill.level}% Proficiency</span>
                </div>
                <div className="h-2 w-full bg-gray-700/30 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${skill.level}%` }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="h-full bg-gradient-to-r from-blue-600 to-blue-400"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="p-8 rounded-3xl bg-gradient-to-br from-blue-900/20 to-transparent border border-blue-500/20 shadow-xl flex flex-col justify-center items-center text-center">
          <div className="w-20 h-20 bg-blue-500/20 rounded-full flex items-center justify-center mb-6 border border-blue-500/30">
            <Smartphone className="text-blue-400" size={32} />
          </div>
          <h3 className="text-2xl font-bold mb-4 italic">Ecosystem Readiness</h3>
          <p className="text-[var(--text-muted)] mb-8 max-w-sm leading-relaxed">
            The platform is fully synchronized across Web and Android environments, enabling real-time insights delivery to any device hardware.
          </p>
          <div className="flex gap-4">
            <div className="px-6 py-3 bg-[var(--bg)] border border-[var(--border)] rounded-xl text-sm font-bold shadow-inner">
              Web: <span className="text-green-500">Live</span>
            </div>
            <div className="px-6 py-3 bg-[var(--bg)] border border-[var(--border)] rounded-xl text-sm font-bold shadow-inner">
              Mobile: <span className="text-green-500">Live</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
