'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import LogoIcon from '@/components/LogoIcon';
import { useSession, signOut } from 'next-auth/react';
import { Menu } from 'lucide-react';
import dynamic from 'next/dynamic';
import ThemeToggle from './ThemeToggle';

const DesktopNav = dynamic(() => import('./DesktopNav'), { ssr: false });
const MobileMenu = dynamic(() => import('./MobileMenu'), { ssr: false });

export default function Navbar() {
  const { data: session } = useSession();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [expandedMobile, setExpandedMobile] = useState<string | null>(null);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    setIsDesktop(window.innerWidth >= 1280);
    const handleResize = () => setIsDesktop(window.innerWidth >= 1280);
    window.addEventListener('resize', handleResize, { passive: true });
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
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
        className={`fixed left-1/2 -translate-x-1/2 z-[100] transition-all duration-500 flex justify-center ${
          scrolled 
            ? 'top-4 w-[95%] max-w-[1400px] bg-[var(--navbar-bg)] backdrop-blur-xl py-0 border border-[var(--border)] rounded-2xl' 
            : 'top-0 w-full bg-transparent py-4 border-b border-transparent'
        }`}
      >
        <div className="w-full max-w-[1448px] lg:px-12 relative z-10" style={{ paddingLeft: '1rem', paddingRight: '1rem' }}>
          <div className="flex items-center justify-between h-14 lg:h-16">
            {/* Logo */}
            <Link href="/" aria-label="Datta Sable - Home" className="flex items-center gap-2 group whitespace-nowrap flex-shrink-0" style={{ textDecoration: 'none' }}>
              <LogoIcon color="var(--accent)" className="w-8 h-8 lg:w-7 lg:h-7 group-hover:rotate-[30deg] transition-transform duration-500" />
              <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: '1.2rem', color: 'var(--text)', letterSpacing: '-0.01em' }}>
                Datta Sable
              </span>
            </Link>

            {/* Desktop Nav Dynamic Component */}
            {isDesktop && <DesktopNav />}

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
        expandedMobile={expandedMobile}
        setExpandedMobile={setExpandedMobile}
        session={session}
        signOut={() => signOut()}
        setIsLoginOpen={setIsLoginOpen}
      />
    </>
  );
}
