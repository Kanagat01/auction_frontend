import { ReactNode } from "react";
import { FaAngleLeft } from "react-icons/fa";
import styles from "./styles.module.scss";
import { useModalState } from "~/shared/lib";

export function CollapsableSidebar({ children }: { children: ReactNode }) {
  const [show, changeShow] = useModalState(false);
  return (
    <div className={`${styles.sidebar} ${show ? styles.collapsed : ""}`}>
      <div className={styles["expand-btn"]} onClick={changeShow}>
        <FaAngleLeft />
      </div>
      <div className={styles.content}>{show ? children : ""}</div>
    </div>
  );
}
