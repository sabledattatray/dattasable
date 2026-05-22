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
    <div className="flex flex-col gap-6">
      {/* Action Bar */}
      <div className="bg-white border border-slate-200 p-5 rounded-3xl flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between shadow-sm">
        <div className="relative w-full sm:w-80">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search projects..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 pl-10 pr-4 text-sm text-slate-900 outline-none focus:border-blue-500 transition-colors placeholder-slate-400 font-medium"
          />
        </div>
        <button onClick={handleOpenAdd} className="bg-slate-950 hover:bg-slate-850 text-white border-none py-2.5 px-4 rounded-xl font-semibold text-sm cursor-pointer flex items-center justify-center gap-2 shadow-sm transition-colors w-full sm:w-auto">
          <Plus size={18} /> Add New Project
        </button>
      </div>

      {/* Projects Table */}
      <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto w-full">
          <table className="w-full min-w-[850px] border-collapse text-left">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Project</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Client</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Stack</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Views</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((p) => (
                <tr key={p.id} className="border-b border-slate-100 hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-semibold text-slate-900 text-sm">{p.title}</div>
                    <div className="text-xs text-slate-400 font-medium mt-1">{p.category}</div>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-650 font-semibold">{p.client}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider ${
                      p.tool === 'Tableau' ? 'bg-blue-50 text-blue-700 border border-blue-100' :
                      p.tool === 'Power BI' ? 'bg-amber-50 text-amber-700 border border-amber-100' :
                      p.tool === 'Excel' ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' :
                      p.tool === 'Python' ? 'bg-indigo-50 text-indigo-700 border border-indigo-100' :
                      p.tool === 'Looker' ? 'bg-purple-50 text-purple-700 border border-purple-100' :
                      'bg-slate-50 text-slate-700 border border-slate-100'
                    }`}>
                      {p.tool}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      p.status === 'Published' 
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' 
                        : 'bg-blue-50 text-blue-700 border border-blue-100'
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${p.status === 'Published' ? 'bg-emerald-500' : 'bg-blue-500'}`} />
                      {p.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm font-semibold text-slate-400">{p.views}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex gap-1.5 justify-end">
                      <button 
                        onClick={() => handleOpenEdit(p)} 
                        className="p-2 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-all border-none bg-none cursor-pointer"
                        title="Edit"
                      >
                        <Edit2 size={15} />
                      </button>
                      <button 
                        className="p-2 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-all border-none bg-none cursor-pointer"
                        title="View"
                      >
                        <Eye size={15} />
                      </button>
                      <button 
                        onClick={() => handleDelete(p.id)} 
                        className="p-2 text-slate-400 hover:text-red-650 hover:bg-red-50 rounded-lg transition-all border-none bg-none cursor-pointer"
                        title="Delete"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
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
                <h2 style={{ fontSize: '1.75rem', fontWeight: 600, color: '#0f172a' }}>
                  {editing ? 'Edit Project' : 'Create Project'}
                </h2>
                <button onClick={() => { setEditing(null); setIsAddModalOpen(false); }} style={{ background: '#f1f5f9', border: 'none', borderRadius: '50%', width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#64748b' }}>
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: '#64748b', textTransform: 'uppercase', marginBottom: '10px' }}>Project Title</label>
                    <input type="text" required value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} style={{ width: '100%', padding: '0.8rem 1rem', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 12, color: '#0f172a', fontWeight: 500 }} />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: '#64748b', textTransform: 'uppercase', marginBottom: '10px' }}>Category</label>
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
                    <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: '#64748b', textTransform: 'uppercase', marginBottom: '10px' }}>Client Name</label>
                    <input type="text" required value={formData.client} onChange={e => setFormData({ ...formData, client: e.target.value })} style={{ width: '100%', padding: '0.8rem 1rem', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 12, color: '#0f172a', fontWeight: 500 }} />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: '#64748b', textTransform: 'uppercase', marginBottom: '10px' }}>Primary Tool</label>
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
                  <button type="button" onClick={() => { setEditing(null); setIsAddModalOpen(false); }} style={{ flex: 1, padding: '0.85rem', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', color: '#0f172a', fontWeight: 600, cursor: 'pointer' }}>Discard</button>
                  <button type="submit" style={{ flex: 1, padding: '0.85rem', background: '#000', color: '#fff', fontWeight: 600, border: 'none', borderRadius: '12px', cursor: 'pointer' }}>
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

