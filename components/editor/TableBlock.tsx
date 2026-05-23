import { EditorBlock, useEditorStore } from '@/store/editorStore';
import { Plus, Trash2 } from 'lucide-react';
import { useState } from 'react';

export default function TableBlock({ block, isActive }: { block: EditorBlock; isActive: boolean }) {
  const { updateBlock } = useEditorStore();
  const metadata = block.metadata as any;
  const [rows, setRows] = useState<string[][]>(metadata?.rows || [
    ['Header 1', 'Header 2'],
    ['Cell 1', 'Cell 2']
  ]);

  const handleUpdate = (newRows: string[][]) => {
    setRows(newRows);
    updateBlock(block.id, { metadata: { ...block.metadata, rows: newRows } });
  };

  const addRow = () => {
    const newRows = [...rows, Array(rows[0].length).fill('')];
    handleUpdate(newRows);
  };

  const addCol = () => {
    const newRows = rows.map(r => [...r, '']);
    handleUpdate(newRows);
  };

  const removeRow = (idx: number) => {
    if (rows.length <= 1) return;
    const newRows = rows.filter((_, i) => i !== idx);
    handleUpdate(newRows);
  };

  const removeCol = (idx: number) => {
    if (rows[0].length <= 1) return;
    const newRows = rows.map(r => r.filter((_, i) => i !== idx));
    handleUpdate(newRows);
  };

  const updateCell = (rIdx: number, cIdx: number, val: string) => {
    const newRows = [...rows];
    newRows[rIdx][cIdx] = val;
    handleUpdate(newRows);
  };

  return (
    <div className={`w-full relative transition-all bg-white dark:bg-slate-900 ${isActive ? 'ring-2 ring-slate-900 dark:ring-slate-100 shadow-md rounded-xl p-4' : ''}`}>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-slate-200 dark:border-slate-800">
          <tbody>
            {rows.map((row, rIdx) => (
              <tr key={rIdx}>
                {row.map((cell, cIdx) => (
                  <td key={cIdx} className={`border border-slate-200 dark:border-slate-800 relative group ${rIdx === 0 ? 'bg-slate-50 dark:bg-slate-950 font-bold' : ''}`}>
                    <input 
                      type="text" 
                      value={cell}
                      onChange={(e) => updateCell(rIdx, cIdx, e.target.value)}
                      className={`w-full p-2 outline-none bg-transparent ${rIdx === 0 ? 'font-semibold text-slate-800 dark:text-slate-100' : 'text-slate-600 dark:text-slate-300'}`}
                    />
                    {isActive && rIdx === 0 && (
                      <button onClick={() => removeCol(cIdx)} className="absolute -top-3 right-0 opacity-0 group-hover:opacity-100 p-1 bg-white dark:bg-slate-800 border border-red-200 dark:border-red-900/50 text-red-500 rounded shadow-sm hover:bg-red-50 dark:hover:bg-red-950 z-10">
                        <Trash2 size={12} />
                      </button>
                    )}
                  </td>
                ))}
                {isActive && (
                  <td className="w-8 border-none p-1 align-middle">
                    <button onClick={() => removeRow(rIdx)} className="p-1 text-slate-400 hover:text-red-500 rounded opacity-50 hover:opacity-100">
                      <Trash2 size={14} />
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {isActive && (
        <div className="flex gap-2 mt-4">
          <button onClick={addRow} className="flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-md transition-colors">
            <Plus size={14} /> Add Row
          </button>
          <button onClick={addCol} className="flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-md transition-colors">
            <Plus size={14} /> Add Column
          </button>
        </div>
      )}
    </div>
  );
}
