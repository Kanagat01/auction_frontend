import toast from "react-hot-toast";
import { FormEvent, useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { FiPlus } from "react-icons/fi";
import { FaAngleDown } from "react-icons/fa";
import {
  TransporterCompany,
  CompanyCard,
  getTransportersFx,
  addTransportToAllowed,
} from "~/entities/User";
import { DatalistInput, ModalTitle, OutlineButton } from "~/shared/ui";
import { useModalState } from "~/shared/lib";
import styles from "./styles.module.scss";

export function CompaniesList({
  companies,
}: {
  companies: Omit<TransporterCompany, "managers" | "user">[];
}) {
  const [show, changeShow] = useModalState(false);
  const [visible, setVisible] = useState<boolean>(true);
  const [section, setSection] = useState<"list" | "add">("list");
  const changeSection = (newSection: "list" | "add") => {
    setVisible(false);
    setTimeout(() => {
      setSection(newSection);
      setVisible(true);
    }, 500);
  };

  const [transporter_company_id, setTransporterCompanyId] = useState<number>(0);
  const [options, setOptions] = useState<{ id: number; value: string }[]>([]);

  useEffect(() => {
    if (section === "add")
      getTransportersFx().then((transporters) =>
        setOptions(
          transporters.map(
            ({ transporter_company_id: id, company_name: value }) => ({
              id,
              value,
            })
          )
        )
      );
  }, [section]);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    let alreadyExists = false;
    companies.forEach(({ transporter_company_id: id }) => {
      if (id === transporter_company_id) alreadyExists = true;
    });
    if (alreadyExists) {
      toast.error("Эта компания уже добавлена в Ваши перевозчики");
      return;
    }

    let foundOne = false;
    options.forEach(({ id }) => {
      if (id === transporter_company_id) foundOne = true;
    });

    if (!foundOne) toast.error("Компании Перевозчика с таким id не существует");
    else
      addTransportToAllowed({
        transporter_company_id,
        onReset: () => onReset(e),
      });
  };

  const onReset = (e: FormEvent) => {
    e.preventDefault();
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
              {
                companies.length !== 0
                  ? companies.map((comp, idx) => (
                      <CompanyCard key={idx} {...comp} />
                    ))
                  : ""
                // <div
                //   className={`${styles.yourCompanies} mb-4`}
                // >
                //   Нет добавленных перевозчиков
                // </div>
              }
              <button
                className="d-inline-flex align-items-center px-0"
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
                value={transporter_company_id}
                onChange={(e) =>
                  setTransporterCompanyId(Number(e.target.value))
                }
                options={options}
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
                  type="submit"
                  style={{
                    width: "100%",
                    padding: "0.5rem 2rem",
                    fontSize: "1.6rem",
                  }}
                >
                  Назначить
                </OutlineButton>
                <OutlineButton
                  type="reset"
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
