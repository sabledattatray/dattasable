import { EditorBlock, useEditorStore } from '@/store/editorStore';
import { Video, Trash2 } from 'lucide-react';
import { useState } from 'react';

export default function VideoBlock({ block, isActive }: { block: EditorBlock; isActive: boolean }) {
  const { updateBlock } = useEditorStore();
  const metadata = block.metadata as any;
  const [url, setUrl] = useState(metadata?.url || '');

  const handleSave = () => {
    // Basic YouTube conversion for demonstration
    let embedUrl = url;
    if (url.includes('youtube.com/watch?v=')) {
      embedUrl = url.replace('watch?v=', 'embed/');
    } else if (url.includes('youtu.be/')) {
      embedUrl = url.replace('youtu.be/', 'youtube.com/embed/');
    }
    updateBlock(block.id, { metadata: { ...block.metadata, url: embedUrl } });
  };

  return (
    <div className={`w-full rounded-xl overflow-hidden transition-all ${isActive ? 'ring-2 ring-slate-900 shadow-md' : 'border border-transparent'}`}>
      {block.metadata?.url ? (
        <div className="relative group w-full aspect-video">
          <iframe 
            src={metadata?.url} 
            className="w-full h-full border-none rounded-xl"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
          <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2 z-10">
            <button 
              onClick={() => updateBlock(block.id, { metadata: { ...block.metadata, url: '' } })}
              className="p-2 bg-white rounded-lg shadow text-slate-700 hover:text-red-500"
            >
              <Trash2 size={16} />
            </button>
          </div>
        </div>
      ) : (
        <div className="w-full h-48 bg-slate-100 border-2 border-dashed border-slate-300 rounded-xl flex flex-col items-center justify-center p-6 text-slate-500">
          <Video size={32} className="mb-4 text-slate-400" />
          <div className="flex w-full max-w-sm gap-2">
            <input 
              type="text" 
              placeholder="Paste YouTube or Vimeo URL..." 
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
