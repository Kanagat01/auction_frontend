import { useUnit } from "effector-react";
import { $userType, getRole } from "~/entities/User";
import {
  AddDriverData,
  CancelOrder,
  CompleteOrder,
  UnpublishOrder,
  getOrdersFx,
} from "~/entities/Order";
import {
  OrdersPage,
  textActionProps,
  usePageFromSearchParams,
} from "./helpers";

export function OrdersBeingExecuted() {
  const userType = useUnit($userType);
  const page = usePageFromSearchParams();
  const customerPageData = {
    textActions:
      userType === "customer_manager" ? (
        <>
          <CompleteOrder {...textActionProps} />
          <CancelOrder variant="text" {...textActionProps} />
          <UnpublishOrder {...textActionProps} />
        </>
      ) : (
        ""
      ),
  };
  const transporterPageData = {
    textActions:
      userType === "transporter_manager" ? (
        <>
          <AddDriverData {...textActionProps} />
        </>
      ) : (
        ""
      ),
  };
  return (
    <OrdersPage
      title="Журнал перевозок"
      pageData={
        getRole(userType) === "customer"
          ? customerPageData
          : transporterPageData
      }
      promise={() => getOrdersFx({ status: "being_executed", page })}
    />
  );
}
