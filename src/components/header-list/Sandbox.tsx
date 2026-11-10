import { useState } from "react";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragStartEvent,
  DragOverlay, // <--- 1. Імпортуємо Overlay
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

// --- КОМПОНЕНТ ЕЛЕМЕНТА ---
const SortableItem = ({ id }: { id: string }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    padding: "15px",
    margin: "10px 0",
    // 2. Робимо оригінал напівпрозорим, коли тягнемо
    opacity: isDragging ? 0.3 : 1,
    background: "lightblue",
    border: "1px solid black",
    cursor: "grab",
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      Елемент {id}
    </div>
  );
};

// --- ГОЛОВНИЙ КОМПОНЕНТ ---
export const Sandbox = () => {
  const [items, setItems] = useState(["1", "2", "3", "4"]);

  // 3. Додаємо стан для активного ID
  const [activeId, setActiveId] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
  );

  // 4. Коли починаємо тягнути - запам'ятовуємо ID
  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    // 5. Очищаємо активний ID (тягнення закінчено)
    setActiveId(null);

    if (over && active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.indexOf(active.id as string);
        const newIndex = items.indexOf(over.id as string);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart} // <--- Додали
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={items} strategy={verticalListSortingStrategy}>
        <div style={{ width: "200px" }}>
          {items.map((id) => (
            <SortableItem key={id} id={id} />
          ))}
        </div>
      </SortableContext>

      {/* 6. DragOverlay рендериться в кінці DndContext */}
      <DragOverlay>
        {/* Якщо activeId не null, показуємо копію елемента */}
        {activeId ? (
          <div
            style={{
              padding: "15px",
              margin: "10px 0",
              background: "lightgreen", // Робимо його зеленим поверх усього
              border: "1px solid black",
              borderRadius: "4px",
              boxShadow: "0 5px 15px rgba(0,0,0,0.2)", // Додаємо гарну тінь
              cursor: "grabbing",
            }}
          >
            Елемент {activeId}
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
};
