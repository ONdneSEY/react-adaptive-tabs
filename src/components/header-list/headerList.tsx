import { DropMenu } from "./dropMenu/dropMenu";
import { GorizontalList } from "./gorizontalList/gorizontalList";

import { useList } from "../../hooks/uselist";

import "./headerList.scss";
import {
  closestCenter,
  DndContext,
  DragOverlay,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import { useState } from "react";
import { type DragStartEvent } from "@dnd-kit/core";

export const HeaderList = () => {
  const {
    list,
    isDragging,
    hiddenItems,
    containerRef,
    deleteTab,
    putTab,
    setList,
    setIsDragging,
  } = useList();

  const [activeId, setActiveId] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        delay: 200, // Затримка при виборі
        tolerance: 5, // Дозволяємо трохи поворухнути мишею під час затримки
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  function handleDragStart(event: DragStartEvent) {
    setIsDragging(true);
    setActiveId(String(event.active.id));
  }

  function handleDragEnd(event: DragEndEvent) {
    setIsDragging(false);
    setActiveId(null);
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    // Оскільки масив один, ми просто міняємо місцями елементи
    setList((items) => {
      const oldIndex = items.findIndex((item) => item.id === active.id);
      const newIndex = items.findIndex((item) => item.id === over.id);
      return arrayMove(items, oldIndex, newIndex);
    });
  }

  const activeItem = list.find((item) => item.id === activeId);
  return (
    <section className="header__menu">
      <button className="open__side-bar" type="button" aria-label="Закрити">
        X
      </button>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        {/* горизонтальне меню */}
        <GorizontalList
          list={list}
          containerRef={containerRef}
          putTab={putTab}
          deleteTab={deleteTab}
        />

        <DropMenu
          hiddenItems={hiddenItems}
          putTab={putTab}
          deleteTab={deleteTab}
          isDragging={isDragging}
        />

        <DragOverlay>
          {activeItem ? (
            <div
              className="menu__item menu__item__drag"
              style={{ cursor: "grabbing" }}
            >
              <img
                src={activeItem.img}
                alt={activeItem.alt}
                className="menu__icon"
              />
              <span className="menu__text">{activeItem.title}</span>
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>
    </section>
  );
};

{
  /* бургер-дропдаун */
}
{
  /* <details className="drop__menu">
  <summary className="drop__toggle" aria-label="Меню"></summary>

  <ul className="  menu">
    {hiddenItems.map((item) => (
      <li
        key={item.id}
        className={`menu__item ${item.isActive ? "menu__item__active" : ""}`}
      >
        <a href={item.url} className="menu__link">
          <img src={item.img} alt={item.alt} className="menu__icon" />
          <span className="menu__text">{item.title}</span>
        </a>
        <button
          className="del__butom"
          type="button"
          aria-label="Видалити"
          onClick={(e) => deleteTab(e, item.id)}
        >
          ×
        </button>
      </li>
    ))}
  </ul>
</details> */
}
