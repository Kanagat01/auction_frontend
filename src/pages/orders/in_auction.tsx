import { useUnit } from "effector-react";
import { $userType, getRole } from "~/entities/User";
import { AcceptBestOffer, MakeOffer } from "~/entities/Offer";
import { CancelOrder, OrderStatus, UnpublishOrder } from "~/entities/Order";
import { OrdersPage, textActionProps } from "./helpers";

export function OrdersInAuction() {
  const userType = useUnit($userType);
  const customerPageData = {
    textActions:
      userType === "customer_manager" ? (
        <>
          <AcceptBestOffer {...textActionProps} />
          <UnpublishOrder {...textActionProps} />
          <CancelOrder variant="text" {...textActionProps} />
        </>
      ) : (
        ""
      ),
  };
  const transporterPageData = {
    priceInputs: userType === "transporter_manager",
    textActions:
      userType === "transporter_manager" ? (
        <>
          <MakeOffer inAuction={true} {...textActionProps} />
        </>
      ) : (
        ""
      ),
  };
  return (
    <OrdersPage
      title="Аукционы"
      pageData={
        getRole(userType) === "customer"
          ? customerPageData
          : transporterPageData
      }
      status={OrderStatus.in_auction}
    />
  );
}
