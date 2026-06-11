'use client';
import { useEditor, EditorContent } from '@tiptap/react';
import { BubbleMenu } from '@tiptap/react/menus';
import StarterKit from '@tiptap/starter-kit';
import { Underline } from '@tiptap/extension-underline';
import { TextStyle } from '@tiptap/extension-text-style';
import { Color } from '@tiptap/extension-color';
import { Highlight } from '@tiptap/extension-highlight';
import { TextAlign } from '@tiptap/extension-text-align';
import { Link } from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import Placeholder from '@tiptap/extension-placeholder';
import { FontSize } from './FontSizeExtension';
import { FontFamily } from './FontFamilyExtension';
import { useCallback, useEffect, useRef, useState } from 'react';
import {
  Bold, Italic, Underline as UnderlineIcon, Strikethrough,
  Heading1, Heading2, Heading3,
  List, ListOrdered, Quote, Code, Code2,
  AlignLeft, AlignCenter, AlignRight, AlignJustify,
  Link as LinkIcon, Image as ImageIcon, Minus,
  Undo, Redo, Type, Palette, Highlighter, Unlink,
  FileCode, Eye,
} from 'lucide-react';

interface FullEditorProps {
  content: string;
  onChange: (html: string) => void;
  isDark: boolean;
}

function ToolbarButton({ onClick, active, disabled, title, children }: {
  onClick: () => void; active?: boolean; disabled?: boolean; title: string; children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      title={title}
      style={{
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        width: 32, height: 32, borderRadius: 6, border: 'none',
        background: active ? 'rgba(99, 102, 241, 0.15)' : 'transparent',
        color: active ? '#6366f1' : 'inherit',
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.4 : 1,
        transition: 'all 0.15s',
      }}
      onMouseEnter={e => {
        if (!active && !disabled) (e.currentTarget as HTMLElement).style.background = 'rgba(100,116,139,0.1)';
      }}
      onMouseLeave={e => {
        if (!active) (e.currentTarget as HTMLElement).style.background = 'transparent';
      }}
    >
      {children}
    </button>
  );
}

function ToolbarSep() {
  return <div style={{ width: 1, height: 20, background: 'currentColor', opacity: 0.12, margin: '0 4px' }} />;
}

export default function FullEditor({ content, onChange, isDark }: FullEditorProps) {
  const [linkUrl, setLinkUrl] = useState('');
  const [showLinkInput, setShowLinkInput] = useState(false);
  const [fontColor, setFontColor] = useState('#ffffff');
  const [isSourceMode, setIsSourceMode] = useState(false);
  const [sourceHtml, setSourceHtml] = useState(content);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const colorInputRef = useRef<HTMLInputElement>(null);

  const css = isDark
    ? { bg: '#0f172a', surface: '#1e293b', border: '#334155', text: '#f1f5f9', muted: '#94a3b8', accent: '#6366f1' }
    : { bg: '#ffffff', surface: '#f8fafc', border: '#e2e8f0', text: '#0f172a', muted: '#64748b', accent: '#4f46e5' };

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2, 3] },
      }),
      Underline,
      TextStyle,
      Color,
      Highlight.configure({ multicolor: true }),
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: { class: 'editor-link', style: 'color: #6366f1; text-decoration: underline; cursor: pointer;' },
      }),
      Image.configure({
        HTMLAttributes: { style: 'max-width: 100%; height: auto; border-radius: 8px; margin: 1rem 0;' },
      }),
      Placeholder.configure({
        placeholder: 'Start writing your post...',
      }),
      FontSize,
      FontFamily,
    ],
    content,
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class: 'full-editor-content',
        style: `
          outline: none;
          min-height: calc(100vh - 360px);
          font-size: 16px;
          line-height: 1.8;
          color: ${css.text};
        `,
      },
      // Strip background colors and unwanted styles from pasted content
      transformPastedHTML(html: string) {
        // Remove background-color inline styles
        let clean = html.replace(/background-color\s*:\s*[^;"']+;?/gi, '');
        // Remove background shorthand inline styles
        clean = clean.replace(/background\s*:\s*[^;"']+;?/gi, '');
        // Remove data-pm-slice attributes (ProseMirror internal)
        clean = clean.replace(/\s*data-pm-slice="[^"]*"/gi, '');
        // Remove highlight/mark wrapping with backgrounds
        clean = clean.replace(/<mark[^>]*>/gi, '');
        clean = clean.replace(/<\/mark>/gi, '');
        return clean;
      },
    },
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      onChange(html);
      setSourceHtml(html);
    },
  });

  // Sync content from parent when loading a post for editing
  useEffect(() => {
    if (editor && content && editor.getHTML() !== content) {
      editor.commands.setContent(content, { emitUpdate: false });
      setSourceHtml(content);
    }
  }, [content, editor]);

  const toggleSourceMode = () => {
    if (isSourceMode) {
      editor?.commands.setContent(sourceHtml);
    } else {
      setSourceHtml(editor?.getHTML() || '');
    }
    setIsSourceMode(!isSourceMode);
  };

  const handleImageUpload = useCallback(async (file: File) => {
    if (!editor) return;
    const formData = new FormData();
    formData.append('file', file);
    try {
      const res = await fetch('/api/admin/upload', { method: 'POST', body: formData });
      if (!res.ok) throw new Error('Upload failed');
      const data = await res.json();
      editor.chain().focus().setImage({ src: data.url }).run();
    } catch (err) {
      alert('Image upload failed. Please try again.');
    }
  }, [editor]);

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleImageUpload(file);
    e.target.value = '';
  };

  const setLink = useCallback(() => {
    if (!editor) return;
    if (linkUrl === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();
    } else {
      editor.chain().focus().extendMarkRange('link').setLink({ href: linkUrl }).run();
    }
    setShowLinkInput(false);
    setLinkUrl('');
  }, [editor, linkUrl]);

  if (!editor) return null;

  const Menu = BubbleMenu as any;

  return (
    <div>
      {/* Toolbar */}
      <div style={{
        display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 2,
        padding: '8px 12px', marginBottom: 16,
        background: css.surface, border: `1px solid ${css.border}`, borderRadius: 10,
        position: 'sticky', top: 0, zIndex: 10,
        color: css.muted,
      }}>
        {/* Undo/Redo */}
        <ToolbarButton onClick={() => editor.chain().focus().undo().run()} disabled={isSourceMode || !editor.can().undo()} title="Undo">
          <Undo size={16} />
        </ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().redo().run()} disabled={isSourceMode || !editor.can().redo()} title="Redo">
          <Redo size={16} />
        </ToolbarButton>

        <ToolbarSep />

        {/* Text Type */}
        <ToolbarButton onClick={() => editor.chain().focus().setParagraph().run()} active={editor.isActive('paragraph')} disabled={isSourceMode} title="Paragraph">
          <Type size={16} />
        </ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} active={editor.isActive('heading', { level: 1 })} disabled={isSourceMode} title="Heading 1">
          <Heading1 size={16} />
        </ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} active={editor.isActive('heading', { level: 2 })} disabled={isSourceMode} title="Heading 2">
          <Heading2 size={16} />
        </ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} active={editor.isActive('heading', { level: 3 })} disabled={isSourceMode} title="Heading 3">
          <Heading3 size={16} />
        </ToolbarButton>

        <ToolbarSep />

        {/* Inline Formatting */}
        <ToolbarButton onClick={() => editor.chain().focus().toggleBold().run()} active={editor.isActive('bold')} disabled={isSourceMode} title="Bold">
          <Bold size={16} />
        </ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().toggleItalic().run()} active={editor.isActive('italic')} disabled={isSourceMode} title="Italic">
          <Italic size={16} />
        </ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().toggleUnderline().run()} active={editor.isActive('underline')} disabled={isSourceMode} title="Underline">
          <UnderlineIcon size={16} />
        </ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().toggleStrike().run()} active={editor.isActive('strike')} disabled={isSourceMode} title="Strikethrough">
          <Strikethrough size={16} />
        </ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().toggleHighlight({ color: '#fef08a' }).run()} active={editor.isActive('highlight')} disabled={isSourceMode} title="Highlight">
          <Highlighter size={16} />
        </ToolbarButton>

        {/* Font Color */}
        <div style={{ position: 'relative' }}>
          <ToolbarButton onClick={() => colorInputRef.current?.click()} disabled={isSourceMode} title="Font Color">
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
              <Palette size={14} />
              <div style={{ width: 14, height: 3, borderRadius: 1, background: fontColor }} />
            </div>
          </ToolbarButton>
          <input
            ref={colorInputRef}
            type="color"
            value={fontColor}
            onChange={e => {
              setFontColor(e.target.value);
              editor.chain().focus().setColor(e.target.value).run();
            }}
            disabled={isSourceMode}
            style={{ position: 'absolute', top: 0, left: 0, width: 0, height: 0, opacity: 0, pointerEvents: 'none' }}
          />
        </div>

        {/* Font Style */}
        <select
          value={editor.getAttributes('textStyle').fontFamily || 'default'}
          onChange={e => {
            const family = e.target.value;
            if (family === 'default') {
              editor.chain().focus().unsetFontFamily().run();
            } else {
              editor.chain().focus().setFontFamily(family).run();
            }
          }}
          disabled={isSourceMode}
          title="Font Style"
          style={{
            height: 32, padding: '0 6px', fontSize: 12, fontWeight: 600,
            background: 'transparent', border: `1px solid ${css.border}`, borderRadius: 6,
            color: 'inherit', cursor: 'pointer', outline: 'none',
          }}
        >
          <option value="default">Font Style</option>
          <option value="Inter">Default (Inter)</option>
          <option value="Syne">Creative (Syne)</option>
          <option value="JetBrains Mono">Monospace</option>
          <option value="Georgia">Serif (Georgia)</option>
        </select>

        {/* Font Size */}
        <select
          value={editor.getAttributes('textStyle').fontSize || 'default'}
          onChange={e => {
            const size = e.target.value;
            if (size === 'default') {
              editor.chain().focus().unsetFontSize().run();
            } else {
              editor.chain().focus().setFontSize(size).run();
            }
          }}
          disabled={isSourceMode}
          title="Font Size"
          style={{
            height: 32, padding: '0 6px', fontSize: 12, fontWeight: 600,
            background: 'transparent', border: `1px solid ${css.border}`, borderRadius: 6,
            color: 'inherit', cursor: 'pointer', outline: 'none',
          }}
        >
          <option value="default">Size</option>
          <option value="12px">12</option>
          <option value="14px">14</option>
          <option value="16px">16</option>
          <option value="18px">18</option>
          <option value="20px">20</option>
          <option value="24px">24</option>
          <option value="28px">28</option>
          <option value="32px">32</option>
          <option value="36px">36</option>
          <option value="48px">48</option>
        </select>

        <ToolbarSep />

        {/* Lists */}
        <ToolbarButton onClick={() => editor.chain().focus().toggleBulletList().run()} active={editor.isActive('bulletList')} disabled={isSourceMode} title="Bullet List">
          <List size={16} />
        </ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().toggleOrderedList().run()} active={editor.isActive('orderedList')} disabled={isSourceMode} title="Numbered List">
          <ListOrdered size={16} />
        </ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().toggleBlockquote().run()} active={editor.isActive('blockquote')} disabled={isSourceMode} title="Quote">
          <Quote size={16} />
        </ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().toggleCodeBlock().run()} active={editor.isActive('codeBlock')} disabled={isSourceMode} title="Code Block">
          <Code2 size={16} />
        </ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().toggleCode().run()} active={editor.isActive('code')} disabled={isSourceMode} title="Inline Code">
          <Code size={16} />
        </ToolbarButton>

        <ToolbarSep />

        {/* Alignment */}
        <ToolbarButton onClick={() => editor.chain().focus().setTextAlign('left').run()} active={editor.isActive({ textAlign: 'left' })} disabled={isSourceMode} title="Align Left">
          <AlignLeft size={16} />
        </ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().setTextAlign('center').run()} active={editor.isActive({ textAlign: 'center' })} disabled={isSourceMode} title="Align Center">
          <AlignCenter size={16} />
        </ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().setTextAlign('right').run()} active={editor.isActive({ textAlign: 'right' })} disabled={isSourceMode} title="Align Right">
          <AlignRight size={16} />
        </ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().setTextAlign('justify').run()} active={editor.isActive({ textAlign: 'justify' })} disabled={isSourceMode} title="Justify">
          <AlignJustify size={16} />
        </ToolbarButton>

        <ToolbarSep />

        {/* Link */}
        {showLinkInput ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <input
              type="url"
              placeholder="https://..."
              value={linkUrl}
              onChange={e => setLinkUrl(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter') setLink(); if (e.key === 'Escape') setShowLinkInput(false); }}
              autoFocus
              style={{
                width: 200, padding: '4px 8px', fontSize: 13,
                background: css.bg, border: `1px solid ${css.border}`, borderRadius: 6,
                color: css.text, outline: 'none',
              }}
            />
            <button onClick={setLink} style={{ padding: '4px 10px', fontSize: 12, background: css.accent, color: '#fff', border: 'none', borderRadius: 6, cursor: 'pointer', fontWeight: 600 }}>Set</button>
            <button onClick={() => setShowLinkInput(false)} style={{ padding: '4px 8px', fontSize: 12, background: 'transparent', color: css.muted, border: `1px solid ${css.border}`, borderRadius: 6, cursor: 'pointer' }}>✕</button>
          </div>
        ) : (
          <>
            <ToolbarButton onClick={() => { setLinkUrl(editor.getAttributes('link').href || ''); setShowLinkInput(true); }} active={editor.isActive('link')} disabled={isSourceMode} title="Insert Link">
              <LinkIcon size={16} />
            </ToolbarButton>
            {editor.isActive('link') && (
              <ToolbarButton onClick={() => editor.chain().focus().unsetLink().run()} disabled={isSourceMode} title="Remove Link">
                <Unlink size={16} />
              </ToolbarButton>
            )}
          </>
        )}

        {/* Image */}
        <ToolbarButton onClick={handleImageClick} disabled={isSourceMode} title="Insert Image">
          <ImageIcon size={16} />
        </ToolbarButton>
        <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileChange} style={{ display: 'none' }} />

        {/* Divider */}
        <ToolbarButton onClick={() => editor.chain().focus().setHorizontalRule().run()} disabled={isSourceMode} title="Horizontal Rule">
          <Minus size={16} />
        </ToolbarButton>

        <ToolbarSep />

        {/* HTML Source View Toggle */}
        <ToolbarButton onClick={toggleSourceMode} active={isSourceMode} title={isSourceMode ? "Visual Editor" : "HTML Source Code"}>
          {isSourceMode ? <Eye size={16} /> : <FileCode size={16} />}
        </ToolbarButton>
      </div>

      {/* Bubble Menu (appears on text selection) */}
      {!isSourceMode && (
        <Menu editor={editor} tippyOptions={{ duration: 150 }}>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 2, padding: '4px 8px',
            background: isDark ? '#1e293b' : '#0f172a', borderRadius: 8,
            boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
          }}>
            {[
              { icon: <Bold size={14} />, action: () => editor.chain().focus().toggleBold().run(), active: editor.isActive('bold'), title: 'Bold' },
              { icon: <Italic size={14} />, action: () => editor.chain().focus().toggleItalic().run(), active: editor.isActive('italic'), title: 'Italic' },
              { icon: <UnderlineIcon size={14} />, action: () => editor.chain().focus().toggleUnderline().run(), active: editor.isActive('underline'), title: 'Underline' },
              { icon: <Code size={14} />, action: () => editor.chain().focus().toggleCode().run(), active: editor.isActive('code'), title: 'Code' },
              { icon: <LinkIcon size={14} />, action: () => { setLinkUrl(editor.getAttributes('link').href || ''); setShowLinkInput(true); }, active: editor.isActive('link'), title: 'Link' },
            ].map((btn, i) => (
              <button
                key={i}
                onClick={btn.action}
                title={btn.title}
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  width: 28, height: 28, borderRadius: 4, border: 'none',
                  background: btn.active ? 'rgba(99,102,241,0.3)' : 'transparent',
                  color: btn.active ? '#a5b4fc' : '#e2e8f0',
                  cursor: 'pointer',
                }}
              >
                {btn.icon}
              </button>
            ))}
          </div>
        </Menu>
      )}

      {/* Editor Content */}
      <div style={{
        border: `1px solid ${css.border}`,
        borderRadius: 12,
        padding: isSourceMode ? '16px' : '24px 32px',
        minHeight: 500,
        background: isSourceMode ? (isDark ? '#020617' : '#fafafa') : css.bg,
        marginTop: 4,
        display: 'flex',
        flexDirection: 'column',
      }}>
        {isSourceMode ? (
          <textarea
            value={sourceHtml}
            onChange={e => {
              const val = e.target.value;
              setSourceHtml(val);
              onChange(val);
            }}
            placeholder="Paste or write raw HTML code here..."
            style={{
              flex: 1,
              width: '100%',
              minHeight: 480,
              background: 'transparent',
              border: 'none',
              outline: 'none',
              color: isDark ? '#38bdf8' : '#0f172a',
              fontFamily: "'JetBrains Mono', 'Fira Code', Consolas, monospace",
              fontSize: 14,
              lineHeight: 1.6,
              resize: 'vertical',
            }}
          />
        ) : (
          <EditorContent editor={editor} />
        )}
      </div>

      {/* Editor Styles */}
      <style jsx global>{`
        .full-editor-content .tiptap {
          outline: none;
        }
        .full-editor-content .tiptap p {
          margin: 0.75em 0;
        }
        .full-editor-content .tiptap h1 {
          font-size: 2em;
          font-weight: 800;
          margin: 1.2em 0 0.5em;
          line-height: 1.2;
        }
        .full-editor-content .tiptap h2 {
          font-size: 1.5em;
          font-weight: 700;
          margin: 1em 0 0.4em;
          line-height: 1.3;
        }
        .full-editor-content .tiptap h3 {
          font-size: 1.25em;
          font-weight: 600;
          margin: 0.8em 0 0.3em;
          line-height: 1.4;
        }
        .full-editor-content .tiptap ul,
        .full-editor-content .tiptap ol {
          padding-left: 1.5em;
          margin: 0.75em 0;
        }
        .full-editor-content .tiptap li {
          margin: 0.25em 0;
        }
        .full-editor-content .tiptap blockquote {
          border-left: 3px solid ${css.accent};
          padding-left: 1em;
          margin: 1em 0;
          color: ${css.muted};
          font-style: italic;
        }
        .full-editor-content .tiptap pre {
          background: ${isDark ? '#0a0f1e' : '#f1f5f9'};
          border-radius: 8px;
          padding: 1em;
          overflow-x: auto;
          font-family: 'JetBrains Mono', 'Fira Code', monospace;
          font-size: 0.9em;
          margin: 1em 0;
        }
        .full-editor-content .tiptap code {
          background: ${isDark ? 'rgba(99,102,241,0.15)' : 'rgba(99,102,241,0.1)'};
          color: ${css.accent};
          padding: 2px 6px;
          border-radius: 4px;
          font-size: 0.9em;
          font-family: 'JetBrains Mono', 'Fira Code', monospace;
        }
        .full-editor-content .tiptap pre code {
          background: none;
          color: inherit;
          padding: 0;
        }
        .full-editor-content .tiptap hr {
          border: none;
          border-top: 1px solid ${css.border};
          margin: 2em 0;
        }
        .full-editor-content .tiptap img {
          max-width: 100%;
          height: auto;
          border-radius: 8px;
          margin: 1em 0;
        }
        .full-editor-content .tiptap mark {
          background: #fef08a;
          padding: 1px 4px;
          border-radius: 3px;
        }
        .full-editor-content .tiptap p.is-editor-empty:first-child::before {
          content: attr(data-placeholder);
          float: left;
          color: ${css.muted};
          pointer-events: none;
          height: 0;
          opacity: 0.5;
        }
      `}</style>
    </div>
  );
}
