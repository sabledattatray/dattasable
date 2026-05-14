import Link from 'next/link';
import LogoIcon from './LogoIcon';
import { ArrowUpRight, Mail, MapPin, Clock, BarChart3, BookOpen, LayoutDashboard, Zap, BrainCircuit, PieChart, Database, Code2, User, MessageSquare, Users, GitBranch, Send, LucideIcon, Globe, PenTool, Sparkles, Activity, Library, Search } from 'lucide-react';

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
      { label: 'About Operator',    href: '/about',                  icon: User },
      { label: 'Contact Node',     href: '/contact',                icon: MessageSquare },
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
      { label: 'Sitemap Node',   href: '/sitemap.xml', icon: Globe, external: true },
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
              Premier <strong>Business Intelligence Expert</strong> and <strong>Data Strategy Consultant</strong> in India. Specializing in high-fidelity <strong>Automated Reporting Solutions</strong> and <strong>Data Engineering</strong>.
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
