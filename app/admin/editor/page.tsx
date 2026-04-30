'use client';
import { useEditorStore } from '@/store/editorStore';
import EditorCanvas from '@/components/editor/EditorCanvas';
import EditorSidebar from '@/components/editor/EditorSidebar';
import MainToolbar from '@/components/editor/MainToolbar';
import { ArrowLeft, Save, Eye, Send } from 'lucide-react';
import Link from 'next/link';
import { useEffect, Suspense, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

function EditorContent() {
  const { postMetadata, updatePostMetadata, blocks, setBlocks } = useEditorStore();
  const router = useRouter();
  const searchParams = useSearchParams();
  const editId = searchParams.get('id');

  // Load existing post if editId is present
  useEffect(() => {
    if (editId) {
      const saved = localStorage.getItem('admin_posts');
      if (saved) {
        const posts = JSON.parse(saved);
        const post = posts.find((p: any) => p.id.toString() === editId);
        if (post) {
          updatePostMetadata({
            title: post.title,
            slug: post.slug,
            excerpt: post.excerpt,
            categories: [post.category || 'Tech Trends'],
            status: post.status,
            date: post.date,
            featuredImage: post.image || '',
          });
          // Hydrate blocks from content
          if (post.blocks && post.blocks.length > 0) {
            setBlocks(post.blocks);
          } else if (post.content) {
            setBlocks([{ id: `block-${Date.now()}`, type: 'paragraph', content: post.content }]);
          }
        }
      }
    }
  }, [editId]);

  const handlePublish = (status: 'Draft' | 'Published') => {
    const saved = localStorage.getItem('admin_posts');
    const posts = saved ? JSON.parse(saved) : [];
    
    // Compile content from blocks
    const compiledContent = blocks.map(b => b.content).join('');

    const postData = {
      id: editId ? parseInt(editId) : Date.now(),
      title: postMetadata.title || 'Untitled Post',
      slug: postMetadata.slug || (postMetadata.title || 'untitled-post').toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, ''),
      category: postMetadata.categories[0] || 'Tech Trends',
      status: status,
      date: postMetadata.date,
      views: editId ? posts.find((p:any) => p.id.toString() === editId)?.views : '0',
      excerpt: postMetadata.excerpt,
      content: compiledContent,
      blocks: blocks,
      image: postMetadata.featuredImage || '/images/blog/bi-career.png'
    };

    let updatedPosts;
    if (editId) {
      updatedPosts = posts.map((p: any) => p.id.toString() === editId ? postData : p);
    } else {
      updatedPosts = [postData, ...posts];
    }

    localStorage.setItem('admin_posts', JSON.stringify(updatedPosts));
    router.push('/admin/blog');
  };

  const [previewMode, setPreviewMode] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      // Auto-save logic could go here
    }, 30000);
    return () => clearInterval(timer);
  }, []);


  return (
    <div className={`flex flex-col h-screen ${previewMode ? 'bg-white' : 'bg-[#f8fafc]'} text-slate-900 transition-colors`}>
      {/* Top Navbar */}
      <header className={`h-16 border-b border-slate-200 bg-white shadow-sm flex items-center justify-between px-6 shrink-0 z-20 ${previewMode ? 'hidden' : 'flex'}`}>
        <div className="flex items-center gap-4">
          <Link href="/admin/blog" className="text-slate-400 hover:text-slate-600 transition-colors">
            <ArrowLeft size={20} />
          </Link>
          <div className="w-px h-6 bg-slate-200 mx-1"></div>
          <MainToolbar />
        </div>

        <div className="flex items-center gap-3">
          <button 
            onClick={() => setPreviewMode(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors"
          >
            <Eye size={16} /> Preview
          </button>
          <button 
            onClick={() => handlePublish('Draft')}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <Save size={16} /> Save Draft
          </button>
          <button 
            onClick={() => handlePublish('Published')}
            className="flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-bold bg-slate-900 text-white hover:bg-slate-800 transition-colors shadow-sm"
          >
            <Send size={16} /> Publish
          </button>
        </div>
      </header>

      {/* Floating Exit Preview Button */}
      {previewMode && (
        <button 
          onClick={() => setPreviewMode(false)}
          className="fixed top-6 left-1/2 -translate-x-1/2 px-6 py-2 bg-slate-900 text-white font-bold rounded-full shadow-2xl z-50 hover:bg-slate-800 transition-transform hover:scale-105 flex items-center gap-2 text-sm"
        >
          <Eye size={16} /> Exit Preview Mode
        </button>
      )}

      {/* Main Workspace */}
      <div className="flex flex-1 overflow-hidden">
        {/* Editor Area */}
        <main className={`flex-1 overflow-y-auto relative scroll-smooth bg-slate-50/30 ${previewMode ? 'max-w-5xl mx-auto w-full' : ''}`}>
          <div className="p-6 lg:p-10">
            {!previewMode && (
              <div className="max-w-4xl mx-auto mb-6">
                <div className="mb-6 pb-6 border-b border-slate-300 mt-4">
                  <input 
                    type="text" 
                    placeholder="Post Title..."
                    value={postMetadata.title}
                    onChange={(e) => updatePostMetadata({ title: e.target.value })}
                    className="w-full text-4xl font-extrabold text-slate-900 bg-transparent outline-none placeholder:text-slate-400 font-syne"
                  />
                </div>
              </div>
            )}
            
            <div className={`${previewMode ? 'max-w-none' : 'max-w-4xl'} mx-auto bg-white rounded-xl shadow-sm border border-slate-200 p-8 lg:p-12 min-h-[calc(100vh-250px)]`}>
              <EditorCanvas />
            </div>
          </div>
        </main>

        {/* Settings Sidebar */}
        {!previewMode && <EditorSidebar />}
      </div>
    </div>
  );
}

export default function AdvancedEditorPage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center h-screen">Loading editor...</div>}>
      <EditorContent />
    </Suspense>
  );
}
