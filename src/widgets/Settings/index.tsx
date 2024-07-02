import { Modal } from "react-bootstrap";
import { ReactSVG } from "react-svg";
import { IconType } from "react-icons";
import { FaAngleRight } from "react-icons/fa";
import { IoCashOutline } from "react-icons/io5";
import { LuUsers, LuUserPlus } from "react-icons/lu";

import { LogoutBtn } from "~/features/authorization";
import { useModalState } from "~/shared/lib";
import { Settings, Company, Security } from "~/shared/assets";
import styles from "./styles.module.scss";

export function SettingsModal() {
  const [show, changeShow] = useModalState(false);
  const settingOptions: [string | IconType, string, string][] = [
    [Company, "Моя компания", "Реквизиты"],
    [Security, "Вход и безопасность", "Пароли"],
    [IoCashOutline, "Тарифы", ""],
    [LuUsers, "Мои менеджеры", ""],
    [LuUserPlus, "Добавить менеджера", ""],
  ];
  const currentCompany = "ЕВРАЗИЯ ООО";
  return (
    <>
      <a href="#" onClick={changeShow}>
        <ReactSVG src={Settings} />
      </a>
      <Modal show={show} onHide={changeShow} className="rounded-modal">
        <Modal.Body>
          <div className="d-flex align-items-center justify-content-between mb-2">
            <LogoutBtn />
            <div className={styles.currentCompany}>{currentCompany}</div>
            <a href="#">
              <FaAngleRight className="avg-icon" />
            </a>
          </div>
          <div className="d-flex flex-column mt-5" style={{ gap: "2rem" }}>
            {settingOptions.map(([Icon, title, description], idx) => (
              <div
                key={idx}
                className="d-flex align-items-center"
                style={{ gap: "1rem" }}
              >
                {typeof Icon === "string" ? (
                  <ReactSVG
                    src={Icon}
                    style={{ fontSize: "2.4rem", lineHeight: "2.4rem" }}
                  />
                ) : (
                  <Icon style={{ fontSize: "2.4rem", lineHeight: "2.4rem" }} />
                )}
                <div
                  className="d-flex flex-column text-left"
                  style={{ gap: "0.5rem" }}
                >
                  <span className={styles.settingOptionTitle}>{title}</span>
                  {description && (
                    <span className={styles.settingOptionDescription}>
                      {description}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
