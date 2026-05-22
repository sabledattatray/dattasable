'use client';
import { useState } from 'react';
import { Star, CheckCircle, XCircle, Search, Trash2, Clock, User } from 'lucide-react';
import { useTheme } from '@/components/ThemeProvider';

const initialTestimonials = [
  { id: 1, name: 'Sarah Johnson', role: 'Product Manager', company: 'TechCorp', content: 'Datta is a master of Tableau. Our reports are now 10x faster and the team can actually understand the data now.', status: 'Approved', rating: 5, date: '2 days ago' },
  { id: 2, name: 'Mike Ross', role: 'Founder', company: 'Startup.io', content: 'The automation solutions Datta built saved us 20 hours a week. Absolute game changer for our operations team.', status: 'Pending', rating: 5, date: '5 days ago' },
  { id: 3, name: 'Priya Verma', role: 'HR Lead', company: 'RetailMax', content: 'Payroll automation is working perfectly. No more manual Excel errors. Highly recommend!', status: 'Approved', rating: 4, date: '1 week ago' },
];

export default function AdminTestimonials() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const css = isDark
    ? { bg: '#0a0f1e', surface: '#0f172a', surface2: '#1e293b', border: '#1e293b', text: '#f1f5f9', muted: '#64748b', accent: '#6366f1', shadow: '0 4px 24px rgba(0,0,0,0.35)', hoverShadow: '0 8px 32px rgba(0,0,0,0.5)' }
    : { bg: '#f0f4ff', surface: '#ffffff', surface2: '#f8faff', border: '#e2e8f0', text: '#0f172a', muted: '#64748b', accent: '#4f46e5', shadow: '0 4px 24px rgba(0,0,0,0.07)', hoverShadow: '0 8px 32px rgba(0,0,0,0.12)' };

  const [items, setItems] = useState(initialTestimonials);
  const [search, setSearch] = useState('');

  const filtered = items.filter(t =>
    t.name.toLowerCase().includes(search.toLowerCase()) ||
    t.company.toLowerCase().includes(search.toLowerCase())
  );

  const toggleStatus = (id: number) =>
    setItems(ts => ts.map(t => t.id === id ? { ...t, status: t.status === 'Approved' ? 'Pending' : 'Approved' } : t));

  const handleDelete = (id: number) => setItems(ts => ts.filter(t => t.id !== id));

  const approved = items.filter(t => t.status === 'Approved').length;

  return (
    <div style={{ padding: '32px 28px', minHeight: '100%' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 16, marginBottom: 28 }}>
        <div>
          <p style={{ fontSize: 11, fontWeight: 700, color: css.muted, textTransform: 'uppercase', letterSpacing: '0.08em', margin: '0 0 4px' }}>Offerings</p>
          <h1 style={{ fontSize: 24, fontWeight: 900, color: css.text, margin: 0, letterSpacing: '-0.02em' }}>Testimonials</h1>
          <p style={{ fontSize: 13, color: css.muted, margin: '4px 0 0' }}>
            {approved} approved · {items.length - approved} pending review
          </p>
        </div>
        {/* Search */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, background: css.surface, border: `1px solid ${css.border}`, borderRadius: 12, padding: '10px 16px', minWidth: 240 }}>
          <Search size={14} color={css.muted} />
          <input
            type="text" placeholder="Search by name or company..."
            value={search} onChange={e => setSearch(e.target.value)}
            style={{ background: 'none', border: 'none', outline: 'none', fontSize: 13, color: css.text, fontWeight: 500, width: '100%' }}
          />
        </div>
      </div>

      {/* Summary row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 28 }}>
        {[
          { label: 'Total Reviews', value: items.length, color: '#6366f1', bg: 'rgba(99,102,241,0.1)' },
          { label: 'Approved', value: approved, color: '#10b981', bg: 'rgba(16,185,129,0.1)' },
          { label: 'Avg Rating', value: '⭐ 4.8', color: '#f59e0b', bg: 'rgba(245,158,11,0.1)' },
        ].map((s, i) => (
          <div key={i} style={{ background: css.surface, border: `1px solid ${css.border}`, borderRadius: 16, padding: '18px 22px', boxShadow: css.shadow }}>
            <p style={{ fontSize: 11, fontWeight: 700, color: css.muted, textTransform: 'uppercase', letterSpacing: '0.08em', margin: '0 0 6px' }}>{s.label}</p>
            <p style={{ fontSize: 26, fontWeight: 900, color: s.color, margin: 0 }}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {filtered.length === 0 && (
          <div style={{ background: css.surface, border: `1px solid ${css.border}`, borderRadius: 20, padding: '48px', textAlign: 'center', color: css.muted, fontSize: 14 }}>
            No testimonials found.
          </div>
        )}
        {filtered.map(t => (
          <div key={t.id} style={{ background: css.surface, border: `1px solid ${css.border}`, borderRadius: 20, padding: '24px 28px', boxShadow: css.shadow, transition: 'box-shadow 0.2s' }}
            onMouseEnter={e => (e.currentTarget as HTMLElement).style.boxShadow = css.hoverShadow}
            onMouseLeave={e => (e.currentTarget as HTMLElement).style.boxShadow = css.shadow}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 12, marginBottom: 14 }}>
              <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
                <div style={{ width: 44, height: 44, borderRadius: '50%', background: `linear-gradient(135deg, #6366f1, #8b5cf6)`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 800, fontSize: 16, flexShrink: 0 }}>
                  {t.name.charAt(0)}
                </div>
                <div>
                  <p style={{ fontSize: 15, fontWeight: 700, color: css.text, margin: 0 }}>{t.name}</p>
                  <p style={{ fontSize: 12, color: css.muted, margin: '2px 0 0', fontWeight: 500 }}>{t.role} · {t.company}</p>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontSize: 10, fontWeight: 700, background: t.status === 'Approved' ? 'rgba(16,185,129,0.1)' : 'rgba(245,158,11,0.1)', color: t.status === 'Approved' ? '#10b981' : '#f59e0b', border: `1px solid ${t.status === 'Approved' ? 'rgba(16,185,129,0.25)' : 'rgba(245,158,11,0.25)'}`, padding: '3px 10px', borderRadius: 999, textTransform: 'uppercase', letterSpacing: '0.07em', display: 'flex', alignItems: 'center', gap: 5 }}>
                  <span style={{ width: 5, height: 5, borderRadius: '50%', background: t.status === 'Approved' ? '#10b981' : '#f59e0b' }} />{t.status}
                </span>
                <button onClick={() => toggleStatus(t.id)} title={t.status === 'Approved' ? 'Revoke' : 'Approve'} style={{ background: 'none', border: `1px solid ${css.border}`, borderRadius: 9, padding: 7, cursor: 'pointer', color: t.status === 'Approved' ? '#ef4444' : '#10b981', display: 'flex', alignItems: 'center', transition: 'all 0.15s' }}>
                  {t.status === 'Approved' ? <XCircle size={14} /> : <CheckCircle size={14} />}
                </button>
                <button onClick={() => handleDelete(t.id)} style={{ background: 'none', border: `1px solid ${css.border}`, borderRadius: 9, padding: 7, cursor: 'pointer', color: css.muted, display: 'flex', alignItems: 'center', transition: 'all 0.15s' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = '#ef4444'; (e.currentTarget as HTMLElement).style.background = 'rgba(239,68,68,0.06)'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = css.muted; (e.currentTarget as HTMLElement).style.background = 'none'; }}
                ><Trash2 size={14} /></button>
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
              <Clock size={11} /> {t.date}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
