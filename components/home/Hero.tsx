import Image from 'next/image';
import { Table, Database, BarChart3, Layers, Code2 } from 'lucide-react';
import HeroInteraction from './HeroInteraction';

function TechLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-4 mb-6">
      <p className="label-tech">{children}</p>
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
          opacity: 0.45,
          background: 'radial-gradient(circle at 70% 30%, rgba(0, 212, 255, 0.05) 0%, transparent 70%)', // Obsidian Mesh Gradient
        }}
      >
        <div className="relative w-full h-full">
          <Image
            src="/images/blog/analytics_war_room_hero.webp"
            alt="Datta Sable | Business Intelligence Expert & Data Strategy Consultant"
            fill
            priority
            fetchPriority="high"
            loading="eager"
            quality={60}
            sizes="(max-width: 768px) 100vw, 55vw"
            className="object-cover"
            style={{ objectPosition: 'center right' }}
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
          <TechLabel>Business Intelligence Expert & Data Strategy Consultant</TechLabel>
          <h1
            className="hero-title"
            style={{
              fontSize: 'clamp(1.5rem, 8vw, 48px)',
              fontWeight: 600,
              letterSpacing: '-0.02em',
              lineHeight: 1.1,
              marginBottom: '1.5rem',
              display: 'inline-block'
            }}
          >
            Engineering data into<br />strategic roadmaps
          </h1>
          <p style={{ color: 'var(--text)', fontSize: '1.05rem', marginBottom: '3rem', lineHeight: 1.6, opacity: 0.8 }}>
            Premier <strong>BI Developer in India</strong>. I simplify complex data ecosystems into actionable executive insights through <strong>SQL Automation</strong>, <strong>Python Data Engineering</strong>, and high-fidelity <strong>Automated Reporting Solutions</strong>.
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
