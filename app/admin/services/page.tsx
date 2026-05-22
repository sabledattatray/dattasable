'use client';
import { useState } from 'react';
import { Briefcase, Plus, Edit2, Trash2, Clock, X, Save } from 'lucide-react';
import { useTheme } from '@/components/ThemeProvider';

const serviceGradients = [
  'linear-gradient(135deg, #6366f1, #8b5cf6)',
  'linear-gradient(135deg, #06b6d4, #0891b2)',
  'linear-gradient(135deg, #10b981, #059669)',
  'linear-gradient(135deg, #f59e0b, #d97706)',
  'linear-gradient(135deg, #ec4899, #db2777)',
];

const initialServices = [
  { id: 1, title: 'Dashboard Development', desc: 'Custom KPI dashboards in Tableau, Power BI & Excel', price: '₹15,000', status: 'Active', orders: 12 },
  { id: 2, title: 'Data Analytics Consulting', desc: 'End-to-end data analysis, reporting & insights', price: '₹25,000', status: 'Active', orders: 8 },
  { id: 3, title: 'Automation Solutions', desc: 'Python & VBA-based workflow automation', price: '₹20,000', status: 'Active', orders: 5 },
];

export default function AdminServices() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const css = isDark
    ? { bg: '#0a0f1e', surface: '#0f172a', surface2: '#1e293b', border: '#1e293b', text: '#f1f5f9', muted: '#64748b', accent: '#6366f1', shadow: '0 4px 24px rgba(0,0,0,0.35)', hoverShadow: '0 8px 32px rgba(0,0,0,0.5)' }
    : { bg: '#f0f4ff', surface: '#ffffff', surface2: '#f8faff', border: '#e2e8f0', text: '#0f172a', muted: '#64748b', accent: '#4f46e5', shadow: '0 4px 24px rgba(0,0,0,0.07)', hoverShadow: '0 8px 32px rgba(0,0,0,0.12)' };

  const [services, setServices] = useState(initialServices);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<any>(null);
  const [form, setForm] = useState({ title: '', desc: '', price: '', status: 'Active' });

  const openAdd = () => {
    setEditing(null);
    setForm({ title: '', desc: '', price: '', status: 'Active' });
    setShowModal(true);
  };

  const openEdit = (s: any) => {
    setEditing(s);
    setForm({ title: s.title, desc: s.desc, price: s.price, status: s.status });
    setShowModal(true);
  };

  const handleSave = () => {
    if (editing) {
      setServices(ss => ss.map(s => s.id === editing.id ? { ...s, ...form } : s));
    } else {
      setServices(ss => [...ss, { id: Date.now(), ...form, orders: 0 }]);
    }
    setShowModal(false);
  };

  const handleDelete = (id: number) => setServices(ss => ss.filter(s => s.id !== id));

  return (
    <div style={{ padding: '32px 28px', minHeight: '100%' }}>
      {/* Modal */}
      {showModal && (
        <div style={{ position: 'fixed', inset: 0, background: isDark ? 'rgba(0,0,0,0.7)' : 'rgba(15,23,42,0.35)', backdropFilter: 'blur(8px)', zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
          <div style={{ background: css.surface, border: `1px solid ${css.border}`, borderRadius: 24, padding: 32, width: '100%', maxWidth: 460, boxShadow: css.hoverShadow }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
              <h3 style={{ fontSize: 18, fontWeight: 800, color: css.text, margin: 0 }}>{editing ? 'Edit Service' : 'Add Service'}</h3>
              <button onClick={() => setShowModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: css.muted, padding: 4 }}><X size={20} /></button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {[['Service Title', 'title', 'e.g. Dashboard Development'], ['Price', 'price', 'e.g. ₹15,000'], ['Description', 'desc', 'Short description...']].map(([label, key, ph]) => (
                <div key={key}>
                  <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: css.muted, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 7 }}>{label}</label>
                  <input type="text" value={(form as any)[key]} onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))} placeholder={ph}
                    style={{ width: '100%', padding: '11px 14px', background: css.surface2, border: `1.5px solid ${css.border}`, borderRadius: 11, fontSize: 13, color: css.text, outline: 'none', boxSizing: 'border-box' }}
                    onFocus={e => (e.target as HTMLInputElement).style.borderColor = css.accent}
                    onBlur={e => (e.target as HTMLInputElement).style.borderColor = css.border}
                  />
                </div>
              ))}
              <div style={{ display: 'flex', gap: 10, paddingTop: 8 }}>
                <button onClick={() => setShowModal(false)} style={{ flex: 1, padding: '12px', background: css.surface2, border: `1px solid ${css.border}`, borderRadius: 11, color: css.text, fontWeight: 600, fontSize: 14, cursor: 'pointer' }}>Cancel</button>
                <button onClick={handleSave} style={{ flex: 1, padding: '12px', background: `linear-gradient(135deg, ${css.accent}, #8b5cf6)`, border: 'none', borderRadius: 11, color: '#fff', fontWeight: 700, fontSize: 14, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7 }}>
                  <Save size={15} /> Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 12, marginBottom: 28 }}>
        <div>
          <p style={{ fontSize: 11, fontWeight: 700, color: css.muted, textTransform: 'uppercase', letterSpacing: '0.08em', margin: '0 0 4px' }}>Offerings</p>
          <h1 style={{ fontSize: 24, fontWeight: 900, color: css.text, margin: 0, letterSpacing: '-0.02em' }}>Service Catalog</h1>
          <p style={{ fontSize: 13, color: css.muted, margin: '4px 0 0' }}>{services.length} services available</p>
        </div>
        <button onClick={openAdd} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '11px 22px', background: `linear-gradient(135deg, ${css.accent}, #8b5cf6)`, border: 'none', borderRadius: 12, color: '#fff', fontWeight: 700, fontSize: 14, cursor: 'pointer', boxShadow: `0 4px 14px ${css.accent}40` }}>
          <Plus size={17} /> Add Service
        </button>
      </div>

      {/* Cards grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 20 }}>
        {services.map((s, i) => (
          <div key={s.id}
            style={{ background: css.surface, border: `1px solid ${css.border}`, borderRadius: 20, padding: 24, boxShadow: css.shadow, display: 'flex', flexDirection: 'column', gap: 0, transition: 'box-shadow 0.2s, transform 0.2s' }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-3px)'; (e.currentTarget as HTMLElement).style.boxShadow = css.hoverShadow; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; (e.currentTarget as HTMLElement).style.boxShadow = css.shadow; }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 18 }}>
              <div style={{ width: 48, height: 48, borderRadius: 14, background: serviceGradients[i % serviceGradients.length], display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 14px rgba(99,102,241,0.3)' }}>
                <Briefcase size={20} color="#fff" />
              </div>
              <div style={{ display: 'flex', gap: 6 }}>
                <button onClick={() => openEdit(s)} style={{ background: 'none', border: `1px solid ${css.border}`, borderRadius: 9, padding: 7, cursor: 'pointer', color: css.muted, display: 'flex', alignItems: 'center', transition: 'all 0.15s' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = css.accent; (e.currentTarget as HTMLElement).style.borderColor = css.accent; (e.currentTarget as HTMLElement).style.background = `${css.accent}10`; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = css.muted; (e.currentTarget as HTMLElement).style.borderColor = css.border; (e.currentTarget as HTMLElement).style.background = 'none'; }}
                ><Edit2 size={14} /></button>
                <button onClick={() => handleDelete(s.id)} style={{ background: 'none', border: `1px solid ${css.border}`, borderRadius: 9, padding: 7, cursor: 'pointer', color: css.muted, display: 'flex', alignItems: 'center', transition: 'all 0.15s' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = '#ef4444'; (e.currentTarget as HTMLElement).style.borderColor = '#ef444440'; (e.currentTarget as HTMLElement).style.background = 'rgba(239,68,68,0.06)'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = css.muted; (e.currentTarget as HTMLElement).style.borderColor = css.border; (e.currentTarget as HTMLElement).style.background = 'none'; }}
                ><Trash2 size={14} /></button>
              </div>
            </div>
            <h3 style={{ fontSize: 16, fontWeight: 800, color: css.text, margin: '0 0 6px', letterSpacing: '-0.01em' }}>{s.title}</h3>
            <p style={{ fontSize: 12, color: css.muted, margin: '0 0 16px', lineHeight: 1.6 }}>{s.desc}</p>
            <div style={{ fontSize: 26, fontWeight: 900, color: css.text, letterSpacing: '-0.03em', margin: '0 0 18px' }}>{s.price}</div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 16, borderTop: `1px solid ${css.border}`, marginTop: 'auto' }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 10, fontWeight: 700, background: 'rgba(16,185,129,0.1)', color: '#10b981', border: '1px solid rgba(16,185,129,0.2)', padding: '3px 10px', borderRadius: 999, textTransform: 'uppercase', letterSpacing: '0.07em' }}>
                <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#10b981' }} /> {s.status}
              </span>
              <span style={{ fontSize: 12, color: css.muted, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 5 }}>
                <Clock size={12} /> {s.orders} orders
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
