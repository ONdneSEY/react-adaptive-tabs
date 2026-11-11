import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import type { TabItem } from "../../../type/type";
import { SortableTab } from "../SortableTab";

type Props = {
  hiddenItems: TabItem[];
  putTab: (id: string) => void;
  deleteTab: (e: React.MouseEvent<HTMLButtonElement>, id: string) => void;
};

export const VerticalList = ({ hiddenItems, putTab, deleteTab }: Props) => {
  return (
    <SortableContext
      items={hiddenItems.map((i) => i.id)}
      strategy={verticalListSortingStrategy}
    >
      <ul className="drop__list">
        {hiddenItems.map((item) => (
          <SortableTab
            key={item.id}
            item={item}
            putTab={putTab}
            deleteTab={deleteTab}
          />
        ))}
      </ul>
    </SortableContext>
  );
};
