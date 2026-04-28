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
  PieChart, Activity, Box, Layers, Briefcase, FileText, Send, Sparkles
} from 'lucide-react';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services', mega: true },
  { label: 'Portfolio', href: '/portfolio', mega: true },
  { label: 'Blog', href: '/blog', mega: true },
  { label: 'Dashboards', href: '/dashboards', mega: true },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

const megaMenuData: Record<string, any> = {
  Services: {
    items: [
      { title: 'BI Strategy', desc: 'Enterprise data roadmap planning.', icon: <Layers size={20} />, href: '/services#strategy' },
      { title: 'Dashboard Design', desc: 'Tableau & Power BI expert builds.', icon: <BarChart3 size={20} />, href: '/services#dashboards' },
      { title: 'Data Automation', desc: 'Python & SQL based pipelines.', icon: <Zap size={20} />, href: '/services#automation' },
      { title: 'Predictive Modeling', desc: 'Statistical forecasting & AI.', icon: <Activity size={20} />, href: '/services#predictive' },
      { title: 'Data Governance', desc: 'Security, compliance & quality.', icon: <Shield size={20} />, href: '/services#governance' },
    ]
  },
  Portfolio: {
    items: [
      { title: 'Case Studies', desc: 'Detailed project breakdowns.', icon: <Briefcase size={20} />, href: '/portfolio#cases' },
      { title: 'Live Dashboards', desc: 'Interactive visual experiences.', icon: <Box size={20} />, href: '/portfolio#live' },
      { title: 'Success Metrics', desc: 'Impact analysis & ROI data.', icon: <TrendingUp size={20} />, href: '/portfolio#metrics' },
      { title: 'Client Portals', desc: 'Secure data sharing hubs.', icon: <Shield size={20} />, href: '/portfolio#portals' },
      { title: 'UI/UX Design', desc: 'Figma-to-Dashboard excellence.', icon: <Box size={20} />, href: '/portfolio#uiux' },
    ]
  },
  Blog: {
    items: [
      { title: 'Tech Stack', desc: 'Latest tools & methodologies.', icon: <Code2 size={20} />, href: '/blog#tech' },
      { title: 'Data Insights', desc: 'Market trends & analysis.', icon: <Sparkles size={20} />, href: '/blog#insights' },
      { title: 'Tutorials', desc: 'Step-by-step technical guides.', icon: <FileText size={20} />, href: '/blog#tutorials' },
      { title: 'AI Research', desc: 'Exploring LLMs and GPT.', icon: <Activity size={20} />, href: '/blog#ai' },
      { title: 'BI Best Practices', desc: 'Efficiency & performance.', icon: <TrendingUp size={20} />, href: '/blog#best-practices' },
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
  const [hovered, setHovered] = useState<string | null>(null);
  const [expandedMobile, setExpandedMobile] = useState<string | null>(null);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 flex justify-center ${
        scrolled ? 'bg-[#050505]/80 backdrop-blur-md py-4 border-b border-white/5' : 'bg-transparent py-6'
      }`}
    >
      <div className="w-full max-w-[1448px] px-6 lg:px-0">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-1.5 group no-underline">
            <LogoIcon color="#c9f31d" className="w-7 h-7 group-hover:rotate-[30deg] transition-transform duration-500" />
            <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: '1.05rem', color: '#fff', letterSpacing: '-0.01em' }}>
              Datta Sable
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
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
                      : 'text-[var(--text)] opacity-50 hover:opacity-100'
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
                      className="absolute left-1/2 -translate-x-1/2 w-max max-w-[1077.88px] bg-gradient-to-b from-[#1a1a1a] via-[#050505] to-[#000000] backdrop-blur-3xl border border-white/5 shadow-[0_50px_100px_-20px_rgba(0,0,0,1)] rounded-xl overflow-hidden"
                      style={{ top: '60px' }}
                    >
                      <div className="grid grid-cols-3">
                        {megaMenuData[link.label].items.map((item: any, idx: number) => (
                          <motion.div
                            key={item.title}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.1 + (idx * 0.05) }}
                            className={`border-b border-white/5 ${idx % 3 !== 2 ? 'border-r' : ''}`}
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
                                  <h4 className="text-sm font-bold text-white mb-2 flex items-center gap-2 group-hover/item:text-[var(--accent)] transition-colors">
                                    {item.title}
                                    <ArrowUpRight size={14} className="opacity-0 group-hover/item:opacity-100 group-hover/item:translate-x-1 group-hover/item:-translate-y-1 transition-all" />
                                  </h4>
                                  <p className="text-[13px] text-white/40 leading-relaxed font-medium group-hover/item:text-white/60 transition-colors">
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
            
            <div className="ml-4 pl-4 border-l border-white/10 flex items-center gap-4">
              <Link 
                href="/contact"
                className="btn-primary"
                style={{ 
                  textDecoration: 'none', 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '8px',
                  padding: '0.5rem 1.25rem',
                  fontSize: '10px'
                }}
              >
                <Send size={12} /> RECRUIT
              </Link>
            </div>
          </nav>

          {/* Mobile Toggle */}
          {!mobileMenuOpen && (
            <button
              className="md:hidden text-[var(--text)] p-2 hover:bg-white/5 transition-colors"
              onClick={() => setMobileMenuOpen(true)}
            >
              <Menu size={24} />
            </button>
          )}
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 z-[190] bg-black/60 backdrop-blur-sm md:hidden"
            />
            
            {/* Drawer */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-[92vw] max-w-[480px] z-[200] bg-[#050505] border-l border-white/10 md:hidden flex flex-col shadow-2xl"
            >
              <div className="flex flex-col h-full overflow-y-auto">
                {/* Drawer Header */}
                <div className="flex items-center justify-between p-6 border-b border-white/5">
                  <div className="flex items-center gap-2">
                    <LogoIcon className="w-8 h-8" />
                    <span className="font-bold text-sm tracking-tight">DATTA SABLE</span>
                  </div>
                  <button 
                    className="p-2 text-white/50 hover:text-white transition-colors" 
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <X size={24} />
                  </button>
                </div>

                {/* Navigation Links */}
                <div className="flex-1 px-4 py-6 space-y-2">
                  {navLinks.map((link, i) => {
                    const hasSubmenu = link.mega && megaMenuData[link.label];
                    const isExpanded = expandedMobile === link.label;

                    return (
                      <div key={link.label} className="overflow-hidden">
                        <div className="border-b border-white/5 last:border-0">
                          {hasSubmenu ? (
                            <button
                              onClick={() => setExpandedMobile(isExpanded ? null : link.label)}
                              className={`w-full flex items-center justify-between px-4 py-5 text-[13px] font-bold tracking-widest uppercase transition-colors ${
                                isExpanded ? 'text-[var(--accent)]' : 'text-white/70'
                              }`}
                            >
                              {link.label}
                              <ChevronDown 
                                size={14} 
                                className={`transition-transform duration-300 ${isExpanded ? 'rotate-180 text-[var(--accent)]' : 'opacity-30'}`} 
                              />
                            </button>
                          ) : (
                            <Link
                              href={link.href}
                              onClick={() => setMobileMenuOpen(false)}
                              className="block px-4 py-5 text-[13px] font-bold tracking-widest uppercase text-white/70 hover:text-[var(--accent)] transition-colors no-underline"
                            >
                              {link.label}
                            </Link>
                          )}
                        </div>

                        <AnimatePresence>
                          {hasSubmenu && isExpanded && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="overflow-hidden bg-white/[0.02] border-l-2 border-[var(--accent)]/20 ml-2"
                            >
                              <div className="p-2 flex flex-col gap-1">
                                {megaMenuData[link.label].items.map((sub: any) => (
                                  <Link
                                    key={sub.title}
                                    href={sub.href}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="flex items-center gap-4 p-4 rounded-lg hover:bg-white/5 no-underline group"
                                  >
                                    <div className="w-10 h-10 flex items-center justify-center bg-white/5 border border-white/10 text-[var(--accent)] group-hover:border-[var(--accent)] transition-all">
                                      {sub.icon}
                                    </div>
                                    <div className="flex flex-col">
                                      <span className="text-sm font-bold text-white/90 group-hover:text-[var(--accent)] transition-colors">{sub.title}</span>
                                      <span className="text-[11px] text-white/40">{sub.desc}</span>
                                    </div>
                                  </Link>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </div>

                {/* Drawer Footer */}
                <div className="p-6 border-t border-white/5 bg-white/[0.02] space-y-4">
                  <p className="mono text-[10px] text-white/30 uppercase tracking-[0.4em]">Establish Connection</p>
                  <Link 
                    href="/contact" 
                    className="btn-primary w-full block text-center py-5 text-[11px] font-bold tracking-[0.2em] uppercase no-underline" 
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    START PROJECT
                  </Link>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
