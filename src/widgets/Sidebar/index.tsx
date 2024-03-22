import {
  Statistics,
  DeleteNote,
  Hammer,
  Cube,
  CreateNote,
  History,
  Book,
} from "~/shared/assets";
import styles from "./styles.module.scss";

export function Sidebar() {
  return (
    <aside className={styles.aside}>
      {[Statistics, Hammer, Cube, CreateNote, History, Book, DeleteNote].map(
        (src, index) => (
          <a href="#" key={index}>
            <img src={src} style={{ width: "2.4rem", height: "2.4rem" }} />
          </a>
        )
      )}
    </aside>
  );
}
