'use client';
import { motion } from 'framer-motion';
import { Briefcase, Plus, Edit2, Trash2, CheckCircle, Clock } from 'lucide-react';

const services = [
  { id: 1, title: 'Dashboard Development', price: '₹15,000', status: 'Active', orders: 12 },
  { id: 2, title: 'Data Analytics Consulting', price: '₹25,000', status: 'Active', orders: 8 },
  { id: 3, title: 'Automation Solutions', price: '₹20,000', status: 'Active', orders: 5 },
];

export default function AdminServices() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontSize: '1.75rem', color: '#0f172a', fontWeight: 600 }}>Service Catalog</h2>
          <p style={{ fontSize: '14px', color: '#64748b', marginTop: '4px' }}>Manage your professional offerings and pricing</p>
        </div>
        <button style={{ background: '#000', color: '#fff', fontWeight: 600, fontSize: '14px', border: 'none', padding: '0.75rem 1.5rem', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
          <Plus size={18} /> Add Service
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
        {services.map((s) => (
          <div key={s.id} style={{ 
            background: '#ffffff', 
            border: '1px solid #e2e8f0', 
            borderRadius: '28px',
            padding: '2.25rem',
            boxShadow: '0 10px 30px rgba(0,0,0,0.02)',
            transition: 'transform 0.3s ease',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.75rem' }}>
              <div style={{ width: 48, height: 48, borderRadius: '14px', background: '#f8fafc', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0f172a' }}>
                <Briefcase size={22} />
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button style={{ background: '#f1f5f9', border: 'none', color: '#64748b', cursor: 'pointer', padding: '8px', borderRadius: '8px' }}><Edit2 size={16} /></button>
                <button style={{ background: 'rgba(201, 243, 29, 0.05)', border: 'none', color: 'var(--accent)', cursor: 'pointer', padding: '8px', borderRadius: '8px' }}><Trash2 size={16} /></button>
              </div>
            </div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#0f172a', marginBottom: '8px' }}>{s.title}</h3>
            <div style={{ fontSize: '1.5rem', fontWeight: 600, color: '#000', marginBottom: '1.75rem' }}>{s.price}</div>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '1.5rem', borderTop: '1px solid #f1f5f9' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#22c55e' }} />
                <span style={{ fontSize: '14px', color: '#16a34a', fontWeight: 600 }}>{s.status}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#94a3b8' }}>
                <Clock size={14} />
                <span style={{ fontSize: '14px', fontWeight: 600 }}>{s.orders} deployments</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
