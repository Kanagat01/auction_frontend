import { NotificationType } from "./model";
import styles from "./styles.module.scss";

export const NotificationCard = (props: NotificationType) => {
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
