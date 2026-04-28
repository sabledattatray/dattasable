import { EditorBlock, useEditorStore } from '@/store/editorStore';
import { Image as ImageIcon, Trash2, UploadCloud } from 'lucide-react';
import { useState, useRef } from 'react';

export default function ImageBlock({ block, isActive }: { block: EditorBlock; isActive: boolean }) {
  const { updateBlock } = useEditorStore();
  const [url, setUrl] = useState(block.metadata?.url || '');
  const [alt, setAlt] = useState(block.metadata?.alt || '');
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSave = () => {
    updateBlock(block.id, { metadata: { ...block.metadata, url, alt } });
  };

  const handleFileUpload = (file: File) => {
    if (!file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      updateBlock(block.id, { metadata: { ...block.metadata, url: result, alt: file.name } });
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  return (
    <div className={`w-full rounded-xl overflow-hidden transition-all ${isActive ? 'ring-2 ring-slate-900 shadow-md' : 'border border-transparent'}`}>
      {block.metadata?.url ? (
        <div className="relative group flex flex-col gap-2">
          <div className="relative w-full rounded-xl overflow-hidden">
            <img src={block.metadata.url} alt={block.metadata.alt || 'Block image'} className="w-full h-auto object-cover" />
            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
              <button 
                onClick={() => updateBlock(block.id, { metadata: { ...block.metadata, url: '' } })}
                className="p-2 bg-white rounded-lg shadow text-slate-700 hover:text-red-500"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
          {isActive && (
            <input 
              type="text" 
              placeholder="Alt text..." 
              value={alt}
              onChange={(e) => {
                setAlt(e.target.value);
                updateBlock(block.id, { metadata: { ...block.metadata, url: block.metadata.url, alt: e.target.value } });
              }}
              className="w-full px-3 py-1.5 text-xs border border-slate-200 rounded outline-none focus:border-slate-400 text-center text-slate-500 bg-slate-50"
            />
          )}
        </div>
      ) : (
        <div 
          className={`w-full h-56 border-2 border-dashed rounded-xl flex flex-col items-center justify-center p-6 transition-colors ${isDragging ? 'border-blue-500 bg-blue-50 text-blue-500' : 'border-slate-300 bg-slate-100 text-slate-500'}`}
          onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
        >
          {isDragging ? <UploadCloud size={40} className="mb-4" /> : <ImageIcon size={32} className="mb-4 text-slate-400" />}
          
          <div className="flex flex-col items-center gap-4 w-full max-w-sm">
            <button 
              onClick={() => fileInputRef.current?.click()}
              className="px-4 py-2 bg-slate-900 text-white text-sm font-semibold rounded-lg hover:bg-slate-800"
            >
              Upload Image
            </button>
            <input 
              type="file" 
              accept="image/*" 
              className="hidden" 
              ref={fileInputRef}
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) handleFileUpload(e.target.files[0]);
              }}
            />
            
            <div className="flex items-center gap-2 w-full">
              <div className="h-px bg-slate-300 flex-1"></div>
              <span className="text-xs text-slate-400 font-bold uppercase">OR PASTE URL</span>
              <div className="h-px bg-slate-300 flex-1"></div>
            </div>

            <div className="flex w-full gap-2">
              <input 
                type="text" 
                placeholder="https://..." 
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="flex-1 px-4 py-2 text-sm border border-slate-300 rounded-lg outline-none focus:border-slate-500 bg-white"
              />
              <button 
                onClick={handleSave}
                className="px-4 py-2 bg-slate-200 text-slate-700 text-sm font-semibold rounded-lg hover:bg-slate-300"
              >
                Embed
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
