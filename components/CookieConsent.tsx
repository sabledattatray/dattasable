'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { ShieldCheck, X } from 'lucide-react';

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let consent: string | null = null;
    try {
      consent = localStorage.getItem('cookie-consent');
    } catch (e) {
      console.warn('Cookie consent check failed:', e);
    }

    if (!consent) {
      const timer = setTimeout(() => setIsVisible(true), 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    try {
      localStorage.setItem('cookie-consent', 'accepted');
    } catch (e) {
      console.warn('Accept cookies failed:', e);
    }
    setIsVisible(false);
  };

  const handleDecline = () => {
    try {
      localStorage.setItem('cookie-consent', 'declined');
    } catch (e) {
      console.warn('Decline cookies failed:', e);
    }
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="fixed bottom-0 sm:bottom-6 left-0 sm:left-1/2 sm:-translate-x-1/2 w-full sm:w-[calc(100%-48px)] sm:max-w-[600px] bg-[var(--surface2)] border-t sm:border border-[var(--border)] p-5 sm:p-6 z-[9999] flex flex-col gap-4 shadow-[0_-10px_40px_rgba(0,0,0,0.3)] sm:shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
        >
          {/* Decorative Corner */}
          <div className="absolute top-0 left-0 w-1 sm:w-1.5 h-full bg-[var(--accent)]" />
          
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-3">
              <ShieldCheck className="text-[var(--accent)]" size={20} />
              <span className="mono text-[11px] sm:text-[12px] tracking-[0.2em] font-bold text-[var(--text)] uppercase">PRIVACY_PROTOCOL</span>
            </div>
            <button 
              onClick={() => setIsVisible(false)}
              className="text-[var(--muted)] hover:text-[var(--text)] transition-colors p-1"
              aria-label="Close cookie consent"
            >
              <X size={18} />
            </button>
          </div>

          <div className="text-[13px] sm:text-[14px] text-[var(--muted)] leading-relaxed">
            We use cookies to enhance your technical experience, analyze traffic, and ensure absolute decision clarity across our BI dashboards. By clicking &ldquo;Accept&rdquo;, you consent to our use of cookies in accordance with our <Link href="/privacy" className="text-[var(--accent)] hover:underline">Privacy Policy</Link>.
          </div>

          <div className="flex flex-col xs:flex-row items-center gap-3 sm:gap-4 mt-2">
            <button 
              onClick={handleAccept}
              className="btn-primary w-full xs:w-auto text-[11px] sm:text-[12px]"
              style={{ padding: '0.6rem 2rem' }}
            >
              ACCEPT_ALL
            </button>
            <button 
              onClick={handleDecline}
              className="btn-outline w-full xs:w-auto text-[11px] sm:text-[12px]"
              style={{ padding: '0.6rem 2rem', borderColor: 'var(--border)' }}
            >
              DECLINE
            </button>
            <Link 
              href="/privacy" 
              className="mono text-[10px] text-[var(--muted)] hover:text-[var(--accent)] transition-colors uppercase tracking-widest xs:ml-auto text-center w-full xs:w-auto mt-2 xs:mt-0"
              style={{ textDecoration: 'none' }}
            >
              Manage Preferences
            </Link>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
