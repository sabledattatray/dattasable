'use client';
import { motion } from 'framer-motion';
import { Users, Star, MessageSquare, CheckCircle, XCircle, Search } from 'lucide-react';

const testimonials = [
  { id: 1, name: 'Sarah Johnson', role: 'Product Manager', company: 'TechCorp', content: 'Datta is a master of Tableau. Our reports are now 10x faster.', status: 'Approved', rating: 5 },
  { id: 2, name: 'Mike Ross', role: 'Founder', company: 'Startup.io', content: 'The automation solutions Datta built saved us 20 hours a week.', status: 'Pending', rating: 5 },
];

export default function AdminTestimonials() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontSize: '1.75rem', color: '#0f172a', fontWeight: 600 }}>Client Testimonials</h2>
          <p style={{ fontSize: '14px', color: '#64748b', marginTop: '4px' }}>Review and approve client feedback for your portfolio</p>
        </div>
        <div style={{ position: 'relative', width: '320px' }}>
          <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
          <input type="text" placeholder="Search feedback..." style={{ width: '100%', padding: '0.8rem 1rem 0.8rem 2.75rem', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '14px', color: '#0f172a', fontSize: '14px', fontWeight: 500 }} />
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))', gap: '2rem' }}>
        {testimonials.map((t) => (
          <div key={t.id} style={{ 
            background: '#ffffff', 
            border: '1px solid #e2e8f0', 
            borderRadius: '28px',
            padding: '2.25rem',
            boxShadow: '0 10px 30px rgba(0,0,0,0.02)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.75rem' }}>
              <div style={{ display: 'flex', gap: '4px' }}>
                {[...Array(t.rating)].map((_, i) => <Star key={i} size={16} fill="#fbbf24" color="#fbbf24" />)}
              </div>
              <div style={{ fontSize: '13px', background: t.status === 'Approved' ? '#f0fdf4' : '#f5f3ff', color: t.status === 'Approved' ? '#16a34a' : '#00C9F2', padding: '5px 12px', borderRadius: '8px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                {t.status}
              </div>
            </div>
            <p style={{ color: '#334155', fontSize: '1.05rem', lineHeight: 1.7, marginBottom: '2rem', fontStyle: 'italic', fontWeight: 500 }}>
              "{t.content}"
            </p>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '1.5rem', borderTop: '1px solid #f1f5f9' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: 40, height: 40, borderRadius: '50%', background: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0f172a', fontWeight: 600, fontSize: '14px' }}>
                  {t.name.charAt(0)}
                </div>
                <div>
                  <div style={{ fontSize: '1rem', fontWeight: 600, color: '#0f172a' }}>{t.name}</div>
                  <div style={{ fontSize: '14px', color: '#64748b', fontWeight: 500 }}>{t.role} @ {t.company}</div>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button style={{ width: 36, height: 36, borderRadius: '10px', background: '#f0fdf4', border: '1px solid #bbf7d0', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#16a34a', cursor: 'pointer', transition: 'transform 0.2s' }} onMouseDown={e => e.currentTarget.style.transform = 'scale(0.9)'} onMouseUp={e => e.currentTarget.style.transform = 'scale(1)'}><CheckCircle size={18} /></button>
                <button style={{ width: 36, height: 36, borderRadius: '10px', background: 'rgba(201, 243, 29, 0.05)', border: '1px solid rgba(201, 243, 29, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent)', cursor: 'pointer', transition: 'transform 0.2s' }} onMouseDown={e => e.currentTarget.style.transform = 'scale(0.9)'} onMouseUp={e => e.currentTarget.style.transform = 'scale(1)'}><XCircle size={18} /></button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
