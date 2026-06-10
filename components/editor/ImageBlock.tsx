import { EditorBlock, useEditorStore } from '@/store/editorStore';
import { Image as ImageIcon, Trash2, UploadCloud } from 'lucide-react';
import { useState, useRef } from 'react';
import Image from 'next/image';


export default function ImageBlock({ block, isActive }: { block: EditorBlock; isActive: boolean }) {
  const { updateBlock } = useEditorStore();
  const [url, setUrl] = useState(block.metadata?.url || '');
  const [alt, setAlt] = useState(block.metadata?.alt || '');
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSave = () => {
    updateBlock(block.id, { metadata: { ...block.metadata, url, alt } });
  };

  const handleFileUpload = async (file: File) => {
    if (!file.type.startsWith('image/')) return;
    try {
      const formData = new FormData();
      formData.append('file', file);

      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || 'Upload failed');
      }

      const data = await res.json();
      updateBlock(block.id, { metadata: { ...block.metadata, url: data.url, alt: file.name } });
    } catch (err: any) {
      alert('Failed to upload image: ' + err.message);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  return (
    <div className={`w-full rounded-xl overflow-hidden transition-all ${isActive ? 'ring-2 ring-slate-900 dark:ring-slate-100 shadow-md' : 'border border-transparent'}`}>
      {block.metadata?.url ? (
        <div className="relative group flex flex-col gap-2">
          <div className="relative w-full rounded-xl overflow-hidden" style={{ minHeight: '300px' }}>

            <Image 
              src={block.metadata.url} 
              alt={block.metadata.alt || 'Block image'} 
              fill
              style={{ objectFit: 'cover' }} 
            />

            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
              <button 
                onClick={() => updateBlock(block.id, { metadata: { ...block.metadata, url: '' } })}
                className="p-2 bg-white dark:bg-slate-800 rounded-lg shadow text-slate-700 dark:text-slate-200 hover:text-red-500 dark:hover:text-red-400"
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
              className="w-full px-3 py-1.5 text-xs bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 border border-slate-200 dark:border-slate-850 rounded outline-none focus:border-slate-400 dark:focus:border-slate-600 text-center text-slate-500 dark:text-slate-400"
            />
          )}
        </div>
      ) : (
        <div 
          className={`w-full h-56 border-2 border-dashed rounded-xl flex flex-col items-center justify-center p-6 transition-colors ${isDragging ? 'border-blue-500 bg-blue-50 dark:bg-blue-950/20 text-blue-500' : 'border-slate-300 dark:border-slate-800 bg-slate-100 dark:bg-slate-900 text-slate-500'}`}
          onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
        >
          {isDragging ? <UploadCloud size={40} className="mb-4" /> : <ImageIcon size={32} className="mb-4 text-slate-400 dark:text-slate-500" />}
          
          <div className="flex flex-col items-center gap-4 w-full max-w-sm">
            <button 
              onClick={() => fileInputRef.current?.click()}
              className="px-4 py-2 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 text-sm font-semibold rounded-lg hover:bg-slate-800 dark:hover:bg-slate-200"
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
              <div className="h-px bg-slate-300 dark:bg-slate-800 flex-1"></div>
              <span className="text-xs text-slate-400 font-bold uppercase">OR PASTE URL</span>
              <div className="h-px bg-slate-300 dark:bg-slate-800 flex-1"></div>
            </div>

            <div className="flex w-full gap-2">
              <input 
                type="text" 
                placeholder="https://..." 
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="flex-1 px-4 py-2 text-sm bg-transparent text-slate-900 dark:text-slate-100 border border-slate-300 dark:border-slate-800 rounded-lg outline-none focus:border-slate-500 dark:focus:border-slate-500"
              />
              <button 
                onClick={handleSave}
                className="px-4 py-2 bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-250 text-sm font-semibold rounded-lg hover:bg-slate-300 dark:hover:bg-slate-700"
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
