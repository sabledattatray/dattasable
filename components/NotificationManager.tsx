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
                background: '#f3f4f6', 
                padding: '0.5rem', 
                borderRadius: '6px',
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center'
              }}>
                <Bell size={18} color="#374151" />
              </div>
              <div>
                <h4 style={{ fontSize: '0.875rem', fontWeight: 600, color: '#111827' }}>Enable Notifications</h4>
                <p style={{ fontSize: '0.75rem', color: '#6b7280' }}>
                  Get real-time updates and BI insights.
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button 
                onClick={requestPermission}
                style={{ 
                  flex: 1, 
                  fontSize: '0.75rem', 
                  padding: '0.5rem', 
                  background: '#111827', 
                  color: '#fff', 
                  border: 'none', 
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontWeight: 600
                }}
              >
                Allow
              </button>
              <button 
                onClick={() => setShowPrompt(false)}
                style={{ 
                  flex: 1, 
                  fontSize: '0.75rem', 
                  padding: '0.5rem', 
                  background: '#f9fafb', 
                  border: '1px solid #e5e7eb', 
                  color: '#374151',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                Dismiss
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
