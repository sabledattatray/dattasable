'use client';
import { useState } from 'react';
import { Settings, Shield, Globe, Bell, Palette, Save, Database, Key } from 'lucide-react';

export default function AdminSettings() {
  const [passwords, setPasswords] = useState({ current: '', next: '', confirm: '' });
  const [msg, setMsg] = useState({ text: '', type: '' });

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    const stored = localStorage.getItem('admin_password') || 'admin123';
    
    if (passwords.current !== stored) {
      setMsg({ text: 'Current password incorrect', type: 'error' });
      return;
    }
    if (passwords.next !== passwords.confirm) {
      setMsg({ text: 'Passwords do not match', type: 'error' });
      return;
    }
    
    localStorage.setItem('admin_password', passwords.next);
    setMsg({ text: 'Password updated successfully!', type: 'success' });
    setPasswords({ current: '', next: '', confirm: '' });
    setTimeout(() => setMsg({ text: '', type: '' }), 3000);
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2.5rem' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
        {/* General Settings */}
        <div style={{ 
          background: '#ffffff', 
          border: '1px solid #e2e8f0', 
          borderRadius: '32px',
          padding: '2.5rem',
          boxShadow: '0 4px 24px rgba(0,0,0,0.02)'
        }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '2rem', fontFamily: 'Syne, sans-serif' }}>
            <Globe size={20} style={{ color: '#3b82f6' }} /> Portal Configuration
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '11px', fontWeight: 800, color: '#64748b', textTransform: 'uppercase', marginBottom: '10px', letterSpacing: '0.05em' }}>Portal Display Name</label>
              <input type="text" defaultValue="Datta Sable | BI Expert" style={{ width: '100%', padding: '0.85rem 1rem', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', color: '#0f172a', fontWeight: 600 }} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '11px', fontWeight: 800, color: '#64748b', textTransform: 'uppercase', marginBottom: '10px', letterSpacing: '0.05em' }}>Primary Contact Email</label>
              <input type="email" defaultValue="datta@dattasable.com" style={{ width: '100%', padding: '0.85rem 1rem', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', color: '#0f172a', fontWeight: 600 }} />
            </div>
            <button style={{ background: '#000', color: '#fff', fontWeight: 800, border: 'none', padding: '1rem', borderRadius: '12px', marginTop: '1rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
              <Save size={18} /> Update Configuration
            </button>
          </div>
        </div>

        {/* Security / Password Change */}
        <div style={{ 
          background: '#ffffff', 
          border: '1px solid #e2e8f0', 
          borderRadius: '32px',
          padding: '2.5rem',
          boxShadow: '0 4px 24px rgba(0,0,0,0.02)'
        }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '2rem', fontFamily: 'Syne, sans-serif' }}>
            <Shield size={20} style={{ color: '#00C9F2' }} /> Security Protocol
          </h2>
          
          <form onSubmit={handlePasswordChange} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {msg.text && (
              <div style={{ padding: '1rem', borderRadius: '12px', fontSize: '0.85rem', fontWeight: 600, background: msg.type === 'success' ? '#f0fdf4' : '#fef2f2', color: msg.type === 'success' ? '#16a34a' : '#ef4444', border: `1px solid ${msg.type === 'success' ? '#bbf7d0' : '#fee2e2'}` }}>
                {msg.text}
              </div>
            )}
            <div>
              <label style={{ display: 'block', fontSize: '11px', fontWeight: 800, color: '#64748b', textTransform: 'uppercase', marginBottom: '10px', letterSpacing: '0.05em' }}>Current Password</label>
              <input 
                type="password" 
                value={passwords.current}
                onChange={e => setPasswords({ ...passwords, current: e.target.value })}
                style={{ width: '100%', padding: '0.85rem 1rem', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', color: '#0f172a', fontWeight: 500 }} 
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '11px', fontWeight: 800, color: '#64748b', textTransform: 'uppercase', marginBottom: '10px', letterSpacing: '0.05em' }}>New Security Key</label>
              <input 
                type="password" 
                value={passwords.next}
                onChange={e => setPasswords({ ...passwords, next: e.target.value })}
                style={{ width: '100%', padding: '0.85rem 1rem', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', color: '#0f172a', fontWeight: 500 }} 
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '11px', fontWeight: 800, color: '#64748b', textTransform: 'uppercase', marginBottom: '10px', letterSpacing: '0.05em' }}>Confirm Security Key</label>
              <input 
                type="password" 
                value={passwords.confirm}
                onChange={e => setPasswords({ ...passwords, confirm: e.target.value })}
                style={{ width: '100%', padding: '0.85rem 1rem', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', color: '#0f172a', fontWeight: 500 }} 
              />
            </div>
            <button type="submit" style={{ background: '#f5f3ff', border: '1px solid #ddd6fe', color: '#00C9F2', fontWeight: 800, padding: '1rem', borderRadius: '12px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
              <Shield size={18} /> Update Access Credentials
            </button>
          </form>
        </div>
      </div>


      <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
        {/* System Health */}
        <div style={{ 
          background: '#ffffff', 
          border: '1px solid #e2e8f0', 
          borderRadius: '32px',
          padding: '2.5rem',
          boxShadow: '0 4px 24px rgba(0,0,0,0.02)'
        }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '2rem', fontFamily: 'Syne, sans-serif' }}>
            <Database size={20} style={{ color: '#22c55e' }} /> Database Integrity
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
              <span style={{ fontSize: '0.9rem', color: '#64748b', fontWeight: 600 }}>Storage Allocation</span>
              <span style={{ fontSize: '0.9rem', color: '#0f172a', fontWeight: 800 }}>24.2 / 50 GB</span>
            </div>
            <div style={{ height: '10px', background: '#f1f5f9', borderRadius: '5px', overflow: 'hidden' }}>
              <div style={{ height: '100%', width: '48%', background: '#22c55e' }} />
            </div>
            <div style={{ gridTemplateColumns: '1fr 1fr', display: 'grid', gap: '1.5rem', marginTop: '0.5rem' }}>
              <div style={{ padding: '1.25rem', background: '#f8fafc', borderRadius: '16px', textAlign: 'center', border: '1px solid #f1f5f9' }}>
                <div style={{ fontSize: '1.5rem', fontWeight: 900, color: '#0f172a', fontFamily: 'Syne, sans-serif' }}>99.9%</div>
                <div style={{ fontSize: '10px', color: '#94a3b8', textTransform: 'uppercase', fontWeight: 800, marginTop: '4px', letterSpacing: '0.05em' }}>System Uptime</div>
              </div>
              <div style={{ padding: '1.25rem', background: '#f8fafc', borderRadius: '16px', textAlign: 'center', border: '1px solid #f1f5f9' }}>
                <div style={{ fontSize: '1.5rem', fontWeight: 900, color: '#0f172a', fontFamily: 'Syne, sans-serif' }}>12ms</div>
                <div style={{ fontSize: '10px', color: '#94a3b8', textTransform: 'uppercase', fontWeight: 800, marginTop: '4px', letterSpacing: '0.05em' }}>Sync Latency</div>
              </div>
            </div>
          </div>
        </div>

        {/* API Credentials */}
        <div style={{ 
          background: '#ffffff', 
          border: '1px solid #e2e8f0', 
          borderRadius: '32px',
          padding: '2.5rem',
          boxShadow: '0 4px 24px rgba(0,0,0,0.02)'
        }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '2rem', fontFamily: 'Syne, sans-serif' }}>
            <Key size={20} style={{ color: '#3b82f6' }} /> API Intelligence
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '11px', fontWeight: 800, color: '#64748b', textTransform: 'uppercase', marginBottom: '10px', letterSpacing: '0.05em' }}>Google Analytics ID</label>
              <input type="text" defaultValue="G-XXXXXXXXXX" readOnly style={{ width: '100%', padding: '0.85rem 1rem', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', color: '#64748b', fontFamily: 'monospace', fontSize: '0.9rem' }} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '11px', fontWeight: 800, color: '#64748b', textTransform: 'uppercase', marginBottom: '10px', letterSpacing: '0.05em' }}>LinkedIn Integration Key</label>
              <input type="password" defaultValue="••••••••••••••••" readOnly style={{ width: '100%', padding: '0.85rem 1rem', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', color: '#64748b' }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
