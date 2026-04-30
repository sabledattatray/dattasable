'use client';
import { useEditorStore } from '@/store/editorStore';
import { 
  Bold, Italic, Underline, Strikethrough, 
  AlignLeft, AlignCenter, AlignRight, 
  List, ListOrdered, Quote, Code, 
  Heading1, Heading2, Heading3, 
  Link as LinkIcon, Undo, Redo, 
  Palette, Highlighter, Eraser, 
  Type, ChevronDown, Plus, Minus
} from 'lucide-react';
import { useState } from 'react';

interface ToolbarButtonProps {
  onClick: () => void;
  isActive?: boolean;
  children: React.ReactNode;
  title: string;
  disabled?: boolean;
}

const ToolbarButton = ({ onClick, isActive = false, children, title, disabled }: ToolbarButtonProps) => (
  <button
    onClick={(e) => { e.preventDefault(); onClick(); }}
    disabled={disabled}
    className={`p-2 rounded hover:bg-slate-100 transition-colors ${isActive ? 'bg-slate-100 text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'} ${disabled ? 'opacity-30 cursor-not-allowed' : ''}`}
    title={title}
  >
    {children}
  </button>
);

export default function MainToolbar() {
  const { activeEditor } = useEditorStore();
  const [showColors, setShowColors] = useState(false);

  const editor = activeEditor;
  const colors = ['#0f172a', '#c9f31d', '#f97316', '#eab308', '#22c55e', '#3b82f6', '#a855f7', '#ec4899'];

  return (
    <div className={`editor-toolbar flex flex-wrap items-center gap-1 transition-all duration-300 ${!editor ? 'grayscale' : ''}`}>
      <div className="flex items-center gap-1 border-r border-slate-200 pr-1 mr-1">
        <ToolbarButton disabled={!editor} onClick={() => editor?.chain().focus().undo().run()} title="Undo">
          <Undo size={16} />
        </ToolbarButton>
        <ToolbarButton disabled={!editor} onClick={() => editor?.chain().focus().redo().run()} title="Redo">
          <Redo size={16} />
        </ToolbarButton>
      </div>

      <div className="flex items-center gap-1 border-r border-slate-200 pr-1 mr-1">
        <ToolbarButton disabled={!editor} 
          onClick={() => editor?.chain().focus().toggleBold().run()} 
          isActive={editor?.isActive('bold')}
          title="Bold"
        >
          <Bold size={16} />
        </ToolbarButton>
        <ToolbarButton disabled={!editor} 
          onClick={() => editor?.chain().focus().toggleItalic().run()} 
          isActive={editor?.isActive('italic')}
          title="Italic"
        >
          <Italic size={16} />
        </ToolbarButton>
        <ToolbarButton disabled={!editor} 
          onClick={() => editor?.chain().focus().toggleUnderline().run()} 
          isActive={editor?.isActive('underline')}
          title="Underline"
        >
          <Underline size={16} />
        </ToolbarButton>
        <ToolbarButton disabled={!editor} 
          onClick={() => editor?.chain().focus().toggleStrike().run()} 
          isActive={editor?.isActive('strike')}
          title="Strikethrough"
        >
          <Strikethrough size={16} />
        </ToolbarButton>
      </div>

      <div className="flex items-center gap-1 border-r border-slate-200 pr-1 mr-1">
        <ToolbarButton disabled={!editor} 
          onClick={() => editor?.chain().focus().toggleHeading({ level: 1 }).run()} 
          isActive={editor?.isActive('heading', { level: 1 })}
          title="Heading 1"
        >
          <Heading1 size={16} />
        </ToolbarButton>
        <ToolbarButton disabled={!editor} 
          onClick={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()} 
          isActive={editor?.isActive('heading', { level: 2 })}
          title="Heading 2"
        >
          <Heading2 size={16} />
        </ToolbarButton>
        <ToolbarButton disabled={!editor} 
          onClick={() => editor?.chain().focus().toggleHeading({ level: 3 }).run()} 
          isActive={editor?.isActive('heading', { level: 3 })}
          title="Heading 3"
        >
          <Heading3 size={16} />
        </ToolbarButton>
      </div>

      <div className="flex items-center gap-1 border-r border-slate-200 pr-1 mr-1">
        <ToolbarButton disabled={!editor} 
          onClick={() => editor?.chain().focus().setTextAlign('left').run()} 
          isActive={editor?.isActive({ textAlign: 'left' })}
          title="Align Left"
        >
          <AlignLeft size={16} />
        </ToolbarButton>
        <ToolbarButton disabled={!editor} 
          onClick={() => editor?.chain().focus().setTextAlign('center').run()} 
          isActive={editor?.isActive({ textAlign: 'center' })}
          title="Align Center"
        >
          <AlignCenter size={16} />
        </ToolbarButton>
        <ToolbarButton disabled={!editor} 
          onClick={() => editor?.chain().focus().setTextAlign('right').run()} 
          isActive={editor?.isActive({ textAlign: 'right' })}
          title="Align Right"
        >
          <AlignRight size={16} />
        </ToolbarButton>
      </div>

      <div className="flex items-center gap-1 border-r border-slate-200 pr-1 mr-1">
        <ToolbarButton disabled={!editor} 
          onClick={() => editor?.chain().focus().toggleBulletList().run()} 
          isActive={editor?.isActive('bulletList')}
          title="Bullet List"
        >
          <List size={16} />
        </ToolbarButton>
        <ToolbarButton disabled={!editor} 
          onClick={() => editor?.chain().focus().toggleOrderedList().run()} 
          isActive={editor?.isActive('orderedList')}
          title="Ordered List"
        >
          <ListOrdered size={16} />
        </ToolbarButton>
        <ToolbarButton disabled={!editor} 
          onClick={() => editor?.chain().focus().toggleBlockquote().run()} 
          isActive={editor?.isActive('blockquote')}
          title="Quote"
        >
          <Quote size={16} />
        </ToolbarButton>
        <ToolbarButton disabled={!editor} 
          onClick={() => editor?.chain().focus().toggleCodeBlock().run()} 
          isActive={editor?.isActive('codeBlock')}
          title="Code Block"
        >
          <Code size={16} />
        </ToolbarButton>
      </div>

      <div className="flex items-center gap-1 relative">
        <ToolbarButton disabled={!editor} onClick={() => setShowColors(!showColors)} title="Colors">
          <Palette size={16} />
        </ToolbarButton>
        
        {showColors && (
          <div className="absolute top-full left-0 mt-2 p-3 bg-white border border-slate-200 rounded-xl shadow-xl z-50 animate-in fade-in zoom-in-95 duration-200 min-w-[200px]">
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Text Color</div>
            <div className="flex flex-wrap gap-2 mb-3">
              {colors.map(c => (
                <button 
                  key={c} 
                  onClick={() => { editor?.chain().focus().setColor(c).run(); setShowColors(false); }}
                  className="w-6 h-6 rounded-full border border-slate-100 hover:scale-110 transition-transform shadow-sm" 
                  style={{ backgroundColor: c }}
                />
              ))}
            </div>
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Highlight</div>
            <div className="flex flex-wrap gap-2">
              {colors.map(c => (
                <button 
                  key={`bg-${c}`} 
                  onClick={() => { editor?.chain().focus().setHighlight({ color: c }).run(); setShowColors(false); }}
                  className="w-6 h-6 rounded border border-slate-100 hover:scale-110 transition-transform flex items-center justify-center text-[10px] text-white shadow-sm" 
                  style={{ backgroundColor: c }}
                >
                  H
                </button>
              ))}
            </div>
          </div>
        )}

        <ToolbarButton disabled={!editor} 
          onClick={() => {
            const url = window.prompt('URL', editor?.getAttributes('link').href);
            if (url && editor) editor.chain().focus().setLink({ href: url }).run();
          }} 
          isActive={editor?.isActive('link')}
          title="Insert Link"
        >
          <LinkIcon size={16} />
        </ToolbarButton>

        <ToolbarButton disabled={!editor} onClick={() => editor?.chain().focus().unsetAllMarks().clearNodes().run()} title="Clear Formatting">
          <Eraser size={16} />
        </ToolbarButton>
      </div>
    </div>
  );
}
