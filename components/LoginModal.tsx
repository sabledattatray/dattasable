'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Lock, Globe } from 'lucide-react';
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
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M23.766 12.2764C23.766 11.4607 23.6999 10.6406 23.5588 9.83807H12.24V14.4591H18.7217C18.4528 15.9105 17.5856 17.1582 16.3231 17.9718V20.9545H20.1903C22.4605 18.8818 23.766 15.8545 23.766 12.2764Z" fill="#4285F4"/>
                  <path d="M12.24 24C15.522 24 18.2815 22.9255 20.1945 21.0914L16.3273 18.1086C15.2495 18.8455 13.8641 19.2932 12.2442 19.2932C9.07985 19.2932 6.40432 17.2064 5.44118 14.3918H1.4574V17.4514C3.51655 21.5045 7.63227 24 12.24 24Z" fill="#34A853"/>
                  <path d="M5.44118 14.3918C5.19191 13.6636 5.05432 12.8836 5.05432 12.0818C5.05432 11.28 5.19191 10.5 5.44118 9.77182V6.71227H1.4574C0.613636 8.38909 0.12 10.2327 0.12 12.1636C0.12 14.0945 0.613636 15.9382 1.4574 17.615L5.44118 14.3918Z" fill="#FBBC05"/>
                  <path d="M12.24 4.82727C14.0247 4.82727 15.6262 5.42455 16.8862 6.61909L20.2727 3.23273C18.273 1.43727 15.5135 0.218182 12.24 0.218182C7.63227 0.218182 3.51655 2.71364 1.4574 6.76682L5.44118 9.82636C6.40432 7.01182 9.07985 4.82727 12.24 4.82727Z" fill="#EA4335"/>
                </svg>
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
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 0.296997C5.37 0.296997 0 5.67 0 12.297C0 17.6 3.438 22.097 8.205 23.682C8.805 23.795 9.025 23.424 9.025 23.105C9.025 22.82 9.015 22.065 9.01 21.065C5.672 21.789 4.968 19.455 4.968 19.455C4.422 18.07 3.633 17.7 3.633 17.7C2.546 16.956 3.717 16.971 3.717 16.971C4.922 17.055 5.555 18.207 5.555 18.207C6.625 20.042 8.364 19.512 9.05 19.205C9.158 18.429 9.467 17.9 9.81 17.6C7.145 17.3 4.344 16.268 4.344 11.67C4.344 10.36 4.809 9.29 5.579 8.45C5.444 8.147 5.039 6.927 5.684 5.274C5.684 5.274 6.689 4.952 8.984 6.504C9.944 6.237 10.964 6.105 11.984 6.099C13.004 6.105 14.024 6.237 14.984 6.504C17.264 4.952 18.269 5.274 18.269 5.274C18.914 6.927 18.509 8.147 18.389 8.45C19.154 9.29 19.619 10.36 19.619 11.67C19.619 16.28 16.814 17.295 14.144 17.59C14.564 17.95 14.954 18.686 14.954 19.81C14.954 21.416 14.939 22.706 14.939 23.105C14.939 23.427 15.149 23.803 15.764 23.679C20.522 22.09 23.955 17.595 23.955 12.297C23.955 5.67 18.585 0.296997 12 0.296997Z"/>
                </svg>
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
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22.23 0H1.77C0.8 0 0 0.8 0 1.77V22.23C0 23.2 0.8 24 1.77 24H22.24C23.2 24 24 23.2 24 22.24V1.77C24 0.8 23.2 0 22.23 0ZM7.12 20.45H3.56V9H7.13V20.45ZM5.34 7.43C4.2 7.43 3.27 6.5 3.27 5.36C3.27 4.22 4.2 3.29 5.34 3.29C6.48 3.29 7.41 4.22 7.41 5.36C7.41 6.5 6.48 7.43 5.34 7.43ZM20.45 20.45H16.89V14.89C16.89 13.57 16.87 11.87 15.04 11.87C13.19 11.87 12.9 13.31 12.9 14.79V20.45H9.33V9H12.76V10.56H12.81C13.29 9.65 14.46 8.69 16.2 8.69C19.82 8.69 20.48 11.07 20.48 14.18V20.45H20.45Z"/>
                </svg>
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
