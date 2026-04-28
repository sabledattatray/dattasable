'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, BellOff, X, CheckCircle2 } from 'lucide-react';

export default function NotificationManager() {
  const [permission, setPermission] = useState<NotificationPermission>('default');
  const [showPrompt, setShowPrompt] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && 'Notification' in window) {
      setPermission(Notification.permission);
      
      // Show prompt after 5 seconds if not already decided
      if (Notification.permission === 'default') {
        const timer = setTimeout(() => setShowPrompt(true), 5000);
        return () => clearTimeout(timer);
      }
    }
  }, []);

  const requestPermission = async () => {
    if (!('Notification' in window)) return;

    try {
      const result = await Notification.requestPermission();
      setPermission(result);
      setShowPrompt(false);

      if (result === 'granted') {
        setShowSuccess(true);
        new Notification('Insights Enabled', {
          body: 'You will now receive real-time updates and BI insights.',
          icon: '/favicon.svg'
        });
        setTimeout(() => setShowSuccess(false), 3000);
      }
    } catch (error) {
      console.error('Notification permission error:', error);
    }
  };

  if (permission === 'denied') return null;

  return (
    <>
      <AnimatePresence>
        {showPrompt && (
          <motion.div
            initial={{ opacity: 0, y: 50, x: -20 }}
            animate={{ opacity: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, y: 20 }}
            style={{
              position: 'fixed',
              bottom: '2rem',
              left: '2rem',
              zIndex: 9999,
              width: '320px',
              background: 'rgba(15, 15, 15, 0.85)',
              backdropFilter: 'blur(12px)',
              border: '1px solid var(--border)',
              padding: '1.25rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
              boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
            }}
          >
            <button 
              onClick={() => setShowPrompt(false)}
              style={{ position: 'absolute', top: '0.75rem', right: '0.75rem', color: 'var(--muted)', background: 'none', border: 'none', cursor: 'pointer' }}
            >
              <X size={14} />
            </button>

            <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
              <div style={{ 
                background: 'var(--accent)', 
                padding: '0.75rem', 
                borderRadius: '0', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                boxShadow: '0 0 20px rgba(201, 243, 29, 0.3)'
              }}>
                <Bell size={20} color="#000" />
              </div>
              <div>
                <h4 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '0.25rem', color: 'var(--text)' }}>Enable BI Insights?</h4>
                <p style={{ fontSize: '0.8rem', color: 'var(--muted)', lineHeight: 1.5 }}>
                  Get real-time updates on new dashboards, industry trends, and data engineering case studies.
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <button 
                onClick={requestPermission}
                className="btn-primary"
                style={{ flex: 1, fontSize: '0.8rem', padding: '0.6rem' }}
              >
                Allow Notifications
              </button>
              <button 
                onClick={() => setShowPrompt(false)}
                style={{ 
                  flex: 1, 
                  fontSize: '0.8rem', 
                  padding: '0.6rem', 
                  background: 'transparent', 
                  border: '1px solid var(--border)', 
                  color: 'var(--text)',
                  cursor: 'pointer'
                }}
              >
                Maybe Later
              </button>
            </div>
            
            <div style={{ fontSize: '0.65rem', color: 'var(--muted)', textAlign: 'center', fontFamily: 'JetBrains Mono, monospace', opacity: 0.5 }}>
              SECURE_HANDSHAKE: SSL_REQUIRED
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            style={{
              position: 'fixed',
              top: '2rem',
              left: '50%',
              transform: 'translateX(-50%)',
              zIndex: 10000,
              background: 'var(--accent)',
              color: '#000',
              padding: '0.75rem 1.5rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              fontWeight: 700,
              fontSize: '0.9rem',
              boxShadow: '0 10px 30px rgba(201, 243, 29, 0.4)',
            }}
          >
            <CheckCircle2 size={18} />
            Notifications successfully enabled!
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
