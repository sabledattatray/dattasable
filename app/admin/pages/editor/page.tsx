'use client';
import { useState, useEffect, Suspense } from 'react';
import { ArrowLeft, Save, Eye, EyeOff, AlertCircle, CheckCircle2, ChevronRight, Layers } from 'lucide-react';
import { useTheme } from '@/components/ThemeProvider';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';

function EditorContent() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const router = useRouter();
  const searchParams = useSearchParams();
  const editId = searchParams.get('id');

  const css = isDark
    ? { bg: '#0a0f1e', surface: '#0f172a', surface2: '#1e293b', border: '#1e293b', text: '#f1f5f9', muted: '#64748b', accent: '#6366f1', inputBg: '#1e293b', shadow: '0 4px 24px rgba(0,0,0,0.35)' }
    : { bg: '#f0f4ff', surface: '#ffffff', surface2: '#f8faff', border: '#e2e8f0', text: '#0f172a', muted: '#64748b', accent: '#4f46e5', inputBg: '#f8faff', shadow: '0 4px 24px rgba(0,0,0,0.07)' };

  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [published, setPublished] = useState(true);
  
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Auto-generate slug from title if not editing
  useEffect(() => {
    if (!editId && title) {
      const generated = title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');
      setSlug(generated);
    }
  }, [title, editId]);

  // Fetch page details if editing
  useEffect(() => {
    if (editId) {
      const fetchPage = async () => {
        try {
          setFetching(true);
          const res = await fetch(`/api/admin/pages/${editId}`);
          if (res.ok) {
            const data = await res.json();
            setTitle(data.title);
            setSlug(data.slug);
            setExcerpt(data.excerpt || '');
            setContent(data.content);
            setPublished(data.published);
          } else {
            setMessage({ type: 'error', text: 'Failed to retrieve page data.' });
          }
        } catch (err) {
          console.error(err);
          setMessage({ type: 'error', text: 'Error loading page configuration.' });
        } finally {
          setFetching(false);
        }
      };
      fetchPage();
    }
  }, [editId]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !slug || !content) {
      setMessage({ type: 'error', text: 'Title, URL slug, and content are required.' });
      return;
    }

    try {
      setLoading(true);
      setMessage(null);

      const endpoint = editId ? `/api/admin/pages/${editId}` : '/api/admin/pages';
      const method = editId ? 'PUT' : 'POST';

      const res = await fetch(endpoint, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          slug,
          excerpt,
          content,
          published,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage({ type: 'success', text: editId ? 'Page updated successfully!' : 'Page published successfully!' });
        setTimeout(() => {
          router.push('/admin/pages');
        }, 1200);
      } else {
        setMessage({ type: 'error', text: data.error || 'Failed to save custom page.' });
      }
    } catch (err) {
      console.error(err);
      setMessage({ type: 'error', text: 'An unexpected error occurred.' });
    } finally {
      setLoading(false);
    }
  };

  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '12px 14px',
    background: css.inputBg, border: `1.5px solid ${css.border}`,
    borderRadius: 12, fontSize: 13, color: css.text,
    outline: 'none', fontFamily: "'Inter', sans-serif",
    boxSizing: 'border-box',
  };

  const labelStyle: React.CSSProperties = {
    fontSize: 10, fontWeight: 700, color: css.muted,
    textTransform: 'uppercase', letterSpacing: '0.08em',
    display: 'block', marginBottom: 7,
  };

  if (fetching) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', padding: '128px 0', color: css.muted, fontSize: 14, fontWeight: 600 }}>
        Retrieving page configurations...
      </div>
    );
  }

  return (
    <div style={{ padding: '24px 28px', minHeight: '100%' }}>
      {/* Top Navigation Row */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24, flexWrap: 'wrap', gap: 14 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <Link 
            href="/admin/pages" 
            style={{ color: css.muted, display: 'flex', alignItems: 'center', textDecoration: 'none', transition: 'color 0.15s' }}
            onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = css.text}
            onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = css.muted}
          >
            <ArrowLeft size={18} />
          </Link>
          <div style={{ width: 1, height: 16, background: css.border }} />
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, fontWeight: 600 }}>
            <Layers size={13} color={css.muted} />
            <Link href="/admin/pages" style={{ color: css.muted, textDecoration: 'none' }}>Pages</Link>
            <ChevronRight size={12} color={css.muted} />
            <span style={{ color: css.text }}>{editId ? 'Edit Page' : 'New Page'}</span>
          </div>
        </div>

        <div style={{ display: 'flex', gap: 8 }}>
          <button 
            type="button"
            onClick={() => setPreviewMode(!previewMode)} 
            style={{ display: 'flex', alignItems: 'center', gap: 7, padding: '9px 16px', background: css.surface2, border: `1px solid ${css.border}`, borderRadius: 10, fontSize: 13, fontWeight: 600, color: css.muted, cursor: 'pointer', transition: 'all 0.15s' }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = css.text; (e.currentTarget as HTMLElement).style.borderColor = css.accent; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = css.muted; (e.currentTarget as HTMLElement).style.borderColor = css.border; }}
          >
            {previewMode ? <EyeOff size={14} /> : <Eye size={14} />}
            {previewMode ? 'Edit Mode' : 'Live Preview'}
          </button>
          
          <button 
            onClick={handleSave}
            disabled={loading}
            style={{ display: 'flex', alignItems: 'center', gap: 7, padding: '9px 18px', background: `linear-gradient(135deg, ${css.accent}, #8b5cf6)`, border: 'none', borderRadius: 10, fontSize: 13, fontWeight: 700, color: '#fff', cursor: loading ? 'not-allowed' : 'pointer', boxShadow: `0 4px 14px ${css.accent}30`, transition: 'opacity 0.2s', opacity: loading ? 0.7 : 1 }}
          >
            <Save size={14} /> {loading ? 'Saving...' : 'Save Page'}
          </button>
        </div>
      </div>

      {/* Alert Notification */}
      {message && (
        <div style={{
          display: 'flex', alignItems: 'center', gap: 10,
          padding: '12px 16px', borderRadius: 12, marginBottom: 24,
          background: message.type === 'success' ? 'rgba(16,185,129,0.08)' : 'rgba(239,68,68,0.08)',
          border: `1px solid ${message.type === 'success' ? 'rgba(16,185,129,0.25)' : 'rgba(239,68,68,0.25)'}`,
          color: message.type === 'success' ? '#10b981' : '#ef4444',
        }}>
          {message.type === 'success' ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
          <span style={{ fontSize: 13, fontWeight: 600 }}>{message.text}</span>
          <button onClick={() => setMessage(null)} style={{ marginLeft: 'auto', background: 'none', border: 'none', cursor: 'pointer', color: 'inherit', padding: 2 }}><X size={14} /></button>
        </div>
      )}

      {previewMode ? (
        /* Live Render Preview */
        <div style={{ background: css.surface, border: `1px solid ${css.border}`, borderRadius: 20, padding: '40px 32px', boxShadow: css.shadow, minHeight: '60vh' }}>
          <h1 style={{ fontSize: 32, fontWeight: 900, color: css.text, margin: '0 0 12px' }}>{title || 'Untitled Dynamic Page'}</h1>
          {excerpt && <p style={{ fontSize: 16, color: css.muted, margin: '0 0 32px', fontStyle: 'italic', borderLeft: `3px solid ${css.accent}`, paddingLeft: 14 }}>{excerpt}</p>}
          <div 
            className="prose prose-slate dark:prose-invert max-w-none"
            style={{ fontSize: 15, lineHeight: 1.8 }}
            dangerouslySetInnerHTML={{ __html: content || '<p style="color:var(--muted)">Page content is empty. Switch back to Edit Mode to write content.</p>' }}
          />
        </div>
      ) : (
        /* Edit Form Controls */
        <form onSubmit={handleSave} style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 2fr) minmax(0, 1fr)', gap: 24, alignItems: 'start' }}>
          
          {/* Main Content Column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20, background: css.surface, border: `1px solid ${css.border}`, borderRadius: 20, padding: 24, boxShadow: css.shadow }}>
            <div>
              <label style={labelStyle}>Page Title</label>
              <input 
                type="text" 
                required 
                placeholder="e.g., About Me, FAQs, Services Landing" 
                value={title} 
                onChange={e => setTitle(e.target.value)}
                style={{ ...inputStyle, fontSize: 16, fontWeight: 700 }}
              />
            </div>

            <div>
              <label style={labelStyle}>Page Content (HTML supported)</label>
              <textarea 
                required 
                placeholder="Write page content here... HTML tags like <h1>, <p>, <ul>, and <strong> are fully rendered." 
                value={content} 
                onChange={e => setContent(e.target.value)}
                rows={18}
                style={{ ...inputStyle, resize: 'vertical', fontFamily: 'monospace', fontSize: 13, lineHeight: 1.6 }}
              />
            </div>
          </div>

          {/* Configuration Column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20, background: css.surface, border: `1px solid ${css.border}`, borderRadius: 20, padding: 24, boxShadow: css.shadow }}>
            <h4 style={{ fontSize: 14, fontWeight: 800, color: css.text, margin: '0 0 4px', borderBottom: `1px solid ${css.border}`, paddingBottom: 10 }}>Page Options</h4>
            
            <div>
              <label style={labelStyle}>Status</label>
              <select 
                value={published ? 'true' : 'false'} 
                onChange={e => setPublished(e.target.value === 'true')}
                style={inputStyle}
              >
                <option value="true">Published</option>
                <option value="false">Draft</option>
              </select>
            </div>

            <div>
              <label style={labelStyle}>URL Slug</label>
              <input 
                type="text" 
                required 
                placeholder="url-path-here" 
                value={slug} 
                onChange={e => setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-]+/g, '-'))}
                style={{ ...inputStyle, fontFamily: 'monospace' }}
              />
              <span style={{ fontSize: 11, color: css.muted, marginTop: 4, display: 'block' }}>
                Route: <code>/p/{slug || '...'}</code>
              </span>
            </div>

            <div>
              <label style={labelStyle}>Page Excerpt / Description</label>
              <textarea 
                placeholder="Brief meta description or lead summary..." 
                value={excerpt} 
                onChange={e => setExcerpt(e.target.value)}
                rows={4}
                style={{ ...inputStyle, resize: 'none', lineHeight: 1.5 }}
              />
            </div>
          </div>

        </form>
      )}
    </div>
  );
}

export default function PageEditor() {
  return (
    <Suspense fallback={<div style={{ padding: '64px', textAlign: 'center', fontWeight: 600 }}>Loading Page Editor...</div>}>
      <EditorContent />
    </Suspense>
  );
}
