import { useList } from "../../hooks/uselist";

import { DropMenu } from "./dropMenu/dropMenu";
import { GorizontalList } from "./gorizontalList/gorizontalList";

import "./headerList.scss";

export const HeaderList = () => {
  const { list, hiddenItems, containerRef, deleteTab, putTab } = useList();

  return (
    <section className="header__menu">
      <button className="open__side-bar" type="button" aria-label="Закрити">
        X
      </button>

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
      />
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
