'use client';
import { useEditorStore } from '@/store/editorStore';
import EditorCanvas from '@/components/editor/EditorCanvas';
import EditorSidebar from '@/components/editor/EditorSidebar';
import MainToolbar from '@/components/editor/MainToolbar';
import { ArrowLeft, Save, Eye, Send } from 'lucide-react';
import Link from 'next/link';
import { useEffect, Suspense, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useTheme } from '@/components/ThemeProvider';
import ThemeToggle from '@/components/ThemeToggle';

function EditorContent() {
  const { postMetadata, updatePostMetadata, blocks, setBlocks } = useEditorStore();
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const router = useRouter();
  const searchParams = useSearchParams();
  const editId = searchParams.get('id');
  const [previewMode, setPreviewMode] = useState(false);

  const css = isDark
    ? { bg: '#0a0f1e', surface: '#0f172a', surface2: '#1e293b', border: '#1e293b', text: '#f1f5f9', muted: '#64748b', accent: '#6366f1' }
    : { bg: '#f0f4ff', surface: '#ffffff', surface2: '#f8faff', border: '#e2e8f0', text: '#0f172a', muted: '#64748b', accent: '#4f46e5' };

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (editId) {
      const loadPost = async () => {
        setLoading(true);
        try {
          const res = await fetch(`/api/admin/blog/${editId}`);
          if (!res.ok) throw new Error('Failed to load post');
          const post = await res.json();
          if (post) {
            updatePostMetadata({
              title: post.title,
              slug: post.slug,
              excerpt: post.excerpt,
              categories: [post.category || 'Tech Trends'],
              status: post.published ? 'Published' : 'Draft',
              date: post.date,
              featuredImage: post.image || '',
            });
            if (post.blocks && Array.isArray(post.blocks)) {
              setBlocks(post.blocks);
            } else if (post.content) {
              setBlocks([{ id: `block-${Date.now()}`, type: 'paragraph', content: post.content, metadata: {} }]);
            }
          }
        } catch (err: any) {
          alert('Error loading post: ' + err.message);
        } finally {
          setLoading(false);
        }
      };
      loadPost();
    }
  }, [editId]);

  const handlePublish = async (status: 'Draft' | 'Published') => {
    const compiledContent = blocks.map(b => b.content).join('');
    const payload = {
      title: postMetadata.title || 'Untitled Post',
      slug: postMetadata.slug || (postMetadata.title || 'untitled-post').toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, ''),
      category: postMetadata.categories[0] || 'Tech Trends',
      excerpt: postMetadata.excerpt || '',
      content: compiledContent,
      blocks: blocks,
      image: postMetadata.featuredImage || '/images/blog/bi-career.png',
      date: postMetadata.date || new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      published: status === 'Published',
    };

    try {
      setLoading(true);
      const url = editId ? `/api/admin/blog/${editId}` : '/api/admin/blog';
      const method = editId ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || 'Failed to save post');
      }

      router.push('/admin/blog');
    } catch (err: any) {
      alert(err.message || 'Error saving post');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', background: previewMode ? css.surface : css.bg, color: css.text, transition: 'background 0.3s' }}>

      {/* Top bar */}
      {!previewMode && (
        <header style={{
          height: 56, background: css.surface, borderBottom: `1px solid ${css.border}`,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '0 20px', flexShrink: 0, zIndex: 20,
          boxShadow: isDark ? '0 1px 0 rgba(255,255,255,0.03)' : '0 1px 0 rgba(0,0,0,0.04)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <Link href="/admin/blog" style={{ color: css.muted, display: 'flex', alignItems: 'center', transition: 'color 0.15s' }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = css.text}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = css.muted}
            >
              <ArrowLeft size={20} />
            </Link>
            <div style={{ width: 1, height: 24, background: css.border }} />
            <MainToolbar />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <ThemeToggle />
            <button onClick={() => setPreviewMode(true)} style={{ display: 'flex', alignItems: 'center', gap: 7, padding: '8px 14px', background: css.surface2, border: `1px solid ${css.border}`, borderRadius: 10, fontSize: 13, fontWeight: 600, color: css.muted, cursor: 'pointer', transition: 'all 0.15s' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = css.text; (e.currentTarget as HTMLElement).style.borderColor = css.accent; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = css.muted; (e.currentTarget as HTMLElement).style.borderColor = css.border; }}
            >
              <Eye size={15} /> Preview
            </button>
            <button onClick={() => handlePublish('Draft')} style={{ display: 'flex', alignItems: 'center', gap: 7, padding: '8px 14px', background: 'none', border: `1px solid ${css.border}`, borderRadius: 10, fontSize: 13, fontWeight: 600, color: css.muted, cursor: 'pointer', transition: 'all 0.15s' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = css.text; (e.currentTarget as HTMLElement).style.background = css.surface2; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = css.muted; (e.currentTarget as HTMLElement).style.background = 'none'; }}
            >
              <Save size={15} /> Save Draft
            </button>
            <button onClick={() => handlePublish('Published')} style={{ display: 'flex', alignItems: 'center', gap: 7, padding: '8px 18px', background: `linear-gradient(135deg, ${css.accent}, #8b5cf6)`, border: 'none', borderRadius: 10, fontSize: 13, fontWeight: 700, color: '#fff', cursor: 'pointer', boxShadow: `0 4px 12px ${css.accent}40` }}>
              <Send size={15} /> Publish
            </button>
          </div>
        </header>
      )}

      {/* Exit preview button */}
      {previewMode && (
        <button onClick={() => setPreviewMode(false)} style={{ position: 'fixed', top: 24, left: '50%', transform: 'translateX(-50%)', padding: '10px 24px', background: isDark ? '#1e293b' : '#0f172a', color: '#fff', fontWeight: 700, borderRadius: 999, boxShadow: '0 8px 24px rgba(0,0,0,0.3)', zIndex: 50, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8, fontSize: 13 }}>
          <Eye size={15} /> Exit Preview
        </button>
      )}

      {/* Main workspace */}
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        <main style={{ flex: 1, overflowY: 'auto', background: css.bg, padding: previewMode ? '60px 40px' : '40px 40px' }}>
          <div style={{ maxWidth: previewMode ? 860 : 800, margin: '0 auto' }}>
            {!previewMode && (
              <div style={{ marginBottom: 24, paddingBottom: 24, borderBottom: `1px solid ${css.border}` }}>
                <input
                  type="text"
                  placeholder="Post Title..."
                  value={postMetadata.title}
                  onChange={e => updatePostMetadata({ title: e.target.value })}
                  style={{ width: '100%', fontSize: '2.4rem', fontWeight: 900, background: 'none', border: 'none', outline: 'none', color: css.text, letterSpacing: '-0.03em', lineHeight: 1.2, fontFamily: "'Inter', sans-serif" }}
                />
              </div>
            )}
            <div style={{ background: css.surface, borderRadius: 16, border: `1px solid ${css.border}`, padding: '32px 40px', minHeight: 'calc(100vh - 300px)', boxShadow: isDark ? '0 4px 24px rgba(0,0,0,0.35)' : '0 4px 24px rgba(0,0,0,0.06)' }}>
              <EditorCanvas />
            </div>
          </div>
        </main>
        {!previewMode && <EditorSidebar />}
      </div>
    </div>
  );
}

export default function AdvancedEditorPage() {
  return (
    <Suspense fallback={<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>Loading editor...</div>}>
      <EditorContent />
    </Suspense>
  );
}
