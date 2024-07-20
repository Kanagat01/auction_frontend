import { ReactSVG } from "react-svg";
import { useUnit } from "effector-react";
import { NavLink } from "react-router-dom";
import { LuCopyPlus, LuPenSquare } from "react-icons/lu";
import { CopyOrder, EditOrder } from "~/features/create-order";
import {
  CancelOrder,
  getOrdersFx,
  PublishOrder,
  PublishOrderInDirect,
} from "~/entities/Order";
import { $userType, getRole } from "~/entities/User";
import Routes from "~/shared/routes";
import { FolderPlus } from "~/shared/assets";
import {
  iconActionProps,
  OrdersPage,
  textActionProps,
  usePageFromSearchParams,
} from "./helpers";

export function UnpublishedOrders() {
  const userType = useUnit($userType);
  const page = usePageFromSearchParams();
  const pageData = {
    iconActions:
      userType === "customer_manager" ? (
        <>
          <NavLink to={Routes.NEW_ORDER} {...iconActionProps}>
            <ReactSVG src={FolderPlus} />
          </NavLink>
          <NavLink
            to={Routes.NEW_ORDER}
            onClick={CopyOrder}
            {...iconActionProps}
          >
            <LuCopyPlus />
          </NavLink>
          <NavLink
            to={Routes.EDIT_ORDER}
            onClick={EditOrder}
            {...iconActionProps}
          >
            <LuPenSquare />
          </NavLink>
          <CancelOrder variant="icon" {...iconActionProps} />
        </>
      ) : (
        ""
      ),
    textActions:
      userType === "customer_manager" ? (
        <>
          <PublishOrder publishTo="in_auction" {...textActionProps} />
          <PublishOrder publishTo="in_bidding" {...textActionProps} />
          <PublishOrderInDirect />
        </>
      ) : (
        ""
      ),
  };
  return (
    <OrdersPage
      title={getRole(userType) === "customer" ? "Заказы" : "forbidden"}
      pageData={pageData}
      promise={() => getOrdersFx({ status: "unpublished", page })}
    />
  );
}
