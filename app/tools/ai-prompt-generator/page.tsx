'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { 
  Copy, 
  Check, 
  Wand2, 
  Trash2, 
  Sparkles, 
  ArrowLeft,
  Cpu,
  Target,
  ShieldCheck,
  RotateCcw
} from 'lucide-react';
import Link from 'next/link';

const PERSONAS = [
  { id: 'engineer', label: 'Product Engineer', icon: '🛠️' },
  { id: 'seo', label: 'SEO Specialist', icon: '📈' },
  { id: 'writer', label: 'Expert Copywriter', icon: '✍️' },
  { id: 'scientist', label: 'Data Scientist', icon: '🧪' },
];

const PLATFORMS = [
  { id: 'gemini', label: 'Google Gemini' },
  { id: 'gpt4', label: 'ChatGPT / GPT-4' },
  { id: 'claude', label: 'Claude 3' },
];

export default function AIPromptGenerator() {
  const [topic, setTopic] = useState('');
  const [persona, setPersona] = useState('engineer');
  const [platform, setPlatform] = useState('gemini');
  const [noFluff, setNoFluff] = useState(true);
  const [includeSteps, setIncludeSteps] = useState(true);
  const [generatedPrompt, setGeneratedPrompt] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!topic) {
      setGeneratedPrompt('');
      return;
    }

    const personaLabel = PERSONAS.find(p => p.id === persona)?.label;
    const platformLabel = PLATFORMS.find(p => p.id === platform)?.label;

    let prompt = `Act as a ${personaLabel} highly specialized in my request. `;
    
    if (platform === 'gemini') {
      prompt += `Optimize this response for Google Gemini's reasoning capabilities. `;
    } else if (platform === 'claude') {
      prompt += `Follow instructions exactly as a Claude model would. `;
    }

    prompt += `\n\n### CONTEXT/TOPIC:\n${topic}\n\n### TASK:\nProvide a detailed, expert-level response regarding the topic above.`;

    if (includeSteps) {
      prompt += `\n\n### FORMAT:\n1. Break your response into clear, actionable steps.\n2. Use technical terminology appropriate for a ${personaLabel}.\n3. Provide code snippets or specific examples where applicable.`;
    }

    if (noFluff) {
      prompt += `\n\n### CONSTRAINTS:\n- DO NOT include conversational filler (e.g., "I'd be happy to help", "Here is the information").\n- Start directly with the answer.\n- Maintain a surgical, professional, and authoritative tone.`;
    }

    setGeneratedPrompt(prompt);
  }, [topic, persona, platform, noFluff, includeSteps]);

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedPrompt);
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
                  <Wand2 size={20} />
                </div>
                <div className="label-tech">NEURAL-ORCHESTRATION</div>
              </div>
              <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', lineHeight: 1.1, marginBottom: '1.5rem' }}>
                Surgical Prompt <span className="hero-title">Engineer</span>
              </h1>
              <p style={{ color: 'var(--muted)', fontSize: '1rem', lineHeight: 1.6 }}>
                Transform simple ideas into high-fidelity "Mega-Prompts" that extract elite-tier performance from AI models like Gemini, Claude, and GPT-4.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Configuration */}
              <div className="flex flex-col gap-6">
                <div className="card p-8" style={{ background: 'var(--surface2)' }}>
                  <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-2">
                      <Cpu size={16} className="text-[var(--accent)]" />
                      <h4 className="mono text-[10px] uppercase tracking-widest text-[var(--text)]">Model_Architecture</h4>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-3 mb-8">
                    {PLATFORMS.map((p) => (
                      <button
                        key={p.id}
                        onClick={() => setPlatform(p.id)}
                        className={`p-3 text-[10px] mono border transition-all ${platform === p.id ? 'border-[var(--accent)] text-[var(--accent)] bg-[var(--accent)]/5' : 'border-[var(--border)] text-[var(--muted)]'}`}
                      >
                        {p.label}
                      </button>
                    ))}
                  </div>

                  <div className="flex items-center gap-2 mb-4">
                    <Target size={16} className="text-[var(--accent)]" />
                    <h4 className="mono text-[10px] uppercase tracking-widest text-[var(--text)]">Target_Persona</h4>
                  </div>
                  <div className="grid grid-cols-2 gap-3 mb-8">
                    {PERSONAS.map((p) => (
                      <button
                        key={p.id}
                        onClick={() => setPersona(p.id)}
                        className={`flex items-center gap-3 p-4 border transition-all text-left ${persona === p.id ? 'border-[var(--accent)] bg-[var(--accent)]/5' : 'border-[var(--border)]'}`}
                      >
                        <span className="text-xl">{p.icon}</span>
                        <span className={`text-xs font-bold ${persona === p.id ? 'text-[var(--accent)]' : 'text-[var(--text)]'}`}>{p.label}</span>
                      </button>
                    ))}
                  </div>

                  <div className="flex items-center gap-2 mb-4">
                    <ShieldCheck size={16} className="text-[var(--accent)]" />
                    <h4 className="mono text-[10px] uppercase tracking-widest text-[var(--text)]">Constraints</h4>
                  </div>
                  <div className="flex flex-col gap-3">
                    <label className="flex items-center justify-between p-3 border border-[var(--border)] cursor-pointer hover:bg-white/5 transition-all">
                      <span className="text-xs">Surgical Precision (No Fluff)</span>
                      <input type="checkbox" checked={noFluff} onChange={(e) => setNoFluff(e.target.checked)} className="accent-[var(--accent)]" />
                    </label>
                    <label className="flex items-center justify-between p-3 border border-[var(--border)] cursor-pointer hover:bg-white/5 transition-all">
                      <span className="text-xs">Actionable Steps</span>
                      <input type="checkbox" checked={includeSteps} onChange={(e) => setIncludeSteps(e.target.checked)} className="accent-[var(--accent)]" />
                    </label>
                  </div>
                </div>
              </div>

              {/* Input/Output */}
              <div className="flex flex-col gap-6">
                <div className="card p-0 overflow-hidden" style={{ background: 'var(--surface2)' }}>
                  <div className="p-4 border-b border-[var(--border)] flex justify-between items-center">
                    <h4 className="mono text-[10px] uppercase tracking-widest text-[var(--muted)]">Core_Concept</h4>
                    <button onClick={() => setTopic('')} className="text-[var(--muted)] hover:text-red-500"><RotateCcw size={14} /></button>
                  </div>
                  <textarea
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    placeholder="Enter your idea or task here (e.g. Write a script for a data dashboard)..."
                    className="w-full h-40 p-6 bg-transparent border-none outline-none text-theme resize-none text-sm"
                    style={{ lineHeight: 1.6 }}
                  />
                </div>

                <div className="card p-0 overflow-hidden" style={{ background: 'var(--bg)', border: '1px solid var(--accent)' }}>
                  <div className="p-4 border-b border-[var(--border)] flex justify-between items-center bg-[var(--surface)]">
                    <div className="flex items-center gap-2">
                      <Sparkles size={14} className="text-[var(--accent)]" />
                      <h4 className="mono text-[10px] uppercase tracking-widest text-[var(--text)]">Surgical_Prompt_Output</h4>
                    </div>
                    <button 
                      onClick={handleCopy}
                      className="text-[var(--accent)] hover:opacity-80 transition-all flex items-center gap-2 mono text-[10px]"
                    >
                      {copied ? <Check size={14} /> : <Copy size={14} />} COPY_PROMPT
                    </button>
                  </div>
                  <div 
                    className="p-6 h-[250px] overflow-y-auto mono text-xs leading-relaxed text-[var(--muted)]"
                    style={{ whiteSpace: 'pre-wrap' }}
                  >
                    {generatedPrompt || 'Your surgical prompt will appear here once you enter a concept...'}
                  </div>
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
