'use client';

import Link from 'next/link';
import LogoIcon from './LogoIcon';
import { ArrowUpRight, Mail, MapPin, Clock, BarChart3, BookOpen, LayoutDashboard, Zap, BrainCircuit, PieChart, Database, Code2, User, MessageSquare, Users, GitBranch, Send, LucideIcon } from 'lucide-react';

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
      { label: 'BI Consulting',      href: '/services', icon: BrainCircuit },
      { label: 'Dashboard Design',   href: '/services', icon: PieChart },
      { label: 'Data Modeling',      href: '/services', icon: Database },
      { label: 'Python Automation',  href: '/services', icon: Code2 },
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
        <div 
          style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(12, 1fr)', 
            gap: '4rem' 
          }}
          className="footer-grid-main"
        >
          {/* Brand Section */}
          <div style={{ gridColumn: 'span 4' }} className="footer-brand-section">
            <Link
              href="/"
              className="group"
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
                maxWidth: '320px',
                marginBottom: '2.5rem',
                fontFamily: "'Syne', sans-serif",
              }}
            >
              Transforming raw data into strategic assets through advanced Business Intelligence and Automation.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <a
                href="mailto:info@dattasable.com"
                aria-label="Email Datta Sable"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  color: 'var(--muted)',
                  fontSize: '0.85rem',
                  fontFamily: "'JetBrains Mono', monospace",
                  textDecoration: 'none',
                  transition: 'color 0.2s',
                }}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--accent)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'var(--muted)')}
              >
                <Mail size={14} />
                info@dattasable.com
              </a>
              <a
                href="tel:+918010803756"
                aria-label="Call Datta Sable"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  color: 'var(--muted)',
                  fontSize: '0.85rem',
                  fontFamily: "'JetBrains Mono', monospace",
                  textDecoration: 'none',
                  transition: 'color 0.2s',
                }}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--accent)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'var(--muted)')}
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

          {/* Navigation Links */}
          {NAV_LINKS.map((col) => (
            <div key={col.heading} style={{ gridColumn: 'span 2' }}>
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
                      onMouseEnter={e => {
                        e.currentTarget.style.color = 'var(--text)';
                        e.currentTarget.style.paddingLeft = '4px';
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.color = 'var(--muted)';
                        e.currentTarget.style.paddingLeft = '0';
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

          {/* Tools Section */}
          <div style={{ gridColumn: 'span 2' }}>
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
              className="footer-expertise-grid"
              style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(2, 1fr)', 
                gap: '0.65rem' 
              }}
            >
              {['Tableau', 'Power BI', 'SQL', 'Python', 'ETL', 'DAX'].map((tool) => (
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
                    transition: 'all 0.3s ease',
                    cursor: 'default',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = 'var(--accent)';
                    e.currentTarget.style.color = 'var(--text)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = 'var(--border)';
                    e.currentTarget.style.color = 'var(--muted)';
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
          padding: '2.5rem 2rem',
        }}
      >
        <div 
          className="footer-bottom-container"
          style={{ 
            maxWidth: '1448px', 
            margin: '0 auto', 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center' 
          }}
        >
          <p
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '0.75rem',
              color: 'var(--muted)',
            }}
          >
            © {year} Datta Sable. Built for high performance.
          </p>
          <div style={{ display: 'flex', gap: '2rem' }}>
            <Link href="/privacy" style={{ fontSize: '0.75rem', color: 'var(--muted)', fontFamily: "'JetBrains Mono', monospace", textDecoration: 'none' }}>
              PRIVACY POLICY
            </Link>
            <Link href="/terms" style={{ fontSize: '0.75rem', color: 'var(--muted)', fontFamily: "'JetBrains Mono', monospace", textDecoration: 'none' }}>
              TERMS OF SERVICE
            </Link>
          </div>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 1024px) {
          .footer-grid-main {
            display: flex !important;
            flex-direction: column !important;
            gap: 4rem !important;
          }
          .footer-brand-section {
            grid-column: span 12 !important;
          }
          .footer-bottom-container {
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 1.5rem !important;
          }
        }
      `}</style>
    </footer>
  );
}
