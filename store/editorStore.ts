import { create } from 'zustand';
import { Editor } from '@tiptap/react';

export type BlockType = 'paragraph' | 'heading' | 'image' | 'video' | 'callout' | 'button' | 'list' | 'quote' | 'divider' | 'code' | 'table' | 'html' | 'embed' | 'gallery';

export interface EditorBlock {
  id: string;
  type: BlockType;
  content: string; // HTML string from TipTap
  metadata?: Record<string, unknown>; // For image URLs, heading levels, etc.
}

interface EditorState {
  blocks: EditorBlock[];
  activeBlockId: string | null;
  activeEditor: Editor | null;
  postMetadata: {
    title: string;
    slug: string;
    excerpt: string;
    featuredImage: string;
    categories: string[];
    tags: string[];
    status: 'Draft' | 'Published' | 'Scheduled';
    date: string;
    metaTitle: string;
    metaDesc: string;
  };
  
  // Actions
  setBlocks: (blocks: EditorBlock[]) => void;
  addBlock: (block: EditorBlock, index?: number) => void;
  updateBlock: (id: string, updates: Partial<EditorBlock>) => void;
  removeBlock: (id: string) => void;
  reorderBlocks: (activeId: string, overId: string) => void;
  setActiveBlock: (id: string | null) => void;
  setActiveEditor: (editor: Editor | null) => void;
  updatePostMetadata: (updates: Partial<EditorState['postMetadata']>) => void;
}

export const useEditorStore = create<EditorState>((set) => ({
  blocks: [
    { id: 'initial-block', type: 'paragraph', content: '' }
  ],
  activeBlockId: null,
  activeEditor: null,
  postMetadata: {
    title: '',
    slug: '',
    excerpt: '',
    featuredImage: '',
    categories: [],
    tags: [],
    status: 'Draft',
    date: new Date().toISOString(),
    metaTitle: '',
    metaDesc: ''
  },

  setBlocks: (blocks) => set({ blocks }),
  
  addBlock: (block, index) => set((state) => {
    const newBlocks = [...state.blocks];
    if (typeof index === 'number') {
      newBlocks.splice(index, 0, block);
    } else {
      newBlocks.push(block);
    }
    return { blocks: newBlocks, activeBlockId: block.id };
  }),

  updateBlock: (id, updates) => set((state) => ({
    blocks: state.blocks.map(b => b.id === id ? { ...b, ...updates } : b)
  })),

  removeBlock: (id) => set((state) => ({
    blocks: state.blocks.filter(b => b.id !== id)
  })),

  reorderBlocks: (activeId, overId) => set((state) => {
    const oldIndex = state.blocks.findIndex(b => b.id === activeId);
    const newIndex = state.blocks.findIndex(b => b.id === overId);
    
    if (oldIndex !== -1 && newIndex !== -1) {
      const newBlocks = [...state.blocks];
      const [removed] = newBlocks.splice(oldIndex, 1);
      newBlocks.splice(newIndex, 0, removed);
      return { blocks: newBlocks };
    }
    return state;
  }),

  setActiveBlock: (id) => set({ activeBlockId: id }),
  
  setActiveEditor: (editor) => set({ activeEditor: editor }),
  
  updatePostMetadata: (updates) => set((state) => ({
    postMetadata: { ...state.postMetadata, ...updates }
  }))
}));
