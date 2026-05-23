import { EditorBlock, useEditorStore } from '@/store/editorStore';
import { LayoutGrid, Plus, Trash2 } from 'lucide-react';
import { useState } from 'react';
import Image from 'next/image';


export default function GalleryBlock({ block, isActive }: { block: EditorBlock; isActive: boolean }) {
  const { updateBlock } = useEditorStore();
  const [images, setImages] = useState<string[]>(block.metadata?.images || []);
  const [newUrl, setNewUrl] = useState('');

  const handleAdd = () => {
    if (!newUrl) return;
    const newImages = [...images, newUrl];
    setImages(newImages);
    updateBlock(block.id, { metadata: { ...block.metadata, images: newImages } });
    setNewUrl('');
  };

  const handleRemove = (idx: number) => {
    const newImages = images.filter((_, i) => i !== idx);
    setImages(newImages);
    updateBlock(block.id, { metadata: { ...block.metadata, images: newImages } });
  };

  return (
    <div className={`w-full rounded-xl overflow-hidden transition-all bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 ${isActive ? 'ring-2 ring-slate-900 dark:ring-slate-100 shadow-md' : ''}`}>
      {images.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
          {images.map((img, idx) => (
            <div key={idx} className="relative group aspect-square rounded-lg overflow-hidden border border-slate-200 dark:border-slate-800">
              <Image 
                src={img} 
                alt={`Gallery image ${idx + 1}`} 
                fill
                style={{ objectFit: 'cover' }} 
              />

              {isActive && (
                <button 
                  onClick={() => handleRemove(idx)}
                  className="absolute top-2 right-2 p-1.5 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded text-slate-700 dark:text-slate-200 hover:text-red-500 dark:hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Trash2 size={14} />
                </button>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="w-full h-32 bg-slate-50 dark:bg-slate-950 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-xl flex flex-col items-center justify-center text-slate-400 dark:text-slate-500 mb-4">
          <LayoutGrid size={24} className="mb-2" />
          <span className="text-sm">Empty Gallery</span>
        </div>
      )}

      {isActive && (
        <div className="flex w-full gap-2 mt-2 pt-4 border-t border-slate-100 dark:border-slate-800">
          <input 
            type="text" 
            placeholder="Add image URL to gallery..." 
            value={newUrl}
            onChange={(e) => setNewUrl(e.target.value)}
            className="flex-1 px-3 py-2 text-sm border border-slate-300 dark:border-slate-800 rounded-lg outline-none focus:border-slate-500 dark:focus:border-slate-500 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100"
            onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
          />
          <button 
            onClick={handleAdd}
            className="flex items-center gap-1 px-4 py-2 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 text-sm font-semibold rounded-lg hover:bg-slate-800 dark:hover:bg-slate-200"
          >
            <Plus size={16} /> Add Image
          </button>
        </div>
      )}
    </div>
  );
}
