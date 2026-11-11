import { useEffect, useRef, useState } from "react";

import type { TabItem } from "../type/type";
import { useFromLocalStoreg } from "./getFromLocalStoreg";
import { useOverflowTabs } from "react-overflow-tabs";

export const useList = () => {
  const [list, setList] = useState<TabItem[]>(useFromLocalStoreg);
  const [isDragging, setIsDragging] = useState(false);

  const containerRef = useRef<HTMLUListElement>(null);
  const { overflowKeys } = useOverflowTabs({
    container: containerRef,
    disabled: isDragging,
  });
  const currentHiddenItems = list.filter((item) =>
    overflowKeys.includes(item.id),
  );
  // 1. Використовуємо useState для збереження замороженого списку
  const [frozenItems, setFrozenItems] = useState<TabItem[]>(currentHiddenItems);

  // 2. Синхронізуємо стан ТІЛЬКИ коли ми не тягнемо.
  // Оскільки це відбувається всередині рендеру, ми використовуємо патерн "Derived State"
  if (
    !isDragging &&
    JSON.stringify(frozenItems) !== JSON.stringify(currentHiddenItems)
  ) {
    setFrozenItems(currentHiddenItems);
  }

  const deleteTab = (e: React.MouseEvent<HTMLButtonElement>, id: string) => {
    e.stopPropagation();
    e.stopPropagation();
    setList((prev) => prev.filter((item) => item.id !== id));
  };

  const putTab = (id: string) => {
    setList((prev) =>
      prev.map((item) => ({
        ...item,
        isActive: item.id === id,
      })),
    );
  };

  useEffect(() => {
    localStorage.setItem("header-tabs", JSON.stringify(list));
  }, [list]);

  return {
    list,
    isDragging,
    hiddenItems: isDragging ? frozenItems : currentHiddenItems,
    containerRef,
    deleteTab,
    putTab,
    setList,
    setIsDragging,
  };
};
