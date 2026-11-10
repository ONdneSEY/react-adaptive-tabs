import type { TabItem } from "../../../type/type";

import "./gorizontalList.scss";

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
    <ul className="menu" ref={containerRef}>
      {list.map((item) => (
        <li
          key={item.id}
          data-overflow-key={item.id}
          className={`menu__item ${item.isActive ? "menu__item__active" : ""}`}
          onClick={() => putTab(item.id)}
        >
          <a href={item.url} className="menu__link">
            <img src={item.img} alt={item.alt} className="menu__icon" />
            <span className="menu__text">{item.title}</span>
          </a>
          <button
            className="del__buttom"
            type="button"
            aria-label="Видалити"
            onClick={(e) => deleteTab(e, item.id)}
          >
            ×
          </button>
        </li>
      ))}
    </ul>
  );
};
