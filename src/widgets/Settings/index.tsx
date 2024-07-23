import { useState } from "react";
import { useUnit } from "effector-react";
import { Modal } from "react-bootstrap";
import { useTranslation } from "react-i18next";

import { FaAngleLeft, FaPen } from "react-icons/fa";
import { SlSettings } from "react-icons/sl";

import { $mainData, CustomerCompany, CustomerManager } from "~/entities/User";
import { useModalState } from "~/shared/lib";
import {
  TSection,
  MainSection,
  CompanyDetails,
  ChangePassword,
  SubscriptionsList,
  ManagersList,
  AddManager,
} from "./sections";
import styles from "./styles.module.scss";
import { RoundedGrayButton } from "~/shared/ui";

const renderSection = (
  role: string,
  section: TSection,
  changeSection: (newSection: TSection) => void
) => {
  switch (section) {
    case "main":
      return <MainSection role={role} changeSection={changeSection} />;
    case "company":
      return <CompanyDetails />;
    case "security":
      return <ChangePassword />;
    case "subscriptions":
      return <SubscriptionsList />;
    case "managers":
      return <ManagersList />;
    case "addManager":
      return <AddManager />;
  }
};

export function SettingsModal() {
  const { t } = useTranslation();
  const mainData = useUnit($mainData);
  const role = mainData?.user.user_type.split("_")[1];
  const currentCompany =
    role === "manager"
      ? (mainData as CustomerManager)?.company.company_name
      : (mainData as CustomerCompany)?.company_name;
  const sectionDict: Record<TSection, string> = {
    main: currentCompany,
    company: t("company_details"),
    security: t("change_password"),
    subscriptions: t("subscriptions"),
    managers: t("your_managers"),
    addManager: t("add_manager"),
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
          <div className="d-flex align-items-center mb-2">
            <button
              className="p-0 z-1"
              onClick={() => (section !== "main" ? changeSection("main") : {})}
            >
              <FaAngleLeft className={styles.goBackButton} />
            </button>
            <div
              className="d-flex justify-content-center w-100 position-relative"
              style={{ marginLeft: "-3rem" }}
            >
              <div
                className={`${styles.currentSection} slide-animation ${
                  visible ? "visible" : ""
                }`}
              >
                {sectionDict[section]}
              </div>
              {section === "managers" && (
                <RoundedGrayButton
                  className={`${styles.editButton} slide-animation ${
                    visible ? "visible" : ""
                  }`}
                >
                  <FaPen />
                </RoundedGrayButton>
              )}
            </div>
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
