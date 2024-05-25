import { Modal } from "react-bootstrap";
import { CompanyCard } from "~/entities/Company";
import { FiPlus } from "react-icons/fi";
import { FaAngleDown } from "react-icons/fa";
import { useModalState } from "~/shared/lib";
import styles from "./styles.module.scss";
import { TransporterCompany } from "~/entities/Company";

export function CompaniesList({
  companies,
}: {
  companies: TransporterCompany[];
}) {
  const [show, changeShow] = useModalState(false);
  return (
    companies && (
      <>
        <button onClick={changeShow}>
          <FaAngleDown
            className="avg-icon"
            style={{ transform: show ? "rotate(180deg)" : "none" }}
          />
        </button>
        <Modal show={show} onHide={changeShow}>
          <Modal.Body>
            <div className={`${styles.yourCompanies} mb-4`}>Ваши компании</div>
            {companies.map((comp, idx) => (
              <CompanyCard key={idx} {...comp} />
            ))}
            <a
              href="#"
              className="d-inline-flex align-items-center mt-4"
              style={{ gap: "1rem" }}
            >
              <div className={`rounded-block ${styles.plusIcon}`}>
                <FiPlus color="var(--primary)" />
              </div>
              <span className={styles.addCompany}>Добавить компанию</span>
            </a>
          </Modal.Body>
        </Modal>
      </>
    )
  );
}
