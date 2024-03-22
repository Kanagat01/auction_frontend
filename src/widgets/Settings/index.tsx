// import { useState } from "react";
import { Modal } from "react-bootstrap";
import { ReactSVG } from "react-svg";
import { FaAngleRight } from "react-icons/fa";
import { useModalState } from "~/shared/lib";
import { Logout, Settings } from "~/shared/assets";

import styles from "./styles.module.scss";

export function SettingsModal() {
  const [show, changeShow] = useModalState(false);
  // const [activeSection, setActiveSection] = useState("Информация");
  const currentCompany = "ЕВРАЗИЯ ООО";
  return (
    <>
      <a href="#" onClick={changeShow}>
        <ReactSVG src={Settings} />
      </a>
      <Modal show={show} onHide={changeShow} className="rounded-modal">
        <Modal.Body>
          <div className="d-flex align-items-center justify-content-between mb-2">
            <a href="#">
              <ReactSVG src={Logout} style={{ fontSize: "3rem" }} />
            </a>
            <div className={styles.currentCompany}>{currentCompany}</div>
            <a href="#">
              <FaAngleRight className="avg-icon" />
            </a>
          </div>
          <div className="d-flex flex-column">
            <div className="d-flex"></div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
