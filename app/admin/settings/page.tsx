'use client';
import { useState } from 'react';
import { Save, Lock, Shield, CheckCircle2, AlertCircle, KeyRound } from 'lucide-react';
import { useTheme } from '@/components/ThemeProvider';
import { updateAdminPassword } from './actions';

export default function AdminSettingsPage() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const css = isDark
    ? { bg: '#0a0f1e', surface: '#0f172a', surface2: '#1e293b', border: '#1e293b', text: '#f1f5f9', muted: '#64748b', accent: '#6366f1', shadow: '0 4px 24px rgba(0,0,0,0.35)' }
    : { bg: '#f0f4ff', surface: '#ffffff', surface2: '#f8faff', border: '#e2e8f0', text: '#0f172a', muted: '#64748b', accent: '#4f46e5', shadow: '0 4px 24px rgba(0,0,0,0.07)' };

  const [formData, setFormData] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    const res = await updateAdminPassword(formData);
    setLoading(false);
    if (res?.error) setMessage({ type: 'error', text: res.error });
    else if (res?.success) {
      setMessage({ type: 'success', text: res.success });
      setFormData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    }
  };

  const Field = ({ label, id, placeholder }: { label: string; id: keyof typeof formData; placeholder: string }) => (
    <div>
      <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: css.muted, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>
        {label}
      </label>
      <input
        type="password"
        required
        value={formData[id]}
        onChange={e => setFormData(f => ({ ...f, [id]: e.target.value }))}
        placeholder={placeholder}
        style={{
          width: '100%', padding: '12px 16px',
          background: css.surface2, border: `1.5px solid ${css.border}`,
          borderRadius: 12, fontSize: 14, color: css.text,
          outline: 'none', transition: 'border-color 0.2s',
          boxSizing: 'border-box',
        }}
        onFocus={e => (e.target as HTMLInputElement).style.borderColor = css.accent}
        onBlur={e => (e.target as HTMLInputElement).style.borderColor = css.border}
      />
    </div>
  );

  return (
    <div style={{ padding: '32px 28px', minHeight: '100%' }}>
      {/* Page header */}
      <div style={{ marginBottom: 32 }}>
        <p style={{ fontSize: 11, fontWeight: 700, color: css.muted, textTransform: 'uppercase', letterSpacing: '0.08em', margin: '0 0 4px' }}>
          System
        </p>
        <h1 style={{ fontSize: 24, fontWeight: 900, color: css.text, margin: 0, letterSpacing: '-0.02em' }}>
          Settings
        </h1>
        <p style={{ fontSize: 13, color: css.muted, margin: '4px 0 0' }}>
          Manage your security credentials and preferences
        </p>
      </div>

      <div style={{ maxWidth: 520 }}>
        {/* Security card */}
        <div style={{ background: css.surface, border: `1px solid ${css.border}`, borderRadius: 20, boxShadow: css.shadow, overflow: 'hidden' }}>
          {/* Card header */}
          <div style={{ padding: '24px 28px', borderBottom: `1px solid ${css.border}`, display: 'flex', alignItems: 'center', gap: 14 }}>
            <div style={{ width: 44, height: 44, borderRadius: 14, background: `linear-gradient(135deg, ${css.accent}, #8b5cf6)`, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: `0 4px 14px ${css.accent}40`, flexShrink: 0 }}>
              <Lock size={20} color="#fff" />
            </div>
            <div>
              <h2 style={{ fontSize: 16, fontWeight: 800, color: css.text, margin: 0 }}>Change Password</h2>
              <p style={{ fontSize: 12, color: css.muted, margin: '2px 0 0' }}>Update your admin login credentials</p>
            </div>
          </div>

          {/* Card body */}
          <div style={{ padding: '28px 28px' }}>
            {/* Alert message */}
            {message && (
              <div style={{
                display: 'flex', alignItems: 'center', gap: 12,
                padding: '14px 16px', borderRadius: 12, marginBottom: 24,
                background: message.type === 'success' ? 'rgba(16,185,129,0.08)' : 'rgba(239,68,68,0.08)',
                border: `1px solid ${message.type === 'success' ? 'rgba(16,185,129,0.25)' : 'rgba(239,68,68,0.25)'}`,
                color: message.type === 'success' ? '#10b981' : '#ef4444',
              }}>
                {message.type === 'success' ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
                <span style={{ fontSize: 13, fontWeight: 600 }}>{message.text}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              <Field label="Current Password" id="currentPassword" placeholder="Enter your current password" />
              <Field label="New Password" id="newPassword" placeholder="Min 8 characters" />
              <Field label="Confirm New Password" id="confirmPassword" placeholder="Re-enter new password" />

              <div style={{ paddingTop: 8 }}>
                <button
                  type="submit"
                  disabled={loading}
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: 8,
                    padding: '13px 28px',
                    background: loading ? css.surface2 : `linear-gradient(135deg, ${css.accent}, #8b5cf6)`,
                    border: 'none', borderRadius: 12,
                    color: loading ? css.muted : '#fff',
                    fontSize: 14, fontWeight: 700, cursor: loading ? 'not-allowed' : 'pointer',
                    boxShadow: loading ? 'none' : `0 4px 16px ${css.accent}40`,
                    transition: 'opacity 0.2s',
                    opacity: loading ? 0.7 : 1,
                  }}
                >
                  <Save size={16} />
                  {loading ? 'Saving...' : 'Save Password'}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Info card */}
        <div style={{ marginTop: 20, background: css.surface, border: `1px solid ${css.border}`, borderRadius: 20, padding: '20px 24px', boxShadow: css.shadow, display: 'flex', alignItems: 'center', gap: 14 }}>
          <Shield size={18} color={css.muted} style={{ flexShrink: 0 }} />
          <p style={{ fontSize: 12, color: css.muted, margin: 0, lineHeight: 1.6 }}>
            Your password must be at least <strong style={{ color: css.text }}>8 characters</strong> long. Use a mix of letters, numbers and symbols for stronger security.
          </p>
        </div>
      </div>
    </div>
  );
}
