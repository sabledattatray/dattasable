import { Heading1, Heading2, Image as ImageIcon, Code, Quote, List, Type, Minus, Video, Lightbulb, MousePointerClick, Table2, Code2, Link, LayoutGrid } from 'lucide-react';
import { useEditorStore, BlockType } from '@/store/editorStore';

interface SlashCommandMenuProps {
  blockId: string;
  onClose: () => void;
}

export default function SlashCommandMenu({ blockId, onClose }: SlashCommandMenuProps) {
  const { updateBlock } = useEditorStore();

  const handleSelect = (type: BlockType, content: string = '') => {
    updateBlock(blockId, { type, content });
    onClose();
  };

  const menuItems = [
    { icon: <Type size={16} />, label: 'Text', desc: 'Just start writing with plain text.', type: 'paragraph' as BlockType },
    { icon: <Heading1 size={16} />, label: 'Heading 1', desc: 'Big section heading.', type: 'heading' as BlockType, tag: 'h1' },
    { icon: <Heading2 size={16} />, label: 'Heading 2', desc: 'Medium section heading.', type: 'heading' as BlockType, tag: 'h2' },
    { icon: <ImageIcon size={16} />, label: 'Image', desc: 'Upload or embed with a link.', type: 'image' as BlockType },
    { icon: <LayoutGrid size={16} />, label: 'Gallery', desc: 'Add a grid of images.', type: 'gallery' as BlockType },
    { icon: <Video size={16} />, label: 'Video', desc: 'Embed a YouTube or Vimeo video.', type: 'video' as BlockType },
    { icon: <Link size={16} />, label: 'Embed', desc: 'Embed Twitter, LinkedIn, etc.', type: 'embed' as BlockType },
    { icon: <Lightbulb size={16} />, label: 'Callout', desc: 'Make writing stand out.', type: 'callout' as BlockType },
    { icon: <MousePointerClick size={16} />, label: 'Button', desc: 'Add a call to action link.', type: 'button' as BlockType },
    { icon: <List size={16} />, label: 'Bulleted List', desc: 'Create a simple bulleted list.', type: 'list' as BlockType },
    { icon: <Table2 size={16} />, label: 'Table', desc: 'Add a table matrix.', type: 'table' as BlockType },
    { icon: <Quote size={16} />, label: 'Quote', desc: 'Capture a quote.', type: 'quote' as BlockType },
    { icon: <Minus size={16} />, label: 'Divider', desc: 'Visually divide blocks.', type: 'divider' as BlockType },
    { icon: <Code size={16} />, label: 'Code', desc: 'Capture a code snippet.', type: 'code' as BlockType },
    { icon: <Code2 size={16} />, label: 'Custom HTML', desc: 'Embed raw HTML.', type: 'html' as BlockType },
  ];

  return (
    <div className="absolute top-full left-0 mt-2 w-72 bg-white rounded-xl shadow-2xl border border-slate-200 z-50 overflow-hidden animate-in fade-in zoom-in-95">
      <div className="text-xs font-bold text-slate-400 uppercase tracking-wider px-4 py-3 border-b border-slate-100">
        Basic Blocks
      </div>
      <div className="max-h-[300px] overflow-y-auto p-2">
        {menuItems.map((item, idx) => (
          <button
            key={idx}
            onClick={() => {
              if (item.tag) {
                // For TipTap headings, we inject the HTML directly so TipTap parses it, or rely on block metadata
                handleSelect(item.type, `<${item.tag}></${item.tag}>`);
              } else {
                handleSelect(item.type);
              }
            }}
            className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-slate-100 transition-colors text-left"
          >
            <div className="w-10 h-10 rounded-md bg-white border border-slate-200 flex items-center justify-center text-slate-700 shadow-sm">
              {item.icon}
            </div>
            <div>
              <div className="text-sm font-semibold text-slate-800">{item.label}</div>
              <div className="text-xs text-slate-500">{item.desc}</div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
