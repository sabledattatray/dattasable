'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Plus, Search, Edit2, Trash2, ExternalLink,
  ChevronLeft, ChevronRight, X, Image as ImageIcon,
  Save, Eye
} from 'lucide-react';

const initialProjects = [
  { id: 1, title: 'Sales Performance Dashboard', category: 'Dashboard', tool: 'Tableau', client: 'RetailMax', status: 'Published', views: '1.2K' },
  { id: 2, title: 'Supply Chain Analytics', category: 'Analysis', tool: 'Power BI', client: 'Global Manuf.', status: 'Published', views: '840' },
  { id: 3, title: 'HR Workforce Intelligence', category: 'Report', tool: 'Tableau', client: 'HR Tech', status: 'Draft', views: '0' },
  { id: 4, title: 'Financial KPI Automation', category: 'Automation', tool: 'Excel', client: 'Fintech', status: 'Published', views: '560' },
  { id: 5, title: 'E-Commerce Suite', category: 'Dashboard', tool: 'Tableau', client: 'D2C Brand', status: 'Published', views: '920' },
];

export default function ProjectsManager() {
  const [projects, setProjects] = useState(initialProjects);
  const [editing, setEditing] = useState<any>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [formData, setFormData] = useState({ title: '', category: 'Dashboard', tool: 'Tableau', client: '', status: 'Published' });

  const handleOpenEdit = (p: any) => {
    setEditing(p);
    setFormData({ title: p.title, category: p.category, tool: p.tool, client: p.client, status: p.status });
  };

  const handleOpenAdd = () => {
    setEditing(null);
    setFormData({ title: '', category: 'Dashboard', tool: 'Tableau', client: '', status: 'Published' });
    setIsAddModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editing) {
      setProjects(projects.map(p => p.id === editing.id ? { ...p, ...formData } : p));
    } else {
      const newProj = {
        id: projects.length + 1,
        ...formData,
        views: '0'
      };
      setProjects([newProj, ...projects]);
    }
    setEditing(null);
    setIsAddModalOpen(false);
  };

  const handleDelete = (id: number) => {
    if (confirm('Delete this project?')) {
      setProjects(projects.filter(p => p.id !== id));
    }
  };

  const filtered = projects.filter(p => p.title.toLowerCase().includes(search.toLowerCase()) || p.client.toLowerCase().includes(search.toLowerCase()));

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Action Bar */}
      <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', padding: '1.25rem', borderRadius: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 4px 20px rgba(0,0,0,0.02)' }}>
        <div style={{ position: 'relative', width: 320 }}>
          <Search size={16} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
          <input
            type="text"
            placeholder="Search projects..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{
              width: '100%', padding: '0.6rem 1rem 0.6rem 2.75rem',
              background: '#f8fafc', border: '1px solid #e2e8f0',
              borderRadius: '10px', color: '#0f172a', fontSize: '0.875rem',
              outline: 'none'
            }}
          />
        </div>
        <button onClick={handleOpenAdd} style={{ background: '#000', color: '#fff', border: 'none', padding: '0.6rem 1.25rem', borderRadius: '10px', fontWeight: 700, fontSize: '0.875rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Plus size={18} /> Add New Project
        </button>
      </div>

      {/* Projects Table */}
      <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '24px', overflow: 'hidden', boxShadow: '0 4px 24px rgba(0,0,0,0.02)' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid #f1f5f9', background: '#f8fafc' }}>
              <th style={{ padding: '1.25rem', fontSize: '11px', fontWeight: 800, color: '#64748b', textTransform: 'uppercase' }}>Project</th>
              <th style={{ padding: '1.25rem', fontSize: '11px', fontWeight: 800, color: '#64748b', textTransform: 'uppercase' }}>Client</th>
              <th style={{ padding: '1.25rem', fontSize: '11px', fontWeight: 800, color: '#64748b', textTransform: 'uppercase' }}>Stack</th>
              <th style={{ padding: '1.25rem', fontSize: '11px', fontWeight: 800, color: '#64748b', textTransform: 'uppercase' }}>Status</th>
              <th style={{ padding: '1.25rem', fontSize: '11px', fontWeight: 800, color: '#64748b', textTransform: 'uppercase' }}>Views</th>
              <th style={{ padding: '1.25rem', fontSize: '11px', fontWeight: 800, color: '#64748b', textTransform: 'uppercase', textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((p) => (
              <tr key={p.id} style={{ borderBottom: '1px solid #f1f5f9' }} className="hover:bg-slate-50 transition-colors">
                <td style={{ padding: '1.25rem' }}>
                  <div style={{ fontWeight: 700, color: '#0f172a', fontSize: '0.9rem' }}>{p.title}</div>
                  <div style={{ fontSize: '0.75rem', color: '#64748b' }}>{p.category}</div>
                </td>
                <td style={{ padding: '1.25rem', fontSize: '0.875rem', color: '#0f172a', fontWeight: 500 }}>{p.client}</td>
                <td style={{ padding: '1.25rem' }}>
                  <span style={{ fontSize: '10px', background: '#f1f5f9', padding: '4px 10px', borderRadius: '6px', color: '#64748b', fontWeight: 700 }}>{p.tool}</span>
                </td>
                <td style={{ padding: '1.25rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ width: 6, height: 6, borderRadius: '50%', background: p.status === 'Published' ? '#22c55e' : '#00C9F2' }} />
                    <span style={{ fontSize: '0.85rem', color: p.status === 'Published' ? '#16a34a' : '#00C9F2', fontWeight: 700 }}>{p.status}</span>
                  </div>
                </td>
                <td style={{ padding: '1.25rem', fontSize: '0.875rem', color: '#94a3b8', fontWeight: 700 }}>{p.views}</td>
                <td style={{ padding: '1.25rem', textAlign: 'right' }}>
                  <div className="flex gap-2 justify-end">
                    <button 
                      onClick={() => handleOpenEdit(p)} 
                      style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', padding: '8px', borderRadius: '8px', transition: 'all 0.2s' }}
                      onMouseEnter={e => (e.currentTarget.style.background = '#f1f5f9', e.currentTarget.style.color = '#0f172a')}
                      onMouseLeave={e => (e.currentTarget.style.background = 'none', e.currentTarget.style.color = '#94a3b8')}
                    >
                      <Edit2 size={16} />
                    </button>
                    <button 
                      style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', padding: '8px', borderRadius: '8px', transition: 'all 0.2s' }}
                      onMouseEnter={e => (e.currentTarget.style.background = '#f1f5f9', e.currentTarget.style.color = '#0f172a')}
                      onMouseLeave={e => (e.currentTarget.style.background = 'none', e.currentTarget.style.color = '#94a3b8')}
                    >
                      <Eye size={16} />
                    </button>
                    <button 
                      onClick={() => handleDelete(p.id)} 
                      style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', padding: '8px', borderRadius: '8px', transition: 'all 0.2s' }}
                      onMouseEnter={e => (e.currentTarget.style.background = '#fef2f2', e.currentTarget.style.color = '#ef4444')}
                      onMouseLeave={e => (e.currentTarget.style.background = 'none', e.currentTarget.style.color = '#94a3b8')}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit/Add Modal */}
      <AnimatePresence>
        {(editing || isAddModalOpen) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ position: 'fixed', inset: 0, background: 'rgba(15, 23, 42, 0.3)', backdropFilter: 'blur(8px)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}
            onClick={() => { setEditing(null); setIsAddModalOpen(false); }}
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              onClick={e => e.stopPropagation()}
              style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: 32, width: '100%', maxWidth: 700, padding: '3rem', boxShadow: '0 20px 60px rgba(0,0,0,0.1)' }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
                <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#0f172a', fontFamily: 'Syne, sans-serif' }}>
                  {editing ? 'Edit Project' : 'Create Project'}
                </h2>
                <button onClick={() => { setEditing(null); setIsAddModalOpen(false); }} style={{ background: '#f1f5f9', border: 'none', borderRadius: '50%', width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#64748b' }}>
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '11px', fontWeight: 800, color: '#64748b', textTransform: 'uppercase', marginBottom: '10px' }}>Project Title</label>
                    <input type="text" required value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} style={{ width: '100%', padding: '0.8rem 1rem', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 12, color: '#0f172a', fontWeight: 500 }} />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '11px', fontWeight: 800, color: '#64748b', textTransform: 'uppercase', marginBottom: '10px' }}>Category</label>
                    <select value={formData.category} onChange={e => setFormData({ ...formData, category: e.target.value })} style={{ width: '100%', padding: '0.8rem 1rem', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 12, color: '#0f172a', fontWeight: 600 }}>
                      <option>Dashboard</option>
                      <option>Analysis</option>
                      <option>Report</option>
                      <option>Automation</option>
                    </select>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '11px', fontWeight: 800, color: '#64748b', textTransform: 'uppercase', marginBottom: '10px' }}>Client Name</label>
                    <input type="text" required value={formData.client} onChange={e => setFormData({ ...formData, client: e.target.value })} style={{ width: '100%', padding: '0.8rem 1rem', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 12, color: '#0f172a', fontWeight: 500 }} />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '11px', fontWeight: 800, color: '#64748b', textTransform: 'uppercase', marginBottom: '10px' }}>Primary Tool</label>
                    <select value={formData.tool} onChange={e => setFormData({ ...formData, tool: e.target.value })} style={{ width: '100%', padding: '0.8rem 1rem', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 12, color: '#0f172a', fontWeight: 600 }}>
                      <option>Tableau</option>
                      <option>Power BI</option>
                      <option>Excel</option>
                      <option>Python</option>
                      <option>Looker</option>
                    </select>
                  </div>
                </div>

                <div className="flex gap-4 justify-end pt-6" style={{ borderTop: '1px solid #f1f5f9' }}>
                  <button type="button" onClick={() => { setEditing(null); setIsAddModalOpen(false); }} style={{ flex: 1, padding: '0.85rem', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', color: '#0f172a', fontWeight: 700, cursor: 'pointer' }}>Discard</button>
                  <button type="submit" style={{ flex: 1, padding: '0.85rem', background: '#000', color: '#fff', fontWeight: 800, border: 'none', borderRadius: '12px', cursor: 'pointer' }}>
                    {editing ? 'Update Project' : 'Publish Project'}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

