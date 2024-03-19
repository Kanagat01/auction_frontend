import { ReactNode } from "react";
import {
  StatisticsIcon,
  DeleteNoteIcon,
  HammerIcon,
  CubeIcon,
  CreateNoteIcon,
  HistoryIcon,
  BookIcon,
} from "~/shared/ui";
import styles from "./styles.module.scss";

export function Sidebar(): ReactNode {
  return (
    <aside className={styles.aside}>
      {[
        StatisticsIcon,
        HammerIcon,
        CubeIcon,
        CreateNoteIcon,
        HistoryIcon,
        BookIcon,
        DeleteNoteIcon,
      ].map((Icon, index) => (
        <a href="#" key={index}>
          <Icon style={{ width: "2rem", height: "2rem" }} />
        </a>
      ))}
    </aside>
  );
}
