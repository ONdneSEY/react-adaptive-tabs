import { useEffect, useRef, useState } from "react";

import type { TabItem } from "../type/type";
import { useFromLocalStoreg } from "./getFromLocalStoreg";
import { useOverflowTabs } from "react-overflow-tabs";

export const useList = () => {
  const [list, setList] = useState<TabItem[]>(useFromLocalStoreg);

  const containerRef = useRef<HTMLUListElement>(null);
  const { overflowKeys } = useOverflowTabs({ container: containerRef });
  const hiddenItems = list.filter((item) => overflowKeys.includes(item.id));

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
    hiddenItems,
    containerRef,
    deleteTab,
    putTab,
  };
};
