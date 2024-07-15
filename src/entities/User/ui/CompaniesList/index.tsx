import { FormEvent, useState } from "react";
import { Modal } from "react-bootstrap";
import { FiPlus } from "react-icons/fi";
import { FaAngleDown } from "react-icons/fa";
import { TransporterCompany, CompanyCard } from "~/entities/User";
import {
  DatalistInput,
  ModalTitle,
  OutlineButton,
  TextCenter,
  TitleMd,
} from "~/shared/ui";
import { useModalState } from "~/shared/lib";
import styles from "./styles.module.scss";

export function CompaniesList({
  companies,
}: {
  companies: TransporterCompany[];
}) {
  const [show, changeShow] = useModalState(false);
  const [visible, setVisible] = useState<boolean>(true);
  const [section, setSection] = useState<"list" | "add">("list");
  const [transporterCompanyId, setTransporterCompanyId] = useState<number>(0);

  const changeSection = (newSection: "list" | "add") => {
    setVisible(false);
    setTimeout(() => {
      setSection(newSection);
      setVisible(true);
    }, 500);
  };
  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log(transporterCompanyId);
  };
  const onReset = () => {
    setTransporterCompanyId(0);
    changeSection("list");
  };
  return (
    <>
      <button onClick={changeShow}>
        <FaAngleDown
          className="avg-icon"
          style={{ transform: show ? "rotate(180deg)" : "none" }}
        />
      </button>
      <Modal show={show} onHide={changeShow}>
        <Modal.Body className={`slide-animation ${visible ? "visible" : ""}`}>
          {section === "list" ? (
            <>
              <div className={`${styles.yourCompanies} mb-4`}>
                Ваши перевозчики
              </div>
              {companies.length !== 0 ? (
                companies.map((comp, idx) => (
                  <CompanyCard key={idx} {...comp} />
                ))
              ) : (
                <TitleMd className="p-4">
                  <TextCenter>Нет добавленных перевозчиков</TextCenter>
                </TitleMd>
              )}
              <button
                className="d-inline-flex align-items-center mt-4 px-0"
                style={{ gap: "1rem" }}
                onClick={() => changeSection("add")}
              >
                <div className={`rounded-block ${styles.plusIcon}`}>
                  <FiPlus color="var(--primary)" />
                </div>
                <span className={styles.addCompany}>Добавить перевозчика</span>
              </button>
            </>
          ) : (
            <form onSubmit={onSubmit} onReset={onReset}>
              <ModalTitle className="mb-4">Добавить перевозчика</ModalTitle>
              <DatalistInput
                label="ID перевозчика"
                name="transporter_company_id"
                type="number"
                value={transporterCompanyId}
                onChange={(e) =>
                  setTransporterCompanyId(Number(e.target.value))
                }
                options={[
                  { id: 1, value: "Company 1" },
                  { id: 2, value: "Company 2" },
                  { id: 3, value: "Company 3" },
                ]}
                className="w-100 mb-0 px-4 py-3"
                label_style={{
                  color: "var(--default-font-color)",
                  fontSize: "1.4rem",
                  marginBottom: "1rem",
                }}
                container_style={{ marginRight: 0, gap: 0 }}
                style={{ borderRadius: "10px" }}
              />

              <div
                className="d-flex align-items-center mt-4"
                style={{ gap: "3rem" }}
              >
                <OutlineButton
                  onClick={onSubmit}
                  style={{
                    width: "100%",
                    padding: "0.5rem 2rem",
                    fontSize: "1.6rem",
                  }}
                >
                  Назначить
                </OutlineButton>
                <OutlineButton
                  onClick={onReset}
                  style={{
                    width: "100%",
                    padding: "0.5rem 2rem",
                    fontSize: "1.6rem",
                  }}
                >
                  Отмена
                </OutlineButton>
              </div>
            </form>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
}
