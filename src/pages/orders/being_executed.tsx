import { useUnit } from "effector-react";
import { $userType, getRole } from "~/entities/User";
import {
  AddDriverData,
  CancelOrder,
  CompleteOrder,
  OrderStatus,
  UnpublishOrder,
} from "~/entities/Order";
import { OrdersPage, textActionProps } from "./helpers";

export function OrdersBeingExecuted() {
  const userType = useUnit($userType);
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
      status={OrderStatus.being_executed}
    />
  );
}
