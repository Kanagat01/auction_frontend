import { useUnit } from "effector-react";
import { $mainData } from "~/entities/User";
import styles from "./styles.module.scss";
import { CompaniesList } from "~/entities/Company";

export function MenuProfile() {
  const mainData = useUnit($mainData);
  return (
    <div className={styles["menu-profile-info"]}>
      <div className="rounded-block company-logo">
        {mainData!.user.full_name[0]}
      </div>
      <div className={styles["profile-main"]}>
        <span className={styles["full-name"]}>{mainData!.user.full_name}</span>
        <span className={styles["org-name"]}>{mainData!.company_name}</span>
      </div>
      <CompaniesList companies={mainData!.allowed_transporter_companies} />
    </div>
  );
}
