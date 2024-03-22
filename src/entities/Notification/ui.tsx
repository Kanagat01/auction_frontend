import { NotificationType } from "./model";

export const NotificationCard = (props: NotificationType) => {
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
