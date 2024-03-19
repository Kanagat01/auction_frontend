import { ReactNode } from "react";
import { LogoutIcon, PersonIcon, SearchInput, SettingsIcon } from "~/shared/ui";
import person from "~/shared/ui/icons/ava.jpg";
import styles from "./styles.module.scss";
import { CompaniesList } from "~/entities/Company";
import { Notifications } from "~/entities/Notification";

export function Header(): ReactNode {
  return (
    <header className={styles.header}>
      <div className={styles["logo"]}>Kargonika</div>
      <div className={styles["left-side"]}>
        <SearchInput placeholder="Поиск" />
        <div className={styles["menu-profile-info"]}>
          <div className="rounded-block">
            <img src={person} alt="person-img" />
          </div>
          <div className={styles["profile-main"]}>
            <span className={styles["full-name"]}>Anton Zheltyshev</span>
            <span className={styles["org-name"]}>ООО “Евразия” (312362)</span>
          </div>
          <CompaniesList />
        </div>
        <div className={styles["menu-actions"]}>
          <Notifications />
          {[<PersonIcon />, <SettingsIcon />, <LogoutIcon />].map((el) => (
            <a href="#">{el}</a>
          ))}
        </div>
      </div>
    </header>
  );
}
