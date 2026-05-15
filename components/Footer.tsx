import Link from 'next/link';
import LogoIcon from './LogoIcon';
import { ArrowUpRight, Mail, MapPin, Clock, BarChart3, BookOpen, LayoutDashboard, Zap, BrainCircuit, PieChart, Database, Code2, User, MessageSquare, Users, GitBranch, Send, LucideIcon, Globe, PenTool, Sparkles, Activity, Library, Search, Shield } from 'lucide-react';

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
      { label: 'About',    href: '/about',                  icon: User },
      { label: 'Contact',     href: '/contact',                icon: MessageSquare },
      { label: 'LinkedIn', href: 'https://www.linkedin.com/in/dattasable/',    icon: Users,      external: true },
      { label: 'Twitter / X', href: 'https://x.com/sabledattatray',    icon: MessageSquare,  external: true },
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
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      style={{
        background: 'var(--bg)',
        borderTop: '1px solid var(--border)',
        width: '100%',
        paddingTop: '6rem',
      }}
    >
      <div 
        style={{ 
          maxWidth: '1448px', 
          margin: '0 auto', 
          padding: '0 2rem 6rem' 
        }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-12 gap-16">
          {/* Brand Section */}
          <div className="lg:col-span-4 xl:col-span-4 flex flex-col justify-between">
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

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }} className="pt-6 border-t border-[var(--border)] border-opacity-60">
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

          {/* Navigation Columns */}
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:col-span-8 xl:col-span-8 gap-10">
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
          background: 'var(--surface1)',
          borderTop: '1px solid var(--border)',
          padding: '1.5rem 2rem',
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
            © {year} Datta Sable. Built for technical creators & enterprise BI architectures.
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
