import { useUnit } from "effector-react";
import { ControlPanel } from "~/widgets";
import {
  OrderSections,
  OrdersList,
  TOrderStatus,
  getOrdersFx,
} from "~/entities/Order";
import { $userType } from "~/entities/User";
import { MainTitle, RoundedWhiteBox, TextCenter } from "~/shared/ui";
import { renderPromise } from "~/shared/api";
import * as urls from "~/shared/routes";
import { getPageData } from "./pageData";

const routes: Record<string, Exclude<TOrderStatus, "completed">> = {
  [urls.ORDERS_IN_AUCTION]: "in_auction",
  [urls.ORDERS_IN_BIDDING]: "in_bidding",
  [urls.ORDERS_IN_DIRECT]: "in_direct",
  [urls.ORDERS_BEING_EXECUTED]: "being_executed",
  [urls.CANCELLED_ORDERS]: "cancelled",
  [urls.UNPUBLISHED_ORDERS]: "unpublished",
};

export default function OrdersPage({ currentRoute }: { currentRoute: string }) {
  if (currentRoute in routes) {
    const userType = useUnit($userType);
    const role = ["customer_manager", "customer_company"].includes(
      userType ?? ""
    )
      ? "customer"
      : "transporter";
    const orderStatus = routes[currentRoute];
    const { title, ...pageData } = getPageData(orderStatus, role);

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
            {renderPromise(() => getOrdersFx(orderStatus), {
              success: (orders) => <OrdersList orders={orders} />,
              error: (err) => (
                <TextCenter className="p-5 mt-5">
                  <MainTitle style={{ fontSize: "2.5rem", fontWeight: 500 }}>
                    Произошла ошибка: {err.message}
                  </MainTitle>
                </TextCenter>
              ),
            })}
            <OrderSections />
          </>
        )}
      </RoundedWhiteBox>
    );
  }
  return (
    <div style={{ margin: "10rem 0 0 10rem", fontSize: "4rem" }}>
      404 Страница не найдена
    </div>
  );
}
