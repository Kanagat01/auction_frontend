import { Modal } from "react-bootstrap";
import { ReactSVG } from "react-svg";
import { FaAngleRight } from "react-icons/fa";
import { useModalState } from "~/shared/lib";
import { Bell } from "~/shared/assets";
import { SectionButton } from "~/shared/ui";
import { TNotification } from "./model";
import styles from "./styles.module.scss";

export const NotificationCard = (props: TNotification) => {
  return (
    <>
      <span className={`${styles.notificationDate} mb-3`}>{props.date}</span>
      <div className={styles.notificationCard}>
        <span className={styles.notificationType}>{props.type}</span>
        <span className={styles.notificationTitle}>{props.title}</span>
        <div className={styles.notificationText}>{props.text}</div>
        <div className="d-flex justify-content-between w-100">
          <a className={styles.readMore}>Подробнее</a>
          <span className={styles.notificationTime}>{props.time}</span>
        </div>
      </div>
    </>
  );
};

export function Notifications() {
  const [show, changeShow] = useModalState(false);
  const notifications: TNotification[] = [
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
            <SectionButton className="active">Информация</SectionButton>
          </div>
          {notifications.map((el, idx) => (
            <NotificationCard key={idx} {...el} />
          ))}
        </Modal.Body>
      </Modal>
    </>
  );
}
