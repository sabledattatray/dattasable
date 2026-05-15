import Link from 'next/link';
import LogoIcon from './LogoIcon';
import { ArrowUpRight, Mail, MapPin, Clock, BarChart3, BookOpen, LayoutDashboard, Zap, BrainCircuit, PieChart, Database, Code2, User, MessageSquare, Users, GitBranch, Send, LucideIcon, Globe, PenTool, Sparkles, Activity, Library, Search, Shield, Github } from 'lucide-react';

interface NavLink {
  label: string;
  href: string;
  icon: LucideIcon;
  external?: boolean;
}

interface NavSection {
  heading: string;
  links: NavLink[];
}

const NAV_LINKS: NavSection[] = [
  {
    heading: 'Work',
    links: [
      { label: 'Start Here',    href: '/start-here', icon: Sparkles },
      { label: 'Portfolio',     href: '/portfolio', icon: BarChart3 },
      { label: 'Case Studies',  href: '/portfolio?category=Analysis', icon: BookOpen },
      { label: 'Dashboards',    href: '/portfolio?category=Dashboard', icon: LayoutDashboard },
      { label: 'Automation',    href: '/portfolio?category=Automation', icon: Zap },
    ],
  },
  {
    heading: 'Services',
    links: [
      { label: 'BI Consulting',      href: '/services#consulting', icon: BrainCircuit },
      { label: 'Dashboard Design',   href: '/services#dashboards', icon: PieChart },
      { label: 'Web Solutions',      href: '/services#web-solutions', icon: Globe },
      { label: 'Graphic Design',     href: '/services#graphic-design', icon: PenTool },
      { label: 'SEO Optimization',   href: '/services#seo-optimization', icon: Sparkles },
      { label: 'n8n Automation',     href: '/services#n8n-automation', icon: Zap },
    ],

  },
  {
    heading: 'Workspace',
    links: [
      { label: 'Surgical Tools',   href: '/tools',     icon: Zap },
      { label: 'Templates Hub',    href: '/templates', icon: Library },
      { label: 'Workflow Chains',  href: '/chains',    icon: GitBranch },
      { label: 'Knowledge Hub',    href: '/knowledge', icon: BookOpen },
    ],
  },
  {
    heading: 'Connect',
    links: [
      { label: 'About',       href: '/about',                                   icon: User },
      { label: 'Contact',     href: '/contact',                                 icon: MessageSquare },
      { label: 'LinkedIn',    href: 'https://www.linkedin.com/in/dattasable/',  icon: Users,          external: true },
      { label: 'Twitter / X', href: 'https://x.com/sabledattatray',             icon: MessageSquare,  external: true },
      { label: 'GitHub',      href: 'https://github.com/sabledattatray',        icon: Code2,          external: true },
    ],
  },
  {
    heading: 'Explore',
    links: [
      { label: 'Live Feed',      href: '/analytics-live', icon: Activity },
      { label: 'Technical Blog', href: '/blog',       icon: BookOpen },
      { label: 'AI Glossary',    href: '/glossary',   icon: Search },
      { label: 'Disclaimer',    href: '/disclaimer', icon: Shield },
      { label: 'Sitemap',   href: '/sitemap.xml', icon: Globe, external: true },
    ],
  },
  {
    heading: 'Resources',
    links: [
      { label: 'Microsoft BI',   href: 'https://powerbi.microsoft.com/', icon: Database, external: true },
      { label: 'n8n Workflow',   href: 'https://n8n.io/',                icon: Zap,      external: true },
      { label: 'Next.js 14',     href: 'https://nextjs.org/',            icon: Code2,    external: true },
      { label: 'Vercel Cloud',   href: 'https://vercel.com/',            icon: Globe,    external: true },
      { label: 'Tailwind CSS',   href: 'https://tailwindcss.com/',       icon: Sparkles, external: true },
    ],
  },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      style={{
        background: 'var(--footer-bg)',
        borderTop: '1px solid var(--border)',
        width: '100%',
        paddingTop: '3rem',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Ultra-Premium Aurora & Starfield Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        {/* Deep Space Aurora Mesh */}
        <div className="absolute top-0 left-1/4 w-[1000px] h-[600px] bg-gradient-to-tr from-[var(--accent)]/12 via-purple-500/5 to-blue-500/12 rounded-full blur-[150px] transform -translate-y-1/2" />
        <div className="absolute bottom-0 right-1/4 w-[800px] h-[500px] bg-gradient-to-bl from-blue-600/12 via-cyan-500/5 to-[var(--accent)]/12 rounded-full blur-[150px] transform translate-y-1/3" />
        
        {/* Surgical Precision Shapes & HUD Crosshairs */}
        {/* Top-Left Calibration Crosshair */}
        <div className="absolute top-[15%] left-[8%] opacity-40 transform scale-75">
          <div className="absolute w-8 h-[1px] bg-[var(--border)] -left-4 top-0" />
          <div className="absolute h-8 w-[1px] bg-[var(--border)] -top-4 left-0" />
          <div className="absolute w-1.5 h-1.5 bg-[var(--accent)] rounded-full -left-[3px] -top-[3px] shadow-[0_0_10px_var(--accent)]" />
          <span className="absolute -left-10 -top-6 text-[9px] font-mono text-[var(--muted)] tracking-widest select-none">SYS.01</span>
        </div>

        {/* Top-Right Surgical Target */}
        <div className="absolute top-[25%] right-[12%] opacity-30 transform scale-100">
          <div className="absolute w-12 h-12 border border-[var(--border)] rounded-full -left-6 -top-6" />
          <div className="absolute w-3 h-3 border border-[var(--accent)] -left-1.5 -top-1.5 rotate-45" />
          <div className="absolute w-16 h-[1px] bg-[var(--border)] -left-8 top-0" />
          <div className="absolute h-16 w-[1px] bg-[var(--border)] -top-8 left-0" />
          <span className="absolute left-8 top-2 text-[9px] font-mono text-[var(--muted)] tracking-widest select-none">BI_CALIB://99.8%</span>
        </div>

        {/* Bottom-Left Tech Bracket */}
        <div className="absolute bottom-[20%] left-[15%] opacity-40">
          <div className="absolute w-6 h-6 border-l-2 border-b-2 border-[var(--muted)] -left-3 -bottom-3" />
          <div className="absolute w-1 h-1 bg-[var(--accent)] left-4 bottom-0 shadow-[0_0_8px_var(--accent)]" />
          <div className="absolute w-1 h-1 bg-[var(--muted)] left-7 bottom-0" />
          <div className="absolute w-1 h-1 bg-[var(--muted)] left-10 bottom-0" />
          <span className="absolute left-14 -bottom-1 text-[9px] font-mono text-[var(--muted)] tracking-widest select-none">SEC_NODE:OK</span>
        </div>

        {/* Bottom-Right Precision Marker */}
        <div className="absolute bottom-[30%] right-[8%] opacity-40 transform scale-75">
          <div className="absolute w-10 h-[1px] bg-[var(--border)] -left-5 top-0" />
          <div className="absolute h-10 w-[1px] bg-[var(--border)] -top-5 left-0" />
          <div className="absolute w-2 h-2 border border-[var(--accent)] -left-1 -top-1" />
          <span className="absolute -left-12 bottom-4 text-[9px] font-mono text-[var(--muted)] tracking-widest select-none">ALT.802</span>
        </div>

        {/* Center-Top Micro Grid Tic */}
        <div className="absolute top-[10%] left-[55%] opacity-25">
          <div className="flex gap-2">
            <div className="w-1 h-3 bg-[var(--border)]" />
            <div className="w-1 h-3 bg-[var(--border)]" />
            <div className="w-1 h-3 bg-[var(--accent)] shadow-[0_0_8px_var(--accent)]" />
            <div className="w-1 h-3 bg-[var(--border)]" />
          </div>
          <span className="absolute left-8 -top-0.5 text-[8px] font-mono text-[var(--muted)] tracking-widest select-none">FLOW_RATE</span>
        </div>
        {/* Top Glowing Aurora Highlight */}
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[var(--accent)]/40 via-blue-500/40 to-transparent shadow-[0_0_25px_var(--accent)]" />
      </div>

      <div 
        className="relative z-10"
        style={{ 
          maxWidth: '1448px', 
          margin: '0 auto', 
          padding: '2rem 3rem 4rem 3rem' 
        }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-12 gap-10">
          {/* Brand Section Glass Card */}
          <div 
            className="lg:col-span-4 xl:col-span-4 flex flex-col justify-between rounded-2xl bg-white/[0.015] border border-white/[0.05] backdrop-blur-2xl shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] group/brand hover:border-white/[0.1] transition-all duration-500 relative overflow-hidden"
            style={{ padding: '3.5rem 3rem' }}
          >
            <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-[var(--accent)]/40 to-transparent opacity-0 group-hover/brand:opacity-100 transition-opacity duration-500" />
            <div>
              <Link
                href="/"
                className="group no-underline"
                aria-label="Datta Sable - Home"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.6rem',
                  textDecoration: 'none',
                  marginBottom: '1.75rem',
                }}
              >
                <div className="p-2 bg-white/5 border border-white/10 rounded-sm group-hover:border-[var(--accent)] transition-all duration-500 shadow-inner">
                  <LogoIcon className="w-6 h-6 group-hover:rotate-[30deg] transition-transform duration-500" color="var(--accent)" />
                </div>
                <span
                  style={{
                    fontFamily: "'Syne', sans-serif",
                    fontWeight: 700,
                    fontSize: '1.35rem',
                    color: 'var(--text)',
                    letterSpacing: '-0.02em',
                  }}
                  className="group-hover:text-[var(--accent)] transition-colors"
                >
                  Datta Sable
                </span>
              </Link>

              <p
                style={{
                  color: 'var(--muted)',
                  fontSize: '0.95rem',
                  lineHeight: 1.7,
                  maxWidth: '90%',
                  marginBottom: '2.5rem',
                  fontFamily: "'Syne', sans-serif",
                }}
              >
                Premier <strong className="text-[var(--text)]">Business Intelligence Expert</strong> and <strong className="text-[var(--text)]">Data Strategy Consultant</strong> in India. Specializing in reliable <strong className="text-[var(--text)]">Automated Reporting Solutions</strong> and <strong className="text-[var(--text)]">Data Engineering</strong>.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginTop: '1.5rem', paddingTop: '1.5rem' }} className="border-t border-[var(--border)] border-opacity-60">
                <a
                  href="mailto:info@dattasable.com"
                  className="group/contact flex items-center gap-3 text-[var(--muted)] hover:text-[var(--accent)] transition-colors no-underline"
                  style={{
                    fontSize: '0.85rem',
                    fontFamily: "'JetBrains Mono', monospace",
                  }}
                >
                  <Mail size={15} className="text-[var(--accent)] group-hover/contact:scale-110 transition-transform" />
                  info@dattasable.com
                </a>
                <a
                  href="tel:+918010803756"
                  className="group/contact flex items-center gap-3 text-[var(--muted)] hover:text-[var(--accent)] transition-colors no-underline"
                  style={{
                    fontSize: '0.85rem',
                    fontFamily: "'JetBrains Mono', monospace",
                  }}
                >
                  <Clock size={15} className="text-[var(--accent)] group-hover/contact:scale-110 transition-transform" />
                  +91 8010803756
                </a>
                <span
                  className="flex items-center gap-3 text-[var(--muted)]"
                  style={{
                    fontSize: '0.85rem',
                    fontFamily: "'JetBrains Mono', monospace",
                  }}
                >
                  <MapPin size={15} className="text-[var(--accent)]" />
                  Mumbai, Maharashtra, India
                </span>
              </div>
            </div>
          </div>

          {/* Navigation Columns Glass Container */}
          <div 
            className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 lg:col-span-8 xl:col-span-8 gap-10 rounded-2xl bg-white/[0.015] border border-white/[0.05] backdrop-blur-2xl shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] hover:border-white/[0.1] transition-all duration-500"
            style={{ padding: '3.5rem 3rem' }}
          >
            {NAV_LINKS.map((col) => (
              <div key={col.heading} className="flex flex-col">
                <h3
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: '11px',
                    fontWeight: 700,
                    color: 'var(--text)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.2em',
                    marginBottom: '2rem',
                  }}
                  className="flex items-center gap-2"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] shadow-[0_0_8px_var(--accent)]" />
                  {col.heading}
                </h3>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
                  {col.links.map((lnk) => {
                    const IconComponent = lnk.icon;
                    return (
                      <li key={lnk.label}>
                        <Link
                          href={lnk.href}
                          target={lnk.external ? '_blank' : undefined}
                          rel={lnk.external ? 'noopener noreferrer' : undefined}
                          className="group/link flex items-center gap-2.5 text-[var(--muted)] hover:text-[var(--accent)] hover:translate-x-1 transition-all duration-300 no-underline"
                          style={{
                            fontSize: '0.9rem',
                            fontFamily: "'Syne', sans-serif",
                          }}
                        >
                          {IconComponent && (
                            <IconComponent size={14} className="text-[var(--muted)] group-hover/link:text-[var(--accent)] transition-colors flex-shrink-0 opacity-60 group-hover/link:opacity-100" />
                          )}
                          <span>{lnk.label}</span>
                          {lnk.external && (
                            <ArrowUpRight size={12} className="opacity-40 group-hover/link:opacity-100 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-all" />
                          )}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div
        style={{
          background: 'var(--footer-bottom-bg)',
          borderTop: '1px solid var(--border)',
          padding: '1.5rem 3rem',
        }}
      >
        <div 
          className="flex flex-col items-center justify-center text-center gap-4 md:flex-row md:justify-between md:text-left"
          style={{ 
            maxWidth: '1448px', 
            margin: '0 auto', 
          }}
        >
          <p
            style={{
              fontFamily: "'Syne', sans-serif",
              fontSize: '0.8rem',
              color: 'var(--muted)',
            }}
          >
            <span className="hidden sm:inline">© {year} Datta Sable. Built for technical creators & enterprise BI architectures.</span>
            <span className="sm:hidden">© {year} Datta Sable. Enterprise BI Architect.</span>
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2">
            <Link href="/privacy" className="hover:text-[var(--accent)] transition-colors no-underline" style={{ fontSize: '0.7rem', color: 'var(--muted)', fontFamily: "'JetBrains Mono', monospace", letterSpacing: '0.15em', fontWeight: 'bold' }}>
              PRIVACY
            </Link>
            <Link href="/terms" className="hover:text-[var(--accent)] transition-colors no-underline" style={{ fontSize: '0.7rem', color: 'var(--muted)', fontFamily: "'JetBrains Mono', monospace", letterSpacing: '0.15em', fontWeight: 'bold' }}>
              TERMS
            </Link>
            <Link href="/cookies" className="hover:text-[var(--accent)] transition-colors no-underline" style={{ fontSize: '0.7rem', color: 'var(--muted)', fontFamily: "'JetBrains Mono', monospace", letterSpacing: '0.15em', fontWeight: 'bold' }}>
              COOKIES
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
