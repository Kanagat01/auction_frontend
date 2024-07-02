import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useUnit } from "effector-react";

import { ControlPanel } from "~/widgets";
import {
  $orders,
  OrderSections,
  OrdersList,
  TOrderStatus,
  getOrdersFx,
} from "~/entities/Order";
import { $userType } from "~/entities/User";
import { MainTitle, RoundedWhiteBox, TextCenter, TitleLg } from "~/shared/ui";
import * as urls from "~/shared/routes";
import { getPageData } from "./pageData";

export default function OrdersPage() {
  const currentRoute = useLocation().pathname;
  const routes: Record<string, Exclude<TOrderStatus, "completed">> = {
    [urls.ORDERS_IN_AUCTION]: "in_auction",
    [urls.ORDERS_IN_BIDDING]: "in_bidding",
    [urls.ORDERS_IN_DIRECT]: "in_direct",
    [urls.ORDERS_BEING_EXECUTED]: "being_executed",
    [urls.CANCELLED_ORDERS]: "cancelled",
    [urls.UNPUBLISHED_ORDERS]: "unpublished",
  };
  if (currentRoute in routes) {
    const userType = useUnit($userType);
    const role = ["customer_manager", "customer_company"].includes(
      userType ?? ""
    )
      ? "customer"
      : "transporter";
    const orders = useUnit($orders);
    const orderStatus = routes[currentRoute];
    const { title, ...pageData } = getPageData(orderStatus, role);
    useEffect(() => {
      if (title !== 403) getOrdersFx(orderStatus);
    }, [orderStatus]);

    return (
      <RoundedWhiteBox>
        {title === 403 ? (
          <TextCenter className="p-5 mt-5">
            <MainTitle style={{ fontSize: "2.5rem", fontWeight: 500 }}>
              У вас нет прав для просмотра данной страницы
            </MainTitle>
          </TextCenter>
        ) : (
          <>
            <div className="p-5">
              <MainTitle>{title}</MainTitle>
              <ControlPanel {...pageData} />
            </div>
            <OrdersList orders={orders} />
            <OrderSections />
          </>
        )}
      </RoundedWhiteBox>
    );
  }
  return <TitleLg>404 Страница не найдена</TitleLg>;
}
