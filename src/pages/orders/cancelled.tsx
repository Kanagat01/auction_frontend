import { getOrdersFx } from "~/entities/Order";
import { OrdersPage, usePageFromSearchParams } from "./helpers";

export function CancelledOrders() {
  const page = usePageFromSearchParams();
  return (
    <OrdersPage
      title="Отмененные"
      pageData={{}}
      promise={() => getOrdersFx({ status: "cancelled", page })}
    />
  );
}
