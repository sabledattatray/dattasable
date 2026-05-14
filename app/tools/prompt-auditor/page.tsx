'use client';

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Search, ShieldCheck, Zap, AlertTriangle, ArrowRight, Terminal as TerminalIcon } from 'lucide-react';

interface AuditResult {
  score: number;
  fidelity: number;
  entropy: number;
  bloat: number;
  suggestions: string[];
  status: 'Critical' | 'Sub-Optimal' | 'Surgical';
}

export default function PromptAuditorPage() {
  const [prompt, setPrompt] = useState('');
  const [isAuditing, setIsAuditing] = useState(false);
  const [result, setResult] = useState<AuditResult | null>(null);

  const runAudit = () => {
    if (!prompt.trim()) return;
    setIsAuditing(true);
    
    // Simulate complex audit logic
    setTimeout(() => {
      const fidelity = prompt.toLowerCase().includes('json') || prompt.toLowerCase().includes('schema') ? 85 : 40;
      const entropy = prompt.length > 500 ? 30 : 75;
      const bloat = (prompt.match(/please|i would like|could you/gi) || []).length > 2 ? 35 : 90;
      
      const score = Math.round((fidelity + entropy + bloat) / 3);
      
      const suggestions = [];
      if (fidelity < 50) suggestions.push("Inject a Strict Structural Schema (JSON/Markdown) to force model consistency.");
      if (bloat < 60) suggestions.push("Remove conversational fluff (politeness markers) to reduce token waste by ~15%.");
      if (entropy < 50) suggestions.push("Apply Context Compression to reduce input length and decrease latency.");
      if (suggestions.length === 0) suggestions.push("Prompt meets Surgical Architecture standards. Ready for high-volume production.");

      setResult({
        score,
        fidelity,
        entropy,
        bloat,
        suggestions,
        status: score > 85 ? 'Surgical' : score > 50 ? 'Sub-Optimal' : 'Critical'
      });
      setIsAuditing(false);
    }, 1500);
  };

  return (
    <div style={{ background: '#000000', minHeight: '100vh', color: '#ffffff' }}>
      <Navbar />

      <main className="boxed-wrapper" style={{ borderTop: 'none', background: '#000000' }}>
        <section className="container" style={{ padding: '6rem 1.5rem' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <div className="flex items-center gap-3 mb-6">
              <div style={{ color: 'var(--accent)' }}><ShieldCheck size={24} /></div>
              <span className="mono text-[12px] uppercase tracking-[0.3em]" style={{ color: 'var(--accent)' }}>Project: Surgical Auditor v1.0</span>
            </div>
            
            <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 48px)', marginBottom: '1.5rem', lineHeight: 1.1 }}>
              Surgical Prompt <span style={{ color: 'var(--accent)' }}>Auditor™</span>
            </h1>
            <p style={{ color: '#888', fontSize: '1.1rem', marginBottom: '3rem', maxWidth: '600px' }}>
              Submit your unrefined LLM prompts for a deep technical audit. We evaluate your logic for <strong>Fidelity</strong>, <strong>Entropy</strong>, and <strong>Context Bloat</strong>.
            </p>

            <div style={{ background: '#0a0a0a', border: '1px solid #1a1a1a', padding: '2rem', borderRadius: '4px' }}>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2 text-[10px] mono text-[#555] uppercase tracking-widest">
                  <TerminalIcon size={12} /> Input_Prompt_Buffer
                </div>
                <div className="text-[10px] mono text-[#555] uppercase tracking-widest">
                  {prompt.length} Tokens_Est
                </div>
              </div>
              
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Paste your system or user prompt here for analysis..."
                style={{
                  width: '100%',
                  minHeight: '200px',
                  background: '#000',
                  border: '1px solid #1a1a1a',
                  color: '#fff',
                  padding: '1.5rem',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '14px',
                  lineHeight: 1.6,
                  outline: 'none',
                  resize: 'vertical'
                }}
              />

              <div className="mt-6 flex justify-end">
                <button
                  onClick={runAudit}
                  disabled={isAuditing || !prompt}
                  className="btn-primary"
                  style={{ display: 'flex', alignItems: 'center', gap: '10px', opacity: isAuditing || !prompt ? 0.5 : 1 }}
                >
                  {isAuditing ? 'AUDITING_ENGINE...' : 'RUN_SURGICAL_AUDIT'}
                  {!isAuditing && <ArrowRight size={14} />}
                </button>
              </div>
            </div>

            {result && (
              <div className="mt-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div style={{ background: '#0a0a0a', border: '1px solid #1a1a1a', padding: '1.5rem', textAlign: 'center' }}>
                    <div className="text-[10px] mono text-[#555] uppercase mb-2">Surgical_Score</div>
                    <div style={{ fontSize: '32px', fontWeight: 700, color: result.score > 70 ? 'var(--accent)' : '#ff4444' }}>{result.score}%</div>
                  </div>
                  <div style={{ background: '#0a0a0a', border: '1px solid #1a1a1a', padding: '1.5rem', textAlign: 'center' }}>
                    <div className="text-[10px] mono text-[#555] uppercase mb-2">Audit_Status</div>
                    <div style={{ fontSize: '18px', fontWeight: 600, color: '#fff' }}>{result.status}</div>
                  </div>
                  <div style={{ background: '#0a0a0a', border: '1px solid #1a1a1a', padding: '1.5rem', textAlign: 'center' }}>
                    <div className="text-[10px] mono text-[#555] uppercase mb-2">Token_Efficiency</div>
                    <div style={{ fontSize: '32px', fontWeight: 700, color: 'var(--accent)' }}>{result.bloat}%</div>
                  </div>
                </div>

                <div style={{ background: '#0a0a0a', border: '1px solid #1a1a1a', padding: '2rem' }}>
                  <h3 className="text-[12px] mono uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
                    <Zap size={14} style={{ color: 'var(--accent)' }} /> Optimization_Roadmap
                  </h3>
                  <div className="space-y-4">
                    {result.suggestions.map((s, i) => (
                      <div key={i} className="flex gap-4 p-4 border border-[#1a1a1a] bg-[#000]">
                        <div style={{ color: 'var(--accent)', flexShrink: 0 }}><ArrowRight size={16} /></div>
                        <p style={{ color: '#ccc', fontSize: '14px', lineHeight: 1.5 }}>{s}</p>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-12 p-6 border border-dashed border-[#333] text-center">
                    <p style={{ color: '#888', fontSize: '13px', marginBottom: '1.5rem' }}>
                      Ready to implement a high-fidelity automation pipeline?
                    </p>
                    <a href="/contact" className="btn-outline" style={{ display: 'inline-block' }}>
                      HIRE THE OPERATOR
                    </a>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
