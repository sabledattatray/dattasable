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
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            style={{
              position: 'fixed',
              top: '1rem',
              left: '1rem',
              zIndex: 9999,
              width: '300px',
              background: '#ffffff',
              border: '1px solid #e5e7eb',
              padding: '1rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.75rem',
              boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
              borderRadius: '8px'
            }}
          >
            <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
              <div style={{ 
                background: '#e0f2fe', 
                padding: '0.6rem', 
                borderRadius: '50%',
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center'
              }}>
                <CheckCircle2 size={20} color="#0369a1" />
              </div>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '2px' }}>
                  <h4 style={{ fontSize: '0.9rem', fontWeight: 700, color: '#111827' }}>Notification Settings</h4>
                  <span style={{ 
                    fontSize: '8px', 
                    background: '#dcfce7', 
                    color: '#15803d', 
                    padding: '1px 6px', 
                    borderRadius: '10px', 
                    fontWeight: 800, 
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em'
                  }}>
                    Verified
                  </span>
                </div>
                <p style={{ fontSize: '0.75rem', color: '#4b5563', lineHeight: 1.4 }}>
                  Enable real-time BI insights via <strong>Secure SSL Connection</strong>.
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.25rem' }}>
              <button 
                onClick={requestPermission}
                style={{ 
                  flex: 1, 
                  fontSize: '0.75rem', 
                  padding: '0.6rem', 
                  background: '#0369a1', 
                  color: '#fff', 
                  border: 'none', 
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontWeight: 700,
                  transition: 'background 0.2s'
                }}
              >
                Enable Access
              </button>
              <button 
                onClick={() => setShowPrompt(false)}
                style={{ 
                  flex: 1, 
                  fontSize: '0.75rem', 
                  padding: '0.6rem', 
                  background: '#fff', 
                  border: '1px solid #d1d5db', 
                  color: '#4b5563',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontWeight: 600
                }}
              >
                Not Now
              </button>
            </div>
            <div style={{ borderTop: '1px solid #f3f4f6', paddingTop: '0.5rem', marginTop: '0.25rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <div style={{ width: '6px', height: '6px', background: '#22c55e', borderRadius: '50%' }} />
              <span style={{ fontSize: '9px', color: '#9ca3af', fontWeight: 600, fontFamily: 'var(--font-mono)' }}>
                ENCRYPTED_SSL_SESSION
              </span>
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
