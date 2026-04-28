import { useEditorStore } from '@/store/editorStore';
import { Settings, Image as ImageIcon, Box, LayoutPanelLeft } from 'lucide-react';
import { useState } from 'react';

export default function EditorSidebar() {
  const { postMetadata, updatePostMetadata, blocks, activeBlockId, updateBlock } = useEditorStore();
  const [tab, setTab] = useState<'post' | 'block'>('post');

  const activeBlock = blocks.find(b => b.id === activeBlockId);

  return (
    <aside className="w-[320px] shrink-0 border-l border-slate-200 bg-white h-full overflow-y-auto flex-col hidden lg:flex shadow-[-4px_0_24px_rgba(0,0,0,0.02)] z-10 relative">
      <div className="flex border-b border-slate-100 sticky top-0 bg-white/80 backdrop-blur-md z-10">
        <button 
          onClick={() => setTab('post')}
          className={`flex-1 p-4 flex items-center justify-center gap-2 text-sm font-semibold transition-colors ${tab === 'post' ? 'text-slate-900 border-b-2 border-slate-900' : 'text-slate-500 hover:text-slate-700'}`}
        >
          <Settings size={16} /> Post
        </button>
        <button 
          onClick={() => setTab('block')}
          className={`flex-1 p-4 flex items-center justify-center gap-2 text-sm font-semibold transition-colors ${tab === 'block' ? 'text-slate-900 border-b-2 border-slate-900' : 'text-slate-500 hover:text-slate-700'}`}
        >
          <Box size={16} /> Block
        </button>
      </div>

      <div className="p-5 flex flex-col gap-6">
        {tab === 'post' ? (
          <>

        {/* Status */}
        <div className="flex flex-col gap-2">
          <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Status</label>
          <select 
            value={postMetadata.status}
            onChange={(e) => updatePostMetadata({ status: e.target.value as any })}
            className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm font-medium text-slate-700 outline-none focus:border-slate-400 transition-colors"
          >
            <option value="Draft">Draft</option>
            <option value="Published">Published</option>
            <option value="Scheduled">Scheduled</option>
          </select>
        </div>

        {/* URL Slug */}
        <div className="flex flex-col gap-2">
          <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">URL Slug</label>
          <input 
            type="text" 
            value={postMetadata.slug}
            onChange={(e) => updatePostMetadata({ slug: e.target.value })}
            placeholder="my-awesome-post"
            className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 outline-none focus:border-slate-400 transition-colors font-mono"
          />
        </div>

        {/* Featured Image */}
        <div className="flex flex-col gap-2">
          <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Featured Image</label>
          <div className="w-full h-32 border-2 border-dashed border-slate-300 rounded-xl bg-slate-50 flex flex-col items-center justify-center text-slate-400 cursor-pointer hover:bg-slate-100 hover:border-slate-400 transition-all">
            <ImageIcon size={24} className="mb-2" />
            <span className="text-xs font-medium">Click or drag to upload</span>
          </div>
        </div>

        {/* Categories */}
        <div className="flex flex-col gap-2">
          <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Categories</label>
          <div className="flex flex-wrap gap-2">
            {['Technology', 'Business', 'Design'].map(cat => (
              <label key={cat} className="flex items-center gap-2 text-sm text-slate-700 cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={postMetadata.categories.includes(cat)}
                  onChange={(e) => {
                    const newCats = e.target.checked 
                      ? [...postMetadata.categories, cat]
                      : postMetadata.categories.filter(c => c !== cat);
                    updatePostMetadata({ categories: newCats });
                  }}
                  className="rounded border-slate-300 text-slate-900 focus:ring-slate-900"
                />
                {cat}
              </label>
            ))}
          </div>
        </div>

        {/* Excerpt */}
        <div className="flex flex-col gap-2">
          <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Excerpt</label>
          <textarea 
            value={postMetadata.excerpt}
            onChange={(e) => updatePostMetadata({ excerpt: e.target.value })}
            placeholder="Brief summary of the post..."
            rows={4}
            className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 outline-none focus:border-slate-400 transition-colors resize-none"
          />
        </div>

        {/* Author */}
        <div className="flex flex-col gap-2">
          <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Author</label>
          <select className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm font-medium text-slate-700 outline-none focus:border-slate-400 transition-colors">
            <option value="Datta Sable">Datta Sable (Admin)</option>
            <option value="Guest">Guest Contributor</option>
          </select>
        </div>

        {/* Publish Date */}
        <div className="flex flex-col gap-2">
          <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Publish Date</label>
          <input 
            type="datetime-local" 
            value={postMetadata.date ? new Date(postMetadata.date).toISOString().slice(0, 16) : ''}
            onChange={(e) => updatePostMetadata({ date: new Date(e.target.value).toISOString() })}
            className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 outline-none focus:border-slate-400 transition-colors"
          />
        </div>

        {/* Tags */}
        <div className="flex flex-col gap-2">
          <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Tags (Comma separated)</label>
          <input 
            type="text" 
            placeholder="e.g. Next.js, React, Data..."
            value={postMetadata.tags.join(', ')}
            onChange={(e) => updatePostMetadata({ tags: e.target.value.split(',').map(t => t.trim()).filter(Boolean) })}
            className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 outline-none focus:border-slate-400 transition-colors"
          />
        </div>

        {/* SEO Settings */}
        <div className="pt-4 mt-4 border-t border-slate-200 flex flex-col gap-4">
          <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">SEO Optimization</h4>
          
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Meta Title</label>
            <input 
              type="text" 
              placeholder="Leave blank to use post title"
              value={postMetadata.metaTitle}
              onChange={(e) => updatePostMetadata({ metaTitle: e.target.value })}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 outline-none focus:border-slate-400 transition-colors"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Meta Description</label>
            <textarea 
              rows={3}
              placeholder="Search engine summary..."
              value={postMetadata.metaDesc}
              onChange={(e) => updatePostMetadata({ metaDesc: e.target.value })}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 outline-none focus:border-slate-400 transition-colors resize-none"
            />
          </div>
        </div>
        </>
      ) : (
        <>
          {!activeBlock ? (
              <div className="flex flex-col items-center justify-center py-10 text-slate-400 text-center gap-3">
                <LayoutPanelLeft size={32} />
                <span className="text-sm">Select a block on the canvas to edit its properties.</span>
              </div>
            ) : (
              <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-right-4 duration-300">
                <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg flex items-center gap-3">
                  <div className="w-8 h-8 rounded bg-slate-900 text-white flex items-center justify-center font-bold uppercase text-xs">
                    {activeBlock.type.substring(0, 2)}
                  </div>
                  <div>
                    <div className="text-sm font-bold text-slate-900 capitalize">{activeBlock.type} Block</div>
                    <div className="text-xs text-slate-500">ID: {activeBlock.id.split('-')[1]}</div>
                  </div>
                </div>

                {/* Padding */}
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Padding (rem)</label>
                  <input 
                    type="number" 
                    step="0.5"
                    value={activeBlock.metadata?.padding || 0}
                    onChange={(e) => updateBlock(activeBlock.id, { metadata: { ...activeBlock.metadata, padding: e.target.value } })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 outline-none focus:border-slate-400 transition-colors"
                  />
                </div>

                {/* Width */}
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Width</label>
                  <select 
                    value={activeBlock.metadata?.width || 'contained'}
                    onChange={(e) => updateBlock(activeBlock.id, { metadata: { ...activeBlock.metadata, width: e.target.value } })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm font-medium text-slate-700 outline-none focus:border-slate-400 transition-colors"
                  >
                    <option value="contained">Contained</option>
                    <option value="full">Full Width</option>
                    <option value="wide">Wide</option>
                  </select>
                </div>

                {/* Custom CSS Class */}
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Custom CSS Class</label>
                  <input 
                    type="text" 
                    placeholder="e.g. shadow-lg rounded-xl"
                    value={activeBlock.metadata?.cssClass || ''}
                    onChange={(e) => updateBlock(activeBlock.id, { metadata: { ...activeBlock.metadata, cssClass: e.target.value } })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 outline-none focus:border-slate-400 transition-colors font-mono"
                  />
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </aside>
  );
}
