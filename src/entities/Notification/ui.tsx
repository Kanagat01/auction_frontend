import { useState } from "react";
import { Modal } from "react-bootstrap";
import { FaAngleRight } from "react-icons/fa";
import { useModalState } from "~/shared/lib";
import { RegBellIcon } from "~/shared/ui";
import { NotificationType } from "./model";

export function Notifications() {
  const [show, changeShow] = useModalState(true);
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
        <RegBellIcon />
      </a>

      <Modal
        show={show}
        onHide={changeShow}
        style={{
          border: "none",
        }}
      >
        <Modal.Body
          style={{
            borderRadius: "20px 0px 0px 20px",
            background: "#fff",
            padding: "3rem 2rem",
          }}
        >
          <div className="d-flex justify-content-end mb-2">
            <FaAngleRight
              style={{
                width: "2rem",
                height: "2rem",
              }}
            />
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

const NotificationCard = (props: NotificationType) => {
  return (
    <>
      <span
        className="d-inline-block mb-3"
        style={{
          fontFamily: "Gilroy",
          fontSize: "1.6rem",
          fontWeight: 600,
          lineHeight: "19px",
          textAlign: "left",
        }}
      >
        {props.date}
      </span>
      <div
        className="notification-card d-flex flex-column p-4 mb-4"
        style={{
          borderRadius: "10px",
          background: "rgba(5, 10, 4, 0.05)",
          gap: "0.5rem",
        }}
      >
        <span
          className="notification-type"
          style={{
            color: "rgba(5, 10, 4, 0.5)",
            fontFamily: "Gilroy",
            fontSize: "1.2rem",
            fontWeight: 500,
            lineHeight: "15px",
            textAlign: "left",
          }}
        >
          {props.type}
        </span>
        <span
          className="notification-title"
          style={{
            color: "rgba(5, 10, 4, 0.8)",
            fontFamily: "Gilroy",
            fontSize: "1.4rem",
            fontWeight: 600,
            lineHeight: "17px",
            textAlign: "left",
          }}
        >
          {props.title}
        </span>
        <div
          style={{
            color: "rgba(5, 10, 4, 0.5)",
            fontFamily: "Gilroy",
            fontSize: "1.2rem",
            fontWeight: 400,
            lineHeight: "1.4rem",
            textAlign: "left",
          }}
        >
          {props.text}
        </div>
        <div className="d-flex justify-content-between">
          <a
            style={{
              fontFamily: "Gilroy",
              fontSize: "1.2rem",
              fontWeight: 400,
              lineHeight: "16px",
              textAlign: "left",
            }}
          >
            Подробнее
          </a>
          <span
            style={{
              color: "rgba(5, 10, 4, 0.5)",
              fontFamily: "Gilroy",
              fontSize: "1.3rem",
              fontWeight: 400,
              lineHeight: "16px",
              textAlign: "left",
            }}
          >
            {props.time}
          </span>
        </div>
      </div>
    </>
  );
};
