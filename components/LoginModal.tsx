'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Github, Linkedin, Lock, Chrome } from 'lucide-react';
import { signIn } from 'next-auth/react';
import { useState } from 'react';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const [isLoading, setIsLoading] = useState<string | null>(null);

  const handleLogin = async (provider: string) => {
    setIsLoading(provider);
    await signIn(provider, { callbackUrl: window.location.origin });
    setIsLoading(null);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(0,0,0,0.85)',
              backdropFilter: 'blur(8px)',
              zIndex: 1000,
            }}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            style={{
              position: 'fixed',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '100%',
              maxWidth: '420px',
              background: '#0a0a0a',
              border: '1px solid var(--border)',
              borderRadius: '16px',
              overflow: 'hidden',
              zIndex: 1001,
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
            }}
          >
            {/* Header */}
            <div style={{ padding: '2rem', textAlign: 'center', position: 'relative' }}>
              <button 
                onClick={onClose}
                style={{ position: 'absolute', top: '1.25rem', right: '1.25rem', color: 'var(--muted)', background: 'none', border: 'none', cursor: 'pointer' }}
              >
                <X size={20} />
              </button>
              
              <div style={{ 
                width: '60px', 
                height: '60px', 
                background: 'rgba(201, 243, 29, 0.1)', 
                borderRadius: '50%', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                margin: '0 auto 1.5rem',
                border: '1px solid rgba(201, 243, 29, 0.2)'
              }}>
                <Lock size={24} color="var(--accent)" />
              </div>
              
              <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#fff', marginBottom: '0.5rem', fontFamily: 'Syne, sans-serif' }}>
                Join the Network
              </h2>
              <p style={{ fontSize: '0.875rem', color: 'var(--muted)', lineHeight: 1.6 }}>
                Securely authenticate to access your custom dashboards, case studies, and BI strategy portals.
              </p>
            </div>

            {/* Providers */}
            <div style={{ padding: '0 2rem 2.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <button 
                onClick={() => handleLogin('google')}
                disabled={!!isLoading}
                style={{
                  width: '100%',
                  padding: '1rem',
                  background: '#fff',
                  color: '#000',
                  border: 'none',
                  borderRadius: '12px',
                  fontWeight: 700,
                  fontSize: '0.9rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '12px',
                  cursor: isLoading === 'google' ? 'wait' : 'pointer',
                  transition: 'transform 0.2s, opacity 0.2s',
                  opacity: isLoading === 'google' ? 0.7 : 1
                }}
              >
                <Chrome size={20} />
                {isLoading === 'google' ? 'Connecting...' : 'Continue with Google'}
              </button>

              <button 
                onClick={() => handleLogin('github')}
                disabled={!!isLoading}
                style={{
                  width: '100%',
                  padding: '1rem',
                  background: 'rgba(255,255,255,0.05)',
                  color: '#fff',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '12px',
                  fontWeight: 600,
                  fontSize: '0.9rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '12px',
                  cursor: isLoading === 'github' ? 'wait' : 'pointer',
                  transition: 'all 0.2s'
                }}
              >
                <Github size={20} />
                Continue with GitHub
              </button>

              <button 
                onClick={() => handleLogin('linkedin')}
                disabled={!!isLoading}
                style={{
                  width: '100%',
                  padding: '1rem',
                  background: 'rgba(255,255,255,0.05)',
                  color: '#fff',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '12px',
                  fontWeight: 600,
                  fontSize: '0.9rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '12px',
                  cursor: isLoading === 'linkedin' ? 'wait' : 'pointer',
                  transition: 'all 0.2s'
                }}
              >
                <Linkedin size={20} />
                Continue with LinkedIn
              </button>

              <div style={{ margin: '1rem 0', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.1)' }} />
                <span style={{ fontSize: '0.7rem', color: 'var(--muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Or</span>
                <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.1)' }} />
              </div>

              <button 
                disabled
                style={{
                  width: '100%',
                  padding: '1rem',
                  background: 'transparent',
                  color: 'rgba(255,255,255,0.3)',
                  border: '1px dashed rgba(255,255,255,0.2)',
                  borderRadius: '12px',
                  fontWeight: 600,
                  fontSize: '0.9rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '12px',
                  cursor: 'not-allowed'
                }}
              >
                <Mail size={20} />
                Email Login (Coming Soon)
              </button>
            </div>

            {/* Footer */}
            <div style={{ padding: '1.5rem', background: 'rgba(255,255,255,0.02)', borderTop: '1px solid rgba(255,255,255,0.05)', textAlign: 'center' }}>
              <p style={{ fontSize: '0.75rem', color: 'var(--muted)' }}>
                By continuing, you agree to our <a href="#" style={{ color: 'var(--text)', fontWeight: 600 }}>Privacy Policy</a> and <a href="#" style={{ color: 'var(--text)', fontWeight: 600 }}>Terms of Service</a>.
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
