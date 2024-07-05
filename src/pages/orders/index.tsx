import { useUnit } from "effector-react";
import { NavLink } from "react-router-dom";
import { ReactSVG } from "react-svg";
import { LuCopyPlus, LuPenSquare } from "react-icons/lu";
import { $userType } from "~/entities/User";
import {
  AcceptBestOffer,
  MakeOffer,
  AcceptOfferTransporter,
  RejectOfferTransporter,
} from "~/entities/Offer";
import {
  CancelOrder,
  CompleteOrder,
  CopyOrder,
  EditOrder,
  PublishOrder,
  PublishOrderInDirect,
  UnpublishOrder,
  getOrdersFx,
} from "~/entities/Order";
import { EDIT_ORDER_ROUTE, NEW_ORDER_ROUTE } from "~/shared/routes";
import { FolderPlus } from "~/shared/assets";
import { PrimaryButton } from "~/shared/ui";
import {
  OrdersPage,
  getRole,
  iconActionProps,
  textActionProps,
} from "./helpers";

export function UnpublishedOrders() {
  const userType = useUnit($userType);
  const pageData = {
    iconActions: (
      <>
        <NavLink to={NEW_ORDER_ROUTE} {...iconActionProps}>
          <ReactSVG src={FolderPlus} />
        </NavLink>
        <NavLink to={NEW_ORDER_ROUTE} onClick={CopyOrder} {...iconActionProps}>
          <LuCopyPlus />
        </NavLink>
        <NavLink to={EDIT_ORDER_ROUTE} onClick={EditOrder} {...iconActionProps}>
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
      promise={() => getOrdersFx("unpublished")}
    />
  );
}

export function CancelledOrders() {
  return (
    <OrdersPage
      title="Отмененные"
      pageData={{}}
      promise={() => getOrdersFx("cancelled")}
    />
  );
}

export function OrdersInAuction() {
  const userType = useUnit($userType);
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
    priceInputs: true,
    textActions: (
      <>
        <MakeOffer inAuction={true} {...textActionProps} />
      </>
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
      promise={() => getOrdersFx("in_auction")}
    />
  );
}

export function OrdersInBidding() {
  const userType = useUnit($userType);
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
    textActions: (
      <>
        <MakeOffer {...textActionProps} />
      </>
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
      promise={() => getOrdersFx("in_bidding")}
    />
  );
}

export function OrdersInDirect() {
  const userType = useUnit($userType);
  const customerPageData = {
    textActions: (
      <>
        <UnpublishOrder {...textActionProps} />
        <CancelOrder variant="text" {...textActionProps} />
      </>
    ),
  };
  const transporterPageData = {
    textActions: (
      <>
        <AcceptOfferTransporter {...textActionProps} />
        <RejectOfferTransporter {...textActionProps} />
      </>
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
      promise={() => getOrdersFx("in_direct")}
    />
  );
}

export function OrdersBeingExecuted() {
  const userType = useUnit($userType);
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
    textActions: (
      <>
        <PrimaryButton {...textActionProps}>Подать данные</PrimaryButton>
      </>
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
      promise={() => getOrdersFx("being_executed")}
    />
  );
}
