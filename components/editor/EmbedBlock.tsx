import { EditorBlock, useEditorStore } from '@/store/editorStore';
import { Share2, Trash2, MessageCircle, Globe } from 'lucide-react';
import { useState } from 'react';

export default function EmbedBlock({ block, isActive }: { block: EditorBlock; isActive: boolean }) {
  const { updateBlock } = useEditorStore();
  const [url, setUrl] = useState(block.metadata?.url || '');
  const [platform, setPlatform] = useState(block.metadata?.platform || 'auto');

  const handleSave = () => {
    // Detect platform if auto
    let detected = platform;
    if (platform === 'auto') {
      if (url.includes('twitter.com') || url.includes('x.com')) detected = 'twitter';
      else if (url.includes('linkedin.com')) detected = 'linkedin';
      else if (url.includes('github.com')) detected = 'github';
      else detected = 'website';
    }
    updateBlock(block.id, { metadata: { ...block.metadata, url, platform: detected } });
  };

  const renderPreview = () => {
    const plat = block.metadata?.platform;
    return (
      <div className="flex flex-col items-center justify-center p-8 bg-slate-50 border border-slate-200 rounded-xl relative group">
        <div className="flex items-center gap-3 mb-2 text-slate-700 font-bold">
          {plat === 'twitter' && <MessageCircle className="text-blue-400" />}
          {plat === 'linkedin' && <Share2 className="text-blue-700" />}
          {plat === 'github' && <Globe className="text-slate-900" />}
          <span className="capitalize">{plat} Embed Placeholder</span>
        </div>
        <a href={block.metadata.url} target="_blank" rel="noreferrer" className="text-sm text-blue-500 hover:underline">
          {block.metadata.url}
        </a>
        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button 
            onClick={() => updateBlock(block.id, { metadata: { ...block.metadata, url: '' } })}
            className="p-2 bg-white rounded-lg shadow text-slate-700 hover:text-red-500"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className={`w-full rounded-xl overflow-hidden transition-all ${isActive ? 'ring-2 ring-slate-900 shadow-md' : 'border border-transparent'}`}>
      {block.metadata?.url ? (
        renderPreview()
      ) : (
        <div className="w-full h-48 bg-slate-100 border-2 border-dashed border-slate-300 rounded-xl flex flex-col items-center justify-center p-6 text-slate-500">
          <Share2 size={32} className="mb-4 text-slate-400" />
          <div className="flex w-full max-w-lg gap-2">
            <select 
              value={platform} 
              onChange={(e) => setPlatform(e.target.value)}
              className="px-3 py-2 text-sm border border-slate-300 rounded-lg outline-none focus:border-slate-500 bg-white"
            >
              <option value="auto">Auto-detect</option>
              <option value="twitter">Twitter / X</option>
              <option value="linkedin">LinkedIn</option>
              <option value="github">GitHub</option>
            </select>
            <input 
              type="text" 
              placeholder="Paste social link..." 
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="flex-1 px-4 py-2 text-sm border border-slate-300 rounded-lg outline-none focus:border-slate-500"
            />
            <button 
              onClick={handleSave}
              className="px-4 py-2 bg-slate-900 text-white text-sm font-semibold rounded-lg hover:bg-slate-800"
            >
              Embed
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
