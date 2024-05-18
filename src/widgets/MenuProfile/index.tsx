import { useUnit } from "effector-react";
import { CompaniesList } from "~/features";
import { $user } from "~/entities/User";
import { logger } from "~/shared/config";
import styles from "./styles.module.scss";

export function MenuProfile() {
  const user = useUnit($user);
  logger.log(user);
  return (
    <div className={styles["menu-profile-info"]}>
      <div className="rounded-block company-logo">{user.user.full_name[0]}</div>
      <div className={styles["profile-main"]}>
        <span className={styles["full-name"]}>{user.user.full_name}</span>
        <span className={styles["org-name"]}>{user.company_name}</span>
      </div>
      <CompaniesList companies={user.allowed_transporter_companies} />
    </div>
  );
}
