import { useUnit } from "effector-react";
import { useCallback, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { ControlPanel, ControlPanelProps, OrderSections } from "~/widgets";
import { ExportToExcelButton } from "~/features/ExportToExcel";
import { $userType, getRole, useIsActive } from "~/entities/User";
import {
  $orders,
  $ordersPagination,
  getExportData,
  getOrdersFx,
  OrdersList,
  OrderStatusTranslation,
  OrderStatus,
  $orderWebsocket,
} from "~/entities/Order";
import {
  MainTitle,
  PageError,
  CollapsableSidebar,
  RoundedWhiteBox,
} from "~/shared/ui";
import Routes from "~/shared/routes";
import { RenderPromise } from "~/shared/api";
import { iconActionProps } from "./consts";
import {
  useCollapsed,
  useDefaultInputs,
  usePageFromSearchParams,
} from "./hooks";

type TOrdersPage = {
  title: string;
  pageData: ControlPanelProps;
  status: OrderStatus;
};

export function OrdersPage({
  title,
  pageData: { iconActions, textActions, ...pageData },
  status,
}: TOrdersPage) {
  const userType = useUnit($userType);
  const isActive = useIsActive();
  const currentRoute = useLocation().pathname as Routes;

  const orders = useUnit($orders);
  const websocket = useUnit($orderWebsocket);

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  useEffect(() => {
    const clearTimer = () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };

    if (websocket) {
      if (websocket.readyState === WebSocket.CONNECTING) {
        websocket.onopen = () => {
          websocket.send(JSON.stringify({ action: "set_status", status }));
        };
      } else {
        websocket.send(JSON.stringify({ action: "set_status", status }));
      }
    } else {
      if (new Date().getMinutes() % 5 == 0) {
        fetchOrders();
      }
    }
    return () => clearTimer();
  }, [websocket, status]);

  const paginator = useUnit($ordersPagination);
  const { cityFrom, cityTo, transportationNumber, defaultInputs } =
    useDefaultInputs();

  const page = usePageFromSearchParams();
  const fetchOrders = useCallback(
    () => getOrdersFx({ status, page, cityFrom, cityTo, transportationNumber }),
    [status, page, cityFrom, cityTo, transportationNumber]
  );

  const [collapsed, toggleExpand] = useCollapsed();
  return (
    <>
      <RoundedWhiteBox style={{ width: "90%" }}>
        {title === "forbidden" ? (
          <PageError>У вас нет прав для просмотра данной страницы</PageError>
        ) : (
          <>
            <div className="p-5">
              <MainTitle>{title}</MainTitle>
              <ControlPanel
                {...pageData}
                inputs={defaultInputs}
                iconActions={
                  <>
                    <ExportToExcelButton
                      filename={`Заказы - ${OrderStatusTranslation[status]}`}
                      data={getExportData(
                        orders,
                        currentRoute,
                        getRole(userType)
                      )}
                      {...iconActionProps}
                    />
                    {isActive ? iconActions : ""}
                  </>
                }
                textActions={isActive ? textActions : ""}
              />
            </div>
            {RenderPromise(fetchOrders, {
              success: (
                <OrdersList
                  orders={orders}
                  paginator={paginator ?? undefined}
                />
              ),
              error: (err) => (
                <PageError>Произошла ошибка: {err?.message}</PageError>
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
