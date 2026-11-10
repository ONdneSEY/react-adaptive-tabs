import { useRef, useState } from "react";
import { useOverflowTabs } from "react-overflow-tabs";

import { listTad as initialList } from "../../data/listTab";

import "./headerList.scss";
import "./bropMenu.scss";

export const HeaderList = () => {
  const [list, setList] = useState(initialList);

  const containerRef = useRef(null);
  const { overflowKeys } = useOverflowTabs({ container: containerRef });

  const hiddenItems = list.filter((item) => overflowKeys.includes(item.id));

  const deleteTab = (e: React.MouseEvent<HTMLButtonElement>, id: string) => {
    e.stopPropagation();
    e.stopPropagation();
    setList((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <section className="header__menu">
      <button className="open__side-bar" type="button" aria-label="Закрити">
        X
      </button>

      {/* горизонтальне меню */}
      <ul className="menu" ref={containerRef}>
        {list.map((item) => (
          <li
            key={item.id}
            data-overflow-key={item.id}
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

      {/* бургер-дропдаун */}
      <details className="drop__menu">
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
      </details>
    </section>
  );
};
