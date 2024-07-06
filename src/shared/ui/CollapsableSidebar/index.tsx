import { ReactNode } from "react";
import { FaAngleLeft } from "react-icons/fa";
import styles from "./styles.module.scss";
import { useUnit } from "effector-react";
import { $orderModal, changeOrderModal } from "~/entities/Order";

export function CollapsableSidebar({ children }: { children: ReactNode }) {
  const orderModal = useUnit($orderModal);
  return (
    <div className={`${styles.sidebar} ${orderModal ? styles.collapsed : ""}`}>
      <div
        className={styles["expand-btn"]}
        onClick={changeOrderModal as () => void}
      >
        <FaAngleLeft />
      </div>
      <div className={styles.content}>{orderModal ? children : ""}</div>
    </div>
  );
}
