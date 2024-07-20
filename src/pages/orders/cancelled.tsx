import { useUnit } from "effector-react";
import { $userType } from "~/entities/User";
import { OrderStatus, UnpublishOrder } from "~/entities/Order";
import { OrdersPage, textActionProps } from "./helpers";

export function CancelledOrders() {
  const userType = useUnit($userType);
  return (
    <OrdersPage
      title="Отмененные"
      pageData={
        userType === "customer_manager"
          ? { textActions: <UnpublishOrder {...textActionProps} /> }
          : {}
      }
      status={OrderStatus.cancelled}
    />
  );
}
