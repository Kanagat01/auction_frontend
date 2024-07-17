import { ReactNode } from "react";
import { ReactSVG } from "react-svg";
import { useUnit } from "effector-react";
import { NavLink, useLocation } from "react-router-dom";

import { RiDeleteBin5Line } from "react-icons/ri";
// import { TbBoxMultiple } from "react-icons/tb";
import { FaTruckMoving } from "react-icons/fa";
import { ImNewspaper } from "react-icons/im";
import { MdDownload } from "react-icons/md";

// import { $notifications } from "~/entities/Notification";
import { $userType, getRole } from "~/entities/User";
import { Hammer, ThreeHouses } from "~/shared/assets";
import { TooltipOnHover } from "~/shared/ui";
import {
  CANCELLED_ORDERS,
  ORDERS_BEING_EXECUTED,
  ORDERS_IN_AUCTION,
  ORDERS_IN_BIDDING,
  ORDERS_IN_DIRECT,
  UNPUBLISHED_ORDERS,
} from "~/shared/routes";
import styles from "./styles.module.scss";

export function Sidebar() {
  const userType = useUnit($userType);
  // const notifications = useUnit($notifications);
  const currentRoute = useLocation().pathname;
  const sections: Array<[ReactNode, string, string]> = [
    [
      <>
        <span
          className={
            ORDERS_BEING_EXECUTED !== currentRoute ? styles["blue-circle"] : ""
          }
        />
        <FaTruckMoving className={styles.icon} />
      </>,
      "Журнал",
      ORDERS_BEING_EXECUTED,
    ],
    [
      <>
        <span
          className={
            ORDERS_IN_AUCTION !== currentRoute ? styles["blue-circle"] : ""
          }
        />
        <ReactSVG src={Hammer} className={styles.icon} />
      </>,
      "Аукцион",
      ORDERS_IN_AUCTION,
    ],
    [
      <>
        <span
          className={
            ORDERS_IN_BIDDING !== currentRoute ? styles["blue-circle"] : ""
          }
        />
        <ReactSVG
          src={ThreeHouses}
          className={styles.icon}
          style={{ fontSize: "3.5rem", lineHeight: "3rem" }}
        />
      </>,
      "Торги",
      ORDERS_IN_BIDDING,
    ],
    [
      <>
        <span
          className={
            ORDERS_IN_DIRECT !== currentRoute ? styles["blue-circle"] : ""
          }
        />
        <MdDownload className={styles.icon} />
      </>,
      "Назначенные",
      ORDERS_IN_DIRECT,
    ],
    // [
    //   <TbBoxMultiple className={styles.icon} />,
    //   "План погрузки",
    //   CARGO_PLAN_ROUTE,
    // ],
    [
      <RiDeleteBin5Line className={styles.icon} />,
      "Отмененные",
      CANCELLED_ORDERS,
    ],
  ];

  if (getRole(userType) === "customer") {
    sections.splice(1, 0, [
      <ImNewspaper className={styles.icon} />,
      "Заказы",
      UNPUBLISHED_ORDERS,
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
