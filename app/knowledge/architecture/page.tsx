'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Crosshair from '@/components/Crosshair';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Shield, Zap, Cpu, Network, Database, Terminal } from 'lucide-react';

import { ARCHITECTURES } from '@/data/architectures';
import { Download, Share2, GitBranch, Code, ArrowUpRight, CheckCircle2 } from 'lucide-react';

export default function ArchitecturePage() {
  const layers = [
    {
      title: "Layer 01: Intent Mapping",
      icon: <Terminal size={24} />,
      desc: "Capturing unstructured operator goals and translating them into deterministic logic schemas.",
      features: ["Logic Decomposition", "Context Windows", "Intent Validation"]
    },
    {
      title: "Layer 02: Prompt Infrastructure",
      icon: <Cpu size={24} />,
      desc: "Structured prompt systems utilizing modular architecture for consistent, high-fidelity AI output.",
      features: ["Prompt Templating", "Chain-of-Thought", "Dynamic Variables"]
    },
    {
      title: "Layer 03: Execution Chains",
      icon: <Network size={24} />,
      desc: "Sequential and parallel AI operations connected through hardened data pipelines.",
      features: ["State Management", "Error Handling", "Pipeline Scaling"]
    }
  ];

  const handleDownload = (content: string, filename: string) => {
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };


  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>
      <Navbar />
      
      <div className="boxed-wrapper" style={{ paddingTop: '12rem', paddingBottom: '10rem' }}>
        <Crosshair position="tl" />
        
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="label-tech mb-8 text-[var(--accent)]">System Infrastructure</div>
            <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontFamily: "'Syne', sans-serif", fontWeight: 600, marginBottom: '2rem', lineHeight: 1.1 }}>
              Surgical AI <span style={{ color: 'var(--accent)' }}>Architecture.</span>
            </h1>
            <p style={{ color: 'var(--muted)', fontSize: '1.2rem', marginBottom: '5rem', lineHeight: 1.6 }}>
              A technical deep-dive into the deterministic infrastructure powering modern AI workflows. 
              Our architecture moves beyond "chatting" into high-fidelity execution systems.
            </p>

            {/* Visual Blueprint */}
            <div className="relative mb-32 p-8 lg:p-16 border border-[var(--border)] bg-[var(--surface2)] rounded-sm overflow-hidden">
              <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, var(--accent) 1px, transparent 0)', backgroundSize: '40px 40px' }} />
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
                {layers.map((layer, i) => (
                  <motion.div
                    key={layer.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.2 }}
                    viewport={{ once: true }}
                    className="card flex flex-col p-8"
                    style={{ background: 'var(--bg)', border: '1px solid var(--border)' }}
                  >
                    <div className="mb-6 text-[var(--accent)]">{layer.icon}</div>
                    <h3 className="mono text-[14px] uppercase tracking-widest mb-4">{layer.title}</h3>
                    <p style={{ fontSize: '0.9rem', color: 'var(--muted)', lineHeight: 1.6, marginBottom: '2rem' }}>{layer.desc}</p>
                    
                    <div className="mt-auto pt-6 border-t border-[var(--border)]">
                      <ul className="space-y-3">
                        {layer.features.map(f => (
                          <li key={f} className="flex items-center gap-2 text-[10px] mono uppercase opacity-60">
                            <Zap size={10} className="text-[var(--accent)]" />
                            {f}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Architecture Library (Link Magnets) */}
            <div className="mb-32">
              <div className="label-tech mb-8 text-cyan-500">Architecture Library</div>
              <h2 className="text-4xl font-bold mb-12" style={{ fontFamily: 'Syne, sans-serif' }}>Downloadable <span className="text-cyan-500">Blueprints</span></h2>
              
              <div className="grid grid-cols-1 gap-12">
                {ARCHITECTURES.map((arch) => (
                  <div key={arch.id} className="p-8 border border-[var(--border)] bg-[var(--surface1)] rounded-sm group/card">
                    <div className="flex flex-col lg:flex-row gap-12">
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <span className="mono text-[10px] uppercase tracking-widest px-2 py-1 bg-cyan-500/10 text-cyan-500 border border-cyan-500/20">{arch.category}</span>
                            <h3 className="text-2xl font-bold">{arch.title}</h3>
                          </div>
                          <Link href={`/blog/${arch.caseStudySlug}`} className="flex items-center gap-2 text-[10px] mono text-[var(--accent)] hover:underline">
                            CASE_STUDY <ArrowUpRight size={12} />
                          </Link>
                        </div>
                        <p className="text-[var(--muted)] mb-8 leading-relaxed">{arch.description}</p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                          <div>
                            <h4 className="mono text-[10px] uppercase tracking-widest text-[var(--accent)] mb-4">Prompt Chain:</h4>
                            <div className="space-y-2">
                              {arch.promptChain.map((prompt, idx) => (
                                <div key={idx} className="p-3 bg-[var(--surface2)] border border-[var(--border)] text-[12px] mono italic opacity-80">
                                  {prompt}
                                </div>
                              ))}
                            </div>
                          </div>
                          <div>
                            <h4 className="mono text-[10px] uppercase tracking-widest text-emerald-500 mb-4">Measured Outcomes:</h4>
                            <div className="space-y-3">
                              {arch.outcomes.map((outcome, idx) => (
                                <div key={idx} className="flex items-start gap-2 text-[12px] leading-relaxed opacity-80">
                                  <CheckCircle2 size={14} className="text-emerald-500 mt-0.5 flex-shrink-0" />
                                  <span>{outcome}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex flex-wrap gap-4">
                          <button 
                            onClick={() => handleDownload(arch.template, `${arch.id}-blueprint.json`)}
                            className="btn-primary flex items-center gap-2 py-3 px-6"
                          >
                            <Download size={16} /> Download Blueprint
                          </button>
                          <button 
                            onClick={(e) => {
                              const btn = e.currentTarget;
                              const embedCode = `<iframe src="https://dattasable.com/knowledge/architecture?embed=${arch.id}" width="100%" height="600" frameborder="0"></iframe>`;
                              
                              const handleSuccess = () => {
                                const originalText = btn.innerHTML;
                                btn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-check"><path d="M20 6 9 17l-5-5"/></svg> Copied!';
                                btn.style.borderColor = 'var(--accent)';
                                btn.style.color = 'var(--accent)';
                                setTimeout(() => {
                                  btn.innerHTML = originalText;
                                  btn.style.borderColor = '';
                                  btn.style.color = '';
                                }, 2000);
                              };

                              if (navigator.clipboard && window.isSecureContext) {
                                navigator.clipboard.writeText(embedCode)
                                  .then(handleSuccess)
                                  .catch(() => {
                                    window.prompt("Copy this embed code:", embedCode);
                                  });
                              } else {
                                window.prompt("Copy this embed code:", embedCode);
                              }
                            }}
                            className="btn-outline flex items-center gap-2 py-3 px-6 transition-all duration-300"
                          >
                            <Code size={16} /> Embed
                          </button>
                          <a 
                            href={`https://github.com/sabledattatray/dattasable`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-outline flex items-center gap-2 py-3 px-6"
                          >
                            <GitBranch size={16} /> GitHub
                          </a>
                          <button 
                            onClick={() => {
                              const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`https://dattasable.com/knowledge/architecture?id=${arch.id}`)}`;
                              window.open(url, '_blank');
                            }}
                            className="btn-outline flex items-center gap-2 py-3 px-6"
                          >
                            <Share2 size={16} /> LinkedIn
                          </button>
                        </div>
                      </div>
                      <div className="lg:w-1/3 p-6 bg-[var(--bg)] border border-[var(--border)] rounded-sm">
                        <h4 className="mono text-[10px] uppercase tracking-widest mb-6 opacity-50">System Diagram:</h4>
                        <div className="p-4 bg-[var(--surface2)] border border-[var(--border)] rounded-sm">
                          <pre className="text-[10px] mono text-cyan-500 overflow-x-auto">
                            {arch.diagram}
                          </pre>
                        </div>
                        <div className="mt-8 flex items-center justify-between text-[10px] mono uppercase opacity-50">
                          <span>Status: Production</span>
                          <span>Ver: 1.0.4</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              <div>
                <h2 style={{ fontSize: '1.75rem', marginBottom: '1.5rem', fontWeight: 700 }}>Deterministic Workflow Scaling</h2>
                <p style={{ color: 'var(--muted)', lineHeight: 1.8, marginBottom: '1.5rem' }}>
                  The core challenge of modern AI is consistency. Our architecture utilizes <strong>Prompt Hardening™</strong> and 
                  <strong>System-Led Execution</strong> to ensure that every workflow scale is reproducible.
                </p>
                <div className="p-6 bg-[var(--surface2)] border-l-2 border-[var(--accent)]">
                  <p className="mono text-[12px] leading-relaxed">
                    "We don't build prompts; we build software that happens to use Large Language Models as logic processors."
                  </p>
                </div>
              </div>
              <div>
                <h2 style={{ fontSize: '1.75rem', marginBottom: '1.5rem', fontWeight: 700 }}>Security & State Management</h2>
                <p style={{ color: 'var(--muted)', lineHeight: 1.8 }}>
                  Our pipelines are built on top of robust state management layers. This allows for complex, long-running 
                  AI operations that can recover from errors, maintain context across days, and scale across global deployment zones.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <Crosshair position="br" />
      </div>
      
      <Footer />
    </div>
  );
}
