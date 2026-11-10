import { listTad as initialList } from "../data/listTab";
import type { TabItem } from "../type/type";

export const useFromLocalStoreg = (): TabItem[] => {
  try {
    const saved = localStorage.getItem("header-tabs");
    const parsed = saved ? JSON.parse(saved) : null;
    return parsed && parsed.length > 0 ? parsed : initialList;
  } catch (error) {
    console.error("Помилка читання localStorage", error);
    return initialList; // Якщо щось пішло не так - беремо дефолтні
  }
};
