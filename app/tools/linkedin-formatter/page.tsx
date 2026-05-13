'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { 
  Copy, 
  Check, 
  Share2, 
  Trash2, 
  Sparkles, 
  ArrowLeft 
} from 'lucide-react';
import Link from 'next/link';

export default function LinkedInFormatter() {
  const [text, setText] = useState('');
  const [copied, setCopied] = useState(false);

  const formatText = (type: 'hooks' | 'spacing' | 'bullets') => {
    let formatted = text;
    
    if (type === 'spacing') {
      // Add double spacing between paragraphs
      formatted = text.split('\n').filter(p => p.trim()).join('\n\n');
    } else if (type === 'bullets') {
      // Convert lines to bullet points
      formatted = text.split('\n').map(line => line.trim() ? `• ${line.trim()}` : '').join('\n');
    } else if (type === 'hooks') {
      // Add a hook-style prefix if not present
      if (!text.startsWith('🚀')) {
        formatted = `🚀 ${text}`;
      }
    }
    
    setText(formatted);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
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
                  <Share2 size={20} />
                </div>
                <div className="label-tech">SOCIAL-ENGINEERING</div>
              </div>
              <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', lineHeight: 1.1, marginBottom: '1.5rem' }}>
                LinkedIn Authority <span className="hero-title">Formatter</span>
              </h1>
              <p style={{ color: 'var(--muted)', fontSize: '1rem', lineHeight: 1.6 }}>
                Transform messy technical notes into high-authority LinkedIn posts. Optimized for the "Surgical Spacing" technique that maximizes mobile readability.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Editor Area */}
              <div className="lg:col-span-2">
                <div className="card p-0 overflow-hidden" style={{ background: 'var(--surface2)' }}>
                  <div className="flex items-center justify-between p-4 border-bottom" style={{ borderBottom: '1px solid var(--border)' }}>
                    <div className="flex items-center gap-4">
                      <button 
                        onClick={() => formatText('spacing')}
                        className="btn-outline px-3 py-1.5 text-[10px] lowercase flex items-center gap-1"
                      >
                        <Sparkles size={12} /> add_spacing
                      </button>
                      <button 
                        onClick={() => formatText('bullets')}
                        className="btn-outline px-3 py-1.5 text-[10px] lowercase flex items-center gap-1"
                      >
                        <Sparkles size={12} /> auto_bullets
                      </button>
                    </div>
                    <button 
                      onClick={() => setText('')}
                      className="text-[var(--muted)] hover:text-red-500 transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                  <textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Paste your messy notes or draft here..."
                    className="w-full h-[400px] p-8 bg-transparent border-none outline-none text-theme font-sans resize-none"
                    style={{ lineHeight: 1.6, fontSize: '1.05rem' }}
                  />
                </div>
              </div>

              {/* Sidebar Actions */}
              <div className="flex flex-col gap-6">
                <div className="card" style={{ background: 'var(--bg)' }}>
                  <h4 className="mono text-[10px] uppercase tracking-widest text-[var(--muted)] mb-6">Execution_Panel</h4>
                  
                  <button 
                    onClick={handleCopy}
                    disabled={!text}
                    className="btn-primary w-full flex items-center justify-center gap-2 mb-4 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {copied ? (
                      <><Check size={16} /> COPIED_TO_BUFFER</>
                    ) : (
                      <><Copy size={16} /> COPY_FOR_LINKEDIN</>
                    )}
                  </button>
                  
                  <div style={{ padding: '1rem', background: 'var(--surface2)', border: '1px solid var(--border)', borderRadius: '4px' }}>
                    <p className="text-[10px] mono text-[var(--muted)] leading-relaxed">
                      TIP: LinkedIn algorithms prioritize posts with clear vertical spacing and bulleted lists. Ensure your "Hook" (first 2 lines) is punchy.
                    </p>
                  </div>
                </div>

                <div className="card" style={{ background: 'var(--bg)', borderStyle: 'dashed' }}>
                  <h4 className="mono text-[10px] uppercase tracking-widest text-[var(--muted)] mb-4">Post_Metrics</h4>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs text-[var(--muted)]">Characters:</span>
                    <span className="text-xs mono">{text.length}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-[var(--muted)]">Est. Lines:</span>
                    <span className="text-xs mono">{text.split('\n').length}</span>
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
