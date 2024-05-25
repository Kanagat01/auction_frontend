import styles from "./styles.module.scss";

type ScheduleCardProps = {
  status: "arrival" | "loading " | "departure " | "delay" | "empty";
  transportation_number?: string;
  transporter_manager?: string;
  some_number?: string;
  phone_number?: string;
};

export function ScheduleCard({ status, ...props }: ScheduleCardProps) {
  if (status === "empty") {
    return (
      <div className={styles.scheduleCard}>
        <div className={styles.title}>Свободен</div>
      </div>
    );
  } else {
    return (
      <div className={styles.scheduleCard}>
        <div className={styles.title}>Занятый</div>
        <div className={`${styles.status} ${styles[status]}`}></div>
        <div>{props.transportation_number}</div>
        <div>{props.transporter_manager}</div>
        <div>{props.some_number}</div>
        <div>{props.phone_number}</div>
      </div>
    );
  }
}
