import { ReactNode, useEffect } from "react";
import { ReactSVG } from "react-svg";
import { useUnit } from "effector-react";
import { NavLink, useLocation } from "react-router-dom";

import { RiDeleteBin5Line } from "react-icons/ri";
// import { TbBoxMultiple } from "react-icons/tb";
import { FaTruckMoving } from "react-icons/fa";
import { ImNewspaper } from "react-icons/im";
import { MdDownload } from "react-icons/md";

import {
  $notifications,
  NotificationType,
  removeNotification,
} from "~/entities/Notification";
import { $userType, getRole } from "~/entities/User";
import { Hammer, ThreeHouses } from "~/shared/assets";
import { TooltipOnHover } from "~/shared/ui";
import Routes from "~/shared/routes";
import styles from "./styles.module.scss";

export function Sidebar() {
  const userType = useUnit($userType);
  const notifications = useUnit($notifications);

  const notificationsDict: Record<string, NotificationType> = {
    [Routes.ORDERS_BEING_EXECUTED]: NotificationType.NEW_ORDER_BEING_EXECUTED,
    [Routes.ORDERS_IN_AUCTION]: NotificationType.NEW_ORDER_IN_AUCTION,
    [Routes.ORDERS_IN_BIDDING]: NotificationType.NEW_ORDER_IN_BIDDING,
    [Routes.ORDERS_IN_DIRECT]: NotificationType.NEW_ORDER_IN_DIRECT,
    [Routes.CANCELLED_ORDERS]: NotificationType.ORDER_CANCELLED,
  };
  const currentRoute = useLocation().pathname;

  useEffect(() => {
    if (currentRoute in notificationsDict) {
      notifications
        .filter(
          (notification) =>
            notification.type === notificationsDict[currentRoute]
        )
        .map(({ id }) => removeNotification(id));
    }
  }, [currentRoute, notifications, notificationsDict]);

  const NotificationDot = (route: string) => {
    const notification = notifications.find(
      (el) => el.type === notificationsDict[route]
    );
    return (
      route !== currentRoute && notification && <span className="blue-circle" />
    );
  };
  const sections: Array<[ReactNode, string, string]> = [
    [
      <>
        {NotificationDot(Routes.ORDERS_BEING_EXECUTED)}
        <FaTruckMoving className={styles.icon} />
      </>,
      "Журнал",
      Routes.ORDERS_BEING_EXECUTED,
    ],
    [
      <>
        {NotificationDot(Routes.ORDERS_IN_AUCTION)}
        <ReactSVG src={Hammer} className={styles.icon} />
      </>,
      "Аукцион",
      Routes.ORDERS_IN_AUCTION,
    ],
    [
      <>
        {NotificationDot(Routes.ORDERS_IN_BIDDING)}
        <ReactSVG
          src={ThreeHouses}
          className={styles.icon}
          style={{ fontSize: "3.5rem", lineHeight: "3rem" }}
        />
      </>,
      "Торги",
      Routes.ORDERS_IN_BIDDING,
    ],
    [
      <>
        {NotificationDot(Routes.ORDERS_IN_DIRECT)}
        <MdDownload className={styles.icon} />
      </>,
      "Назначенные",
      Routes.ORDERS_IN_DIRECT,
    ],
    // [
    //   <TbBoxMultiple className={styles.icon} />,
    //   "План погрузки",
    //   Routes.CARGO_PLAN,
    // ],
    [
      <>
        {NotificationDot(Routes.CANCELLED_ORDERS)}
        <RiDeleteBin5Line className={styles.icon} />
      </>,
      "Отмененные",
      Routes.CANCELLED_ORDERS,
    ],
  ];

  if (getRole(userType) === "customer") {
    sections.splice(1, 0, [
      <ImNewspaper className={styles.icon} />,
      "Заказы",
      Routes.UNPUBLISHED_ORDERS,
    ]);
  }
  return (
    <aside className={styles.aside}>
      {sections.map(([icon, title, route], index) => (
        <TooltipOnHover
          key={index}
          id={`t-${index}`}
          title={title}
          placement="right-end"
        >
          <NavLink
            to={route}
            className={route === currentRoute ? styles.active : ""}
            style={title === "Торги" ? { padding: "0.5rem" } : {}}
          >
            {icon}
          </NavLink>
        </TooltipOnHover>
      ))}
    </aside>
  );
}
