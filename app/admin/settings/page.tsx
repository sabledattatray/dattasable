'use client';
import { useState } from 'react';
import { Save, Lock, Shield, CheckCircle2, AlertCircle } from 'lucide-react';
import { updateAdminPassword } from './actions';

export default function AdminSettingsPage() {
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    const res = await updateAdminPassword(formData);
    setLoading(false);

    if (res?.error) {
      setMessage({ type: 'error', text: res.error });
    } else if (res?.success) {
      setMessage({ type: 'success', text: res.success });
      setFormData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    }
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="mb-8 flex items-center gap-3">
        <div className="p-3 bg-[var(--surface2)] text-[var(--accent)] rounded-xl">
          <Shield size={24} />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-[var(--text)]">Admin Security Settings</h1>
          <p className="text-sm text-[var(--muted)]">Manage your administrative credentials and security preferences</p>
        </div>
      </div>

      <div className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-8 shadow-xl">
        <div className="flex items-center gap-2 mb-6 text-[var(--accent)] font-semibold text-lg border-b border-[var(--border)] pb-4">
          <Lock size={20} /> Change Admin Password
        </div>

        {message && (
          <div className={`p-4 rounded-xl mb-6 flex items-center gap-3 ${message.type === 'success' ? 'bg-green-500/10 text-green-500 border border-green-500/20' : 'bg-red-500/10 text-red-500 border border-red-500/20'}`}>
            {message.type === 'success' ? <CheckCircle2 size={20} /> : <AlertCircle size={20} />}
            <span className="font-semibold text-sm">{message.text}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--muted)] mb-2">Current Password</label>
            <input
              type="password"
              required
              value={formData.currentPassword}
              onChange={e => setFormData({ ...formData, currentPassword: e.target.value })}
              className="w-full bg-[var(--surface2)] border border-[var(--border)] rounded-xl px-4 py-3 text-sm text-[var(--text)] focus:outline-none focus:border-[var(--accent)]"
              placeholder="Enter current password"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--muted)] mb-2">New Password</label>
            <input
              type="password"
              required
              value={formData.newPassword}
              onChange={e => setFormData({ ...formData, newPassword: e.target.value })}
              className="w-full bg-[var(--surface2)] border border-[var(--border)]) rounded-xl px-4 py-3 text-sm text-[var(--text)] focus:outline-none focus:border-[var(--accent)]"
              placeholder="Enter new password (min 8 characters)"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--muted)] mb-2">Confirm New Password</label>
            <input
              type="password"
              required
              value={formData.confirmPassword}
              onChange={e => setFormData({ ...formData, confirmPassword: e.target.value })}
              className="w-full bg-[var(--surface2)] border border-[var(--border)] rounded-xl px-4 py-3 text-sm text-[var(--text)] focus:outline-none focus:border-[var(--accent)]"
              placeholder="Confirm new password"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[var(--accent)] text-black font-bold py-3 px-6 rounded-xl flex items-center justify-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            <Save size={18} /> {loading ? 'Updating...' : 'Save New Password'}
          </button>
        </form>
      </div>
    </div>
  );
}
