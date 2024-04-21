import { ReactSVG } from "react-svg";
import { SettingsModal } from "~/widgets";
import { Notifications, CompaniesList } from "~/features";
import { Person, Logout, Ava } from "~/shared/assets";
import { SearchInput } from "~/shared/ui";
import styles from "./styles.module.scss";
import { NavLink } from "react-router-dom";
import { PROFILE_ROUTE } from "~/shared/routes";

export function Header() {
  return (
    <header className={styles.header}>
      <div className={styles["logo"]}>Kargonika</div>
      <div className={styles["left-side"]}>
        <SearchInput placeholder="Поиск" />
        <div className={styles["menu-profile-info"]}>
          <div className="rounded-block">
            <img src={Ava} alt="person-img" />
          </div>
          <div className={styles["profile-main"]}>
            <span className={styles["full-name"]}>Anton Zheltyshev</span>
            <span className={styles["org-name"]}>ООО “Евразия” (312362)</span>
          </div>
          <CompaniesList />
        </div>
        <div className={styles["menu-actions"]}>
          <Notifications />
          <NavLink to={PROFILE_ROUTE}>
            <ReactSVG src={Person} />
          </NavLink>
          <SettingsModal />
          <NavLink to="#">
            <ReactSVG src={Logout} />
          </NavLink>
        </div>
      </div>
    </header>
  );
}
