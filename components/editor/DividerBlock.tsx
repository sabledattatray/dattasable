import { EditorBlock } from '@/store/editorStore';

export default function DividerBlock({ block, isActive }: { block: EditorBlock; isActive: boolean }) {
  return (
    <div className={`w-full py-4 transition-all ${isActive ? 'bg-slate-50 dark:bg-slate-800/40 rounded-lg' : ''}`}>
      <hr className="border-t-2 border-slate-200 dark:border-slate-800" />
    </div>
  );
}
