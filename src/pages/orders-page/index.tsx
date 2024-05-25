import { useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useUnit } from "effector-react";
import { ReactSVG } from "react-svg";
import { FaRegTrashCan } from "react-icons/fa6";
import { LuCopyPlus, LuPenSquare } from "react-icons/lu";

import { Assign } from "~/widgets";
import { $orders, OrdersList, TOrderStatus, getOrders } from "~/entities/Order";
import {
  InputContainer,
  MainTitle,
  OutlineButton,
  PrimaryButton,
  RoundedWhiteBox,
  TitleLg,
} from "~/shared/ui";
import { FolderPlus } from "~/shared/assets";
import {
  CANCELLED_ORDERS,
  NEW_ORDER_ROUTE,
  ORDERS_BEING_EXECUTED,
  ORDERS_IN_AUCTION,
  ORDERS_IN_BIDDING,
  ORDERS_IN_DIRECT,
  UNPUBLISHED_ORDERS,
} from "~/shared/routes";

export default function OrdersPage() {
  const orders = useUnit($orders);
  const currentRoute = useLocation().pathname;
  const routes: Record<string, TOrderStatus> = {
    [ORDERS_IN_AUCTION]: "in_auction",
    [ORDERS_IN_BIDDING]: "in_bidding",
    [ORDERS_IN_DIRECT]: "in_direct",
    [ORDERS_BEING_EXECUTED]: "being_executed",
    [CANCELLED_ORDERS]: "cancelled",
    [UNPUBLISHED_ORDERS]: "unpublished",
  };
  if (currentRoute in routes) {
    const order_status = routes[currentRoute as keyof typeof routes];
    useEffect(() => {
      getOrders(order_status);
    }, [order_status]);

    return (
      <RoundedWhiteBox>
        <div className="p-5">
          <MainTitle>Заказы</MainTitle>
          <div className="control-panel">
            {[
              ["id", "№ Транспортировки", "00000000"],
              ["city_from", "Город-старт", "Москва"],
              ["city_to", "Город-место назначения", "Балашиха"],
            ].map(([name, label, placeholder], idx) => (
              <InputContainer
                key={idx}
                variant="input"
                name={name}
                label={label}
                placeholder={placeholder}
                style={{ height: "-webkit-fill-available" }}
              />
            ))}
            <div className="actions">
              <span className="actions-title">Действия</span>
              <div className="d-flex">
                <div className="d-inline-flex">
                  <NavLink
                    to={NEW_ORDER_ROUTE}
                    className="outline-btn px-2 py-0 me-2"
                    style={{ fontSize: "2rem" }}
                  >
                    <ReactSVG src={FolderPlus} />
                  </NavLink>
                  {[LuCopyPlus, LuPenSquare, FaRegTrashCan].map((Icon, idx) => (
                    <OutlineButton
                      key={idx}
                      className="px-2 py-0 me-2"
                      style={{ fontSize: "2rem" }}
                    >
                      <Icon />
                    </OutlineButton>
                  ))}
                </div>
                <div className="d-inline-flex ms-3">
                  {["В аукцион", "На торги"].map((buttonText) => (
                    <PrimaryButton key={buttonText} className="me-2 px-3 py-2">
                      {buttonText}
                    </PrimaryButton>
                  ))}
                  <Assign />
                </div>
              </div>
            </div>
          </div>
        </div>
        <OrdersList orders={orders} />
      </RoundedWhiteBox>
    );
  } else {
    return <TitleLg>404 Страница не найдена</TitleLg>;
  }
}
