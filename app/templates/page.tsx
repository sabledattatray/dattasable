'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import { Download, FileText, Layout, Database, Zap, Search, Filter } from 'lucide-react';
import { useState } from 'react';

const TEMPLATES = [
  {
    id: 'pbi-fin-dashboard-v1',
    title: "Financial Intelligence Blueprint",
    type: "Power BI",
    icon: <Layout className="text-blue-500" size={24} />,
    desc: "Surgical-grade financial dashboard with automated GL consolidation and margin variance tracking.",
    size: "4.2 MB",
    category: "Business Intelligence"
  },
  {
    id: 'n8n-agentic-workflow-01',
    title: "Multi-Agent AI Orchestrator",
    type: "n8n JSON",
    icon: <Zap className="text-yellow-500" size={24} />,
    desc: "Advanced n8n workflow for orchestrating multiple LLM agents for technical content distribution.",
    size: "12 KB",
    category: "Automation"
  },
  {
    id: 'py-data-cleaner-ultra',
    title: "Data Sanitization Engine",
    type: "Python",
    icon: <Database className="text-cyan-500" size={24} />,
    desc: "Production-grade Python script for cleaning 1M+ record datasets with zero context loss.",
    size: "85 KB",
    category: "Data Engineering"
  }
];

export default function TemplatesPage() {
  const [search, setSearch] = useState('');

  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>
      <Navbar />
      
      <main className="container py-32" style={{ paddingTop: '160px' }}>
        <header className="mb-16">
          <div className="label-tech mb-6 text-[var(--accent)]">Asset Library / V1.0</div>
          <h1 style={{ fontSize: '48px', fontFamily: "'Syne', sans-serif", fontWeight: 600, marginBottom: '1.5rem' }}>
            Technical <span style={{ color: 'var(--accent)' }}>Templates.</span>
          </h1>
          <p style={{ color: 'var(--muted)', fontSize: '1.25rem', maxWidth: '600px', lineHeight: 1.6 }}>
            Download production-grade infrastructure blueprints for your automation and intelligence workflows.
          </p>
        </header>

        {/* Filter Bar */}
        <div className="flex flex-col md:flex-row gap-6 mb-12">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--muted)]" size={18} />
            <input 
              type="text"
              placeholder="Search templates (e.g. n8n, Power BI)..."
              className="w-full bg-[var(--surface2)] border border-[var(--border)] rounded-sm py-4 pl-12 pr-4 text-white mono text-[14px] focus:outline-none focus:border-[var(--accent)] transition-colors"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <button className="flex items-center gap-3 px-8 py-4 bg-[var(--surface2)] border border-[var(--border)] rounded-sm hover:border-[var(--accent)] transition-all">
            <Filter size={18} className="text-[var(--accent)]" />
            <span className="mono text-[12px] font-bold tracking-widest">FILTER</span>
          </button>
        </div>

        {/* Templates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {TEMPLATES.filter(t => t.title.toLowerCase().includes(search.toLowerCase()) || t.type.toLowerCase().includes(search.toLowerCase())).map((template, i) => (
            <motion.div
              key={template.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="card group flex flex-col h-full"
              style={{ padding: '2.5rem', background: 'var(--surface2)', border: '1px solid var(--border)' }}
            >
              <div className="flex items-center justify-between mb-8">
                <div className="p-4 bg-[var(--bg)] rounded-sm">
                  {template.icon}
                </div>
                <div className="tag mono text-[10px] tracking-[0.2em]">{template.type}</div>
              </div>

              <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1rem', fontFamily: "'Syne', sans-serif" }}>
                {template.title}
              </h2>
              <p style={{ color: 'var(--muted)', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '2rem', flex: 1 }}>
                {template.desc}
              </p>

              <div className="pt-6 border-t border-[var(--border)] flex items-center justify-between">
                <div className="flex flex-col">
                   <span className="mono text-[10px] text-[var(--muted)] opacity-50 uppercase mb-1">Filesize</span>
                   <span className="mono text-[12px] font-bold">{template.size}</span>
                </div>
                <button className="btn-outline px-6 py-3 flex items-center gap-3 group/dl">
                   <Download size={16} className="group-hover/dl:translate-y-0.5 transition-transform" />
                   <span className="mono text-[11px] font-bold">DOWNLOAD</span>
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Lead Capture Overlay (Coming soon / CTA) */}
        <div className="mt-32 p-12 border-2 border-dashed border-[var(--border)] rounded-sm text-center">
           <h3 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1rem' }}>Need a custom architecture?</h3>
           <p style={{ color: 'var(--muted)', marginBottom: '2.5rem' }}>We build bespoke automation systems tailored to your specific business logic.</p>
           <a href="/contact" className="btn-primary inline-flex py-4 px-12">REQUEST ARCHITECTURE BUILD</a>
        </div>
      </main>

      <Footer />
    </div>
  );
}
