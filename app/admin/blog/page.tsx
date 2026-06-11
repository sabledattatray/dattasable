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

function calculateSeoScore(title: string, slug: string, content: string, excerpt: string, keyword: string) {
  if (!keyword) return { score: 0, checks: [] };

  const checks = [];
  let score = 0;
  const kw = keyword.toLowerCase().trim();
  const cleanTitle = title.toLowerCase();
  const cleanSlug = slug.toLowerCase();
  
  // Extract text content from TipTap HTML
  let textContent = '';
  if (typeof document !== 'undefined') {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = content;
    textContent = tempDiv.textContent || tempDiv.innerText || '';
  } else {
    // Basic fallback for server rendering
    textContent = content.replace(/<[^>]*>/g, '');
  }
  const cleanContent = textContent.toLowerCase();
  const cleanExcerpt = excerpt.toLowerCase();

  // 1. Keyword in Title (20 pts)
  const kwInTitle = cleanTitle.includes(kw);
  checks.push({
    id: 'title',
    label: 'Focus keyword in title',
    passed: kwInTitle,
    pts: 20
  });
  if (kwInTitle) score += 20;

  // 2. Keyword in Slug (15 pts)
  const kwInSlug = cleanSlug.includes(kw.replace(/\s+/g, '-'));
  checks.push({
    id: 'slug',
    label: 'Focus keyword in URL slug',
    passed: kwInSlug,
    pts: 15
  });
  if (kwInSlug) score += 15;

  // 3. Keyword in Content (20 pts)
  const kwInContent = cleanContent.includes(kw);
  checks.push({
    id: 'content',
    label: 'Focus keyword in content',
    passed: kwInContent,
    pts: 20
  });
  if (kwInContent) score += 20;

  // 4. Keyword in Excerpt (15 pts)
  const kwInExcerpt = cleanExcerpt.includes(kw);
  checks.push({
    id: 'excerpt',
    label: 'Focus keyword in excerpt',
    passed: kwInExcerpt,
    pts: 15
  });
  if (kwInExcerpt) score += 15;

  // 5. Title Length (10 pts)
  const titleLen = title.length;
  const titleLenOk = titleLen >= 40 && titleLen <= 70;
  checks.push({
    id: 'title_length',
    label: `Title length (${titleLen} chars, ideal 40-70)`,
    passed: titleLenOk,
    pts: 10
  });
  if (titleLenOk) score += 10;

  // 6. Content Length (10 pts)
  const wordCount = textContent.trim().split(/\s+/).filter(Boolean).length;
  const wordCountOk = wordCount >= 300;
  checks.push({
    id: 'word_count',
    label: `Content length (${wordCount} words, min 300)`,
    passed: wordCountOk,
    pts: 10
  });
  if (wordCountOk) score += 10;

  // 7. Keyword Density (5 pts)
  let densityOk = false;
  let densityMsg = 'Keyword density (ideal 0.5% - 2.5%)';
  if (wordCount > 0 && kwInContent) {
    const matches = cleanContent.split(kw).length - 1;
    const density = (matches / wordCount) * 100;
    densityOk = density >= 0.5 && density <= 2.5;
    densityMsg = `Keyword density: ${density.toFixed(1)}% (ideal 0.5%-2.5%)`;
  }
  checks.push({
    id: 'density',
    label: densityMsg,
    passed: densityOk,
    pts: 5
  });
  if (densityOk) score += 5;

  // 8. Images and Links (5 pts)
  const hasImages = content.includes('<img');
  const hasLinks = content.includes('<a') || content.includes('href=');
  checks.push({
    id: 'media',
    label: 'Contains images & links',
    passed: hasImages && hasLinks,
    pts: 5
  });
  if (hasImages && hasLinks) score += 5;

  return { score, checks };
}

function calculateReadTime(content: string): number {
  let textContent = '';
  if (typeof document !== 'undefined') {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = content;
    textContent = tempDiv.textContent || tempDiv.innerText || '';
  } else {
    textContent = content.replace(/<[^>]*>/g, '');
  }
  const wordCount = textContent.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(wordCount / 200));
}

export default function AdminBlog() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const [posts, setPosts] = useState<any[]>([]);
  const [categories, setCategories] = useState(['Tech Trends', 'Tutorials', 'Technical', 'BI Tools', 'SQL']);
  const [newCat, setNewCat] = useState('');
  const [search, setSearch] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editingPost, setEditingPost] = useState<any>(null);
  const [sidebarTab, setSidebarTab] = useState<'settings' | 'seo'>('settings');
  const [formData, setFormData] = useState({
    title: '', slug: '', category: 'Tech Trends', status: 'Draft',
    excerpt: '', content: '', image: '', date: '',
    readTime: 5, focusedKeyword: '',
  });
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [showTextColorPicker, setShowTextColorPicker] = useState(false);
  const [showHighlightPicker, setShowHighlightPicker] = useState(false);
  const [showCategoryManager, setShowCategoryManager] = useState(false);
  const [editingCategory, setEditingCategory] = useState<string | null>(null);
  const [renameValue, setRenameValue] = useState('');
  const [isReadTimeManual, setIsReadTimeManual] = useState(false);
  const editorRef = useRef<HTMLDivElement>(null);


  // Theme-aware CSS variables
  const css = isDark
    ? {
        bg: '#000000',
        surface: '#000000',
        surface2: '#121212',
        border: '#1a1a1a',
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
    if (posts.length > 0) {
      const uniqueCats = Array.from(new Set(posts.map(p => p.category).filter(Boolean)));
      const merged = Array.from(new Set([...['Tech Trends', 'Tutorials', 'Technical', 'BI Tools', 'SQL'], ...uniqueCats]));
      setCategories(merged as string[]);
    }
  }, [posts]);

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

  const handleRenameCategory = async (oldName: string, newName: string) => {
    if (!newName.trim() || oldName === newName) {
      setEditingCategory(null);
      return;
    }
    try {
      setLoading(true);
      const res = await fetch('/api/admin/category', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'rename', oldName, newName }),
      });
      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || 'Failed to rename category');
      }
      setCategories(prev => prev.map(cat => cat === oldName ? newName : cat));
      if (formData.category === oldName) {
        setFormData(f => ({ ...f, category: newName }));
      }
      setEditingCategory(null);
      await fetchPosts();
    } catch (err: any) {
      alert(err.message || 'Error renaming category');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteCategory = async (name: string) => {
    if (confirm(`Are you sure you want to delete category "${name}"? Existing posts using this category will be reassigned to "Tech Trends".`)) {
      try {
        setLoading(true);
        const res = await fetch('/api/admin/category', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ action: 'delete', name }),
        });
        if (!res.ok) {
          const errData = await res.json();
          throw new Error(errData.error || 'Failed to delete category');
        }
        setCategories(prev => prev.filter(cat => cat !== name));
        if (formData.category === name) {
          setFormData(f => ({ ...f, category: 'Tech Trends' }));
        }
        await fetchPosts();
      } catch (err: any) {
        alert(err.message || 'Error deleting category');
      } finally {
        setLoading(false);
      }
    }
  };

  const handleAddNewCategory = (name: string) => {
    const trimmed = name.trim();
    if (trimmed && !categories.includes(trimmed)) {
      setCategories([...categories, trimmed]);
      setFormData(f => ({ ...f, category: trimmed }));
      setNewCat('');
    }
  };

  const handleOpenEditor = (post: any = null) => {
    setSidebarTab('settings');
    if (post) {
      let keyword = '';
      if (post.blocks && typeof post.blocks === 'object') {
        keyword = (post.blocks as any).focusedKeyword || '';
      }
      const calculated = calculateReadTime(post.content || '');
      const isManual = post.readTime && post.readTime !== calculated;
      setIsReadTimeManual(!!isManual);
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
        readTime: post.readTime || 5,
        focusedKeyword: keyword,
      });
    } else {
      setIsReadTimeManual(false);
      setEditingPost(null);
      setFormData({
        title: '', slug: '', category: 'Tech Trends', status: 'Draft',
        excerpt: '', content: '', image: '',
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        readTime: 1,
        focusedKeyword: '',
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
        readTime: Number(formData.readTime) || 5,
        blocks: {
          focusedKeyword: formData.focusedKeyword || '',
        },
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
    const newContent = typeof html === 'string'
      ? html
      : (editorRef.current ? editorRef.current.innerHTML : '');

    setFormData(f => {
      let updatedReadTime = f.readTime;
      if (!isReadTimeManual) {
        updatedReadTime = calculateReadTime(newContent);
      }
      return { ...f, content: newContent, readTime: updatedReadTime };
    });
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
      {/* Category Manager Modal */}
      {showCategoryManager && (
        <div
          style={{
            position: 'fixed', inset: 0,
            background: isDark ? 'rgba(0,0,0,0.7)' : 'rgba(15,23,42,0.3)',
            backdropFilter: 'blur(8px)',
            zIndex: 3000,
            display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20,
          }}
        >
          <div
            style={{
              background: css.surface,
              border: `1px solid ${css.border}`,
              borderRadius: 24,
              padding: '2.2rem',
              maxWidth: 480,
              width: '100%',
              boxShadow: css.shadow,
              display: 'flex',
              flexDirection: 'column',
              gap: 20,
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ fontSize: 18, fontWeight: 800, color: css.text, margin: 0 }}>
                Manage Categories
              </h3>
              <button
                onClick={() => { setShowCategoryManager(false); setEditingCategory(null); }}
                style={{ background: 'none', border: 'none', color: css.muted, cursor: 'pointer', fontSize: 18, fontWeight: 700 }}
              >
                ✕
              </button>
            </div>

            {/* Add New Category */}
            <div style={{ display: 'flex', gap: 8 }}>
              <input
                type="text"
                placeholder="New category name..."
                value={newCat}
                onChange={e => setNewCat(e.target.value)}
                style={{
                  flex: 1, background: css.inputBg,
                  border: `1px solid ${css.border}`, color: css.text,
                  padding: '10px 12px', borderRadius: 10, outline: 'none', fontSize: 13,
                }}
                onKeyDown={e => { if (e.key === 'Enter') handleAddNewCategory(newCat); }}
              />
              <button
                onClick={() => handleAddNewCategory(newCat)}
                style={{
                  background: css.accent, border: 'none',
                  borderRadius: 10, padding: '10px 16px',
                  fontSize: 12, fontWeight: 700, cursor: 'pointer', color: '#fff',
                }}
              >
                Add
              </button>
            </div>

            {/* Categories List */}
            <div style={{ maxHeight: 280, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 8 }}>
              {categories.map((cat) => (
                <div
                  key={cat}
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    padding: '10px 14px', background: css.surface2, borderRadius: 12,
                    border: `1px solid ${css.border}`, gap: 10,
                  }}
                >
                  {editingCategory === cat ? (
                    <div style={{ display: 'flex', gap: 6, flex: 1 }}>
                      <input
                        type="text"
                        value={renameValue}
                        onChange={e => setRenameValue(e.target.value)}
                        style={{
                          flex: 1, background: css.inputBg,
                          border: `1px solid ${css.border}`, color: css.text,
                          padding: '6px 10px', borderRadius: 8, outline: 'none', fontSize: 12,
                        }}
                        autoFocus
                        onKeyDown={e => {
                          if (e.key === 'Enter') handleRenameCategory(cat, renameValue);
                          if (e.key === 'Escape') setEditingCategory(null);
                        }}
                      />
                      <button
                        onClick={() => handleRenameCategory(cat, renameValue)}
                        style={{ background: '#10b981', color: '#fff', border: 'none', borderRadius: 8, padding: '6px 12px', fontSize: 11, fontWeight: 700, cursor: 'pointer' }}
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditingCategory(null)}
                        style={{ background: 'none', border: `1px solid ${css.border}`, color: css.text, borderRadius: 8, padding: '6px 10px', fontSize: 11, fontWeight: 600, cursor: 'pointer' }}
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <>
                      <span style={{ fontSize: 13, fontWeight: 600, color: css.text }}>{cat}</span>
                      <div style={{ display: 'flex', gap: 6 }}>
                        <button
                          onClick={() => { setEditingCategory(cat); setRenameValue(cat); }}
                          style={{
                            background: 'none', border: `1px solid ${css.border}`,
                            borderRadius: 8, padding: '5px 8px', fontSize: 11, fontWeight: 600,
                            color: css.muted, cursor: 'pointer', transition: 'all 0.15s',
                          }}
                          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = css.accent; (e.currentTarget as HTMLElement).style.borderColor = css.accent; }}
                          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = css.muted; (e.currentTarget as HTMLElement).style.borderColor = css.border; }}
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteCategory(cat)}
                          style={{
                            background: 'none', border: `1px solid ${css.border}`,
                            borderRadius: 8, padding: '5px 8px', fontSize: 11, fontWeight: 600,
                            color: '#ef4444', cursor: 'pointer', transition: 'all 0.15s',
                          }}
                          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(239,68,68,0.06)'; }}
                          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'none'; }}
                        >
                          Delete
                        </button>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
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
          <span className="editor-header-draft-label" style={{ fontSize: 13, color: css.muted }}>Draft saved</span>
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
      <div className="blog-editor-main" style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
        {/* Writing area */}
        <div
          className="blog-editor-writing-area"
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
              onChange={e => {
                setFormData(f => ({ ...f, title: e.target.value }));
                e.target.style.height = 'auto';
                e.target.style.height = `${e.target.scrollHeight}px`;
              }}
              ref={el => {
                if (el) {
                  el.style.height = 'auto';
                  el.style.height = `${el.scrollHeight}px`;
                }
              }}
              style={{
                width: '100%', fontSize: '2.2rem', fontWeight: 800,
                background: 'none', border: 'none',
                color: css.text, outline: 'none', resize: 'none',
                lineHeight: 1.2, letterSpacing: '-0.03em', marginBottom: '1.5rem',
                fontFamily: "'Inter', sans-serif",
                height: 'auto',
                minHeight: '2.8rem',
                overflow: 'hidden',
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
          className="blog-editor-sidebar"
          style={{
            width: 310, background: css.surface,
            borderLeft: `1px solid ${css.border}`,
            display: 'flex', flexDirection: 'column',
            overflowY: 'auto',
          }}
        >
          {/* Tab Switcher */}
          <div style={{ display: 'flex', borderBottom: `1px solid ${css.border}`, flexShrink: 0 }}>
            <button
              onClick={() => setSidebarTab('settings')}
              style={{
                flex: 1, padding: '14px 10px', fontSize: 11, fontWeight: 700,
                background: sidebarTab === 'settings' ? css.surface2 : 'transparent',
                color: sidebarTab === 'settings' ? css.accent : css.muted,
                border: 'none', borderBottom: sidebarTab === 'settings' ? `2px solid ${css.accent}` : 'none',
                cursor: 'pointer', textTransform: 'uppercase', letterSpacing: '0.05em',
                transition: 'all 0.15s',
              }}
            >
              ⚙️ Settings
            </button>
            <button
              onClick={() => setSidebarTab('seo')}
              style={{
                flex: 1, padding: '14px 10px', fontSize: 11, fontWeight: 700,
                background: sidebarTab === 'seo' ? css.surface2 : 'transparent',
                color: sidebarTab === 'seo' ? css.accent : css.muted,
                border: 'none', borderBottom: sidebarTab === 'seo' ? `2px solid ${css.accent}` : 'none',
                cursor: 'pointer', textTransform: 'uppercase', letterSpacing: '0.05em',
                transition: 'all 0.15s',
              }}
            >
              📈 SEO Score
            </button>
          </div>

          {sidebarTab === 'settings' ? (
            <div style={{ padding: '20px 20px' }}>
              <p style={{ fontSize: 11, fontWeight: 800, color: css.muted, textTransform: 'uppercase', letterSpacing: '0.1em', margin: '0 0 18px' }}>
                Post Settings
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
                {/* Category */}
                <div>
                  <label style={{ display: 'block', fontSize: 11, color: css.muted, fontWeight: 700, marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.07em' }}>
                    Category
                  </label>
                  <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                    <select
                      value={formData.category}
                      onChange={e => setFormData(f => ({ ...f, category: e.target.value }))}
                      style={{
                        flex: 1, background: css.inputBg,
                        border: `1px solid ${css.border}`, color: css.text,
                        padding: '10px 12px', borderRadius: 10, outline: 'none',
                        cursor: 'pointer', fontSize: 13, fontWeight: 600,
                      }}
                    >
                      {categories.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                    <button
                      onClick={() => setShowCategoryManager(true)}
                      style={{
                        background: css.surface2, border: `1px solid ${css.border}`,
                        borderRadius: 10, padding: '10px', cursor: 'pointer', color: css.text,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        height: 40, width: 40,
                        transition: 'all 0.15s',
                      }}
                      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = css.hoverBg; }}
                      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = css.surface2; }}
                      title="Manage Categories"
                    >
                      ⚙️
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

                {/* Read Time */}
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                    <label style={{ display: 'block', fontSize: 11, color: css.muted, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.07em', margin: 0 }}>
                      Read Time (minutes)
                    </label>
                    {isReadTimeManual && (
                      <button
                        onClick={() => {
                          setIsReadTimeManual(false);
                          setFormData(f => ({ ...f, readTime: calculateReadTime(f.content) }));
                        }}
                        style={{
                          background: 'none', border: 'none', color: css.accent, fontSize: 10, fontWeight: 700,
                          cursor: 'pointer', padding: 0, textTransform: 'uppercase', letterSpacing: '0.05em'
                        }}
                      >
                        Auto-detect 🔄
                      </button>
                    )}
                  </div>
                  <input
                    type="number"
                    min={1}
                    value={formData.readTime}
                    onChange={e => {
                      setIsReadTimeManual(true);
                      setFormData(f => ({ ...f, readTime: parseInt(e.target.value) || 1 }));
                    }}
                    style={{
                      width: '100%', background: css.inputBg,
                      border: `1px solid ${css.border}`, color: css.text,
                      padding: '10px 12px', borderRadius: 10, outline: 'none', fontSize: 12,
                      fontWeight: 600,
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
                        <ImageIcon size={22} color={css.muted} style={{ pointerEvents: 'none' }} />
                        <span style={{ fontSize: 12, color: css.muted, marginTop: 6, fontWeight: 500, pointerEvents: 'none' }}>
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
          ) : (
            <div style={{ padding: '20px 20px', display: 'flex', flexDirection: 'column', gap: 20 }}>
              <p style={{ fontSize: 11, fontWeight: 800, color: css.muted, textTransform: 'uppercase', letterSpacing: '0.1em', margin: 0 }}>
                SEO Analyzer
              </p>

              {/* Focus Keyword */}
              <div>
                <label style={{ display: 'block', fontSize: 11, color: css.muted, fontWeight: 700, marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.07em' }}>
                  Focus Keyword
                </label>
                <input
                  type="text"
                  placeholder="Enter focus keyword..."
                  value={formData.focusedKeyword}
                  onChange={e => setFormData(f => ({ ...f, focusedKeyword: e.target.value }))}
                  style={{
                    width: '100%', background: css.inputBg,
                    border: `1px solid ${css.border}`, color: css.text,
                    padding: '10px 12px', borderRadius: 10, outline: 'none', fontSize: 12,
                    fontWeight: 600,
                  }}
                />
              </div>

              {formData.focusedKeyword ? (() => {
                const seo = calculateSeoScore(
                  formData.title,
                  formData.slug,
                  formData.content,
                  formData.excerpt,
                  formData.focusedKeyword
                );
                
                const radius = 26;
                const circumference = 2 * Math.PI * radius;
                const strokeDashoffset = circumference - (seo.score / 100) * circumference;
                const scoreColor = seo.score >= 80 ? '#10b981' : seo.score >= 50 ? '#f59e0b' : '#ef4444';

                return (
                  <>
                    {/* Visual Score Meter */}
                    <div style={{
                      display: 'flex', alignItems: 'center', gap: 16,
                      background: css.surface2, padding: '16px 20px', borderRadius: 16,
                      border: `1px solid ${css.border}`
                    }}>
                      <div style={{ position: 'relative', width: 64, height: 64, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <svg width="64" height="64" viewBox="0 0 64 64" style={{ transform: 'rotate(-90deg)', position: 'absolute', top: 0, left: 0 }}>
                          <circle cx="32" cy="32" r={radius} fill="transparent" stroke={isDark ? '#334155' : '#e2e8f0'} strokeWidth="6" />
                          <circle
                            cx="32" cy="32" r={radius} fill="transparent"
                            stroke={scoreColor}
                            strokeWidth="6"
                            strokeDasharray={circumference}
                            strokeDashoffset={strokeDashoffset}
                            strokeLinecap="round"
                            style={{ transition: 'stroke-dashoffset 0.35s' }}
                          />
                        </svg>
                        <span style={{ fontSize: 14, fontWeight: 900, color: scoreColor }}>
                          {seo.score}
                        </span>
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <span style={{ fontSize: 16, fontWeight: 800, color: scoreColor }}>
                          Score
                        </span>
                        <span style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: css.muted }}>
                          {seo.score >= 80 ? 'Good' : seo.score >= 50 ? 'Needs Work' : 'Poor'}
                        </span>
                      </div>
                    </div>

                    {/* SEO Checklist */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                      <span style={{ fontSize: 11, fontWeight: 800, color: css.muted, textTransform: 'uppercase', letterSpacing: '0.07em' }}>
                        Analysis Checklist
                      </span>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                        {seo.checks.map((check: any) => (
                          <div
                            key={check.id}
                            style={{
                              display: 'flex', alignItems: 'flex-start', gap: 10,
                              fontSize: 12, fontWeight: 500, color: check.passed ? css.text : css.muted
                            }}
                          >
                            <span style={{
                              color: check.passed ? '#10b981' : '#ef4444',
                              fontWeight: 900,
                              fontSize: check.passed ? 15 : 13,
                              marginTop: check.passed ? -2 : -1,
                              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                              width: 14, height: 14, flexShrink: 0
                            }}>
                              {check.passed ? '✓' : '✗'}
                            </span>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                              <span style={{ lineHeight: 1.2 }}>{check.label}</span>
                              <span style={{ fontSize: 9.5, color: css.muted, fontWeight: 600 }}>
                                {check.passed ? `Passed (+${check.pts} pts)` : `Missing (-${check.pts} pts)`}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                );
              })() : (
                <div style={{
                  padding: '30px 20px', textAlign: 'center', border: `1px dashed ${css.border}`,
                  borderRadius: 16, color: css.muted, fontSize: 12, lineHeight: 1.6
                }}>
                  Enter a focus keyword to see your SEO score and analyze content in real-time.
                </div>
              )}
            </div>
          )}
        </aside>
      </div>
      <style>{`
        @media (max-width: 900px) {
          .blog-editor-main {
            flex-direction: column !important;
            overflow-y: auto !important;
          }
          .blog-editor-writing-area {
            padding: 30px 20px !important;
            flex: none !important;
            overflow-y: visible !important;
          }
          .blog-editor-sidebar {
            width: 100% !important;
            border-left: none !important;
            border-top: 1px solid ${css.border} !important;
            flex: none !important;
            overflow-y: visible !important;
          }
        }
        @media (max-width: 500px) {
          .editor-header-draft-label {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
}
