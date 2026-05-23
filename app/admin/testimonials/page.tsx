'use client';
import { useState, useEffect, useCallback } from 'react';
import {
  Star, CheckCircle, XCircle, Search, Trash2, Clock,
  Plus, Edit2, X, Save, Loader2, AlertCircle, CheckCircle2, User,
} from 'lucide-react';
import { useTheme } from '@/components/ThemeProvider';

interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
  status: string;
  avatarUrl: string | null;
  createdAt: string;
  updatedAt: string;
}

interface FormState {
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
  status: string;
  avatarUrl: string;
}

const emptyForm: FormState = { name: '', role: '', company: '', content: '', rating: 5, status: 'PENDING', avatarUrl: '' };

type Toast = { type: 'success' | 'error'; message: string } | null;

function StarRatingInput({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  const [hover, setHover] = useState(0);
  return (
    <div style={{ display: 'flex', gap: 4 }}>
      {[1, 2, 3, 4, 5].map(i => (
        <button
          key={i}
          type="button"
          onClick={() => onChange(i)}
          onMouseEnter={() => setHover(i)}
          onMouseLeave={() => setHover(0)}
          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 2 }}
        >
          <Star
            size={22}
            fill={(hover || value) >= i ? '#f59e0b' : 'none'}
            stroke={(hover || value) >= i ? '#f59e0b' : '#94a3b8'}
          />
        </button>
      ))}
    </div>
  );
}

export default function AdminTestimonials() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const css = isDark
    ? { bg: '#0a0f1e', surface: '#0f172a', surface2: '#1e293b', border: '#1e293b', text: '#f1f5f9', muted: '#64748b', accent: '#6366f1', shadow: '0 4px 24px rgba(0,0,0,0.35)', hoverShadow: '0 8px 32px rgba(0,0,0,0.5)' }
    : { bg: '#f0f4ff', surface: '#ffffff', surface2: '#f8faff', border: '#e2e8f0', text: '#0f172a', muted: '#64748b', accent: '#4f46e5', shadow: '0 4px 24px rgba(0,0,0,0.07)', hoverShadow: '0 8px 32px rgba(0,0,0,0.12)' };

  const [items, setItems] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<Testimonial | null>(null);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [toggling, setToggling] = useState<string | null>(null);
  const [toast, setToast] = useState<Toast>(null);

  const showToast = (type: 'success' | 'error', message: string) => {
    setToast({ type, message });
    setTimeout(() => setToast(null), 3500);
  };

  const fetchTestimonials = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/admin/testimonials');
      if (!res.ok) throw new Error('Failed to load');
      setItems(await res.json());
    } catch {
      showToast('error', 'Failed to load testimonials');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchTestimonials(); }, [fetchTestimonials]);

  const openAdd = () => { setEditing(null); setForm(emptyForm); setShowModal(true); };

  const openEdit = (t: Testimonial) => {
    setEditing(t);
    setForm({ name: t.name, role: t.role, company: t.company, content: t.content, rating: t.rating, status: t.status, avatarUrl: t.avatarUrl || '' });
    setShowModal(true);
  };

  const handleSave = async () => {
    if (!form.name.trim() || !form.content.trim()) {
      showToast('error', 'Name and content are required');
      return;
    }
    setSaving(true);
    try {
      const payload = { ...form, avatarUrl: form.avatarUrl || null };
      let res: Response;
      if (editing) {
        res = await fetch(`/api/admin/testimonials/${editing.id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
      } else {
        res = await fetch('/api/admin/testimonials', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
      }
      if (!res.ok) { const err = await res.json(); throw new Error(err.error || 'Save failed'); }
      await fetchTestimonials();
      setShowModal(false);
      showToast('success', editing ? 'Testimonial updated!' : 'Testimonial added!');
    } catch (e: any) {
      showToast('error', e.message || 'Something went wrong');
    } finally {
      setSaving(false);
    }
  };

  const toggleStatus = async (t: Testimonial) => {
    const newStatus = t.status === 'APPROVED' ? 'PENDING' : 'APPROVED';
    setToggling(t.id);
    try {
      const res = await fetch(`/api/admin/testimonials/${t.id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ status: newStatus }) });
      if (!res.ok) throw new Error();
      setItems(ts => ts.map(x => x.id === t.id ? { ...x, status: newStatus } : x));
      showToast('success', newStatus === 'APPROVED' ? 'Testimonial approved!' : 'Moved to pending');
    } catch {
      showToast('error', 'Failed to update status');
    } finally {
      setToggling(null);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this testimonial? This cannot be undone.')) return;
    setDeleting(id);
    try {
      const res = await fetch(`/api/admin/testimonials/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error();
      setItems(ts => ts.filter(t => t.id !== id));
      showToast('success', 'Testimonial deleted');
    } catch {
      showToast('error', 'Failed to delete');
    } finally {
      setDeleting(null);
    }
  };

  const filtered = items.filter(t =>
    t.name.toLowerCase().includes(search.toLowerCase()) ||
    t.company.toLowerCase().includes(search.toLowerCase())
  );

  const approved = items.filter(t => t.status === 'APPROVED').length;
  const avgRating = items.length ? (items.reduce((s, t) => s + t.rating, 0) / items.length).toFixed(1) : '—';

  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '11px 14px', background: css.surface2,
    border: `1.5px solid ${css.border}`, borderRadius: 11,
    fontSize: 13, color: css.text, outline: 'none', boxSizing: 'border-box',
  };

  const gradients = ['linear-gradient(135deg,#6366f1,#8b5cf6)', 'linear-gradient(135deg,#06b6d4,#0891b2)', 'linear-gradient(135deg,#10b981,#059669)', 'linear-gradient(135deg,#f59e0b,#d97706)', 'linear-gradient(135deg,#ec4899,#db2777)'];

  return (
    <div style={{ padding: '32px 28px', minHeight: '100%', position: 'relative' }}>

      {/* Toast */}
      {toast && (
        <div style={{ position: 'fixed', top: 24, right: 24, zIndex: 9999, display: 'flex', alignItems: 'center', gap: 10, background: toast.type === 'success' ? 'rgba(16,185,129,0.95)' : 'rgba(239,68,68,0.95)', color: '#fff', padding: '12px 20px', borderRadius: 14, boxShadow: '0 8px 32px rgba(0,0,0,0.3)', backdropFilter: 'blur(12px)', fontSize: 13, fontWeight: 600, animation: 'slideInRight 0.3s ease' }}>
          {toast.type === 'success' ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
          {toast.message}
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div style={{ position: 'fixed', inset: 0, background: isDark ? 'rgba(0,0,0,0.75)' : 'rgba(15,23,42,0.4)', backdropFilter: 'blur(8px)', zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
          <div style={{ background: css.surface, border: `1px solid ${css.border}`, borderRadius: 24, padding: 32, width: '100%', maxWidth: 520, boxShadow: css.hoverShadow, maxHeight: '90vh', overflowY: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
              <div>
                <p style={{ fontSize: 11, fontWeight: 700, color: css.muted, textTransform: 'uppercase', letterSpacing: '0.08em', margin: '0 0 4px' }}>
                  {editing ? 'Editing testimonial' : 'New testimonial'}
                </p>
                <h3 style={{ fontSize: 20, fontWeight: 800, color: css.text, margin: 0 }}>
                  {editing ? 'Edit Testimonial' : 'Add Testimonial'}
                </h3>
              </div>
              <button onClick={() => setShowModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: css.muted, padding: 4, display: 'flex' }}>
                <X size={20} />
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {/* Name */}
              <div>
                <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: css.muted, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 7 }}>Name *</label>
                <input type="text" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="e.g. Sarah Johnson" style={inputStyle}
                  onFocus={e => (e.target as HTMLInputElement).style.borderColor = css.accent}
                  onBlur={e => (e.target as HTMLInputElement).style.borderColor = css.border} />
              </div>

              {/* Role + Company */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div>
                  <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: css.muted, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 7 }}>Role</label>
                  <input type="text" value={form.role} onChange={e => setForm(f => ({ ...f, role: e.target.value }))} placeholder="e.g. Product Manager" style={inputStyle}
                    onFocus={e => (e.target as HTMLInputElement).style.borderColor = css.accent}
                    onBlur={e => (e.target as HTMLInputElement).style.borderColor = css.border} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: css.muted, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 7 }}>Company</label>
                  <input type="text" value={form.company} onChange={e => setForm(f => ({ ...f, company: e.target.value }))} placeholder="e.g. TechCorp" style={inputStyle}
                    onFocus={e => (e.target as HTMLInputElement).style.borderColor = css.accent}
                    onBlur={e => (e.target as HTMLInputElement).style.borderColor = css.border} />
                </div>
              </div>

              {/* Content */}
              <div>
                <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: css.muted, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 7 }}>Review Content *</label>
                <textarea value={form.content} onChange={e => setForm(f => ({ ...f, content: e.target.value }))} placeholder="What did the client say..." rows={4}
                  style={{ ...inputStyle, resize: 'vertical', lineHeight: 1.6 }}
                  onFocus={e => (e.target as HTMLTextAreaElement).style.borderColor = css.accent}
                  onBlur={e => (e.target as HTMLTextAreaElement).style.borderColor = css.border} />
              </div>

              {/* Rating */}
              <div>
                <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: css.muted, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 10 }}>Rating</label>
                <StarRatingInput value={form.rating} onChange={v => setForm(f => ({ ...f, rating: v }))} />
              </div>

              {/* Status + Avatar URL */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div>
                  <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: css.muted, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 7 }}>Status</label>
                  <select value={form.status} onChange={e => setForm(f => ({ ...f, status: e.target.value }))} style={{ ...inputStyle, cursor: 'pointer' }}>
                    <option value="PENDING">Pending</option>
                    <option value="APPROVED">Approved</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: css.muted, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 7 }}>Avatar URL</label>
                  <input type="text" value={form.avatarUrl} onChange={e => setForm(f => ({ ...f, avatarUrl: e.target.value }))} placeholder="https://... (optional)" style={inputStyle}
                    onFocus={e => (e.target as HTMLInputElement).style.borderColor = css.accent}
                    onBlur={e => (e.target as HTMLInputElement).style.borderColor = css.border} />
                </div>
              </div>

              {/* Actions */}
              <div style={{ display: 'flex', gap: 10, paddingTop: 8 }}>
                <button onClick={() => setShowModal(false)} style={{ flex: 1, padding: '12px', background: css.surface2, border: `1px solid ${css.border}`, borderRadius: 11, color: css.text, fontWeight: 600, fontSize: 14, cursor: 'pointer' }}>
                  Cancel
                </button>
                <button onClick={handleSave} disabled={saving} style={{ flex: 2, padding: '12px', background: `linear-gradient(135deg, ${css.accent}, #8b5cf6)`, border: 'none', borderRadius: 11, color: '#fff', fontWeight: 700, fontSize: 14, cursor: saving ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7, opacity: saving ? 0.75 : 1 }}>
                  {saving ? <Loader2 size={15} style={{ animation: 'spin 1s linear infinite' }} /> : <Save size={15} />}
                  {saving ? 'Saving…' : (editing ? 'Update Testimonial' : 'Add Testimonial')}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 16, marginBottom: 28 }}>
        <div>
          <p style={{ fontSize: 11, fontWeight: 700, color: css.muted, textTransform: 'uppercase', letterSpacing: '0.08em', margin: '0 0 4px' }}>Social Proof</p>
          <h1 style={{ fontSize: 24, fontWeight: 900, color: css.text, margin: 0, letterSpacing: '-0.02em' }}>Testimonials</h1>
          <p style={{ fontSize: 13, color: css.muted, margin: '4px 0 0' }}>
            {loading ? 'Loading…' : `${approved} approved · ${items.length - approved} pending`}
          </p>
        </div>
        <div style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap' }}>
          {/* Search */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, background: css.surface, border: `1px solid ${css.border}`, borderRadius: 12, padding: '10px 16px', minWidth: 220 }}>
            <Search size={14} color={css.muted} />
            <input type="text" placeholder="Search name or company…" value={search} onChange={e => setSearch(e.target.value)}
              style={{ background: 'none', border: 'none', outline: 'none', fontSize: 13, color: css.text, fontWeight: 500, width: '100%' }} />
          </div>
          {/* Add button */}
          <button onClick={openAdd} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '11px 22px', background: `linear-gradient(135deg, ${css.accent}, #8b5cf6)`, border: 'none', borderRadius: 12, color: '#fff', fontWeight: 700, fontSize: 14, cursor: 'pointer', boxShadow: `0 4px 14px ${css.accent}40` }}>
            <Plus size={17} /> Add Review
          </button>
        </div>
      </div>

      {/* Summary row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 28 }}>
        {[
          { label: 'Total Reviews', value: loading ? '…' : items.length, color: '#6366f1' },
          { label: 'Approved', value: loading ? '…' : approved, color: '#10b981' },
          { label: 'Avg Rating', value: loading ? '…' : `⭐ ${avgRating}`, color: '#f59e0b' },
        ].map((s, i) => (
          <div key={i} style={{ background: css.surface, border: `1px solid ${css.border}`, borderRadius: 16, padding: '18px 22px', boxShadow: css.shadow }}>
            <p style={{ fontSize: 11, fontWeight: 700, color: css.muted, textTransform: 'uppercase', letterSpacing: '0.08em', margin: '0 0 6px' }}>{s.label}</p>
            <p style={{ fontSize: 26, fontWeight: 900, color: s.color, margin: 0 }}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Loading skeleton */}
      {loading && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {[1, 2, 3].map(i => (
            <div key={i} style={{ background: css.surface, border: `1px solid ${css.border}`, borderRadius: 20, padding: '24px 28px', height: 140, animation: 'pulse 1.6s ease-in-out infinite' }}>
              <div style={{ display: 'flex', gap: 14, alignItems: 'center', marginBottom: 16 }}>
                <div style={{ width: 44, height: 44, borderRadius: '50%', background: css.surface2, flexShrink: 0 }} />
                <div style={{ flex: 1 }}>
                  <div style={{ height: 14, width: '30%', borderRadius: 7, background: css.surface2, marginBottom: 8 }} />
                  <div style={{ height: 11, width: '20%', borderRadius: 5, background: css.surface2 }} />
                </div>
              </div>
              <div style={{ height: 12, width: '90%', borderRadius: 6, background: css.surface2, marginBottom: 8 }} />
              <div style={{ height: 12, width: '70%', borderRadius: 6, background: css.surface2 }} />
            </div>
          ))}
        </div>
      )}

      {/* Empty state */}
      {!loading && items.length === 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '80px 20px', gap: 16 }}>
          <div style={{ width: 72, height: 72, borderRadius: 20, background: `${css.accent}15`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Star size={32} color={css.accent} />
          </div>
          <h3 style={{ fontSize: 18, fontWeight: 800, color: css.text, margin: 0 }}>No testimonials yet</h3>
          <p style={{ fontSize: 14, color: css.muted, margin: 0, textAlign: 'center' }}>Add your first client review to build social proof.</p>
          <button onClick={openAdd} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '11px 22px', background: `linear-gradient(135deg, ${css.accent}, #8b5cf6)`, border: 'none', borderRadius: 12, color: '#fff', fontWeight: 700, fontSize: 14, cursor: 'pointer' }}>
            <Plus size={17} /> Add First Review
          </button>
        </div>
      )}

      {/* No search results */}
      {!loading && items.length > 0 && filtered.length === 0 && (
        <div style={{ background: css.surface, border: `1px solid ${css.border}`, borderRadius: 20, padding: '48px', textAlign: 'center', color: css.muted, fontSize: 14 }}>
          No testimonials match "{search}".
        </div>
      )}

      {/* Cards */}
      {!loading && filtered.length > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {filtered.map((t, i) => (
            <div key={t.id}
              style={{ background: css.surface, border: `1px solid ${css.border}`, borderRadius: 20, padding: '24px 28px', boxShadow: css.shadow, transition: 'box-shadow 0.2s' }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.boxShadow = css.hoverShadow}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.boxShadow = css.shadow}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 12, marginBottom: 14 }}>
                {/* Avatar + Info */}
                <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
                  {t.avatarUrl ? (
                    <img src={t.avatarUrl} alt={t.name} style={{ width: 44, height: 44, borderRadius: '50%', objectFit: 'cover', flexShrink: 0, border: `2px solid ${css.border}` }} />
                  ) : (
                    <div style={{ width: 44, height: 44, borderRadius: '50%', background: gradients[i % gradients.length], display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 800, fontSize: 16, flexShrink: 0 }}>
                      {t.name.charAt(0).toUpperCase()}
                    </div>
                  )}
                  <div>
                    <p style={{ fontSize: 15, fontWeight: 700, color: css.text, margin: 0 }}>{t.name}</p>
                    <p style={{ fontSize: 12, color: css.muted, margin: '2px 0 0', fontWeight: 500 }}>
                      {t.role}{t.role && t.company ? ' · ' : ''}{t.company}
                    </p>
                  </div>
                </div>

                {/* Actions */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  {/* Status badge */}
                  <span style={{ fontSize: 10, fontWeight: 700, background: t.status === 'APPROVED' ? 'rgba(16,185,129,0.1)' : 'rgba(245,158,11,0.1)', color: t.status === 'APPROVED' ? '#10b981' : '#f59e0b', border: `1px solid ${t.status === 'APPROVED' ? 'rgba(16,185,129,0.25)' : 'rgba(245,158,11,0.25)'}`, padding: '3px 10px', borderRadius: 999, textTransform: 'uppercase', letterSpacing: '0.07em', display: 'flex', alignItems: 'center', gap: 5 }}>
                    <span style={{ width: 5, height: 5, borderRadius: '50%', background: t.status === 'APPROVED' ? '#10b981' : '#f59e0b' }} />
                    {t.status === 'APPROVED' ? 'Approved' : 'Pending'}
                  </span>

                  {/* Toggle approve/revoke */}
                  <button onClick={() => toggleStatus(t)} disabled={toggling === t.id} title={t.status === 'APPROVED' ? 'Revoke' : 'Approve'}
                    style={{ background: 'none', border: `1px solid ${css.border}`, borderRadius: 9, padding: 7, cursor: toggling === t.id ? 'not-allowed' : 'pointer', color: t.status === 'APPROVED' ? '#ef4444' : '#10b981', display: 'flex', alignItems: 'center', transition: 'all 0.15s' }}>
                    {toggling === t.id ? <Loader2 size={14} style={{ animation: 'spin 1s linear infinite' }} /> : t.status === 'APPROVED' ? <XCircle size={14} /> : <CheckCircle size={14} />}
                  </button>

                  {/* Edit */}
                  <button onClick={() => openEdit(t)} title="Edit testimonial"
                    style={{ background: 'none', border: `1px solid ${css.border}`, borderRadius: 9, padding: 7, cursor: 'pointer', color: css.muted, display: 'flex', alignItems: 'center', transition: 'all 0.15s' }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = css.accent; (e.currentTarget as HTMLElement).style.borderColor = css.accent; (e.currentTarget as HTMLElement).style.background = `${css.accent}10`; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = css.muted; (e.currentTarget as HTMLElement).style.borderColor = css.border; (e.currentTarget as HTMLElement).style.background = 'none'; }}>
                    <Edit2 size={14} />
                  </button>

                  {/* Delete */}
                  <button onClick={() => handleDelete(t.id)} disabled={deleting === t.id} title="Delete testimonial"
                    style={{ background: 'none', border: `1px solid ${css.border}`, borderRadius: 9, padding: 7, cursor: deleting === t.id ? 'not-allowed' : 'pointer', color: css.muted, display: 'flex', alignItems: 'center', transition: 'all 0.15s' }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = '#ef4444'; (e.currentTarget as HTMLElement).style.background = 'rgba(239,68,68,0.06)'; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = css.muted; (e.currentTarget as HTMLElement).style.background = 'none'; }}>
                    {deleting === t.id ? <Loader2 size={14} style={{ animation: 'spin 1s linear infinite' }} /> : <Trash2 size={14} />}
                  </button>
                </div>
              </div>

              {/* Stars */}
              <div style={{ display: 'flex', gap: 2, marginBottom: 12 }}>
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={14} fill={i < t.rating ? '#f59e0b' : 'none'} stroke={i < t.rating ? '#f59e0b' : css.muted} />
                ))}
              </div>

              <p style={{ fontSize: 14, color: css.text, lineHeight: 1.7, margin: '0 0 12px', fontStyle: 'italic' }}>
                "{t.content}"
              </p>

              <p style={{ fontSize: 11, color: css.muted, margin: 0, display: 'flex', alignItems: 'center', gap: 5 }}>
                <Clock size={11} /> {new Date(t.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
              </p>
            </div>
          ))}
        </div>
      )}

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes pulse { 0%,100% { opacity:1; } 50% { opacity:0.5; } }
        @keyframes slideInRight { from { transform: translateX(40px); opacity:0; } to { transform: translateX(0); opacity:1; } }
      `}</style>
    </div>
  );
}
