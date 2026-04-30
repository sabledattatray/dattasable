import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { BookOpen, Target, Zap, BarChart3, Database, BrainCircuit, ArrowRight } from 'lucide-react';

export default function StartHerePage() {
  const paths = [
    {
      title: "Data Architecture & Infrastructure",
      desc: "Learn how to build the foundation of a modern data stack that scales with your enterprise.",
      icon: <Database size={24} />,
      color: "var(--accent)",
      links: [
        { name: "The 2026 Modern Data Stack", href: "/blog/modern-bi-stack-2026" },
        { name: "PostgreSQL vs Snowflake Benchmarks", href: "/blog/postgres-vs-snowflake-speed" },
      ]
    },
    {
      title: "Advanced BI & Visualization",
      desc: "Master the art of high-stakes executive reporting using industry-leading tools.",
      icon: <BarChart3 size={24} />,
      color: "#00C9F2",
      links: [
        { name: "Mastering Tableau LOD Expressions", href: "/blog/tableau-lods-tutorial" },
        { name: "7 UX Principles for Dashboards", href: "/blog/dashboard-ux-principles" },
        { name: "Power BI Performance Tuning", href: "/blog/bi-performance-tuning" },
      ]
    },
    {
      title: "Automation & Intelligence",
      desc: "Leverage Python and AI to automate the mundane and focus on strategic insights.",
      icon: <BrainCircuit size={24} />,
      color: "#00d4ff",
      links: [
        { name: "Building Pipelines with Python & Prefect", href: "/blog/python-automation-pipelines" },
        { name: "Integrating GenAI into Tableau", href: "/blog/generative-ai-bi-dashboards" },
        { name: "Building a BI Scraper with Selenium", href: "/blog/python-selenium-bi-scraper" },
      ]
    }
  ];

  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh', color: 'var(--text)' }}>
      <Navbar />
      <div className="boxed-wrapper" style={{ position: 'relative', padding: '120px 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
            <div className="label-tech mb-4" style={{ letterSpacing: '0.3em', justifyContent: 'center' }}>LEARNING-PATHWAY</div>
            <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 56px)', fontWeight: 600, lineHeight: 1.1, marginBottom: '1.5rem', letterSpacing: '-0.02em' }}>
              Start Your <span className="hero-title">Data Journey</span>
            </h1>
            <p style={{ color: 'var(--muted)', maxWidth: 640, margin: '0 auto', lineHeight: 1.8, fontSize: '1.1rem' }}>
              Welcome to the Knowledge Hub. This structured guide is designed to take you from data fundamentals to advanced enterprise orchestration.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
            {paths.map((path, idx) => (
              <div key={path.title} className="card h-full" style={{ padding: '2.5rem', borderTop: `4px solid ${path.color}` }}>
                <div style={{ color: path.color, marginBottom: '1.5rem' }}>{path.icon}</div>
                <h2 style={{ fontSize: '1.4rem', marginBottom: '1rem' }}>{path.title}</h2>
                <p style={{ color: 'var(--muted)', fontSize: '0.95rem', lineHeight: 1.7, marginBottom: '2rem' }}>{path.desc}</p>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div className="mono text-[10px] uppercase tracking-widest text-[var(--muted)] mb-2">Recommended Reading:</div>
                  {path.links.map(link => (
                    <Link key={link.href} href={link.href} className="flex items-center justify-between group p-3 hover:bg-[var(--surface2)] border border-transparent hover:border-[var(--border)] transition-all" style={{ textDecoration: 'none' }}>
                      <span style={{ fontSize: '0.9rem', color: 'var(--text)' }}>{link.name}</span>
                      <ArrowRight size={14} style={{ color: 'var(--accent)', transition: 'transform 0.2s' }} className="group-hover:translate-x-1" />
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="card" style={{ marginTop: '4rem', padding: '3rem', textAlign: 'center', background: 'linear-gradient(135deg, rgba(201,243,29,0.03) 0%, transparent 100%)' }}>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Need a Custom BI Roadmap?</h3>
            <p style={{ color: 'var(--muted)', maxWidth: 500, margin: '0 auto 2rem' }}>
              I help organizations architect high-performance data systems and automated analytics workflows.
            </p>
            <Link href="/contact" className="btn-primary" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.75rem' }}>
              GET A CONSULTATION <Target size={18} />
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
