import { EditorBlock, useEditorStore } from '@/store/editorStore';
import { Code2, Eye, Code } from 'lucide-react';
import { useState } from 'react';

export default function HTMLBlock({ block, isActive }: { block: EditorBlock; isActive: boolean }) {
  const { updateBlock } = useEditorStore();
  const [html, setHtml] = useState(block.metadata?.html || '<!-- Enter custom HTML here -->');
  const [mode, setMode] = useState<'edit' | 'preview'>('edit');

  const handleUpdate = (val: string) => {
    setHtml(val);
    updateBlock(block.id, { metadata: { ...block.metadata, html: val } });
  };

  return (
    <div className={`w-full rounded-xl overflow-hidden transition-all bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 ${isActive ? 'ring-2 ring-slate-900 dark:ring-slate-100 shadow-md' : ''}`}>
      <div className="flex items-center justify-between px-4 py-2 bg-slate-50 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-2 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
          <Code2 size={16} /> Custom HTML
        </div>
        <div className="flex bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 overflow-hidden shadow-sm p-0.5">
          <button 
            onClick={() => setMode('edit')}
            className={`flex items-center gap-1 px-3 py-1 text-xs font-semibold rounded-md transition-colors ${mode === 'edit' ? 'bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900' : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'}`}
          >
            <Code size={14} /> Edit
          </button>
          <button 
            onClick={() => setMode('preview')}
            className={`flex items-center gap-1 px-3 py-1 text-xs font-semibold rounded-md transition-colors ${mode === 'preview' ? 'bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900' : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'}`}
          >
            <Eye size={14} /> Preview
          </button>
        </div>
      </div>
      
      {mode === 'edit' ? (
        <textarea 
          value={html}
          onChange={(e) => handleUpdate(e.target.value)}
          className="w-full h-48 p-4 font-mono text-sm bg-slate-900 text-green-400 outline-none resize-none"
          spellCheck={false}
        />
      ) : (
        <div 
          className="w-full p-6 min-h-[12rem] bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      )}
    </div>
  );
}
