'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  ArrowRight,
  Loader2,
  ShieldCheck
} from 'lucide-react';

// Universal CSS centering helper
const centerStyle: React.CSSProperties = {
  marginLeft: 'auto',
  marginRight: 'auto',
  textAlign: 'center' as const
};

export default function LoginForm() {
  const [isLoading, setIsLoading] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading('email');
    setTimeout(() => setIsLoading(null), 1500);
  };

  return (
    <div style={{ 
      position: 'fixed', 
      inset: 0, 
      width: '100%', 
      height: '100%', 
      backgroundColor: '#0A0A0A', 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center', 
      padding: '16px',
      overflow: 'hidden',
      color: 'white',
      zIndex: 9999
    }}>
      {/* Background Effects */}
      <div style={{ position: 'absolute', top: '-10%', left: '-10%', width: '50%', height: '50%', background: 'rgba(37, 99, 235, 0.15)', borderRadius: '50%', filter: 'blur(140px)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '-10%', right: '-10%', width: '50%', height: '50%', background: 'rgba(147, 51, 234, 0.15)', borderRadius: '50%', filter: 'blur(140px)', pointerEvents: 'none' }} />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{ width: '100%', maxWidth: '520px', zIndex: 10, ...centerStyle }}
      >
        {/* Logo */}
        <div style={{ marginBottom: '64px' }}>
          <h2 style={{ fontSize: '32px', fontWeight: 800, letterSpacing: '-0.05em', fontFamily: 'Syne, sans-serif' }}>
            dattasable<span style={{ color: '#3b82f6' }}>.</span>
          </h2>
        </div>

        {/* Glass Card */}
        <div style={{ 
          background: 'rgba(255, 255, 255, 0.03)', 
          backdropFilter: 'blur(32px)', 
          border: '1px solid rgba(255, 255, 255, 0.08)', 
          borderRadius: '24px', 
          padding: '32px', 
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
          position: 'relative'
        }}>
          <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '1px', background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.2), transparent)' }} />

          <div style={{ marginBottom: '40px' }}>
            <h1 style={{ fontSize: '28px', fontWeight: 700, marginBottom: '12px', letterSpacing: '-0.02em', fontFamily: 'Syne, sans-serif' }}>Admin Login</h1>
            <p style={{ color: '#a1a1aa', fontSize: '14px' }}>Access your dashboard securely</p>
          </div>

          <div style={{ maxWidth: '380px', margin: '0 auto' }}>
            {/* Social Buttons */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '32px' }}>
              <button style={{ width: '100%', height: '48px', backgroundColor: 'white', color: 'black', fontWeight: 600, borderRadius: '12px', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px' }}>
                <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" style={{ width: '20px' }} alt="" />
                Continue with Google
              </button>
              <button style={{ width: '100%', height: '48px', backgroundColor: '#18181b', color: 'white', fontWeight: 600, borderRadius: '12px', border: '1px solid #27272a', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px' }}>
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                Continue with GitHub
              </button>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', margin: '32px 0' }}>
              <div style={{ flex: 1, height: '1px', backgroundColor: '#27272a' }} />
              <span style={{ fontSize: '10px', color: '#71717a', textTransform: 'uppercase', letterSpacing: '2px' }}>or</span>
              <div style={{ flex: 1, height: '1px', backgroundColor: '#27272a' }} />
            </div>

            {/* Form */}
            <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ textAlign: 'center' }}>
                <label style={{ fontSize: '11px', fontWeight: 600, color: '#a1a1aa', textTransform: 'uppercase', letterSpacing: '1px', display: 'block', marginBottom: '8px' }}>Email Address</label>
                <div style={{ position: 'relative' }}>
                  <Mail style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', width: '16px', color: '#52525b' }} />
                  <input
                    type="email"
                    placeholder="name@company.com"
                    style={{ width: '100%', height: '48px', backgroundColor: '#09090b', border: '1px solid #27272a', borderRadius: '12px', padding: '0 12px 0 40px', color: 'white', fontSize: '14px', textAlign: 'center', outline: 'none' }}
                  />
                </div>
              </div>

              <div style={{ textAlign: 'center' }}>
                <label style={{ fontSize: '11px', fontWeight: 600, color: '#a1a1aa', textTransform: 'uppercase', letterSpacing: '1px', display: 'block', marginBottom: '8px' }}>Password</label>
                <div style={{ position: 'relative' }}>
                  <Lock style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', width: '16px', color: '#52525b' }} />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    style={{ width: '100%', height: '48px', backgroundColor: '#09090b', border: '1px solid #27272a', borderRadius: '12px', padding: '0 40px 0 40px', color: 'white', fontSize: '14px', textAlign: 'center', outline: 'none' }}
                  />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: '#52525b', cursor: 'pointer' }}>
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <button type="submit" style={{ width: '100%', height: '48px', backgroundColor: '#2563eb', color: 'white', fontWeight: 700, borderRadius: '12px', border: 'none', cursor: 'pointer', marginTop: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                Sign In <ArrowRight size={16} />
              </button>
            </form>
          </div>

          <div style={{ marginTop: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', color: '#52525b' }}>
            <ShieldCheck size={14} />
            <span style={{ fontSize: '10px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px' }}>Protected by secure authentication</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
