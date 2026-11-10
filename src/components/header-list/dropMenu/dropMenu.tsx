import { useState } from "react";

import type { TabItem } from "../../../type/type";

import "./dropMenu.scss";
import { VerticalList } from "../verticalList/verticalList";

type Props = {
  hiddenItems: TabItem[];
  putTab: (id: string) => void;
  deleteTab: (e: React.MouseEvent<HTMLButtonElement>, id: string) => void;
};

export const DropMenu = ({ hiddenItems, putTab, deleteTab }: Props) => {
  const [isDroped, setIsDroped] = useState(false);

  return (
    <div className={`drop__menu ${isDroped ? "is-open" : ""}`}>
      <button
        className={`drop__taggle`}
        onPointerDown={(e) => e.stopPropagation()}
        onClick={() => setIsDroped(!isDroped)}
      >
        <span className="drop__taggle__icon" />
      </button>

      <VerticalList
        hiddenItems={hiddenItems}
        putTab={putTab}
        deleteTab={deleteTab}
      />
    </div>
  );
};
