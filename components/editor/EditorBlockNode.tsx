import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useEditorStore, BlockType, EditorBlock } from '@/store/editorStore';
import { GripVertical, Plus, Copy, Trash2 } from 'lucide-react';
import TipTapBlock from './TipTapBlock';
import ImageBlock from './ImageBlock';
import DividerBlock from './DividerBlock';
import VideoBlock from './VideoBlock';
import CalloutBlock from './CalloutBlock';
import ButtonBlock from './ButtonBlock';
import TableBlock from './TableBlock';
import HTMLBlock from './HTMLBlock';
import EmbedBlock from './EmbedBlock';
import GalleryBlock from './GalleryBlock';

interface EditorBlockNodeProps {
  block: EditorBlock;
}

export default function EditorBlockNode({ block }: EditorBlockNodeProps) {
  const { activeBlockId, setActiveBlock, addBlock, removeBlock, blocks } = useEditorStore();
  const isActive = activeBlockId === block.id;

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: block.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 10 : 1,
    opacity: isDragging ? 0.5 : 1,
  };

  const handleAddBlock = () => {
    const newId = `block-${Date.now()}`;
    const currentIndex = blocks.findIndex(b => b.id === block.id);
    addBlock({ id: newId, type: 'paragraph', content: '', metadata: {} }, currentIndex + 1);
  };

  const handleDuplicate = () => {
    const newId = `block-${Date.now()}`;
    const currentIndex = blocks.findIndex(b => b.id === block.id);
    addBlock({ ...block, id: newId }, currentIndex + 1);
  };

  const handleDelete = () => {
    removeBlock(block.id);
  };

  return (
    <div 
      ref={setNodeRef} 
      style={style}
      className={`group relative flex items-start gap-2 -ml-20 p-2 rounded-lg transition-colors ${isActive ? 'bg-slate-50/50' : 'hover:bg-slate-50/30'}`}
      onClick={() => setActiveBlock(block.id)}
    >
      {/* Drag Handle & Controls */}
      <div className={`flex items-center gap-1 mt-1 opacity-0 transition-opacity ${isActive || 'group-hover:opacity-100'} w-18 justify-end`}>
        <button 
          onClick={(e) => { e.stopPropagation(); handleAddBlock(); }}
          className="p-1 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded"
          title="Add Block Below"
        >
          <Plus size={16} />
        </button>
        <button 
          onClick={(e) => { e.stopPropagation(); handleDuplicate(); }}
          className="p-1 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded"
          title="Duplicate Block"
        >
          <Copy size={16} />
        </button>
        <button 
          onClick={(e) => { e.stopPropagation(); handleDelete(); }}
          className="p-1 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded"
          title="Delete Block"
        >
          <Trash2 size={16} />
        </button>
        <button 
          {...attributes} 
          {...listeners}
          className="p-1 text-slate-400 hover:text-slate-600 cursor-grab active:cursor-grabbing hover:bg-slate-100 rounded"
          title="Drag to Move"
        >
          <GripVertical size={16} />
        </button>
      </div>

      {/* Actual Block Content */}
      <div className="flex-1 min-w-0">
        {block.type === 'image' ? (
          <ImageBlock block={block} isActive={isActive} />
        ) : block.type === 'video' ? (
          <VideoBlock block={block} isActive={isActive} />
        ) : block.type === 'callout' ? (
          <CalloutBlock block={block} isActive={isActive} />
        ) : block.type === 'button' ? (
          <ButtonBlock block={block} isActive={isActive} />
        ) : block.type === 'table' ? (
          <TableBlock block={block} isActive={isActive} />
        ) : block.type === 'html' ? (
          <HTMLBlock block={block} isActive={isActive} />
        ) : block.type === 'embed' ? (
          <EmbedBlock block={block} isActive={isActive} />
        ) : block.type === 'gallery' ? (
          <GalleryBlock block={block} isActive={isActive} />
        ) : block.type === 'divider' ? (
          <DividerBlock block={block} isActive={isActive} />
        ) : (
          <TipTapBlock block={block} isActive={isActive} />
        )}

      </div>
    </div>
  );
}
