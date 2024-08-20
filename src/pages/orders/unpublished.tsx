import { ReactSVG } from "react-svg";
import { useUnit } from "effector-react";
import { generatePath, NavLink } from "react-router-dom";
import { LuCopyPlus, LuPenSquare } from "react-icons/lu";
import { clearForm, CopyOrder } from "~/features/create-order";
import { $userType, getRole } from "~/entities/User";
import {
  $selectedOrder,
  CancelOrder,
  OrderStatus,
  PublishOrder,
  PublishOrderInDirect,
} from "~/entities/Order";
import Routes from "~/shared/routes";
import { FolderPlus } from "~/shared/assets";
import { iconActionProps, OrdersPage, textActionProps } from "./helpers";

export function UnpublishedOrders() {
  const userType = useUnit($userType);
  const order = useUnit($selectedOrder);
  const pageData = {
    iconActions:
      userType === "customer_manager" ? (
        <>
          <NavLink
            to={Routes.NEW_ORDER}
            {...iconActionProps}
            onClick={() => clearForm()}
          >
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
            to={generatePath(Routes.EDIT_ORDER, {
              transportationNumber: order
                ? order.transportation_number.toString()
                : "",
            })}
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
      status={OrderStatus.unpublished}
    />
  );
}
