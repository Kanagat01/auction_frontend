import { useUnit } from "effector-react";
import { $userType, getRole } from "~/entities/User";
import { CancelOrder, getOrdersFx, UnpublishOrder } from "~/entities/Order";
import {
  AcceptOfferTransporter,
  RejectOfferTransporter,
} from "~/entities/Offer";
import {
  OrdersPage,
  textActionProps,
  usePageFromSearchParams,
} from "./helpers";

export function OrdersInDirect() {
  const userType = useUnit($userType);
  const page = usePageFromSearchParams();
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
      promise={() => getOrdersFx({ status: "in_direct", page })}
    />
  );
}
