import { useCallback, useEffect } from "react";
import { useUnit } from "effector-react";
import { ControlPanel, ControlPanelProps, OrderSections } from "~/widgets";
import {
  $orders,
  $ordersPagination,
  $orderWebsocket,
  addOrder,
  getOrdersFx,
  OrdersList,
  removeOrder,
  TGetOrder,
  TOrderStatus,
  updateOrder,
} from "~/entities/Order";
import { RenderPromise } from "~/shared/api";
import {
  CollapsableSidebar,
  MainTitle,
  RoundedWhiteBox,
  TextCenter,
} from "~/shared/ui";
import {
  useCollapsed,
  useDefaultInputs,
  usePageFromSearchParams,
} from "./hooks";

type TOrdersPage = {
  title: string;
  pageData: ControlPanelProps;
  status: TOrderStatus;
};

export function OrdersPage({ title, pageData, status }: TOrdersPage) {
  const orders = useUnit($orders);
  const paginator = useUnit($ordersPagination);
  const { cityFrom, cityTo, transportationNumber, defaultInputs } =
    useDefaultInputs();

  const page = usePageFromSearchParams();
  const fetchOrders = useCallback(
    () => getOrdersFx({ status, page, cityFrom, cityTo, transportationNumber }),
    [status, page, cityFrom, cityTo, transportationNumber]
  );

  const [collapsed, toggleExpand] = useCollapsed();

  const websocket = useUnit($orderWebsocket);
  websocket.onmessage = (ev) => {
    const data = JSON.parse(ev.data);
    console.log(data);
    if ("add_or_update_order" in data) {
      const order: TGetOrder = data["add_or_update_order"];
      const idx = orders.findIndex((o) => o.id === order.id);
      if (idx === -1) addOrder(order);
      else {
        updateOrder({ orderId: order.id, newData: order });
      }
    } else if ("remove_order" in data) {
      const orderId: number = data["remove_order"];
      removeOrder(orderId);
    }
  };
  useEffect(() => {
    if (websocket.readyState === WebSocket.OPEN) {
      websocket.send(JSON.stringify({ action: "set_status", status }));
    } else {
      websocket.onopen = () => {
        websocket.send(JSON.stringify({ action: "set_status", status }));
      };
    }
  }, [websocket, status]);
  return (
    <>
      <RoundedWhiteBox style={{ width: "90%" }}>
        {title === "forbidden" ? (
          <TextCenter className="p-5 mt-5">
            <MainTitle style={{ fontSize: "2.5rem", fontWeight: 500 }}>
              У вас нет прав для просмотра данной страницы
            </MainTitle>
          </TextCenter>
        ) : (
          <>
            <div className="p-5">
              <MainTitle>{title}</MainTitle>
              <ControlPanel inputs={defaultInputs} {...pageData} />
            </div>
            {RenderPromise(fetchOrders, {
              success: (
                <OrdersList
                  orders={orders}
                  paginator={paginator ?? undefined}
                />
              ),
              error: (err) => (
                <TextCenter className="p-5 mt-5">
                  <MainTitle style={{ fontSize: "2.5rem", fontWeight: 500 }}>
                    Произошла ошибка: {err?.message}
                  </MainTitle>
                </TextCenter>
              ),
            })}
          </>
        )}
      </RoundedWhiteBox>
      <CollapsableSidebar collapsed={collapsed} toggleExpand={toggleExpand}>
        <OrderSections />
      </CollapsableSidebar>
    </>
  );
}
