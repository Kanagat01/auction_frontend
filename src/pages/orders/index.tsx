import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useUnit } from "effector-react";

import { ControlPanel } from "~/widgets";
import {
  $orders,
  OrdersList,
  TOrderStatus,
  getOrdersFx,
} from "~/entities/Order";
import { MainTitle, RoundedWhiteBox, TitleLg } from "~/shared/ui";
import {
  CANCELLED_ORDERS,
  ORDERS_BEING_EXECUTED,
  ORDERS_IN_AUCTION,
  ORDERS_IN_BIDDING,
  ORDERS_IN_DIRECT,
  UNPUBLISHED_ORDERS,
} from "~/shared/routes";
import { getPageData } from "./pageData";

export default function OrdersPage() {
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
    const orderStatus = routes[currentRoute];
    const orders = useUnit($orders);
    const { title, ...pageData } = getPageData(orderStatus);

    useEffect(() => {
      getOrdersFx(orderStatus);
    }, [orderStatus]);

    return (
      <RoundedWhiteBox>
        <div className="p-5">
          <MainTitle>{title}</MainTitle>
          <ControlPanel {...pageData} />
        </div>
        <OrdersList orders={orders} />
      </RoundedWhiteBox>
    );
  }
  return <TitleLg>404 Страница не найдена</TitleLg>;
}
