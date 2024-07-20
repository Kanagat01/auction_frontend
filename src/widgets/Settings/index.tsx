import { useState } from "react";
import { useUnit } from "effector-react";
import { Modal } from "react-bootstrap";

import { FaAngleLeft } from "react-icons/fa";
import { SlSettings } from "react-icons/sl";

import { LogoutBtn } from "~/features/authorization";
import { $mainData, CustomerCompany, CustomerManager } from "~/entities/User";
import { useModalState } from "~/shared/lib";
import { renderSection, TSection } from "./sections";
import styles from "./styles.module.scss";

export function SettingsModal() {
  const mainData = useUnit($mainData);
  const role = mainData?.user.user_type.split("_")[1];
  const currentCompany =
    role === "manager"
      ? (mainData as CustomerManager)?.company.company_name
      : (mainData as CustomerCompany)?.company_name;
  const sectionDict: Record<TSection, string> = {
    main: currentCompany,
    company: "Ваши реквизиты",
    security: "Изменить пароль",
    subscriptions: "Тарифы",
    managers: "Ваши менеджеры",
    addManager: "Добавить менеджера",
  };

  const [visible, setVisible] = useState(true);
  const [section, setSection] = useState<TSection>("main");

  const [show, changeShow] = useModalState(false);
  const changeSection = (newSection: TSection) => {
    setVisible(false);
    setTimeout(() => {
      setSection(newSection);
      setVisible(true);
    }, 500);
  };

  return (
    <>
      <a href="#" onClick={changeShow}>
        <SlSettings strokeWidth="1.5em" />
      </a>
      <Modal show={show} onHide={changeShow} className="rounded-modal">
        <Modal.Body>
          <div className="d-flex align-items-center justify-content-between mb-2">
            <button
              className="p-0"
              onClick={() => (section !== "main" ? changeSection("main") : {})}
            >
              <FaAngleLeft className={styles.goBackButton} />
            </button>
            <div
              className={`${styles.currentCompany} slide-animation ${
                visible ? "visible" : ""
              }`}
            >
              {sectionDict[section]}
            </div>
            <LogoutBtn />
          </div>
          <div
            className={`d-flex flex-column mt-5 slide-animation ${
              visible ? "visible" : ""
            }`}
            style={{ gap: "2rem" }}
          >
            {renderSection(role ?? "", section, changeSection)}
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
