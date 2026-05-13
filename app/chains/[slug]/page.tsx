'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { CHAINS, ExecutionChain } from '@/data/chains';
import { useParams } from 'next/navigation';
import { 
  Zap, 
  ArrowLeft, 
  Copy, 
  Check, 
  Download, 
  Layers, 
  ChevronRight,
  Cpu,
  Sparkles
} from 'lucide-react';
import Link from 'next/link';
import OperatorPanel from '@/components/tools/OperatorPanel';
import { useOperatorProfile } from '@/lib/hooks/useOperatorProfile';

export default function ChainExecutionPage() {
  const params = useParams();
  const slug = params.slug as string;
  const chain = CHAINS.find(c => c.slug === slug);
  
  const { profile } = useOperatorProfile();
  const [input, setInput] = useState('');
  const [isExecuting, setIsExecuting] = useState(false);
  const [results, setResults] = useState<Record<string, string>>({});
  const [copied, setCopied] = useState<string | null>(null);

  if (!chain) return <div>Chain not found</div>;

  const handleExecute = async () => {
    setIsExecuting(true);
    setResults({});

    // Artificial delay to simulate "Surgical Orchestration"
    await new Promise(r => setTimeout(r, 1500));

    const newResults: Record<string, string> = {};

    // 1. Prompt Node
    if (chain.nodes.includes('prompt')) {
      newResults['prompt'] = `Act as a ${profile.persona} highly specialized in ${input}. \nYour primary goal is ${profile.intent} and your communication style is ${profile.style}.\n\n### TASK:\nProvide a detailed, expert-level response...`;
    }

    // 2. SEO Node
    if (chain.nodes.includes('seo')) {
      newResults['seo'] = `Title: [${profile.persona}] How to master ${input} in 2026\nDescription: Explore the surgical breakdown of ${input} with our expert ${profile.persona} guide. Optimized for ${profile.intent}.`;
    }

    // 3. LinkedIn Node
    if (chain.nodes.includes('linkedin')) {
      const prefix = profile.persona === 'Technical Expert' ? '⚙️ ' : '🚀 ';
      newResults['linkedin'] = `${prefix}${input}\n\nMost people think [Myth] is the key to success. They're wrong.\n\nHere is the surgical breakdown of how I optimized my ${profile.style} workflow...`;
    }

    // 4. Schema Node
    if (chain.nodes.includes('schema')) {
      newResults['schema'] = `{\n  "@context": "https://schema.org",\n  "@type": "Article",\n  "headline": "${input}",\n  "author": "${profile.persona}"\n}`;
    }

    setResults(newResults);
    setIsExecuting(false);
  };

  const handleCopy = (key: string, content: string) => {
    navigator.clipboard.writeText(content);
    setCopied(key);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>
      <Navbar />
      
      <main className="boxed-wrapper" style={{ marginBottom: '80px' }}>
        <section className="section" style={{ paddingTop: 'clamp(6rem, 10vw, 8rem)' }}>
          <div className="container">
            <Link 
              href="/chains" 
              className="flex items-center gap-2 text-[var(--muted)] hover:text-[var(--accent)] transition-colors mb-12 mono text-xs no-underline"
            >
              <ArrowLeft size={14} /> BACK_TO_CHAIN_HUB
            </Link>

            <div style={{ maxWidth: 800, marginBottom: '4rem' }}>
              <div className="flex items-center gap-3 mb-4">
                <div style={{ color: 'var(--accent)', padding: '8px', background: 'var(--surface2)', border: '1px solid var(--border)', borderRadius: '6px' }}>
                  <Zap size={20} />
                </div>
                <div className="label-tech">CHAIN_ID: {chain.id.toUpperCase()}</div>
              </div>
              <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', lineHeight: 1.1, marginBottom: '1.5rem' }}>
                {chain.title}
              </h1>
              <p style={{ color: 'var(--muted)', fontSize: '1rem', lineHeight: 1.6 }}>
                {chain.description}
              </p>
            </div>

            <OperatorPanel />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Input Control */}
              <div className="lg:col-span-1">
                <div className="card p-8 sticky top-32" style={{ background: 'var(--surface2)' }}>
                  <div className="flex items-center gap-2 mb-6">
                    <Cpu size={16} className="text-[var(--accent)]" />
                    <h4 className="mono text-[10px] uppercase tracking-widest">Input_Parameters</h4>
                  </div>

                  <div className="mb-8">
                    <label className="block mono text-[9px] text-[var(--muted)] mb-3 uppercase tracking-widest">{chain.inputLabel}</label>
                    <textarea 
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder={chain.placeholder}
                      className="w-full h-48 p-4 bg-[var(--bg)] border border-[var(--border)] outline-none text-theme text-xs resize-none"
                      style={{ lineHeight: 1.6 }}
                    />
                  </div>

                  <button 
                    onClick={handleExecute}
                    disabled={!input || isExecuting}
                    className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {isExecuting ? 'ORCHESTRATING...' : 'INITIATE_CHAIN'} <ChevronRight size={14} />
                  </button>
                </div>
              </div>

              {/* Output Orchestration */}
              <div className="lg:col-span-2">
                <div className="flex flex-col gap-6">
                  {chain.nodes.map((node) => (
                    <div key={node} className="card p-0 overflow-hidden" style={{ background: 'var(--surface2)' }}>
                      <div className="p-4 border-b border-[var(--border)] flex justify-between items-center bg-[var(--bg)]/50">
                        <div className="flex items-center gap-2">
                          <Layers size={14} className="text-[var(--accent)]" />
                          <h4 className="mono text-[10px] uppercase tracking-widest text-[var(--text)]">Node_{node.toUpperCase()}</h4>
                        </div>
                        {results[node] && (
                          <button 
                            onClick={() => handleCopy(node, results[node])}
                            className="text-[var(--accent)] hover:opacity-80 transition-all flex items-center gap-2 mono text-[9px]"
                          >
                            {copied === node ? <Check size={12} /> : <Copy size={12} />} COPY_NODE
                          </button>
                        )}
                      </div>
                      <div 
                        className="p-6 min-h-[100px] mono text-[10px] leading-relaxed text-[var(--muted)]"
                        style={{ whiteSpace: 'pre-wrap' }}
                      >
                        {isExecuting ? (
                          <div className="flex items-center gap-2 animate-pulse">
                            <Sparkles size={12} className="text-[var(--accent)]" /> Synthesizing...
                          </div>
                        ) : results[node] || 'Awaiting chain initiation...'}
                      </div>
                    </div>
                  ))}

                  {Object.keys(results).length > 0 && (
                    <button className="btn-outline w-full py-4 flex items-center justify-center gap-2 mono text-[10px] tracking-widest">
                      <Download size={14} /> EXPORT_COMPLETE_PACKAGE
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
