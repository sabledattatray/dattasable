import Image from 'next/image';
import { Table, Database, BarChart3, Layers, Code2 } from 'lucide-react';
import HeroInteraction from './HeroInteraction';

function TechLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-4 mb-6" style={{ minHeight: '32px' }}>
      <div className="label-tech">{children}</div>
    </div>
  );
}

export default function Hero() {
  return (
    <section
      className="section hero-grid"
      style={{
        minHeight: '600px',
        height: 'auto',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
        padding: '2rem 0',
        backgroundColor: 'var(--bg)',
        border: 'none'
      }}
    >
      {/* Layer 1: Right-Side Visual - Optimized for Server Rendering */}
      <div
        id="hero-visual-container"
        className="absolute top-[45%] right-0 -translate-y-1/2 w-full lg:w-[55%] z-0 pointer-events-none overflow-hidden aspect-[4/3] lg:aspect-auto lg:h-[80vh]"
        style={{
          opacity: 0.35,
        }}
      >
        <div className="relative w-full h-full">
          <Image
            src="/hero-bg.webp"
            alt="Datta Sable | Business Intelligence Expert & Data Strategy Consultant"
            fill
            priority
            loading="eager"
            fetchPriority="high"
            decoding="sync"
            quality={30}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
            className="object-cover"
            style={{ objectPosition: 'center top' }}
          />
        </div>
        <div
          className="absolute inset-0 z-10 pointer-events-none"
          style={{
            background: 'linear-gradient(45deg, var(--hero-gradient-color) 0%, var(--hero-gradient-color) var(--hero-gradient-solid), transparent var(--hero-gradient-end))'
          }}
        />
        
        <div className="block lg:hidden" style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to bottom, transparent 50%, var(--bg) 100%)',
          zIndex: 2,
        }} />
      </div>

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: 640 }}>
          <TechLabel>
            <span className="hidden sm:inline">Creator Intelligence Infrastructure & Data Engineering</span>
            <span className="inline sm:hidden">AI Workflow Architect</span>
          </TechLabel>
          <h1
            className="hero-title lg:mt-12"
            style={{
              fontSize: 'clamp(2.5rem, 7vw, 56px)',
              fontWeight: 600,
              letterSpacing: '-0.02em',
              lineHeight: 1,
              marginBottom: '1.5rem',
              display: 'inline-block',
              minHeight: '1.1em'
            }}
          >
            Surgical AI Workspace<br />for <span className="hero-title">Builders & Creators</span>
          </h1>
          <p style={{ color: 'var(--text)', fontSize: '1.1rem', marginBottom: '3rem', lineHeight: 1.6, opacity: 0.8 }}>
            Design, automate, and scale <strong>AI-powered workflows</strong> with structured prompt systems and execution frameworks for modern digital work.
          </p>
          
          <HeroInteraction />

          <div style={{ height: '2rem' }} />

          {/* Tool Icons */}
          <div className="relative w-full overflow-hidden no-scrollbar py-4">
            <div className="hidden lg:flex items-center gap-x-12">
              {[
                { icon: <Table size={18} />, label: 'Excel' },
                { icon: <Database size={18} />, label: 'SQL' },
                { icon: <BarChart3 size={18} />, label: 'Power BI' },
                { icon: <Layers size={18} />, label: 'Tableau' },
                { icon: <Code2 size={18} />, label: 'Python' },
              ].map((tool) => (
                <div key={tool.label} className="flex items-center gap-2">
                  <div style={{ color: 'var(--accent)' }}>{tool.icon}</div>
                  <span className="mono text-[12px] text-[var(--text)] uppercase tracking-[0.2em]">{tool.label}</span>
                </div>
              ))}
            </div>

            <div className="flex lg:hidden overflow-hidden">
              <div className="animate-marquee flex items-center gap-x-8 pr-8">
                {[
                  { icon: <Table size={18} />, label: 'Excel' },
                  { icon: <Database size={18} />, label: 'SQL' },
                  { icon: <BarChart3 size={18} />, label: 'Power BI' },
                  { icon: <Layers size={18} />, label: 'Tableau' },
                  { icon: <Code2 size={18} />, label: 'Python' },
                  { icon: <Table size={18} />, label: 'Excel' },
                  { icon: <Database size={18} />, label: 'SQL' },
                  { icon: <BarChart3 size={18} />, label: 'Power BI' },
                  { icon: <Layers size={18} />, label: 'Tableau' },
                  { icon: <Code2 size={18} />, label: 'Python' },
                ].map((tool, idx) => (
                  <div key={`${tool.label}-${idx}`} className="flex items-center gap-2 flex-shrink-0">
                    <div style={{ color: 'var(--accent)' }}>{tool.icon}</div>
                    <span className="mono text-[12px] text-[var(--text)] uppercase tracking-[0.2em] whitespace-nowrap">{tool.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
