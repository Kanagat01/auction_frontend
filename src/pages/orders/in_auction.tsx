import { useUnit } from "effector-react";
import { $userType, getRole } from "~/entities/User";
import { AcceptBestOffer, MakeOffer } from "~/entities/Offer";
import { CancelOrder, getOrdersFx, UnpublishOrder } from "~/entities/Order";
import {
  OrdersPage,
  textActionProps,
  usePageFromSearchParams,
} from "./helpers";

export function OrdersInAuction() {
  const userType = useUnit($userType);
  const page = usePageFromSearchParams();
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
      promise={() => getOrdersFx({ status: "in_auction", page })}
    />
  );
}
