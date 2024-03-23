import { ReactSVG } from "react-svg";
import {
  Statistics,
  DeleteNote,
  Hammer,
  Cube,
  CreateNote,
  History,
  Book,
} from "~/shared/assets";
import { TooltipOnHover } from "~/shared/ui";
import styles from "./styles.module.scss";

export function Sidebar() {
  const sections = [
    [Statistics, "Статистика"],
    [Hammer, "Молоток"],
    [Cube, "Куб"],
    [CreateNote, "Создать заметку"],
    [History, "История"],
    [Book, "Книга"],
    [DeleteNote, "Удалить заметку"],
  ];
  return (
    <aside className={styles.aside}>
      {sections.map(([icon, title], index) => (
        <TooltipOnHover
          key={index}
          id={`t-${index}`}
          title={title}
          placement="right-end"
        >
          <a href="#" className={index === 0 ? styles.active : ""}>
            <ReactSVG src={icon} className={styles.icon} />
          </a>
        </TooltipOnHover>
      ))}
    </aside>
  );
}
