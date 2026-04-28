import { EditorBlock, useEditorStore } from '@/store/editorStore';
import { Link as LinkIcon, Settings2 } from 'lucide-react';
import { useState } from 'react';

export default function ButtonBlock({ block, isActive }: { block: EditorBlock; isActive: boolean }) {
  const { updateBlock } = useEditorStore();
  const [label, setLabel] = useState(block.metadata?.label || 'Click Here');
  const [url, setUrl] = useState(block.metadata?.url || '');
  const [style, setStyle] = useState(block.metadata?.style || 'primary'); // primary, outline, subtle

  const handleUpdate = (updates: any) => {
    updateBlock(block.id, { metadata: { ...block.metadata, label, url, style, ...updates } });
  };

  return (
    <div className={`w-full relative flex py-4 transition-all ${isActive ? 'bg-slate-50 rounded-xl px-4 ring-2 ring-slate-900 shadow-sm' : ''}`}>
      {isActive && (
        <div className="absolute -top-12 left-0 bg-white border border-slate-200 rounded-lg shadow-xl p-2 flex gap-3 z-50 items-center">
          <div className="flex items-center gap-2">
            <LinkIcon size={14} className="text-slate-400" />
            <input 
              type="text" 
              placeholder="https://" 
              value={url}
              onChange={(e) => {
                setUrl(e.target.value);
                handleUpdate({ url: e.target.value });
              }}
              className="w-48 px-2 py-1 text-sm outline-none border border-slate-200 rounded focus:border-slate-400"
            />
          </div>
          <div className="w-px h-4 bg-slate-200"></div>
          <div className="flex gap-1">
            {['primary', 'outline', 'subtle'].map(s => (
              <button
                key={s}
                onClick={() => {
                  setStyle(s);
                  handleUpdate({ style: s });
                }}
                className={`px-2 py-1 text-xs font-semibold rounded-md capitalize transition-colors ${style === s ? 'bg-slate-100 text-slate-900' : 'text-slate-500 hover:bg-slate-50'}`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      )}
      
      <div className="flex items-center">
        {isActive ? (
          <input 
            type="text"
            value={label}
            onChange={(e) => {
              setLabel(e.target.value);
              handleUpdate({ label: e.target.value });
            }}
            className={`
              px-6 py-3 font-semibold text-center outline-none transition-all
              ${style === 'primary' ? 'bg-slate-900 text-white rounded-xl' : ''}
              ${style === 'outline' ? 'bg-transparent border-2 border-slate-900 text-slate-900 rounded-xl' : ''}
              ${style === 'subtle' ? 'bg-slate-100 text-slate-900 rounded-xl hover:bg-slate-200' : ''}
            `}
            style={{ minWidth: '120px' }}
          />
        ) : (
          <a 
            href={url || '#'}
            onClick={(e) => e.preventDefault()}
            className={`
              inline-block px-6 py-3 font-semibold text-center transition-all cursor-pointer
              ${style === 'primary' ? 'bg-slate-900 text-white rounded-xl' : ''}
              ${style === 'outline' ? 'bg-transparent border-2 border-slate-900 text-slate-900 rounded-xl' : ''}
              ${style === 'subtle' ? 'bg-slate-100 text-slate-900 rounded-xl hover:bg-slate-200' : ''}
            `}
          >
            {label}
          </a>
        )}
      </div>
    </div>
  );
}
