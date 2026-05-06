'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import LogoIcon from '@/components/LogoIcon';
import { motion, AnimatePresence } from 'framer-motion';
import { useSession, signOut } from 'next-auth/react';
import {
  Menu, X, ArrowUpRight,
  BarChart3, Database, Code2, Globe, Shield, Zap, TrendingUp, ChevronRight, ChevronDown,
  PieChart, Activity, Box, Layers, Briefcase, FileText, Send, Sparkles, User, LogOut, Settings,
  PenTool
} from 'lucide-react';
import dynamic from 'next/dynamic';
const LoginModal = dynamic(() => import('./LoginModal'), { ssr: false });
const MobileMenu = dynamic(() => import('./MobileMenu'), { ssr: false });
import ThemeToggle from './ThemeToggle';

const navLinks = [
  { label: 'Start Here', href: '/start-here' },
  { label: 'Live Feed', href: '/analytics-live' },
  { label: 'Services', href: '/services', mega: true },
  { label: 'Portfolio', href: '/portfolio', mega: true },
  { label: 'Blog', href: '/blog', mega: true },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

const megaMenuData: Record<string, any> = {
  Services: {
    items: [
      { title: 'BI Strategy', desc: 'Enterprise data roadmap planning.', icon: <Layers size={20} />, href: '/services#consulting' },
      { title: 'Dashboard Design', desc: 'Tableau & Power BI expert builds.', icon: <BarChart3 size={20} />, href: '/services#dashboards' },
      { title: 'Data Automation', desc: 'Python & SQL based pipelines.', icon: <Zap size={20} />, href: '/services#automation' },
      { title: 'Synthetic Data Forge', desc: 'High-fidelity dataset generation.', icon: <Database size={20} className="text-[var(--accent)]" />, href: '/data-forge' },
      { title: 'Enterprise Web Dev', desc: 'WordPress & Next.js solutions.', icon: <Globe size={20} />, href: '/services#web-solutions' },
      { title: 'Technical SEO', desc: 'On-page & technical ranking.', icon: <Sparkles size={20} />, href: '/services#seo-optimization' },
      { title: 'Premium Web Design', desc: 'Bespoke UI/UX experiences.', icon: <Layers size={20} />, href: '/services#web-design' },
      { title: 'Live Analytics Feed', desc: 'Real-time platform monitoring.', icon: <Activity size={20} className="text-[var(--accent)]" />, href: '/analytics-live' },
      { title: 'n8n Workflows', desc: 'Self-hosted app connectivity.', icon: <Zap size={20} />, href: '/services#n8n-automation' },
      { title: 'Graphic Design', desc: 'CorelDRAW vector solutions.', icon: <PenTool size={20} />, href: '/services#graphic-design' },
      { title: 'Predictive Modeling', desc: 'Statistical forecasting & AI.', icon: <Activity size={20} />, href: '/services#consulting' },




      { title: 'Data Governance', desc: 'Security, compliance & quality.', icon: <Shield size={20} />, href: '/services#consulting' },
    ]

  },
  Portfolio: {
    items: [
      { title: 'Interactive Dashboards', desc: 'Live visual experiences.', icon: <Box size={20} />, href: '/portfolio?category=Dashboard' },
      { title: 'Technical Analysis', desc: 'Detailed project breakdowns.', icon: <Briefcase size={20} />, href: '/portfolio?category=Analysis' },
      { title: 'Report Engineering', desc: 'High-fidelity data storytelling.', icon: <FileText size={20} />, href: '/portfolio?category=Report' },
      { title: 'Automation Assets', desc: 'Scalable backend data logic.', icon: <Zap size={20} />, href: '/portfolio?category=Automation' },
      { title: 'Success Metrics', desc: 'Impact analysis & ROI data.', icon: <TrendingUp size={20} />, href: '/portfolio' },
    ]
  },
  Blog: {
    items: [
      { title: 'Engineering', desc: 'Core tech stack & methodologies.', icon: <Code2 size={20} />, href: '/blog?category=Engineering' },
      { title: 'Data Analysis', desc: 'Market trends & production insights.', icon: <Sparkles size={20} />, href: '/blog?category=Analysis' },
      { title: 'Tutorials', desc: 'Step-by-step technical guides.', icon: <FileText size={20} />, href: '/blog?category=Tutorials' },
      { title: 'AI Research', desc: 'Exploring LLMs and GPT in BI.', icon: <Activity size={20} />, href: '/blog?category=AI' },
      { title: 'Architecture', desc: 'Enterprise design & standards.', icon: <TrendingUp size={20} />, href: '/blog?category=Architecture' },
    ]
  },
  Dashboards: {
    items: [
      { title: 'Financial BI', desc: 'Revenue & cost tracking.', icon: <Activity size={20} />, href: '/dashboards#financial' },
      { title: 'Operational Analytics', desc: 'Supply chain & logic metrics.', icon: <Globe size={20} />, href: '/dashboards#operations' },
      { title: 'Custom Solutions', desc: 'Bespoke technical reporting.', icon: <Sparkles size={20} />, href: '/dashboards#custom' },
      { title: 'Sales Tracking', desc: 'CRM and pipeline management.', icon: <BarChart3 size={20} />, href: '/dashboards#sales' },
      { title: 'HR Analytics', desc: 'Retention & performance KPIs.', icon: <Layers size={20} />, href: '/dashboards#hr' },
    ]
  }
};

export default function Navbar() {
  const { data: session } = useSession();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);
  const [expandedMobile, setExpandedMobile] = useState<string | null>(null);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 flex justify-center ${
          scrolled ? 'bg-[var(--navbar-bg)] backdrop-blur-md py-2 border-b border-[var(--border)]' : 'bg-transparent py-3'
        }`}
      >
        <div className="w-full max-w-[1448px] lg:px-0" style={{ paddingLeft: '1rem', paddingRight: '1rem' }}>
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link href="/" aria-label="Datta Sable - Home" className="flex items-baseline gap-1.5 group whitespace-nowrap flex-shrink-0" style={{ textDecoration: 'none' }}>
              <LogoIcon color="var(--accent)" className="w-8 h-8 lg:w-7 lg:h-7 group-hover:rotate-[30deg] transition-transform duration-500 relative top-[2px]" />
              <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: '1.2rem', color: 'var(--text)', letterSpacing: '-0.01em' }}>
                Datta Sable
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden xl:flex items-center gap-4 2xl:gap-8">
              {navLinks.map((link) => (
                <div 
                  key={link.label}
                  className="relative group"
                  onMouseEnter={() => setHovered(link.label)}
                  onMouseLeave={() => setHovered(null)}
                >
                  <Link
                    href={link.href}
                    className={`px-6 py-3 text-[11px] font-bold tracking-widest uppercase transition-all duration-300 no-underline relative z-10 flex items-center gap-1.5 ${
                      pathname === link.href || (hovered === link.label && link.mega)
                        ? 'text-[var(--accent)]' 
                        : 'text-[var(--text)] opacity-75 hover:opacity-100'
                    }`}
                    style={{ fontFamily: 'Syne, sans-serif' }}
                  >
                    {link.label}
                    {link.mega && (
                      <ChevronDown 
                        size={10} 
                        className={`transition-transform duration-300 ${hovered === link.label ? 'rotate-180' : ''}`} 
                      />
                    )}
                    {(pathname === link.href) && (
                      <motion.div layoutId="nav-underline" className="absolute bottom-0 left-0 right-0 h-[2px] bg-[var(--accent)]" />
                    )}
                  </Link>
                  
                  {/* Mega Menu Dropdown */}
                  <AnimatePresence>
                    {hovered === link.label && megaMenuData[link.label] && (
                      <motion.div
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="absolute left-1/2 -translate-x-1/2 w-max max-w-[1077.88px] bg-[var(--surface)] backdrop-blur-3xl border border-[var(--border)] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] rounded-xl overflow-hidden"
                        style={{ top: '60px' }}
                      >
                        <div className="grid grid-cols-3">
                          {megaMenuData[link.label].items.map((item: any, idx: number) => (
                            <motion.div
                              key={item.title}
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ delay: 0.1 + (idx * 0.05) }}
                              className={`border-b border-[var(--border)] ${idx % 3 !== 2 ? 'border-r' : ''}`}
                            >
                              <Link 
                                href={item.href} 
                                className="group/item block no-underline p-12 hover:bg-white/[0.02] transition-colors h-full min-h-[120px] flex flex-col justify-center"
                                onClick={() => setHovered(null)}
                              >
                                <div className="flex items-center gap-1.5">
                                  <div className="w-12 h-12 flex-shrink-0 flex items-center justify-center bg-white/5 border border-white/10 text-[var(--accent)] group-hover/item:border-[var(--accent)] transition-all duration-500">
                                    {item.icon}
                                  </div>
                                  <div className="flex-1">
                                    <h4 className="text-sm font-bold text-[var(--text)] mb-2 flex items-center gap-2 group-hover/item:text-[var(--accent)] transition-colors">
                                      {item.title}
                                      <ArrowUpRight size={14} className="opacity-0 group-hover/item:opacity-100 group-hover/item:translate-x-1 group-hover/item:-translate-y-1 transition-all" />
                                    </h4>
                                    <p className="text-[13px] text-[var(--muted)] leading-relaxed font-medium group-hover/item:text-[var(--text)] opacity-70 transition-colors">
                                      {item.desc}
                                    </p>
                                  </div>
                                </div>
                              </Link>
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
              
              <div className="ml-4 pl-4 border-l border-[var(--border)] flex items-center gap-4">
                <ThemeToggle />
                {session ? (
                  <div className="flex items-center">
                    <div className="flex items-center gap-3 px-4 py-2 rounded-full bg-white/[0.03] border border-white/5 group hover:border-[var(--accent)]/20 transition-all">
                      <div className="flex flex-col items-end">
                        <span className="text-[10px] font-bold text-[var(--text)] uppercase tracking-wider leading-none mb-1">{session.user?.name}</span>
                        <span className="text-[7px] text-[var(--accent)] font-mono uppercase opacity-60">
                          {(session.user as any)?.role || 'USER'}
                        </span>
                      </div>
                      <div className="w-7 h-7 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[var(--accent)] font-bold text-[10px]">
                        {session.user?.name?.charAt(0).toUpperCase()}
                      </div>
                      <button 
                        onClick={() => signOut()}
                        className="ml-2 p-2 text-[var(--muted)] hover:text-[var(--accent)] transition-colors border-l border-white/10 pl-3"
                        title="Sign Out"
                      >
                        <LogOut size={14} />
                      </button>
                    </div>
                  </div>
                ) : (
                  <button 
                    onClick={() => setIsLoginOpen(true)}
                    className="btn-primary"
                    style={{ 
                      textDecoration: 'none', 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '8px',
                      padding: '0.5rem 1.25rem',
                      fontSize: '12px'
                    }}
                  >
                    <User size={12} /> SIGN IN
                  </button>
                )}
              </div>
              <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
            </nav>

            {/* Mobile Actions */}
            <div className="xl:hidden flex items-center gap-1">
              <ThemeToggle />
              {!mobileMenuOpen && (
                <button
                  className="text-[var(--text)] p-2 hover:bg-white/5 transition-colors"
                  onClick={() => setMobileMenuOpen(true)}
                  aria-label="Open mobile menu"
                >
                  <Menu size={24} />
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Dynamic Component */}
      <MobileMenu 
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        navLinks={navLinks}
        megaMenuData={megaMenuData}
        expandedMobile={expandedMobile}
        setExpandedMobile={setExpandedMobile}
        session={session}
        signOut={() => signOut()}
        setIsLoginOpen={setIsLoginOpen}
      />
    </>
  );
}
