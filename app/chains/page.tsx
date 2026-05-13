import { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { CHAINS } from '@/data/chains';
import { 
  Zap, 
  ArrowRight, 
  Layers, 
  Cpu, 
  Activity, 
  ShieldCheck,
  LayoutDashboard
} from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: "Surgical Execution Chains™ | Automated AI Orchestration",
  description: "One input, multiple high-authority outputs. Deploy automated AI orchestration pipelines for LinkedIn, technical SEO, and deep research.",
};

export default function ChainHub() {
  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>
      <Navbar />
      
      <main className="boxed-wrapper" style={{ marginBottom: '80px' }}>
        <section className="section" style={{ paddingTop: 'clamp(6rem, 10vw, 8rem)' }}>
          <div className="container">
            <div style={{ maxWidth: 800, marginBottom: '4rem' }}>
              <div className="flex items-center gap-3 mb-4">
                <div style={{ color: 'var(--accent)', padding: '8px', background: 'var(--surface2)', border: '1px solid var(--border)', borderRadius: '6px' }}>
                  <Activity size={20} />
                </div>
                <div className="label-tech">ORCHESTRATION-ENGINE-V1.0</div>
              </div>
              <h1 style={{ fontSize: 'clamp(2.5rem, 8vw, 4rem)', lineHeight: 1, marginBottom: '1.5rem' }}>
                Execution <span className="hero-title">Chains™</span>
              </h1>
              <p style={{ color: 'var(--muted)', fontSize: '1.1rem', lineHeight: 1.6 }}>
                Automated multi-node pipelines that inherit your <span className="text-[var(--accent)] font-bold">Operator Profile</span>. One click to orchestrate your entire technical distribution strategy.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {CHAINS.map((chain) => (
                <Link key={chain.id} href={`/chains/${chain.slug}`} className="no-underline group">
                  <div className="card h-full flex flex-col p-8 transition-all duration-300 hover:border-[var(--accent)]" style={{ background: 'var(--surface2)' }}>
                    <div className="flex justify-between items-start mb-6">
                      <div className="p-3 bg-[var(--bg)] border border-[var(--border)] rounded text-[var(--accent)]">
                        <Zap size={20} />
                      </div>
                      <div className="px-2 py-1 text-[9px] mono font-bold border border-[var(--accent)] text-[var(--accent)] rounded animate-pulse">
                        LIVE_PIPELINE
                      </div>
                    </div>

                    <h3 className="text-lg font-bold mb-3 text-[var(--text)] group-hover:text-[var(--accent)] transition-all">
                      {chain.title}
                    </h3>
                    
                    <p className="text-[var(--muted)] text-xs leading-relaxed mb-8 flex-1">
                      {chain.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-8">
                      {chain.nodes.map(node => (
                        <div key={node} className="px-2 py-1 text-[8px] mono bg-[var(--surface)] border border-[var(--border)] text-[var(--muted)]">
                          {node.toUpperCase()}
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center justify-between mt-auto pt-6 border-t border-[var(--border)]/30">
                      <div className="flex items-center gap-2 text-[var(--accent)] text-[10px] mono font-bold tracking-widest group-hover:gap-4 transition-all">
                        INITIATE_CHAIN <ArrowRight size={12} />
                      </div>
                      <Layers size={12} className="text-[var(--muted)] opacity-20" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Orchestration Feature Callout */}
            <div className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="card p-12" style={{ background: 'var(--surface2)' }}>
                <Cpu size={32} className="text-[var(--accent)] mb-6" />
                <h3 className="text-xl font-bold mb-4">Programmable Infrastructure</h3>
                <p className="text-[var(--muted)] text-sm leading-relaxed mb-6">
                  Surgical Execution Chains aren't just automations. They are context-aware cognitive pipelines that adapt based on your persona and distribution intent.
                </p>
                <div className="flex gap-4">
                  <div className="flex items-center gap-2 text-[10px] mono text-[var(--muted)]">
                    <ShieldCheck size={12} className="text-[var(--accent)]" /> OPERATOR_AWARE
                  </div>
                  <div className="flex items-center gap-2 text-[10px] mono text-[var(--muted)]">
                    <ShieldCheck size={12} className="text-[var(--accent)]" /> PERSISTENT_MEMORY
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-8">
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full border border-[var(--accent)] flex items-center justify-center text-[var(--accent)] mono text-xs shrink-0">01</div>
                  <div>
                    <h5 className="text-[var(--text)] font-bold mb-1">Define Objective</h5>
                    <p className="text-[var(--muted)] text-xs">Enter your main technical topic or asset draft.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full border border-[var(--border)] flex items-center justify-center text-[var(--muted)] mono text-xs shrink-0">02</div>
                  <div>
                    <h5 className="text-[var(--text)] font-bold mb-1">Orchestrate Nodes</h5>
                    <p className="text-[var(--muted)] text-xs">The engine executes multi-module logic simultaneously.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full border border-[var(--border)] flex items-center justify-center text-[var(--muted)] mono text-xs shrink-0">03</div>
                  <div>
                    <h5 className="text-[var(--text)] font-bold mb-1">Export Package</h5>
                    <p className="text-[var(--muted)] text-xs">Download your complete distribution package in one click.</p>
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
