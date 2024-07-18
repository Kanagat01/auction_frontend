import { useUnit } from "effector-react";
import { NavLink, useLocation } from "react-router-dom";
import { ReactSVG } from "react-svg";
import { LuCopyPlus, LuPenSquare } from "react-icons/lu";
import { $userType, getRole } from "~/entities/User";
import {
  AcceptBestOffer,
  MakeOffer,
  AcceptOfferTransporter,
  RejectOfferTransporter,
} from "~/entities/Offer";
import {
  AddDriverData,
  CancelOrder,
  CompleteOrder,
  CopyOrder,
  EditOrder,
  PublishOrder,
  PublishOrderInDirect,
  UnpublishOrder,
  getOrdersFx,
} from "~/entities/Order";
import { FolderPlus } from "~/shared/assets";
import Routes from "~/shared/routes";
import { OrdersPage, iconActionProps, textActionProps } from "./helpers";

function usePageFromSearchParams(): number | undefined {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  return Number(searchParams.get("page")) || undefined;
}

export function UnpublishedOrders() {
  const userType = useUnit($userType);
  const page = usePageFromSearchParams();
  const pageData = {
    iconActions: (
      <>
        <NavLink to={Routes.NEW_ORDER} {...iconActionProps}>
          <ReactSVG src={FolderPlus} />
        </NavLink>
        <NavLink to={Routes.NEW_ORDER} onClick={CopyOrder} {...iconActionProps}>
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
    ),
    textActions: (
      <>
        <PublishOrder publishTo="in_auction" {...textActionProps} />
        <PublishOrder publishTo="in_bidding" {...textActionProps} />
        <PublishOrderInDirect />
      </>
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

export function OrdersInAuction() {
  const userType = useUnit($userType);
  const page = usePageFromSearchParams();
  const customerPageData = {
    textActions: (
      <>
        <AcceptBestOffer {...textActionProps} />
        <UnpublishOrder {...textActionProps} />
        <CancelOrder variant="text" {...textActionProps} />
      </>
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

export function OrdersInBidding() {
  const userType = useUnit($userType);
  const page = usePageFromSearchParams();
  const customerPageData = {
    textActions: (
      <>
        <AcceptBestOffer {...textActionProps} />
        <UnpublishOrder {...textActionProps} />
        <CancelOrder variant="text" {...textActionProps} />
      </>
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

export function OrdersInDirect() {
  const userType = useUnit($userType);
  const page = usePageFromSearchParams();
  const customerPageData = {
    textActions: (
      <>
        <UnpublishOrder {...textActionProps} />
        <CancelOrder variant="text" {...textActionProps} />
      </>
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

export function OrdersBeingExecuted() {
  const userType = useUnit($userType);
  const page = usePageFromSearchParams();
  const customerPageData = {
    textActions: (
      <>
        <CompleteOrder {...textActionProps} />
        <CancelOrder variant="text" {...textActionProps} />
        <UnpublishOrder {...textActionProps} />
      </>
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
