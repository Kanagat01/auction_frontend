import { useUnit } from "effector-react";
import { $userType, getRole } from "~/entities/User";
import { AcceptBestOffer, MakeOffer } from "~/entities/Offer";
import { CancelOrder, getOrdersFx, UnpublishOrder } from "~/entities/Order";
import {
  OrdersPage,
  textActionProps,
  usePageFromSearchParams,
} from "./helpers";

export function OrdersInBidding() {
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
    textActions:
      userType === "transporter_manager" ? (
        <>
          <MakeOffer {...textActionProps} />
        </>
      ) : (
        ""
      ),
  };
  return (
    <OrdersPage
      title="Торги"
      pageData={
        getRole(userType) === "customer"
          ? customerPageData
          : transporterPageData
      }
      promise={() => getOrdersFx({ status: "in_bidding", page })}
    />
  );
}
