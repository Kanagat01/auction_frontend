import { Fragment } from "react";
import { ReactSVG } from "react-svg";
import { Modal } from "react-bootstrap";
import { useUnit } from "effector-react";

import { SectionButton, TitleLg } from "~/shared/ui";
import { useModalState } from "~/shared/lib";
import { RenderPromise } from "~/shared/api";
import { Bell } from "~/shared/assets";

import { $websocket } from "./api";
import {
  $notifications,
  addNotification,
  getNotificationsFx,
  removeNotification,
  TNotification,
} from ".";
import styles from "./styles.module.scss";

function groupNotificationsByDate(notifications: TNotification[]) {
  return notifications.reduce((acc, notification) => {
    const date = new Date(notification.created_at).toLocaleDateString("ru", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(notification);
    return acc;
  }, {} as Record<string, TNotification[]>);
}

export const NotificationCard = (notification: TNotification) => {
  const datetime = new Date(notification.created_at);
  const time = datetime.toLocaleTimeString("ru", {
    hour: "numeric",
    minute: "numeric",
  });

  return (
    <div className={styles.notificationCard}>
      {/* <span className={styles.notificationType}>{notification.type}</span> */}
      <span className={styles.notificationTitle}>{notification.title}</span>
      <div className={styles.notificationText}>{notification.description}</div>
      <div className="d-flex w-100">
        <button
          className={styles.readMore}
          onClick={() => removeNotification(notification.id)}
        >
          Прочитано
        </button>
        <span className={styles.notificationTime}>{time}</span>
      </div>
    </div>
  );
};

export function Notifications() {
  const [show, changeShow] = useModalState(false);
  const notifications = useUnit($notifications);
  const groupedNotifications = groupNotificationsByDate(notifications);

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
          {RenderPromise(getNotificationsFx, {
            success: (
              <>
                <div className="d-flex mb-4" style={{ gap: "1rem" }}>
                  <SectionButton className="active">Информация</SectionButton>
                </div>
                {notifications.length > 0 ? (
                  Object.entries(groupedNotifications).map(
                    ([date, notifications]) => (
                      <Fragment key={date}>
                        <span className={`${styles.notificationDate} mb-3`}>
                          {date}
                        </span>
                        {notifications.map((el, idx) => (
                          <NotificationCard key={idx} {...el} />
                        ))}
                      </Fragment>
                    )
                  )
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
