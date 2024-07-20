import { ReactSVG } from "react-svg";
import { useUnit } from "effector-react";
import { NavLink } from "react-router-dom";
import { MenuProfile, SettingsModal } from "~/widgets";
import { $isAuthenticated, LogoutBtn } from "~/features/authorization";
import { Notifications } from "~/entities/Notification";
import { Person } from "~/shared/assets";
import Routes from "~/shared/routes";
import styles from "./styles.module.scss";

export function Header() {
  const isAuth = useUnit($isAuthenticated);
  return (
    <header className={styles.header}>
      <div className={styles["logo"]}>
        <NavLink to={Routes.HOME}>Kargonika</NavLink>
      </div>
      {isAuth ? (
        <div className={styles["left-side"]}>
          <MenuProfile />
          <div className={styles["menu-actions"]}>
            <Notifications />
            <NavLink to={Routes.PROFILE}>
              <ReactSVG src={Person} />
            </NavLink>
            <SettingsModal />
            <LogoutBtn />
          </div>
        </div>
      ) : (
        ""
      )}
    </header>
  );
}
