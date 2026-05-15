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
      className="section hero-grid-inline"
      style={{
        minHeight: '600px',
        height: 'auto',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
        padding: '6rem 0 2rem 0',
        backgroundColor: 'var(--bg)',
      }}
    >
      {/* Layer 1: Right-Side Visual - Optimized for Server Rendering */}
      <div
        id="hero-visual-container"
        className="absolute top-[45%] right-[1px] -translate-y-1/2 w-[calc(100%-2px)] lg:w-[55%] z-0 pointer-events-none overflow-hidden aspect-[4/3] lg:aspect-auto lg:h-[80vh] hero-visual-container"
      >
        <div className="relative w-full h-full">
          <Image
            src="/hero-bg.webp"
            alt="Surgical AI Workspace | Creator Intelligence Infrastructure"
            fill
            priority
            fetchPriority="high"
            sizes="(max-width: 480px) 380px, (max-width: 768px) 640px, (max-width: 1200px) 70vw, 55vw"
            quality={65}
            className="object-cover"
            style={{ objectPosition: 'center top' }}
          />
        </div>
        <div
          className="absolute inset-0 z-10 pointer-events-none hero-gradient-overlay"
        />
        
        <div className="block lg:hidden hero-mobile-fade" />
      </div>

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: 640 }}>
          <div className="mb-8 opacity-60 flex items-center gap-4">
            <div className="h-[1px] w-8 bg-[var(--accent)]" />
            <span className="mono text-[11px] uppercase tracking-[0.3em] text-[var(--accent)]">
              Surgical AI Workspace
            </span>
          </div>
          <h1
            className="hero-title-inline lg:mt-6"
            style={{
              fontSize: 'clamp(2.5rem, 8vw, 64px)',
              marginBottom: '2rem',
              display: 'block'
            }}
          >
            AI Workflow Infrastructure <span className="text-[var(--muted)]">for</span> <span className="hero-title-inline">Creators & Builders</span>
          </h1>
          <p style={{ color: 'var(--text)', fontSize: '1.1rem', marginBottom: '1.5rem', lineHeight: 1.6, opacity: 0.8 }}>
            Build scalable <strong>AI-powered workflows</strong> using structured prompts, system logic, and automation frameworks.
          </p>
          
          <div className="p-4 border-l-2 border-[var(--accent)] bg-[var(--surface2)] opacity-80" style={{ marginBottom: '2.625rem' }}>
            <p className="mono text-[12px] leading-relaxed">
              Independent AI workflow architect specializing in automation systems, BI infrastructure, and reliable execution design.
            </p>
          </div>
          
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
