import { useUnit } from "effector-react";
import { $userType, getRole } from "~/entities/User";
import { CancelOrder, OrderStatus, UnpublishOrder } from "~/entities/Order";
import {
  AcceptOfferTransporter,
  RejectOfferTransporter,
} from "~/entities/Offer";
import { OrdersPage, textActionProps } from "./helpers";

export function OrdersInDirect() {
  const userType = useUnit($userType);
  const customerPageData = {
    textActions:
      userType === "customer_manager" ? (
        <>
          <UnpublishOrder {...textActionProps} />
          <CancelOrder variant="text" {...textActionProps} />
        </>
      ) : (
        ""
      ),
  };
  const transporterPageData = {
    textActions:
      userType === "transporter_manager" ? (
        <>
          <AcceptOfferTransporter {...textActionProps} />
          <RejectOfferTransporter {...textActionProps} />
        </>
      ) : (
        ""
      ),
  };
  return (
    <OrdersPage
      title="Назначенные"
      pageData={
        getRole(userType) === "customer"
          ? customerPageData
          : transporterPageData
      }
      status={OrderStatus.in_direct}
    />
  );
}
