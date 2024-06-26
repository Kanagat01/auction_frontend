import { NavLink } from "react-router-dom";
import { ReactSVG } from "react-svg";
import { MenuProfile, SettingsModal } from "~/widgets";
import { LogoutBtn } from "~/features/authorization";
import { Notifications } from "~/entities/Notification";
import { Person } from "~/shared/assets";
import { HOME_ROUTE, PROFILE_ROUTE } from "~/shared/routes";
import styles from "./styles.module.scss";

export function Header() {
  return (
    <header className={styles.header}>
      <div className={styles["logo"]}>
        <NavLink to={HOME_ROUTE}>Kargonika</NavLink>
      </div>
      <div className={styles["left-side"]}>
        <MenuProfile />
        <div className={styles["menu-actions"]}>
          <Notifications />
          <NavLink to={PROFILE_ROUTE}>
            <ReactSVG src={Person} />
          </NavLink>
          <SettingsModal />
          <LogoutBtn />
        </div>
      </div>
    </header>
  );
}
