'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { ShieldCheck, X } from 'lucide-react';

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      const timer = setTimeout(() => setIsVisible(true), 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem('cookie-consent', 'declined');
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
          style={{
            position: 'fixed',
            bottom: '24px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: 'calc(100% - 48px)',
            maxWidth: '600px',
            background: 'var(--surface2)',
            border: '1px solid var(--border)',
            padding: '24px',
            zIndex: 9999,
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
          }}
        >
          {/* Decorative Corner */}
          <div style={{ position: 'absolute', top: 0, left: 0, width: '4px', height: '100%', background: 'var(--accent)' }} />
          
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-3">
              <ShieldCheck className="text-[var(--accent)]" size={20} />
              <span className="mono text-[10px] tracking-[0.2em] font-bold text-[var(--text)]">PRIVACY_PROTOCOL</span>
            </div>
            <button 
              onClick={() => setIsVisible(false)}
              className="text-[var(--muted)] hover:text-[var(--text)] transition-colors"
            >
              <X size={18} />
            </button>
          </div>

          <div style={{ fontSize: '0.85rem', color: 'var(--muted)', lineHeight: '1.6' }}>
            We use cookies to enhance your technical experience, analyze traffic, and ensure absolute decision clarity across our BI dashboards. By clicking &ldquo;Accept&rdquo;, you consent to our use of cookies in accordance with our <Link href="/privacy" className="text-[var(--accent)] hover:underline">Privacy Policy</Link>.
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 mt-2">
            <button 
              onClick={handleAccept}
              className="btn-primary w-full sm:w-auto"
              style={{ padding: '0.6rem 2rem', fontSize: '10px' }}
            >
              ACCEPT_ALL
            </button>
            <button 
              onClick={handleDecline}
              className="btn-outline w-full sm:w-auto"
              style={{ padding: '0.6rem 2rem', fontSize: '10px', borderColor: 'var(--border)' }}
            >
              DECLINE
            </button>
            <Link 
              href="/privacy" 
              className="mono text-[9px] text-[var(--muted)] hover:text-[var(--accent)] transition-colors uppercase tracking-widest ml-auto"
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
