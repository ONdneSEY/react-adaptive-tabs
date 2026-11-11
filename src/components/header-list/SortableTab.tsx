import { useSortable } from "@dnd-kit/sortable";

import type { TabItem } from "../../type/type";
import { CSS } from "@dnd-kit/utilities";

type Props = {
  item: TabItem;
  putTab: (id: string) => void;
  deleteTab: (e: React.MouseEvent<HTMLButtonElement>, id: string) => void;
};

export const SortableTab = ({ item, putTab, deleteTab }: Props) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: item.id });

  const style = {
    transform: CSS.Translate.toString(transform), // <--- ЗМІНА ТУТ
    transition,
    zIndex: isDragging ? 1000 : 1,
    opacity: isDragging ? 0 : 1,
  };

  return (
    <li
      data-overflow-key={item.id}
      className={`menu__item ${item.isActive ? "menu__item__active" : ""} ${isDragging ? "menu__item__drag" : ""}`}
      onClick={() => putTab(item.id)}
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
    >
      <a href={item.url} className="menu__link">
        <img src={item.img} alt={item.alt} className="menu__icon" />
        <span className="menu__text">{item.title}</span>
      </a>
      <button
        className="del__buttom"
        type="button"
        aria-label="Видалити"
        onPointerDown={(e) => e.stopPropagation()}
        onClick={(e) => deleteTab(e, item.id)}
      >
        ×
      </button>
    </li>
  );
};
