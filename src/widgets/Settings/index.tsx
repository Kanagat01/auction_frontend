import { Modal } from "react-bootstrap";
import { ReactSVG } from "react-svg";
import { FaAngleRight } from "react-icons/fa";
import { useModalState } from "~/shared/lib";
import {
  Settings,
  Company,
  Security,
  Key,
  Bell,
  Integration,
} from "~/shared/assets";

import styles from "./styles.module.scss";
import { LogoutBtn } from "~/features/authorization";

export function SettingsModal() {
  const [show, changeShow] = useModalState(false);
  const settingOptions = [
    [Company, "Моя компания", "Реквизиты, лимиты, справки"],
    [Security, "Вход и безопасность", "Пароли, устройства, биометрия"],
    [Key, "Доступы", ""],
    [Bell, "Уведомления", "По смс, на почту или в телеграм"],
    [Integration, "Интеграции", "1С, Контур.Эльба, Моё дело и другие"],
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
            {settingOptions.map(([icon, title, description], idx) => (
              <div
                key={idx}
                className="d-flex align-items-center"
                style={{ gap: "1rem" }}
              >
                <ReactSVG
                  src={icon}
                  style={{ fontSize: "2.4rem", lineHeight: "2.4rem" }}
                />
                <div
                  className="d-flex flex-column text-left"
                  style={{ gap: "0.5rem" }}
                >
                  <span className={styles.settingOptionTitle}>{title}</span>
                  <span className={styles.settingOptionDescription}>
                    {description}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
