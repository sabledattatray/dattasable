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
    desc: "Surgical-grade financial dashboard architected for 16M+ row SQL Server 2022 datasets. Features automated GL consolidation, query folding, and zero-latency margin variance tracking.",
    size: "4.86 MB",
    category: "Business Intelligence",
    downloadUrl: "/templates/financial-blueprint.pbit"
  },
  {
    id: 'n8n-agentic-workflow-01',
    title: "Multi-Agent AI Orchestrator",
    type: "n8n JSON",
    icon: <Zap className="text-yellow-500" size={24} />,
    desc: "Advanced n8n workflow for orchestrating multiple LLM agents for technical content distribution.",
    size: "12 KB",
    category: "Automation",
    downloadUrl: "/templates/multi-agent-orchestrator.json"
  },
  {
    id: 'py-data-cleaner-ultra',
    title: "Data Sanitization Engine",
    type: "Python",
    icon: <Database className="text-cyan-500" size={24} />,
    desc: "Production-grade Python script for cleaning 1M+ record datasets with zero context loss.",
    size: "85 KB",
    category: "Data Engineering",
    downloadUrl: "/templates/data-cleaner.py"
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
        <div className="max-w-2xl" style={{ marginBottom: '2rem' }}>
          <div className="relative w-full">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-[var(--muted)]" size={20} />
            <input 
              type="text"
              placeholder="Search templates (e.g. n8n, Power BI)..."
              className="w-full bg-[var(--surface2)] border border-[var(--border)] rounded-sm text-white mono focus:outline-none focus:border-[var(--accent)] transition-colors shadow-inner"
              style={{ padding: '1.25rem 1.5rem 1.25rem 3.5rem', height: '64px', fontSize: '0.95rem' }}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        {/* Templates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {TEMPLATES.filter(t => t.title.toLowerCase().includes(search.toLowerCase()) || t.type.toLowerCase().includes(search.toLowerCase())).map((template, i) => (
            <motion.div
              key={template.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="card group flex flex-col h-full shadow-lg hover:border-[var(--accent)] transition-all duration-300"
              style={{ padding: '2.5rem', background: 'var(--surface2)', border: '1px solid var(--border)' }}
            >
              <div className="flex items-center justify-between mb-8">
                <div className="p-4 bg-[var(--bg)] rounded-sm border border-[var(--border)] shadow-inner">
                  {template.icon}
                </div>
                <div className="tag mono text-[10px] tracking-[0.2em] font-bold px-2.5 py-1 bg-[var(--bg)] border border-[var(--border)] rounded-sm">{template.type}</div>
              </div>

              <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1rem', fontFamily: "'Syne', sans-serif" }} className="group-hover:text-[var(--accent)] transition-colors">
                {template.title}
              </h2>
              <p style={{ color: 'var(--muted)', fontSize: '0.95rem', lineHeight: 1.7, marginBottom: '2.5rem', flex: 1 }}>
                {template.desc}
              </p>

              <div className="pt-6 border-t border-[var(--border)] border-opacity-60 flex items-center justify-between">
                <div className="flex flex-col">
                   <span className="mono text-[10px] text-[var(--muted)] opacity-60 uppercase mb-1 font-bold">Filesize</span>
                   <span className="mono text-[12px] font-bold text-[var(--accent)]">{template.size}</span>
                </div>
                <a 
                  href={template.downloadUrl} 
                  download 
                  className="btn-outline px-6 py-3 flex items-center gap-2.5 group/dl no-underline font-bold text-[12px]"
                >
                   <Download size={15} className="group-hover/dl:translate-y-0.5 transition-transform text-[var(--accent)]" />
                   <span className="mono text-[11px] font-bold tracking-wider">DOWNLOAD</span>
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Lead Capture Overlay (Coming soon / CTA) */}
        <div className="border-2 border-dashed border-[var(--border)] rounded-sm text-center shadow-xl bg-[var(--surface1)]" style={{ marginTop: '8rem', padding: '4.5rem 2rem' }}>
           <h3 style={{ fontSize: '1.75rem', fontWeight: 700, marginBottom: '1rem', fontFamily: "'Syne', sans-serif" }}>Need a custom architecture?</h3>
           <p style={{ color: 'var(--muted)', marginBottom: '3rem', fontSize: '1.1rem', maxW: '600px', mx: 'auto' }}>We build bespoke automation systems tailored to your specific business logic.</p>
           <a href="/contact" className="btn-primary inline-flex py-4 px-12 font-bold tracking-wider text-[13px]">REQUEST ARCHITECTURE BUILD</a>
        </div>
      </main>

      <Footer />
    </div>
  );
}
