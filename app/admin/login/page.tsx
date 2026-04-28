'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Lock, User, BarChart3, ArrowRight, AlertCircle } from 'lucide-react';
import { signIn } from 'next-auth/react';

export default function AdminLogin() {
  const [creds, setCreds] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const result = await signIn('credentials', {
        redirect: false,
        email: creds.email,
        password: creds.password,
      });

      if (result?.error) {
        setError(result.error);
        setLoading(false);
      } else {
        router.push('/admin');
      }
    } catch (err) {
      setError('An unexpected error occurred');
      setLoading(false);
    }
  };

  return (
    <div style={{ background: '#f8fafc', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ 
          width: '100%', maxWidth: 420, padding: '3.5rem 2.5rem', 
          background: '#ffffff', border: '1px solid #e2e8f0', 
          borderRadius: '32px', boxShadow: '0 20px 50px rgba(0,0,0,0.03)',
          position: 'relative', zIndex: 1 
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-6"
            style={{ background: 'linear-gradient(135deg, #000, #333)', boxShadow: '0 8px 24px rgba(0,0,0,0.1)' }}
          >
            <BarChart3 size={24} color="#fff" />
          </div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem', fontFamily: 'Syne, sans-serif' }}>Admin Portal</h1>
          <p style={{ color: '#64748b', fontSize: '0.9rem', fontWeight: 500 }}>Enter your credentials to manage DattaSable</p>
        </div>

        {error && (
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3 mb-6 px-4 py-3 rounded-xl"
            style={{ background: '#fef2f2', border: '1px solid #fee2e2', color: '#ef4444' }}
          >
            <AlertCircle size={18} />
            <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>{error}</span>
          </motion.div>
        )}

        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div>
            <label style={{ display: 'block', color: '#64748b', fontSize: '0.75rem', marginBottom: '0.5rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Email
            </label>
            <div style={{ position: 'relative' }}>
              <User size={16} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
              <input
                type="email"
                placeholder="admin@dattasable.com"
                value={creds.email}
                onChange={e => setCreds({ ...creds, email: e.target.value })}
                required
                style={{
                  width: '100%', padding: '0.8rem 1rem 0.8rem 2.75rem',
                  background: '#f8fafc', border: '1px solid #e2e8f0',
                  borderRadius: '12px', color: '#0f172a', fontSize: '0.9rem',
                  outline: 'none', fontWeight: 500
                }}
              />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', color: '#64748b', fontSize: '0.75rem', marginBottom: '0.5rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Password
            </label>
            <div style={{ position: 'relative' }}>
              <Lock size={16} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
              <input
                type="password"
                placeholder="••••••••"
                value={creds.password}
                onChange={e => setCreds({ ...creds, password: e.target.value })}
                required
                style={{
                  width: '100%', padding: '0.8rem 1rem 0.8rem 2.75rem',
                  background: '#f8fafc', border: '1px solid #e2e8f0',
                  borderRadius: '12px', color: '#0f172a', fontSize: '0.9rem',
                  outline: 'none', fontWeight: 500
                }}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{ 
              width: '100%', marginTop: '1rem', padding: '1rem',
              background: '#000', color: '#fff', border: 'none',
              borderRadius: '12px', fontSize: '0.95rem', fontWeight: 800,
              cursor: 'pointer', display: 'flex', alignItems: 'center',
              justifyContent: 'center', gap: '8px', opacity: loading ? 0.7 : 1,
              transition: 'transform 0.2s'
            }}
            onMouseDown={e => e.currentTarget.style.transform = 'scale(0.98)'}
            onMouseUp={e => e.currentTarget.style.transform = 'scale(1)'}
          >
            {loading ? 'Authenticating...' : <>{'Sign In'} <ArrowRight size={18} /></>}
          </button>
        </form>

        <div style={{ marginTop: '2.5rem', textAlign: 'center' }}>
          <div style={{ position: 'relative', marginBottom: '2.5rem' }}>
            <div style={{ position: 'absolute', top: '50%', left: 0, right: 0, height: '1px', background: '#e2e8f0', zIndex: 0 }} />
            <span style={{ position: 'relative', background: '#fff', padding: '0 1rem', color: '#94a3b8', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', zIndex: 1 }}>
              Or Continue With
            </span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
            {[
              { id: 'google', icon: 'google', color: '#ea4335', bg: '#fef2f2' },
              { id: 'github', icon: 'github', color: '#333', bg: '#f8fafc' },
              { id: 'linkedin', icon: 'linkedin', color: '#0077b5', bg: '#f0f9ff' }
            ].map(provider => (
              <button
                key={provider.id}
                onClick={() => signIn(provider.id, { callbackUrl: '/admin' })}
                style={{ 
                  display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0.75rem',
                  background: '#fff', border: '1px solid #e2e8f0', borderRadius: '12px', cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={e => e.currentTarget.style.borderColor = provider.color}
                onMouseLeave={e => e.currentTarget.style.borderColor = '#e2e8f0'}
              >
                <img 
                  src={`https://authjs.dev/img/providers/${provider.id}.svg`} 
                  alt={provider.id} 
                  style={{ width: '20px', height: '20px' }} 
                />
              </button>
            ))}
          </div>

          <div style={{ marginTop: '2.5rem' }}>
            <button
              onClick={() => router.push('/')}
              style={{ background: 'none', border: 'none', color: '#94a3b8', fontSize: '0.85rem', cursor: 'pointer', fontWeight: 600 }}
            >
              Back to Website
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
