import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { EditorBlock, useEditorStore } from '@/store/editorStore';
import { useEffect, useState } from 'react';
import FloatingToolbar from './FloatingToolbar';
import SlashCommandMenu from './SlashCommandMenu';

import { Underline } from '@tiptap/extension-underline';
import { TextStyle } from '@tiptap/extension-text-style';
import { Color } from '@tiptap/extension-color';
import { Highlight } from '@tiptap/extension-highlight';
import { TextAlign } from '@tiptap/extension-text-align';
import { Superscript } from '@tiptap/extension-superscript';
import { Subscript } from '@tiptap/extension-subscript';
import { Link } from '@tiptap/extension-link';
import { BubbleMenu as BubbleMenuExtension } from '@tiptap/extension-bubble-menu';

interface TipTapBlockProps {
  block: EditorBlock;
  isActive: boolean;
}

export default function TipTapBlock({ block, isActive }: TipTapBlockProps) {
  const { updateBlock, removeBlock, addBlock } = useEditorStore();
  const [showSlashMenu, setShowSlashMenu] = useState(false);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      TextStyle,
      Color,
      Highlight.configure({ multicolor: true }),
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      Superscript,
      Subscript,
      Link.configure({ openOnClick: false }),
      BubbleMenuExtension.configure({
        shouldShow: ({ editor }) => !editor.state.selection.empty,
      }),
    ],
    content: block.content,
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class: 'prose prose-slate max-w-none focus:outline-none min-h-[1.5em]',
      },
      handleKeyDown: (view, event) => {
        // Handle Backspace at start of block
        if (event.key === 'Backspace' && view.state.selection.empty && view.state.selection.$from.pos === 1) {
          event.preventDefault();
          removeBlock(block.id);
          return true;
        }
        // Handle Enter to create new block instead of new line in same block (basic implementation)
        if (event.key === 'Enter' && !event.shiftKey) {
          event.preventDefault();
          const newId = `block-${Date.now()}`;
          const currentIndex = useEditorStore.getState().blocks.findIndex(b => b.id === block.id);
          addBlock({ id: newId, type: 'paragraph', content: '' }, currentIndex + 1);
          return true;
        }
        return false;
      }
    },
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      updateBlock(block.id, { content: html });
      
      const text = editor.getText();
      if (text === '/') {
        setShowSlashMenu(true);
      } else {
        setShowSlashMenu(false);
      }
    },
    onFocus: ({ editor }) => {
      useEditorStore.getState().setActiveEditor(editor);
      useEditorStore.getState().setActiveBlock(block.id);
    },
    onBlur: () => {
      // Don't clear immediately to allow toolbar clicks
      setTimeout(() => {
        if (!document.activeElement?.closest('.editor-toolbar')) {
          // useEditorStore.getState().setActiveEditor(null);
        }
      }, 100);
    },
  });

  useEffect(() => {
    if (isActive && editor && !editor.isFocused) {
      editor.commands.focus('end');
    }
  }, [isActive, editor]);

  if (!editor) {
    return null;
  }

  return (
    <div className="w-full relative">
      <FloatingToolbar editor={editor} />
      <EditorContent editor={editor} />
      {showSlashMenu && (
        <SlashCommandMenu blockId={block.id} onClose={() => {
          setShowSlashMenu(false);
          editor.commands.clearContent();
        }} />
      )}
    </div>
  );
}
