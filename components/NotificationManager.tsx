'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';

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
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            style={{
              position: 'fixed',
              top: '1.5rem',
              left: '1.5rem',
              zIndex: 9999,
              width: '320px',
              background: 'var(--surface)',
              padding: '1.25rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
              boxShadow: '0 12px 32px rgba(0,0,0,0.12)',
              borderRadius: '12px',
              border: '1px solid var(--border)'
            }}
          >
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
              <div style={{ 
                width: '40px',
                height: '40px',
                background: 'var(--surface2)', 
                borderRadius: '10px',
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                border: '1px solid var(--border)'
              }}>
                <img src="/favicon.svg" alt="Site Logo" style={{ width: '24px', height: '24px' }} />
              </div>
              <div style={{ flex: 1 }}>
                <h4 style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text)', marginBottom: '0.1rem' }}>
                  dattasable.com
                </h4>
                <p style={{ fontSize: '0.8rem', color: 'var(--muted)' }}>
                  Wants to send you notifications
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '0.5rem' }}>
              <button 
                onClick={() => setShowPrompt(false)}
                style={{ 
                  fontSize: '0.8rem', 
                  padding: '0.5rem 1rem', 
                  background: 'transparent', 
                  color: 'var(--muted)',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontWeight: 600,
                  transition: 'background 0.2s'
                }}
                onMouseOver={(e) => (e.currentTarget.style.background = 'var(--surface2)')}
                onMouseOut={(e) => (e.currentTarget.style.background = 'transparent')}
              >
                Block
              </button>
              <button 
                onClick={requestPermission}
                style={{ 
                  fontSize: '0.8rem', 
                  padding: '0.5rem 1.25rem', 
                  background: '#2563eb', 
                  color: '#fff', 
                  border: 'none', 
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontWeight: 600,
                  boxShadow: '0 4px 6px -1px rgba(37, 99, 235, 0.2)',
                  transition: 'all 0.2s'
                }}
                onMouseOver={(e) => (e.currentTarget.style.background = '#1d4ed8')}
                onMouseOut={(e) => (e.currentTarget.style.background = '#2563eb')}
              >
                Allow
              </button>
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
