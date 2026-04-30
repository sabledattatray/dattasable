import Link from 'next/link';
import LogoIcon from './LogoIcon';
import { ArrowUpRight, Mail, MapPin, Clock, BarChart3, BookOpen, LayoutDashboard, Zap, BrainCircuit, PieChart, Database, Code2, User, MessageSquare, Users, GitBranch, Send, LucideIcon, Globe, PenTool, Sparkles } from 'lucide-react';

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
      { label: 'Portfolio',     href: '/portfolio', icon: BarChart3 },
      { label: 'Case Studies',  href: '/portfolio', icon: BookOpen },
      { label: 'Dashboards',    href: '/portfolio', icon: LayoutDashboard },
      { label: 'Automation',    href: '/portfolio', icon: Zap },
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
    heading: 'Connect',
    links: [
      { label: 'About',    href: '/about',                  icon: User },
      { label: 'Contact',  href: '/contact',                icon: MessageSquare },
      { label: 'LinkedIn', href: 'https://www.linkedin.com/in/dattasable/',    icon: Users,      external: true },
      { label: 'GitHub',   href: 'https://github.com/sabledattatray',      icon: GitBranch,  external: true },
      { label: 'Telegram', href: 'https://t.me/sabledatta',          icon: Send,       external: true },
      { label: 'Twitter / X', href: 'https://x.com/sabledattatray',    icon: MessageSquare,  external: true },
    ],
  },
  {
    heading: 'Explore',
    links: [
      { label: 'Blog',       href: '/blog',       icon: BookOpen },
      { label: 'Dashboards', href: '/dashboards', icon: LayoutDashboard },
      { label: 'Resume',     href: '/resume',     icon: User },
      { label: 'Hire Me',    href: '/contact',    icon: Send },
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
          <div className="lg:col-span-4 xl:col-span-2">
            <Link
              href="/"
              className="group no-underline"
              aria-label="Datta Sable - Home"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                textDecoration: 'none',
                marginBottom: '2rem',
              }}
            >
              <LogoIcon className="w-7 h-7 group-hover:rotate-[30deg] transition-transform duration-500" color="var(--accent)" />
              <span
                style={{
                  fontFamily: "'Syne', sans-serif",
                  fontWeight: 700,
                  fontSize: '1.25rem',
                  color: 'var(--text)',
                  letterSpacing: '-0.02em',
                }}
              >
                Datta Sable
              </span>
            </Link>

            <p
              style={{
                color: 'var(--muted)',
                fontSize: '0.95rem',
                lineHeight: 1.6,
                maxWidth: '100%',
                marginBottom: '2.5rem',
                fontFamily: "'Syne', sans-serif",
              }}
            >
              Transforming raw data into strategic assets through advanced Business Intelligence and Automation.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <a
                href="mailto:info@dattasable.com"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  color: 'var(--muted)',
                  fontSize: '0.85rem',
                  fontFamily: "'JetBrains Mono', monospace",
                  textDecoration: 'none',
                }}
              >
                <Mail size={14} />
                info@dattasable.com
              </a>
              <a
                href="tel:+918010803756"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  color: 'var(--muted)',
                  fontSize: '0.85rem',
                  fontFamily: "'JetBrains Mono', monospace",
                  textDecoration: 'none',
                }}
              >
                <Clock size={14} />
                +91 8010803756
              </a>
              <span
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  color: 'var(--muted)',
                  fontSize: '0.85rem',
                  fontFamily: "'JetBrains Mono', monospace",
                }}
              >
                <MapPin size={14} />
                Mumbai, Maharashtra, India
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-10 md:contents lg:contents">
            {NAV_LINKS.map((col) => (
              <div key={col.heading} className="lg:col-span-2 xl:col-span-2">
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
                >
                  {col.heading}
                </h3>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {col.links.map((lnk) => (
                        <li key={lnk.label}>
                      <Link
                        href={lnk.href}
                        target={lnk.external ? '_blank' : undefined}
                        rel={lnk.external ? 'noopener noreferrer' : undefined}
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.5rem',
                          color: 'var(--muted)',
                          fontSize: '0.9rem',
                          fontFamily: "'Syne', sans-serif",
                          textDecoration: 'none',
                          transition: 'all 0.3s ease',
                        }}
                      >
                        {lnk.label}
                        {lnk.external && (
                          <ArrowUpRight size={12} style={{ opacity: 0.5 }} />
                        )}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Tools Section */}
          <div className="lg:col-span-2 xl:col-span-2">
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
            >
              Expertise
            </h3>
            <div 
              style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(2, 1fr)', 
                gap: '0.65rem' 
              }}
            >
              {['Tableau', 'Power BI', 'SQL', 'Python', 'CorelDRAW', 'ETL'].map((tool) => (
                <span
                  key={tool}
                  style={{
                    padding: '0.6rem 0.5rem',
                    border: '1px solid var(--border)',
                    background: 'var(--surface2)',
                    color: 'var(--muted)',
                    fontSize: '0.7rem',
                    fontFamily: "'JetBrains Mono', monospace",
                    borderRadius: '2px',
                    textAlign: 'center',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                  }}
                >
                  {tool}
                </span>
              ))}

            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div
        style={{
          borderTop: '1px solid var(--border)',
          padding: '1.25rem 2rem',
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
              fontSize: '0.75rem',
              color: 'var(--muted)',
            }}
          >
            © {year} Datta Sable. Built for high performance.
          </p>
          <div style={{ display: 'flex', gap: '2rem' }}>
            <Link href="/privacy" style={{ fontSize: '0.75rem', color: 'var(--muted)', fontFamily: "'Syne', sans-serif", textDecoration: 'none' }}>
              PRIVACY POLICY
            </Link>
            <Link href="/terms" style={{ fontSize: '0.75rem', color: 'var(--muted)', fontFamily: "'Syne', sans-serif", textDecoration: 'none' }}>
              TERMS OF SERVICE
            </Link>
            <Link href="/disclaimer" style={{ fontSize: '0.75rem', color: 'var(--muted)', fontFamily: "'Syne', sans-serif", textDecoration: 'none' }}>
              DISCLAIMER
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
