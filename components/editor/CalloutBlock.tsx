import { EditorBlock, useEditorStore } from '@/store/editorStore';
import { Info, AlertTriangle, Lightbulb } from 'lucide-react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { useEffect } from 'react';

export default function CalloutBlock({ block, isActive }: { block: EditorBlock; isActive: boolean }) {
  const { updateBlock } = useEditorStore();
  const theme = block.metadata?.theme || 'info'; // info, warning, tip

  const editor = useEditor({
    extensions: [StarterKit],
    content: block.content || 'Type your callout here...',
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class: 'prose prose-slate dark:prose-invert max-w-none focus:outline-none min-h-[1.5em]',
      }
    },
    onUpdate: ({ editor }) => {
      updateBlock(block.id, { content: editor.getHTML() });
    },
  });

  useEffect(() => {
    if (isActive && editor) {
      editor.commands.focus('end');
    }
  }, [isActive, editor]);

  const themes = {
    info: { bg: 'bg-blue-50 dark:bg-blue-950/20', border: 'border-blue-200 dark:border-blue-800/40', icon: <Info className="text-blue-500 dark:text-blue-400" size={24} /> },
    warning: { bg: 'bg-yellow-50 dark:bg-yellow-950/20', border: 'border-yellow-200 dark:border-yellow-800/40', icon: <AlertTriangle className="text-yellow-500 dark:text-yellow-400" size={24} /> },
    tip: { bg: 'bg-emerald-50 dark:bg-emerald-950/20', border: 'border-emerald-200 dark:border-emerald-800/40', icon: <Lightbulb className="text-emerald-500 dark:text-emerald-400" size={24} /> },
  };

  const currentTheme = themes[theme as keyof typeof themes] || themes.info;

  return (
    <div className={`w-full relative transition-all ${isActive ? 'ring-2 ring-slate-900 dark:ring-slate-100 shadow-md' : ''} rounded-xl`}>
      {isActive && (
        <div className="absolute -top-10 left-0 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg shadow-xl p-1 flex gap-1 z-50">
          {(Object.keys(themes) as Array<keyof typeof themes>).map(t => (
            <button
              key={t}
              onClick={() => updateBlock(block.id, { metadata: { ...block.metadata, theme: t } })}
              className={`px-3 py-1 text-xs font-semibold rounded-md capitalize transition-colors ${theme === t ? 'bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-slate-100' : 'text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700/50'}`}
            >
              {t}
            </button>
          ))}
        </div>
      )}
      <div className={`flex gap-4 p-6 rounded-xl border ${currentTheme.bg} ${currentTheme.border}`}>
        <div className="shrink-0 pt-1">
          {currentTheme.icon}
        </div>
        <div className="flex-1 min-w-0">
          <EditorContent editor={editor} />
        </div>
      </div>
    </div>
  );
}
