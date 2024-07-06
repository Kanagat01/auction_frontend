import { useUnit } from "effector-react";
import { ControlPanel, ControlPanelProps } from "~/widgets";
import { $orders, OrderSections, OrdersList } from "~/entities/Order";
import {
  CollapsableSidebar,
  MainTitle,
  RoundedWhiteBox,
  TextCenter,
} from "~/shared/ui";
import { renderPromise } from "~/shared/api";

export const getRole = (userType: string) =>
  ["customer_manager", "customer_company"].includes(userType)
    ? "customer"
    : "transporter";

export const iconActionProps = {
  className: "outline-btn px-2 py-0 me-2",
  style: { fontSize: "2rem" },
};

export const textActionProps = { className: "me-2 px-3 py-2" };

type TOrdersPage = {
  title: string;
  pageData: ControlPanelProps;
  promise: () => Promise<any>;
};

export function OrdersPage({ title, pageData, promise }: TOrdersPage) {
  const orders = useUnit($orders);
  return (
    <>
      <RoundedWhiteBox>
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
              <ControlPanel {...pageData} />
            </div>
            {renderPromise(promise, {
              success: () => <OrdersList orders={orders} />,
              error: (err) => (
                <TextCenter className="p-5 mt-5">
                  <MainTitle style={{ fontSize: "2.5rem", fontWeight: 500 }}>
                    Произошла ошибка: {err.message}
                  </MainTitle>
                </TextCenter>
              ),
            })}
          </>
        )}
      </RoundedWhiteBox>
      <CollapsableSidebar>
        <OrderSections />
      </CollapsableSidebar>
    </>
  );
}
