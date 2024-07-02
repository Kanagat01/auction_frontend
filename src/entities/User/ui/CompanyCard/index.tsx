import styles from "./styles.module.scss";
import { TransporterCompany } from "~/entities/User";

export const CompanyCard = (comp: TransporterCompany) => {
  return (
    <div className="d-flex align-items-center">
      <div className="rounded-block company-logo">{comp.company_name[0]}</div>
      <div className="d-flex flex-column ms-3">
        <span className={styles.companyName}>{comp.company_name}</span>
        {/* <span className={styles.companyRole}>{comp.role}</span> */}
      </div>
    </div>
  );
};
