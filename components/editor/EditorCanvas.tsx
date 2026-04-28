import { useEditorStore } from '@/store/editorStore';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { SortableContext, arrayMove, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable';
import EditorBlockNode from './EditorBlockNode';

export default function EditorCanvas() {
  const { blocks, reorderBlocks } = useEditorStore();

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5, // Requires 5px movement before dragging starts (allows clicking)
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      reorderBlocks(active.id, over.id);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto pb-32">
      <DndContext 
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext 
          items={blocks.map(b => b.id)}
          strategy={verticalListSortingStrategy}
        >
          <div className="flex flex-col gap-2">
            {blocks.map((block) => (
              <EditorBlockNode key={block.id} block={block} />
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
}
