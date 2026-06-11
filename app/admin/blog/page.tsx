'use client';
import { useState, useEffect, useRef } from 'react';
import {
  FileText, Plus, Search, Trash2, Edit2,
  ChevronLeft, Bold, Italic, Underline, AlignLeft, AlignCenter, AlignRight,
  Type, Highlighter, Save, Settings, Image as ImageIcon
} from 'lucide-react';
import { posts as mainPosts } from '@/app/blog/data';
import Link from 'next/link';
import Image from 'next/image';
import { useTheme } from '@/components/ThemeProvider';
import ThemeToggle from '@/components/ThemeToggle';
import FullEditor from '@/components/editor/FullEditor';

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
  image: p.image,
}));

export default function AdminBlog() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const [posts, setPosts] = useState<any[]>([]);
  const [categories, setCategories] = useState(['Tech Trends', 'Tutorials', 'Technical', 'BI Tools', 'SQL']);
  const [newCat, setNewCat] = useState('');
  const [search, setSearch] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editingPost, setEditingPost] = useState<any>(null);
  const [formData, setFormData] = useState({
    title: '', slug: '', category: 'Tech Trends', status: 'Draft',
    excerpt: '', content: '', image: '', date: '',
  });
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [showTextColorPicker, setShowTextColorPicker] = useState(false);
  const [showHighlightPicker, setShowHighlightPicker] = useState(false);
  const editorRef = useRef<HTMLDivElement>(null);

  // Theme-aware CSS variables
  const css = isDark
    ? {
        bg: '#0a0f1e',
        surface: '#0f172a',
        surface2: '#1e293b',
        border: '#1e293b',
        text: '#f1f5f9',
        muted: '#64748b',
        accent: '#6366f1',
        inputBg: '#1e293b',
        shadow: '0 4px 24px rgba(0,0,0,0.35)',
        hoverBg: 'rgba(255,255,255,0.03)',
      }
    : {
        bg: '#f0f4ff',
        surface: '#ffffff',
        surface2: '#f8faff',
        border: '#e2e8f0',
        text: '#0f172a',
        muted: '#64748b',
        accent: '#4f46e5',
        inputBg: '#f8faff',
        shadow: '0 4px 24px rgba(0,0,0,0.07)',
        hoverBg: 'rgba(0,0,0,0.02)',
      };

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchPosts = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/admin/blog');
      if (!res.ok) throw new Error('Failed to fetch posts');
      const data = await res.json();
      const mapped = data.map((p: any) => ({
        ...p,
        status: p.published ? 'Published' : 'Draft',
        views: p.views || '0',
      }));
      setPosts(mapped);
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'An error occurred while loading posts.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  useEffect(() => {
    if (isEditing && editorRef.current && editorRef.current.innerHTML !== formData.content) {
      editorRef.current.innerHTML = formData.content;
    }
  }, [isEditing]);

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
        image: post.image || '',
        date: post.date,
      });
    } else {
      setEditingPost(null);
      setFormData({
        title: '', slug: '', category: 'Tech Trends', status: 'Draft',
        excerpt: '', content: '', image: '',
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      });
    }
    setIsEditing(true);
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      const url = editingPost ? `/api/admin/blog/${editingPost.id}` : '/api/admin/blog';
      const method = editingPost ? 'PUT' : 'POST';
      
      const payload = {
        title: formData.title,
        slug: formData.slug || formData.title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, ''),
        category: formData.category,
        excerpt: formData.excerpt,
        content: formData.content,
        image: formData.image || null,
        date: formData.date,
        published: formData.status === 'Published',
      };

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || 'Failed to save post');
      }

      setIsEditing(false);
      await fetchPosts();
    } catch (err: any) {
      alert(err.message || 'Error saving post');
    } finally {
      setLoading(false);
    }
  };

  const confirmDelete = async () => {
    if (deleteId) {
      try {
        setLoading(true);
        const res = await fetch(`/api/admin/blog/${deleteId}`, {
          method: 'DELETE',
        });
        if (!res.ok) {
          const errData = await res.json();
          throw new Error(errData.error || 'Failed to delete post');
        }
        setShowDeleteModal(false);
        setDeleteId(null);
        await fetchPosts();
      } catch (err: any) {
        alert(err.message || 'Error deleting post');
      } finally {
        setLoading(false);
      }
    }
  };

  const handleEditorChange = (html?: string) => {
    if (typeof html === 'string') {
      setFormData(f => ({ ...f, content: html }));
    } else if (editorRef.current) {
      setFormData(f => ({ ...f, content: editorRef.current!.innerHTML }));
    }
  };

  const execCommand = (cmd: string, val = '') => {
    document.execCommand(cmd, false, val);
    handleEditorChange();
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        setLoading(true);
        const form = new FormData();
        form.append('file', file);
        
        const res = await fetch('/api/admin/upload', {
          method: 'POST',
          body: form,
        });

        if (!res.ok) {
          const errData = await res.json();
          throw new Error(errData.error || 'Upload failed');
        }

        const data = await res.json();
        setFormData(f => ({ ...f, image: data.url }));
      } catch (err: any) {
        alert('Image upload failed: ' + err.message);
      } finally {
        setLoading(false);
      }
    }
  };

  // ═══════════════════════════════════════════════════════
  //  BLOG LIST VIEW
  // ═══════════════════════════════════════════════════════
  if (!isEditing) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20, padding: '4px 0' }}>

        {/* Delete Confirmation Modal */}
        {showDeleteModal && (
          <div
            style={{
              position: 'fixed', inset: 0,
              background: isDark ? 'rgba(0,0,0,0.7)' : 'rgba(15,23,42,0.3)',
              backdropFilter: 'blur(8px)',
              zIndex: 2000,
              display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20,
            }}
          >
            <div
              style={{
                background: css.surface,
                border: `1px solid ${css.border}`,
                borderRadius: 24,
                padding: '2.5rem',
                maxWidth: 400,
                width: '100%',
                textAlign: 'center',
                boxShadow: css.shadow,
              }}
            >
              <div
                style={{
                  width: 64, height: 64, borderRadius: '50%',
                  background: 'rgba(239,68,68,0.1)',
                  color: '#ef4444',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  margin: '0 auto 20px',
                  fontSize: 28,
                }}
              >
                🗑️
              </div>
              <h3 style={{ fontSize: 20, fontWeight: 700, color: css.text, margin: '0 0 10px' }}>
                Delete this article?
              </h3>
              <p style={{ color: css.muted, fontSize: 14, lineHeight: 1.6, margin: '0 0 28px' }}>
                This action is permanent and cannot be undone. The story will be removed from your public blog.
              </p>
              <div style={{ display: 'flex', gap: 12 }}>
                <button
                  onClick={() => setShowDeleteModal(false)}
                  style={{
                    flex: 1, padding: '12px', borderRadius: 12,
                    background: css.surface2, border: `1px solid ${css.border}`,
                    color: css.text, fontWeight: 600, cursor: 'pointer', fontSize: 14,
                    transition: 'opacity 0.15s',
                  }}
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDelete}
                  style={{
                    flex: 1, padding: '12px', borderRadius: 12,
                    background: '#ef4444', border: 'none',
                    color: '#fff', fontWeight: 700, cursor: 'pointer', fontSize: 14,
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Page Header */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
          <div>
            <p style={{ fontSize: 11, fontWeight: 700, color: css.muted, textTransform: 'uppercase', letterSpacing: '0.08em', margin: '0 0 4px' }}>
              Content
            </p>
            <h1 style={{ fontSize: 24, fontWeight: 900, color: css.text, margin: 0, letterSpacing: '-0.02em' }}>
              Blog Articles
            </h1>
            <p style={{ fontSize: 13, color: css.muted, margin: '4px 0 0', fontWeight: 500 }}>
              {filtered.length} article{filtered.length !== 1 ? 's' : ''} {search ? 'found' : 'published'}
            </p>
          </div>
          <button
            onClick={() => handleOpenEditor()}
            style={{
              display: 'flex', alignItems: 'center', gap: 8,
              background: `linear-gradient(135deg, ${css.accent}, #8b5cf6)`,
              border: 'none', color: '#fff',
              fontWeight: 700, fontSize: 14,
              padding: '11px 20px', borderRadius: 12,
              cursor: 'pointer',
              boxShadow: `0 4px 14px ${css.accent}40`,
              transition: 'opacity 0.15s',
            }}
            onMouseEnter={e => (e.currentTarget as HTMLElement).style.opacity = '0.88'}
            onMouseLeave={e => (e.currentTarget as HTMLElement).style.opacity = '1'}
          >
            <Plus size={17} /> Write New Story
          </button>
        </div>

        {/* Search Bar */}
        <div
          style={{
            background: css.surface, border: `1px solid ${css.border}`,
            borderRadius: 16, padding: '14px 20px',
            display: 'flex', alignItems: 'center', gap: 12,
            boxShadow: css.shadow,
          }}
        >
          <Search size={16} color={css.muted} style={{ flexShrink: 0 }} />
          <input
            type="text"
            placeholder="Search articles by title..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{
              flex: 1, background: 'none', border: 'none', outline: 'none',
              fontSize: 14, color: css.text, fontWeight: 500,
            }}
          />
          {search && (
            <button
              onClick={() => setSearch('')}
              style={{
                background: 'none', border: 'none', cursor: 'pointer',
                color: css.muted, fontSize: 13, fontWeight: 600,
              }}
            >
              Clear
            </button>
          )}
        </div>

        {/* Articles Table */}
        <div
          style={{
            background: css.surface, border: `1px solid ${css.border}`,
            borderRadius: 20, overflow: 'hidden', boxShadow: css.shadow,
          }}
        >
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', minWidth: 860, borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr
                  style={{
                    background: css.surface2,
                    borderBottom: `1px solid ${css.border}`,
                  }}
                >
                  {['STORY', 'CATEGORY', 'VISIBILITY', 'REACH', 'ACTIONS'].map(h => (
                    <th
                      key={h}
                      style={{
                        padding: '14px 20px',
                        fontSize: 10, fontWeight: 800,
                        color: css.muted, letterSpacing: '0.1em',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={5} style={{ padding: '48px 20px', textAlign: 'center', color: css.muted, fontSize: 14 }}>
                      No articles found.
                    </td>
                  </tr>
                )}
                {filtered.map((post, i) => (
                  <tr
                    key={post.id}
                    style={{
                      borderBottom: i < filtered.length - 1 ? `1px solid ${css.border}` : 'none',
                      transition: 'background 0.15s',
                    }}
                    onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = css.hoverBg}
                    onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = 'transparent'}
                  >
                    {/* Title */}
                    <td style={{ padding: '16px 20px', maxWidth: 420 }}>
                      <div
                        style={{
                          fontSize: 13.5, fontWeight: 700, color: css.text,
                          lineHeight: 1.45,
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden',
                        } as any}
                        title={post.title}
                      >
                        {post.title}
                      </div>
                      <div style={{ fontSize: 11, color: css.muted, marginTop: 4, fontWeight: 500 }}>
                        {post.date} &bull; /blog/{post.slug}
                      </div>
                    </td>

                    {/* Category */}
                    <td style={{ padding: '16px 20px', whiteSpace: 'nowrap' }}>
                      <span
                        style={{
                          display: 'inline-block',
                          fontSize: 10, fontWeight: 700,
                          background: isDark ? 'rgba(99,102,241,0.12)' : 'rgba(79,70,229,0.07)',
                          color: css.accent,
                          border: `1px solid ${css.accent}30`,
                          padding: '3px 10px', borderRadius: 999,
                          textTransform: 'uppercase', letterSpacing: '0.07em',
                        }}
                      >
                        {post.category}
                      </span>
                    </td>

                    {/* Status */}
                    <td style={{ padding: '16px 20px', whiteSpace: 'nowrap' }}>
                      <span
                        style={{
                          display: 'inline-flex', alignItems: 'center', gap: 6,
                          fontSize: 10, fontWeight: 700,
                          background: post.status === 'Published'
                            ? 'rgba(16,185,129,0.1)' : 'rgba(59,130,246,0.1)',
                          color: post.status === 'Published' ? '#10b981' : '#3b82f6',
                          border: `1px solid ${post.status === 'Published' ? '#10b98130' : '#3b82f630'}`,
                          padding: '3px 10px', borderRadius: 999,
                          textTransform: 'uppercase', letterSpacing: '0.07em',
                        }}
                      >
                        <span
                          style={{
                            width: 6, height: 6, borderRadius: '50%',
                            background: post.status === 'Published' ? '#10b981' : '#3b82f6',
                          }}
                        />
                        {post.status}
                      </span>
                    </td>

                    {/* Views */}
                    <td style={{ padding: '16px 20px', fontSize: 14, fontWeight: 700, color: css.text, whiteSpace: 'nowrap' }}>
                      {parseInt(post.views || '0').toLocaleString()}
                    </td>

                    {/* Actions */}
                    <td style={{ padding: '16px 20px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        <button
                          onClick={() => handleOpenEditor(post)}
                          title="Edit"
                          style={{
                            background: 'none', border: `1px solid ${css.border}`,
                            borderRadius: 9, padding: '7px', cursor: 'pointer',
                            color: css.muted, display: 'flex', alignItems: 'center',
                            transition: 'all 0.15s',
                          }}
                          onMouseEnter={e => {
                            (e.currentTarget as HTMLElement).style.color = css.accent;
                            (e.currentTarget as HTMLElement).style.borderColor = css.accent;
                            (e.currentTarget as HTMLElement).style.background = `${css.accent}10`;
                          }}
                          onMouseLeave={e => {
                            (e.currentTarget as HTMLElement).style.color = css.muted;
                            (e.currentTarget as HTMLElement).style.borderColor = css.border;
                            (e.currentTarget as HTMLElement).style.background = 'none';
                          }}
                        >
                          <Edit2 size={14} />
                        </button>
                        <button
                          onClick={() => { setDeleteId(post.id); setShowDeleteModal(true); }}
                          title="Delete"
                          style={{
                            background: 'none', border: `1px solid ${css.border}`,
                            borderRadius: 9, padding: '7px', cursor: 'pointer',
                            color: css.muted, display: 'flex', alignItems: 'center',
                            transition: 'all 0.15s',
                          }}
                          onMouseEnter={e => {
                            (e.currentTarget as HTMLElement).style.color = '#ef4444';
                            (e.currentTarget as HTMLElement).style.borderColor = '#ef444440';
                            (e.currentTarget as HTMLElement).style.background = 'rgba(239,68,68,0.06)';
                          }}
                          onMouseLeave={e => {
                            (e.currentTarget as HTMLElement).style.color = css.muted;
                            (e.currentTarget as HTMLElement).style.borderColor = css.border;
                            (e.currentTarget as HTMLElement).style.background = 'none';
                          }}
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }

  // ═══════════════════════════════════════════════════════
  //  EDITOR VIEW
  // ═══════════════════════════════════════════════════════
  return (
    <div
      style={{
        position: 'fixed', inset: 0,
        background: css.bg,
        display: 'flex', flexDirection: 'column',
        color: css.text, zIndex: 1000,
        fontFamily: "'Inter', sans-serif",
      }}
    >
      {/* Editor Top Bar */}
      <header
        style={{
          height: 56,
          background: css.surface,
          borderBottom: `1px solid ${css.border}`,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '0 20px',
          boxShadow: isDark ? '0 1px 0 rgba(255,255,255,0.03)' : '0 1px 0 rgba(0,0,0,0.04)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <button
            onClick={() => setIsEditing(false)}
            style={{
              background: 'none', border: `1px solid ${css.border}`,
              borderRadius: 9, padding: '7px 12px',
              cursor: 'pointer', color: css.muted,
              display: 'flex', alignItems: 'center', gap: 6,
              fontSize: 13, fontWeight: 600,
              transition: 'all 0.15s',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.color = css.text;
              (e.currentTarget as HTMLElement).style.background = css.surface2;
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.color = css.muted;
              (e.currentTarget as HTMLElement).style.background = 'none';
            }}
          >
            <ChevronLeft size={16} /> Back
          </button>
          <span
            style={{
              fontSize: 13, fontWeight: 700,
              color: css.muted, padding: '3px 10px',
              background: css.surface2, borderRadius: 8,
            }}
          >
            {editingPost ? 'Editing article' : 'New article'}
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ fontSize: 13, color: css.muted }}>Draft saved</span>
          <ThemeToggle />
          <button
            onClick={handleSave}
            style={{
              background: `linear-gradient(135deg, ${css.accent}, #8b5cf6)`,
              border: 'none', color: '#fff',
              padding: '8px 20px', borderRadius: 10,
              fontSize: 14, fontWeight: 700, cursor: 'pointer',
              display: 'flex', alignItems: 'center', gap: 7,
              boxShadow: `0 4px 12px ${css.accent}40`,
            }}
          >
            <Save size={15} /> Publish
          </button>
        </div>
      </header>

      {/* Editor Main */}
      <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
        {/* Writing area */}
        <div
          style={{
            flex: 1, overflowY: 'auto',
            background: css.bg,
            display: 'flex', justifyContent: 'center',
            padding: '60px 40px',
          }}
        >
          <div style={{ width: '100%', maxWidth: 1100 }}>
            {/* Title */}
            <textarea
              placeholder="Article title..."
              value={formData.title}
              onChange={e => setFormData(f => ({ ...f, title: e.target.value }))}
              rows={2}
              style={{
                width: '100%', fontSize: '2.2rem', fontWeight: 800,
                background: 'none', border: 'none',
                color: css.text, outline: 'none', resize: 'none',
                lineHeight: 1.2, letterSpacing: '-0.03em', marginBottom: '1.5rem',
                fontFamily: "'Inter', sans-serif",
              }}
            />

            {/* TipTap Full Editor */}
            <FullEditor
              content={formData.content}
              onChange={(html: string) => handleEditorChange(html)}
              isDark={isDark}
            />
          </div>
        </div>

        {/* Settings sidebar */}
        <aside
          style={{
            width: 310, background: css.surface,
            borderLeft: `1px solid ${css.border}`,
            display: 'flex', flexDirection: 'column',
            overflowY: 'auto',
          }}
        >
          <div style={{ padding: '20px 20px', borderBottom: `1px solid ${css.border}` }}>
            <p style={{ fontSize: 11, fontWeight: 800, color: css.muted, textTransform: 'uppercase', letterSpacing: '0.1em', margin: '0 0 18px' }}>
              Post Settings
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
              {/* Category */}
              <div>
                <label style={{ display: 'block', fontSize: 11, color: css.muted, fontWeight: 700, marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.07em' }}>
                  Category
                </label>
                <select
                  value={formData.category}
                  onChange={e => setFormData(f => ({ ...f, category: e.target.value }))}
                  style={{
                    width: '100%', background: css.inputBg,
                    border: `1px solid ${css.border}`, color: css.text,
                    padding: '10px 12px', borderRadius: 10, outline: 'none',
                    cursor: 'pointer', fontSize: 13, fontWeight: 600,
                  }}
                >
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
                <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
                  <input
                    type="text" value={newCat}
                    onChange={e => setNewCat(e.target.value)}
                    placeholder="New category..."
                    style={{
                      flex: 1, background: css.inputBg,
                      border: `1px solid ${css.border}`, color: css.text,
                      padding: '8px 10px', borderRadius: 8, outline: 'none', fontSize: 12,
                    }}
                  />
                  <button
                    onClick={handleAddCategory}
                    style={{
                      background: css.accent, border: 'none',
                      borderRadius: 8, padding: '8px 12px',
                      fontSize: 11, fontWeight: 700, cursor: 'pointer', color: '#fff',
                    }}
                  >
                    ADD
                  </button>
                </div>
              </div>

              {/* Slug */}
              <div>
                <label style={{ display: 'block', fontSize: 11, color: css.muted, fontWeight: 700, marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.07em' }}>
                  URL Slug
                </label>
                <input
                  type="text" value={formData.slug}
                  onChange={e => setFormData(f => ({ ...f, slug: e.target.value }))}
                  style={{
                    width: '100%', background: css.inputBg,
                    border: `1px solid ${css.border}`, color: css.text,
                    padding: '10px 12px', borderRadius: 10, outline: 'none', fontSize: 12,
                  }}
                />
              </div>

              {/* Featured image */}
              <div>
                <label style={{ display: 'block', fontSize: 11, color: css.muted, fontWeight: 700, marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.07em' }}>
                  Featured Image
                </label>
                <div
                  onClick={() => document.getElementById('featured-image-input')?.click()}
                  style={{
                    width: '100%', height: 130,
                    background: css.inputBg,
                    border: `2px dashed ${css.border}`,
                    borderRadius: 12,
                    display: 'flex', flexDirection: 'column',
                    alignItems: 'center', justifyContent: 'center',
                    cursor: 'pointer', overflow: 'hidden', position: 'relative',
                  }}
                >
                  {formData.image ? (
                    <Image src={formData.image} fill style={{ objectFit: 'cover' }} alt="Featured" />
                  ) : (
                    <>
                      <ImageIcon size={22} color={css.muted} />
                      <span style={{ fontSize: 12, color: css.muted, marginTop: 6, fontWeight: 500 }}>
                        Set featured image
                      </span>
                    </>
                  )}
                </div>
                <input id="featured-image-input" type="file" hidden accept="image/*" onChange={handleImageUpload} />
                {formData.image && (
                  <button
                    onClick={() => setFormData(f => ({ ...f, image: '' }))}
                    style={{ marginTop: 6, background: 'none', border: 'none', color: '#ef4444', fontSize: 12, fontWeight: 600, cursor: 'pointer', padding: 0 }}
                  >
                    Remove image
                  </button>
                )}
              </div>

              {/* Excerpt */}
              <div>
                <label style={{ display: 'block', fontSize: 11, color: css.muted, fontWeight: 700, marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.07em' }}>
                  Excerpt
                </label>
                <textarea
                  value={formData.excerpt}
                  onChange={e => setFormData(f => ({ ...f, excerpt: e.target.value }))}
                  rows={4}
                  style={{
                    width: '100%', background: css.inputBg,
                    border: `1px solid ${css.border}`, color: css.text,
                    padding: '10px 12px', borderRadius: 10, outline: 'none',
                    fontSize: 12, resize: 'none', lineHeight: 1.6,
                    fontFamily: "'Inter', sans-serif",
                  }}
                />
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
