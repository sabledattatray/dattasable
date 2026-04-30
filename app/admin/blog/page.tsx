'use client';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FileText, Plus, Search, Filter, Edit2, Trash2, Eye, 
  ChevronLeft, Bold, Italic, Link as LinkIcon, 
  Heading1, Heading2, List, Image as ImageIcon, Code, Save, Settings,
  AlignLeft, AlignCenter, AlignRight, AlignJustify, Type, Highlighter, Underline
} from 'lucide-react';

import { posts as mainPosts } from '@/app/blog/data';
import Link from 'next/link';

const initialPosts = mainPosts.map((p, idx) => ({
  id: idx + 1,
  title: p.title,
  slug: p.slug,
  category: p.category,
  status: 'Published',
  date: p.date,
  views: Math.floor(Math.random() * 2000).toString(),
  excerpt: p.excerpt,
  content: p.content,
  image: p.image
}));

export default function AdminBlog() {
  const [posts, setPosts] = useState<any[]>([]);
  const [categories, setCategories] = useState(['Tech Trends', 'Tutorials', 'Technical', 'BI Tools', 'SQL']);
  const [newCat, setNewCat] = useState('');
  const [search, setSearch] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editingPost, setEditingPost] = useState<any>(null);
  const [activeTab, setActiveTab] = useState('document');
  const [formData, setFormData] = useState({
    title: '', slug: '', category: 'Tech Trends', status: 'Draft', 
    excerpt: '', content: '', metaTitle: '', metaDesc: '', image: '', date: ''
  });

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [showTextColorPicker, setShowTextColorPicker] = useState(false);
  const [showHighlightPicker, setShowHighlightPicker] = useState(false);

  const editorRef = useRef<HTMLDivElement>(null);

  // Load posts on mount
  useEffect(() => {
    const saved = localStorage.getItem('admin_posts');
    if (saved) {
      setPosts(JSON.parse(saved));
    } else {
      setPosts(initialPosts);
    }
  }, []);

  // Sync contentEditable with formData
  useEffect(() => {
    if (isEditing && editorRef.current && editorRef.current.innerHTML !== formData.content) {
      editorRef.current.innerHTML = formData.content;
    }
  }, [isEditing]);

  const handleEditorChange = () => {
    if (editorRef.current) {
      setFormData({ ...formData, content: editorRef.current.innerHTML });
    }
  };

  const execCommand = (command: string, value: string = '') => {
    document.execCommand(command, false, value);
    handleEditorChange();
  };

  // Save helper
  const saveToDisk = (updatedPosts: any[]) => {
    setPosts(updatedPosts);
    localStorage.setItem('admin_posts', JSON.stringify(updatedPosts));
  };

  const filtered = posts.filter(p => p.title.toLowerCase().includes(search.toLowerCase()));

  const handleAddCategory = () => {
    if (newCat && !categories.includes(newCat)) {
      setCategories([...categories, newCat]);
      setNewCat('');
    }
  };

  const handleOpenEditor = (post: any = null) => {
    if (post) {
      setEditingPost(post);
      setFormData({
        title: post.title,
        slug: post.slug || post.title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, ''),
        category: post.category,
        status: post.status,
        excerpt: post.excerpt || '',
        content: post.content || '',
        metaTitle: post.title,
        metaDesc: post.excerpt || '',
        image: post.image || '',
        date: post.date
      });
    } else {
      setEditingPost(null);
      setFormData({
        title: '', slug: '', category: 'Tech Trends', status: 'Draft',
        excerpt: '', content: '', metaTitle: '', metaDesc: '', image: '',
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
      });
    }
    setIsEditing(true);
  };

  const handleSave = () => {
    let updated;
    if (editingPost) {
      updated = posts.map(p => p.id === editingPost.id ? { ...p, ...formData, status: 'Published' } : p);
    } else {
      const newPost = { id: Date.now(), ...formData, status: 'Published', views: '0' };
      updated = [newPost, ...posts];
    }
    saveToDisk(updated);
    setIsEditing(false);
  };

  const handleDeleteClick = (id: number) => {
    setDeleteId(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    if (deleteId) {
      const updated = posts.filter(p => p.id !== deleteId);
      saveToDisk(updated);
      setShowDeleteModal(false);
      setDeleteId(null);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, image: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerUpload = () => {
    document.getElementById('featured-image-input')?.click();
  };

  if (!isEditing) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        {/* Custom Delete Modal */}
        <AnimatePresence>
          {showDeleteModal && (
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              style={{ position: 'fixed', inset: 0, background: 'rgba(15, 23, 42, 0.4)', backdropFilter: 'blur(8px)', zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}
            >
              <motion.div 
                initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
                style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '24px', padding: '2.5rem', maxWidth: '400px', textAlign: 'center', boxShadow: '0 20px 50px rgba(0,0,0,0.1)' }}
              >
                <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'rgba(201, 243, 29, 0.05)', color: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
                  <Trash2 size={30} />
                </div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#0f172a', marginBottom: '0.75rem' }}>Delete Story?</h3>
                <p style={{ color: '#64748b', fontSize: '14px', lineHeight: 1.6, marginBottom: '2rem' }}>This action is permanent and cannot be undone. The story will be removed from your public blog.</p>
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <button onClick={() => setShowDeleteModal(false)} style={{ flex: 1, padding: '0.8rem', borderRadius: '12px', background: '#f8fafc', border: '1px solid #e2e8f0', color: '#0f172a', fontWeight: 600, cursor: 'pointer' }}>Cancel</button>
                  <button onClick={confirmDelete} style={{ flex: 1, padding: '0.8rem', borderRadius: '12px', background: 'var(--accent)', border: 'none', color: '#000', fontWeight: 600, cursor: 'pointer' }}>Delete</button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ position: 'relative', width: '300px' }}>
            <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
            <input 
              type="text" 
              placeholder="Search articles..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ 
                width: '100%', padding: '0.75rem 1rem 0.75rem 2.5rem', 
                background: '#ffffff', border: '1px solid #e2e8f0', 
                borderRadius: '12px', color: '#0f172a', fontSize: '14px', outline: 'none'
              }} 
            />
          </div>
          <Link href="/admin/editor" style={{ background: '#000', color: '#fff', fontWeight: 600, padding: '0.75rem 1.5rem', borderRadius: '12px', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Plus size={18} /> Write New Story
          </Link>
        </div>

        <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '24px', overflow: 'hidden', boxShadow: '0 4px 20px rgba(0,0,0,0.03)' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #f1f5f9', background: '#f8fafc' }}>
                <th style={{ padding: '1.25rem 1.5rem', fontSize: '13px', fontWeight: 600, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Story</th>
                <th style={{ padding: '1.25rem 1.5rem', fontSize: '13px', fontWeight: 600, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Category</th>
                <th style={{ padding: '1.25rem 1.5rem', fontSize: '13px', fontWeight: 600, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Visibility</th>
                <th style={{ padding: '1.25rem 1.5rem', fontSize: '13px', fontWeight: 600, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Reach</th>
                <th style={{ padding: '1.25rem 1.5rem', fontSize: '13px', fontWeight: 600, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((post) => (
                <tr key={post.id} style={{ borderBottom: '1px solid #f1f5f9', transition: 'background 0.2s' }} onMouseEnter={e => e.currentTarget.style.background = '#fcfdfe'} onMouseLeave={e => e.currentTarget.style.background = 'none'}>
                  <td style={{ padding: '1.5rem' }}>
                    <div style={{ fontSize: '0.95rem', fontWeight: 600, color: '#0f172a' }}>{post.title}</div>
                    <div style={{ fontSize: '13px', color: '#64748b', marginTop: '4px' }}>{post.date} &bull; /blog/{post.slug}</div>
                  </td>
                  <td style={{ padding: '1.5rem' }}>
                    <span style={{ fontSize: '13px', fontWeight: 600, background: '#f0fdf4', padding: '4px 12px', borderRadius: '6px', color: '#16a34a', textTransform: 'uppercase' }}>{post.category}</span>
                  </td>
                  <td style={{ padding: '1.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <div style={{ width: 8, height: 8, borderRadius: '50%', background: post.status === 'Published' ? '#22c55e' : '#00C9F2' }} />
                      <span style={{ fontSize: '14px', color: post.status === 'Published' ? '#16a34a' : '#00C9F2', fontWeight: 600 }}>{post.status}</span>
                    </div>
                  </td>
                  <td style={{ padding: '1.5rem', color: '#0f172a', fontWeight: 600 }}>{post.views}</td>
                  <td style={{ padding: '1.5rem' }}>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <Link 
                        href={`/admin/editor?id=${post.id}`}
                        style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', padding: '8px', borderRadius: '8px', transition: 'all 0.2s', display: 'flex', textDecoration: 'none' }}
                        onMouseEnter={(e) => (e.currentTarget.style.background = '#f1f5f9', e.currentTarget.style.color = '#0f172a')}
                        onMouseLeave={(e) => (e.currentTarget.style.background = 'none', e.currentTarget.style.color = '#94a3b8')}
                      >
                        <Edit2 size={18} />
                      </Link>
                      <button 
                        onClick={() => handleDeleteClick(post.id)} 
                        style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', padding: '8px', borderRadius: '8px', transition: 'all 0.2s' }}
                        onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(201, 243, 29, 0.05)', e.currentTarget.style.color = 'var(--accent)')}
                        onMouseLeave={(e) => (e.currentTarget.style.background = 'none', e.currentTarget.style.color = '#94a3b8')}
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      style={{ 
        position: 'fixed', inset: 0, background: '#ffffff', 
        display: 'flex', flexDirection: 'column', color: '#0f172a', zIndex: 1000
      }}
    >
      {/* WordPress Top Bar */}
      <header style={{ 
        height: '56px', background: '#ffffff', borderBottom: '1px solid #e2e8f0', 
        display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 1rem' 
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <button 
            onClick={() => setIsEditing(false)}
            style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer', padding: '8px' }}
          >
            <ChevronLeft size={20} />
          </button>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button style={{ background: '#f1f5f9', border: 'none', color: '#0f172a', padding: '6px', borderRadius: '4px' }}><Plus size={20} /></button>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <span style={{ fontSize: '14px', color: '#94a3b8' }}>Draft Saved</span>
          <button style={{ background: 'none', border: 'none', color: '#0f172a', fontSize: '14px', fontWeight: 600, cursor: 'pointer' }}>Preview</button>
          <button 
            onClick={handleSave}
            style={{ background: '#000', border: 'none', color: '#fff', padding: '6px 16px', borderRadius: '6px', fontSize: '14px', fontWeight: 600, cursor: 'pointer' }}
          >
            Publish
          </button>
          <button style={{ background: 'none', border: 'none', color: '#64748b', padding: '8px' }}><Settings size={20} /></button>
        </div>
      </header>

      {/* Editor Main Area */}
      <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
        <div style={{ flex: 1, overflowY: 'auto', background: '#ffffff', display: 'flex', justifyContent: 'center', padding: '80px 40px' }}>
          <div style={{ 
            width: '100%', maxWidth: '800px',
            display: 'flex', flexDirection: 'column', gap: '1rem'
          }}>
            {/* CONTINUOUS FLOW EDITOR */}
            <textarea 
              placeholder="Title" 
              value={formData.title}
              onChange={e => setFormData({ ...formData, title: e.target.value })}
              style={{ 
                width: '100%', fontSize: '3.8rem', fontWeight: 600, background: 'none', border: 'none', 
                color: '#0f172a', outline: 'none', resize: 'none',
                height: 'auto', padding: '0', lineHeight: 1, letterSpacing: '-0.04em', marginBottom: '2rem'
              }}
            />
            
            <div style={{ 
              position: 'sticky', top: '0', zIndex: 10, background: 'rgba(255,255,255,0.9)', 
              backdropFilter: 'blur(10px)', padding: '12px 0', borderBottom: '1px solid #f1f5f9',
              display: 'flex', flexWrap: 'wrap', gap: '0.75rem', width: '100%', marginBottom: '2rem'
            }}>
              {/* Typography */}
              <div style={{ display: 'flex', gap: '4px', borderRight: '1px solid #e2e8f0', paddingRight: '0.75rem' }}>
                <button onClick={() => execCommand('formatBlock', '<h1>')} style={{ background: '#f8fafc', border: '1px solid #e2e8f0', color: '#0f172a', cursor: 'pointer', padding: '4px 8px', fontSize: '14px', fontWeight: 600, borderRadius: '4px' }}>H1</button>
                <button onClick={() => execCommand('formatBlock', '<h2>')} style={{ background: '#f8fafc', border: '1px solid #e2e8f0', color: '#0f172a', cursor: 'pointer', padding: '4px 8px', fontSize: '14px', fontWeight: 600, borderRadius: '4px' }}>H2</button>
                <button onClick={() => execCommand('formatBlock', '<h3>')} style={{ background: '#f8fafc', border: '1px solid #e2e8f0', color: '#0f172a', cursor: 'pointer', padding: '4px 8px', fontSize: '14px', fontWeight: 600, borderRadius: '4px' }}>H3</button>
              </div>

              {/* Formatting */}
              <div style={{ display: 'flex', gap: '4px', borderRight: '1px solid #e2e8f0', paddingRight: '0.75rem' }}>
                <button onClick={() => execCommand('bold')} style={{ background: 'none', border: 'none', color: '#475569', cursor: 'pointer', padding: '6px' }}><Bold size={18} /></button>
                <button onClick={() => execCommand('italic')} style={{ background: 'none', border: 'none', color: '#475569', cursor: 'pointer', padding: '6px' }}><Italic size={18} /></button>
                <button onClick={() => execCommand('underline')} style={{ background: 'none', border: 'none', color: '#475569', cursor: 'pointer', padding: '6px' }}><Underline size={18} /></button>
              </div>

              {/* Alignment */}
              <div style={{ display: 'flex', gap: '4px', borderRight: '1px solid #e2e8f0', paddingRight: '0.75rem' }}>
                <button onClick={() => execCommand('justifyLeft')} style={{ background: 'none', border: 'none', color: '#475569', cursor: 'pointer', padding: '6px' }}><AlignLeft size={18} /></button>
                <button onClick={() => execCommand('justifyCenter')} style={{ background: 'none', border: 'none', color: '#475569', cursor: 'pointer', padding: '6px' }}><AlignCenter size={18} /></button>
                <button onClick={() => execCommand('justifyRight')} style={{ background: 'none', border: 'none', color: '#475569', cursor: 'pointer', padding: '6px' }}><AlignRight size={18} /></button>
              </div>

              {/* Colors */}
              <div style={{ display: 'flex', gap: '8px', position: 'relative' }}>
                <button onClick={() => setShowTextColorPicker(!showTextColorPicker)} style={{ background: 'none', border: 'none', color: '#475569', cursor: 'pointer', padding: '6px' }}><Type size={18} /></button>
                {showTextColorPicker && (
                  <div style={{ position: 'absolute', top: '100%', left: 0, background: '#ffffff', border: '1px solid #e2e8f0', padding: '8px', borderRadius: '12px', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '6px', zIndex: 100, boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}>
                    {['#000000', '#22c55e', '#c9f31d', '#3b82f6', '#10b981', '#f59e0b', '#00C9F2', '#ec4899'].map(c => (
                      <div key={c} onClick={() => { execCommand('foreColor', c); setShowTextColorPicker(false); }} style={{ width: '20px', height: '20px', background: c, borderRadius: '6px', cursor: 'pointer', border: '1px solid #f1f5f9' }} />
                    ))}
                  </div>
                )}
                <button onClick={() => setShowHighlightPicker(!showHighlightPicker)} style={{ background: 'none', border: 'none', color: '#475569', cursor: 'pointer', padding: '6px' }}><Highlighter size={18} /></button>
                {showHighlightPicker && (
                  <div style={{ position: 'absolute', top: '100%', left: 0, background: '#ffffff', border: '1px solid #e2e8f0', padding: '8px', borderRadius: '12px', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '6px', zIndex: 100, boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}>
                    {['transparent', '#fef08a', '#fecaca', '#bfdbfe', '#bbf7d0', '#ffedd5', '#ddd6fe', '#fbcfe8'].map(c => (
                      <div key={c} onClick={() => { execCommand('hiliteColor', c); setShowHighlightPicker(false); }} style={{ width: '20px', height: '20px', background: c, borderRadius: '6px', cursor: 'pointer', border: '1px solid #f1f5f9' }} />
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div 
              ref={editorRef}
              contentEditable
              onInput={handleEditorChange}
              style={{ 
                width: '100%', fontSize: '1.2rem', lineHeight: 1.8, background: 'none', border: 'none', 
                color: '#334155', outline: 'none', minHeight: '800px',
                fontFamily: 'Inter, sans-serif', padding: '0'
              }}
            />
          </div>
        </div>

        {/* SUPERIOR SIDEBAR */}
        <aside style={{ width: '340px', background: '#f8fafc', borderLeft: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column' }}>
          <div style={{ padding: '1.5rem', borderBottom: '1px solid #e2e8f0' }}>
            <h3 style={{ fontSize: '12px', fontWeight: 600, color: '#0f172a', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1.5rem' }}>Post Settings</h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {/* Category Dropdown */}
              <div>
                <label style={{ display: 'block', fontSize: '13px', color: '#64748b', fontWeight: 600, marginBottom: '8px', textTransform: 'uppercase' }}>Category</label>
                <select 
                  value={formData.category}
                  onChange={e => setFormData({ ...formData, category: e.target.value })}
                  style={{ width: '100%', background: '#ffffff', border: '1px solid #e2e8f0', color: '#0f172a', padding: '10px', borderRadius: '8px', outline: 'none', cursor: 'pointer', fontSize: '12px', fontWeight: 600 }}
                >
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
                <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
                  <input 
                    type="text" value={newCat} onChange={e => setNewCat(e.target.value)}
                    placeholder="New cat..."
                    style={{ flex: 1, background: 'none', border: 'none', borderBottom: '1px solid #cbd5e1', color: '#0f172a', fontSize: '14px', outline: 'none' }}
                  />
                  <button onClick={handleAddCategory} style={{ background: '#0f172a', border: 'none', borderRadius: '6px', padding: '4px 12px', fontSize: '13px', fontWeight: 600, cursor: 'pointer', color: '#fff' }}>ADD</button>
                </div>
              </div>

              {/* URL Slug */}
              <div>
                <label style={{ display: 'block', fontSize: '13px', color: '#64748b', fontWeight: 600, marginBottom: '8px', textTransform: 'uppercase' }}>URL Slug</label>
                <input 
                  type="text" value={formData.slug}
                  onChange={e => setFormData({ ...formData, slug: e.target.value })}
                  style={{ width: '100%', background: '#ffffff', border: '1px solid #e2e8f0', color: '#0f172a', padding: '10px', borderRadius: '8px', outline: 'none', fontSize: '12px' }}
                />
              </div>

              {/* Featured Image */}
              <div>
                <label style={{ display: 'block', fontSize: '13px', color: '#64748b', fontWeight: 600, marginBottom: '8px', textTransform: 'uppercase' }}>Featured Image</label>
                <div 
                  onClick={triggerUpload}
                  style={{ width: '100%', height: '140px', background: '#ffffff', border: '1px dashed #cbd5e1', borderRadius: '12px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', overflow: 'hidden' }}
                >
                  {formData.image ? (
                    <img src={formData.image} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="Featured" />
                  ) : (
                    <div style={{ textAlign: 'center' }}>
                      <ImageIcon size={24} style={{ color: '#cbd5e1', marginBottom: '8px' }} />
                      <div style={{ fontSize: '13px', color: '#94a3b8' }}>Set featured image</div>
                    </div>
                  )}
                </div>
                <input id="featured-image-input" type="file" hidden accept="image/*" onChange={handleImageUpload} />
                {formData.image && <button onClick={() => setFormData({...formData, image: ''})} style={{ marginTop: '8px', background: 'none', border: 'none', color: 'var(--accent)', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}>Remove image</button>}
              </div>

              {/* Excerpt */}
              <div>
                <label style={{ display: 'block', fontSize: '13px', color: '#64748b', fontWeight: 600, marginBottom: '8px', textTransform: 'uppercase' }}>Excerpt</label>
                <textarea 
                  value={formData.excerpt}
                  onChange={e => setFormData({ ...formData, excerpt: e.target.value })}
                  style={{ width: '100%', background: '#ffffff', border: '1px solid #e2e8f0', color: '#0f172a', padding: '10px', borderRadius: '8px', outline: 'none', fontSize: '12px', resize: 'none', height: '100px', lineHeight: 1.6 }}
                />
              </div>
            </div>
          </div>
        </aside>
      </div>
    </motion.div>
  );
}
