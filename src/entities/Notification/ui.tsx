import { ReactSVG } from "react-svg";
import { Modal } from "react-bootstrap";
import { useUnit } from "effector-react";

import { Bell } from "~/shared/assets";
import { $websocket, renderPromise } from "~/shared/api";
import { SectionButton, TitleLg } from "~/shared/ui";
import { useModalState } from "~/shared/lib";

import {
  $notifications,
  addNotification,
  getNotificationsFx,
  removeNotification,
  TNotification,
} from ".";
import styles from "./styles.module.scss";

export const NotificationCard = (notification: TNotification) => {
  const datetime = new Date(notification.created_at);
  const date = datetime.toLocaleDateString("ru", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const time = datetime
    .toLocaleDateString("ru", {
      hour: "numeric",
      minute: "numeric",
    })
    .split(" ")[1];
  return (
    <>
      <span className={`${styles.notificationDate} mb-3`}>{date}</span>
      <div className={styles.notificationCard}>
        {/* <span className={styles.notificationType}>{notification.type}</span> */}
        <span className={styles.notificationTitle}>{notification.title}</span>
        <div className={styles.notificationText}>
          {notification.description}
        </div>
        <div className="d-flex w-100">
          <button
            className={styles.readMore}
            onClick={() => removeNotification(notification)}
          >
            Прочитано
          </button>
          <span className={styles.notificationTime}>{time}</span>
        </div>
      </div>
    </>
  );
};

export function Notifications() {
  const [show, changeShow] = useModalState(false);
  const notifications = useUnit($notifications);
  const websocket = useUnit($websocket);
  websocket.onmessage = (ev) => {
    const data = JSON.parse(ev.data);
    if ("new_notification" in data) addNotification(data["new_notification"]);
  };
  return (
    <>
      <a href="#" onClick={changeShow} className={styles.notificationBell}>
        <ReactSVG src={Bell} />
        {notifications.length > 0 && (
          <span className={styles.notificationCount}>
            {notifications.length}
          </span>
        )}
      </a>

      <Modal show={show} onHide={changeShow} className="rounded-modal">
        <Modal.Body>
          {renderPromise(getNotificationsFx, {
            success: (_) => (
              <>
                <div className="d-flex mb-4" style={{ gap: "1rem" }}>
                  <SectionButton className="active">Информация</SectionButton>
                </div>
                {notifications.length > 0 ? (
                  notifications.map((el, idx) => (
                    <NotificationCard key={idx} {...el} />
                  ))
                ) : (
                  <div className="ms-2 mt-5" style={{ fontSize: "1.6rem" }}>
                    Уведомлений нет
                  </div>
                )}
              </>
            ),
            error: (err) => (
              <TitleLg>
                {err.name} {err.message}
              </TitleLg>
            ),
          })}
        </Modal.Body>
      </Modal>
    </>
  );
}
