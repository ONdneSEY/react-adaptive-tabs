import {
  horizontalListSortingStrategy,
  SortableContext,
} from "@dnd-kit/sortable";
import type { TabItem } from "../../../type/type";

import "./gorizontalList.scss";
import { SortableTab } from "../SortableTab";

type Props = {
  list: TabItem[];
  containerRef: React.RefObject<HTMLUListElement | null>;
  putTab: (id: string) => void;
  deleteTab: (e: React.MouseEvent<HTMLButtonElement>, id: string) => void;
};

export const GorizontalList = ({
  list,
  containerRef,
  putTab,
  deleteTab,
}: Props) => {
  return (
    <SortableContext
      items={list.map((i) => i.id)}
      strategy={horizontalListSortingStrategy}
    >
      <ul className="menu" ref={containerRef}>
        {list.map((item) => (
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
