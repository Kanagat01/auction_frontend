import { useUnit } from "effector-react";
import { getOrdersFx, UnpublishOrder } from "~/entities/Order";
import { $userType } from "~/entities/User";
import {
  OrdersPage,
  textActionProps,
  usePageFromSearchParams,
} from "./helpers";

export function CancelledOrders() {
  const userType = useUnit($userType);
  const page = usePageFromSearchParams();
  return (
    <OrdersPage
      title="Отмененные"
      pageData={
        userType === "customer_manager"
          ? { textActions: <UnpublishOrder {...textActionProps} /> }
          : {}
      }
      promise={() => getOrdersFx({ status: "cancelled", page })}
    />
  );
}
