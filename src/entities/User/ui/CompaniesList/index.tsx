import { Modal } from "react-bootstrap";
import { FiPlus } from "react-icons/fi";
import { FaAngleDown } from "react-icons/fa";
import { TransporterCompany, CompanyCard } from "~/entities/User";
import { useModalState } from "~/shared/lib";
import styles from "./styles.module.scss";
import { TextCenter, TitleMd } from "~/shared/ui";

export function CompaniesList({
  companies,
}: {
  companies: TransporterCompany[];
}) {
  const [show, changeShow] = useModalState(false);
  return (
    <>
      <button onClick={changeShow}>
        <FaAngleDown
          className="avg-icon"
          style={{ transform: show ? "rotate(180deg)" : "none" }}
        />
      </button>
      <Modal show={show} onHide={changeShow}>
        <Modal.Body>
          <div className={`${styles.yourCompanies} mb-4`}>Ваши перевозчики</div>
          {companies.length !== 0 ? (
            companies.map((comp, idx) => <CompanyCard key={idx} {...comp} />)
          ) : (
            <TitleMd className="p-4">
              <TextCenter>Нет добавленных перевозчиков</TextCenter>
            </TitleMd>
          )}
          <a
            href="#"
            className="d-inline-flex align-items-center mt-4"
            style={{ gap: "1rem" }}
          >
            <div className={`rounded-block ${styles.plusIcon}`}>
              <FiPlus color="var(--primary)" />
            </div>
            <span className={styles.addCompany}>Добавить перевозчика</span>
          </a>
        </Modal.Body>
      </Modal>
    </>
  );
}
