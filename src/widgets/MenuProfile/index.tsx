import { useUnit } from "effector-react";
import {
  $mainData,
  CompaniesList,
  CustomerCompany,
  TransporterCompany,
} from "~/entities/User";
import styles from "./styles.module.scss";

export function MenuProfile() {
  const mainData = useUnit($mainData);
  let orgName;
  if (mainData) {
    const company = "company" in mainData ? mainData?.company : mainData;
    const companyId =
      (company as CustomerCompany)?.customer_company_id ||
      (company as TransporterCompany)?.transporter_company_id;

    const companyName = company?.company_name || "";
    orgName = `${companyName} (${companyId})`;
  }

  return (
    <div className={styles["menu-profile-info"]}>
      <div className={`${styles["profile-main"]} align-items-end`}>
        <span className={styles["full-name"]}>150 000 Rub</span>
        <span className={styles["org-name"]}>+7 777 777 7777</span>
      </div>
      <div className="rounded-block company-logo">
        {mainData?.user.full_name[0]}
      </div>
      <div className={styles["profile-main"]}>
        <span className={styles["full-name"]}>{mainData?.user.full_name}</span>
        <span className={styles["org-name"]}>{orgName}</span>
      </div>
      {mainData?.user.user_type === "customer_company" ? (
        <CompaniesList
          companies={
            (mainData as CustomerCompany).allowed_transporter_companies
          }
        />
      ) : (
        ""
      )}
    </div>
  );
}
