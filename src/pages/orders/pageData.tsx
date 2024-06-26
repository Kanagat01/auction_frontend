import { ReactSVG } from "react-svg";
import { NavLink } from "react-router-dom";
import { LuCopyPlus, LuPenSquare } from "react-icons/lu";

import {
  CancelOrder,
  CopyOrder,
  PublishOrder,
  TOrderStatus,
  UnpublishOrder,
  PublishOrderInDirect,
  CompleteOrder,
  EditOrder,
} from "~/entities/Order";
import { FolderPlus } from "~/shared/assets";
import { EDIT_ORDER_ROUTE, NEW_ORDER_ROUTE } from "~/shared/routes";
import { PrimaryButton } from "~/shared/ui";

const iconActionProps = {
  className: "outline-btn px-2 py-0 me-2",
  style: { fontSize: "2rem" },
};
const textActionProps = { className: "me-2 px-3 py-2" };

// unpublished
const unpublishedOrdersData = {
  title: "Заказы",
  inputs: [
    {
      name: "transportation_number",
      label: "№ Транспортировки",
      placeholder: "00000000",
    },
    { name: "city_from", label: "Город-старт", placeholder: "Москва" },
    {
      name: "city_to",
      label: "Город-место назначения",
      placeholder: "Балашиха",
    },
  ],
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

// cancelled
const cancelledOrdersData = {
  title: "Отмененные",
  inputs: [
    {
      name: "transportation_number",
      label: "№ Транспортировки",
      placeholder: "00000000",
    },
    { name: "city_from", label: "Город-старт", placeholder: "Москва" },
    {
      name: "city_to",
      label: "Город-место назначения",
      placeholder: "Балашиха",
    },
  ],
};

// in auction
const inAuctionOrdersData = {
  title: "Аукционы",
  inputs: [
    {
      name: "transportation_number",
      label: "№ Транспортировки",
      placeholder: "00000000",
    },
    { name: "city_from", label: "Город-старт", placeholder: "Москва" },
    {
      name: "city_to",
      label: "Город-место назначения",
      placeholder: "Балашиха",
    },
  ],
  textActions: (
    <>
      <PrimaryButton {...textActionProps}>Принять</PrimaryButton>
      <UnpublishOrder {...textActionProps} />
      <CancelOrder variant="text" {...textActionProps} />
    </>
  ),
};

// in bidding
const inBiddingOrdersData = {
  title: "Торги",
  inputs: [
    {
      name: "transportation_number",
      label: "№ Транспортировки",
      placeholder: "00000000",
    },
    { name: "city_from", label: "Город-старт", placeholder: "Москва" },
    {
      name: "city_to",
      label: "Город-место назначения",
      placeholder: "Балашиха",
    },
  ],
  textActions: (
    <>
      <PrimaryButton {...textActionProps}>Принять</PrimaryButton>
      <UnpublishOrder {...textActionProps} />
      <CancelOrder variant="text" {...textActionProps} />
    </>
  ),
};

// in direct
const inDirectOrdersData = {
  title: "Назначенные",
  inputs: [
    {
      name: "transportation_number",
      label: "№ Транспортировки",
      placeholder: "00000000",
    },
    { name: "city_from", label: "Город-старт", placeholder: "Москва" },
    {
      name: "city_to",
      label: "Город-место назначения",
      placeholder: "Балашиха",
    },
  ],
  textActions: (
    <>
      <UnpublishOrder {...textActionProps} />
      <CancelOrder variant="text" {...textActionProps} />
    </>
  ),
};

// being executed
const beingExecutedOrdersData = {
  title: "Журнал перевозок",
  inputs: [
    {
      name: "transportation_number",
      label: "№ Транспортировки",
      placeholder: "00000000",
    },
    { name: "city_from", label: "Город-старт", placeholder: "Москва" },
    {
      name: "city_to",
      label: "Город-место назначения",
      placeholder: "Балашиха",
    },
  ],
  textActions: (
    <>
      <CompleteOrder {...textActionProps} />
      <CancelOrder variant="text" {...textActionProps} />
      <UnpublishOrder {...textActionProps} />
    </>
  ),
};

export const getPageData = (order_status: TOrderStatus) => {
  switch (order_status) {
    case "unpublished":
      return unpublishedOrdersData;
    case "cancelled":
      return cancelledOrdersData;
    case "in_auction":
      return inAuctionOrdersData;
    case "in_bidding":
      return inBiddingOrdersData;
    case "in_direct":
      return inDirectOrdersData;
    case "being_executed":
      return beingExecutedOrdersData;
    default:
      return { title: "" };
  }
};
