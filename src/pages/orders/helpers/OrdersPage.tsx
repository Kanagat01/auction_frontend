import { useCallback } from "react";
import { useUnit } from "effector-react";
import { useLocation } from "react-router-dom";
import { ControlPanel, ControlPanelProps, OrderSections } from "~/widgets";
import { ExportToExcelButton } from "~/features/ExportToExcel";
import { $userType, getRole } from "~/entities/User";
import {
  $orders,
  $ordersPagination,
  getExportData,
  getOrdersFx,
  OrdersList,
  OrderStatusTranslation,
  OrderStatus,
} from "~/entities/Order";
import { RenderPromise } from "~/shared/api";
import {
  CollapsableSidebar,
  MainTitle,
  RoundedWhiteBox,
  TextCenter,
} from "~/shared/ui";
import Routes from "~/shared/routes";
import { iconActionProps } from "./consts";
import {
  useCollapsed,
  useDefaultInputs,
  usePageFromSearchParams,
  useWebsocket,
} from "./hooks";

type TOrdersPage = {
  title: string;
  pageData: ControlPanelProps;
  status: OrderStatus;
};

export function OrdersPage({ title, pageData, status }: TOrdersPage) {
  const orders = useUnit($orders);
  useWebsocket(orders, status);

  const paginator = useUnit($ordersPagination);
  const { cityFrom, cityTo, transportationNumber, defaultInputs } =
    useDefaultInputs();

  const page = usePageFromSearchParams();
  const fetchOrders = useCallback(
    () => getOrdersFx({ status, page, cityFrom, cityTo, transportationNumber }),
    [status, page, cityFrom, cityTo, transportationNumber]
  );

  const [collapsed, toggleExpand] = useCollapsed();

  const userType = useUnit($userType);
  const currentRoute = useLocation().pathname as Routes;
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
                    {pageData.iconActions}
                  </>
                }
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
