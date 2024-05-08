import { FiCheck } from "react-icons/fi";
import { TCompany } from "./model";
import styles from "./styles.module.scss";

export const CompanyCard = (comp: TCompany) => {
  return (
    <div className="d-flex align-items-center">
      <div className={`rounded-block ${styles.companyLogo}`}>{comp.logo}</div>
      <div className="d-flex flex-column ms-3">
        <span className={styles.companyName}>{comp.name}</span>
        <span className={styles.companyRole}>{comp.role}</span>
      </div>
      {comp.checked ? (
        <FiCheck
          className="ms-auto"
          color="var(--green)"
          style={{ width: "3rem", height: "2rem" }}
        />
      ) : (
        ""
      )}
    </div>
  );
};
