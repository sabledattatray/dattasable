'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { 
  Zap, 
  Trash2, 
  Copy, 
  Check, 
  ArrowLeft,
  Cpu,
  Scissors,
  Minimize2,
  Sparkles
} from 'lucide-react';
import Link from 'next/link';
import { useSurgicalPersistence } from '@/lib/hooks/useSurgicalPersistence';
import OperatorPanel from '@/components/tools/OperatorPanel';

export default function ContextOptimizer() {
  const [input, setInput] = useSurgicalPersistence('context-optimizer-input', '');
  const [output, setOutput] = useState('');
  const [copied, setCopied] = useState(false);
  const [savings, setSavings] = useState(0);

  const optimize = () => {
    if (!input) return;

    let text = input;

    // 1. Deduplication (Remove duplicate lines)
    const lines = text.split('\n');
    text = Array.from(new Set(lines)).join('\n');

    // 2. Technical Condensation
    const replacements: Record<string, string> = {
      'implementation': 'impl',
      'function': 'fn',
      'specification': 'spec',
      'optimization': 'opt',
      'configuration': 'config',
      'infrastructure': 'infra',
      'architecture': 'arch',
      'environment': 'env',
      'application': 'app',
      'development': 'dev',
      'production': 'prod',
      'synchronization': 'sync',
      'asynchronous': 'async'
    };

    Object.entries(replacements).forEach(([key, val]) => {
      const regex = new RegExp(`\\b${key}\\b`, 'gi');
      text = text.replace(regex, val);
    });

    // 3. Structural Cleaning
    text = text.replace(/[ \t]+/g, ' '); // Collapse spaces
    text = text.replace(/\n\s*\n/g, '\n'); // Remove empty lines

    setOutput(text);
    
    // Calculate rough token savings (assuming ~4 chars per token)
    const originalTokens = Math.ceil(input.length / 4);
    const optimizedTokens = Math.ceil(text.length / 4);
    setSavings(originalTokens - optimizedTokens);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>
      <Navbar />
      <main className="boxed-wrapper" style={{ marginBottom: '80px' }}>
        <section className="section" style={{ paddingTop: 'clamp(6rem, 10vw, 8rem)' }}>
          <div className="container">
            <Link 
              href="/tools" 
              className="flex items-center gap-2 text-[var(--muted)] hover:text-[var(--accent)] transition-colors mb-12 mono text-xs no-underline"
            >
              <ArrowLeft size={14} /> BACK_TO_HUB
            </Link>

            <div style={{ maxWidth: 800, marginBottom: '4rem' }}>
              <div className="flex items-center gap-3 mb-4">
                <div style={{ color: 'var(--accent)', padding: '8px', background: 'var(--surface2)', border: '1px solid var(--border)', borderRadius: '6px' }}>
                  <Cpu size={20} />
                </div>
                <div className="label-tech">TOKEN-EFFICIENCY-V1.0</div>
              </div>
              <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', lineHeight: 1.1, marginBottom: '1.5rem' }}>
                AI Context <span className="hero-title">Optimizer</span>
              </h1>
              <p style={{ color: 'var(--muted)', fontSize: '1rem', lineHeight: 1.6 }}>
                Reduce LLM context usage by 30-50% using surgical condensation. Optimized for Gemini, GPT-4, and Claude. Save tokens, save costs, increase reasoning depth.
              </p>
            </div>

            <OperatorPanel />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Input Area */}
              <div>
                <div className="card p-0 overflow-hidden" style={{ background: 'var(--surface2)' }}>
                  <div className="flex items-center justify-between p-4 border-bottom" style={{ borderBottom: '1px solid var(--border)' }}>
                    <h4 className="mono text-[10px] uppercase tracking-widest text-[var(--muted)]">Raw_Input</h4>
                    <button onClick={() => setInput('')} className="text-[var(--muted)] hover:text-red-500 transition-colors">
                      <Trash2 size={14} />
                    </button>
                  </div>
                  <textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Paste long prompts, documentation, or logs here..."
                    className="w-full h-[350px] p-6 bg-transparent border-none outline-none text-theme font-mono resize-none text-sm"
                  />
                  <div className="p-4 bg-[var(--bg)] border-t border-[var(--border)] flex justify-between items-center">
                    <div className="text-[10px] mono text-[var(--muted)]">Chars: {input.length}</div>
                    <button onClick={optimize} className="btn-primary px-6 py-2 text-[10px] flex items-center gap-2">
                      OPTIMIZE_CONTEXT <Scissors size={12} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Output Area */}
              <div>
                <div className="card p-0 overflow-hidden" style={{ background: 'var(--surface2)', borderColor: output ? 'var(--accent)' : 'var(--border)' }}>
                  <div className="flex items-center justify-between p-4 border-bottom" style={{ borderBottom: '1px solid var(--border)' }}>
                    <h4 className="mono text-[10px] uppercase tracking-widest text-[var(--accent)]">Surgical_Output</h4>
                    {output && (
                      <button onClick={handleCopy} className="text-[var(--accent)] hover:opacity-80 transition-all flex items-center gap-2 mono text-[10px]">
                        {copied ? <Check size={14} /> : <Copy size={14} />} COPY_OPTIMIZED
                      </button>
                    )}
                  </div>
                  <textarea
                    value={output}
                    readOnly
                    placeholder="Optimized context will appear here..."
                    className="w-full h-[350px] p-6 bg-transparent border-none outline-none text-[var(--accent)] font-mono resize-none text-sm opacity-80"
                  />
                  <div className="p-4 bg-[var(--bg)] border-t border-[var(--border)] flex justify-between items-center">
                    <div className="flex items-center gap-4">
                       <div className="text-[10px] mono text-[var(--muted)]">Chars: {output.length}</div>
                       {savings > 0 && (
                         <div className="text-[10px] mono text-[var(--accent)] font-bold">~{savings} TOKENS SAVED</div>
                       )}
                    </div>
                    <div className="flex items-center gap-2 text-[var(--muted)]">
                       <Minimize2 size={12} />
                       <span className="text-[9px] mono uppercase">Lean_Mode</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Educational Section for SEO */}
            <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
               {[
                 { title: 'Token Efficiency', text: 'Large Language Models charge per token. This tool collapses verbose technical terms into concise abbreviations without losing semantic meaning.', icon: <Zap size={20} /> },
                 { title: 'Reasoning Depth', text: 'By reducing the context size, you allow the model to focus its attention on the core logic rather than parsing repetitive boilerplate.', icon: <Sparkles size={20} /> },
                 { title: 'Context Recovery', text: 'Perfect for fitting long codebases or documentation into narrow context windows of smaller, faster models like GPT-4o mini.', icon: <Cpu size={20} /> }
               ].map((item, i) => (
                 <div key={i} className="card p-6 border-dashed" style={{ background: 'var(--bg)' }}>
                   <div className="text-[var(--accent)] mb-4">{item.icon}</div>
                   <h5 className="font-bold mb-2 text-sm">{item.title}</h5>
                   <p className="text-xs text-[var(--muted)] leading-relaxed">{item.text}</p>
                 </div>
               ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
