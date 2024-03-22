import { useState } from "react";
import { Modal } from "react-bootstrap";
import { ReactSVG } from "react-svg";
import { FaAngleRight } from "react-icons/fa";
import { NotificationCard, NotificationType } from "~/entities/Notification";
import { useModalState } from "~/shared/lib";
import { Bell } from "~/shared/assets";

export function Notifications() {
  const [show, changeShow] = useModalState(false);
  const [activeSection, setActiveSection] = useState("Информация");
  const notifications: NotificationType[] = [
    {
      date: "23 ноября",
      time: "23:48",
      type: "Новость",
      title: "Межбанковские платежи в выходные",
      text: "26 ноября с 11:00 до 16:00 по Москве мы будем отправлять и зачислять платежи в рублях",
    },
    {
      date: "23 ноября",
      time: "23:48",
      type: "Новость",
      title: "Межбанковские платежи в выходные",
      text: "26 ноября с 11:00 до 16:00 по Москве мы будем отправлять и зачислять платежи в рублях",
    },
  ];
  return (
    <>
      <a href="#" onClick={changeShow}>
        <ReactSVG src={Bell} />
      </a>

      <Modal show={show} onHide={changeShow} className="rounded-modal">
        <Modal.Body>
          <div className="d-flex justify-content-end mb-2">
            <FaAngleRight className="avg-icon" />
          </div>
          <div className="d-flex mb-4" style={{ gap: "1rem" }}>
            {["Информация", "Финансы"].map((text) => (
              <button
                onClick={() => setActiveSection(text)}
                style={{
                  boxSizing: "border-box",
                  border:
                    activeSection === text
                      ? "1px solid rgba(5, 10, 4, 0.2)"
                      : "none",
                  borderRadius: "10px",
                  background:
                    activeSection === text ? "#fff" : "rgba(5, 10, 4, 0.05)",
                  color: "rgb(5, 10, 4)",
                  fontFamily: "Gilroy",
                  fontSize: "1.4rem",
                  fontWeight: 400,
                  lineHeight: "17px",
                  textAlign: "left",
                  padding: "0.5rem 1.5rem",
                }}
              >
                {text}
              </button>
            ))}
          </div>
          {notifications.map((el) => (
            <NotificationCard {...el} />
          ))}
        </Modal.Body>
      </Modal>
    </>
  );
}
