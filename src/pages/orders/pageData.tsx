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
const defaultInputs = [
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
];

// unpublished
const unpublishedOrdersCustomer = {
  title: "Заказы",
  inputs: defaultInputs,
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
const cancelledOrders = {
  title: "Отмененные",
  inputs: defaultInputs,
};

// in auction
const inAuctionOrdersCustomer = {
  title: "Аукционы",
  inputs: defaultInputs,
  textActions: (
    <>
      <PrimaryButton {...textActionProps}>Принять</PrimaryButton>
      <UnpublishOrder {...textActionProps} />
      <CancelOrder variant="text" {...textActionProps} />
    </>
  ),
};

const inAuctionOrdersTransporter = {
  title: "Аукционы",
  inputs: [
    ...defaultInputs,
    { name: "price", label: "Актуальная цена", placeholder: "72 000" },
    {
      name: "price_step",
      label: "Шаг цены",
      placeholder: "72 000",
    },
  ],
  textActions: (
    <>
      <PrimaryButton {...textActionProps}>Сделать ставку</PrimaryButton>
    </>
  ),
};

// in bidding
const inBiddingOrdersCustomer = {
  title: "Торги",
  inputs: defaultInputs,
  textActions: (
    <>
      <PrimaryButton {...textActionProps}>Принять</PrimaryButton>
      <UnpublishOrder {...textActionProps} />
      <CancelOrder variant="text" {...textActionProps} />
    </>
  ),
};

const inBiddingOrdersTransporter = {
  title: "Аукционы",
  inputs: defaultInputs,
  textActions: (
    <>
      <PrimaryButton {...textActionProps}>Сделать ставку</PrimaryButton>
    </>
  ),
};

// in direct
const inDirectOrdersCustomer = {
  title: "Назначенные",
  inputs: defaultInputs,
  textActions: (
    <>
      <UnpublishOrder {...textActionProps} />
      <CancelOrder variant="text" {...textActionProps} />
    </>
  ),
};

const inDirectOrdersTransporter = {
  title: "Назначенные",
  inputs: defaultInputs,
  textActions: (
    <>
      <PrimaryButton {...textActionProps}>Принять</PrimaryButton>
      <PrimaryButton {...textActionProps}>Отказаться</PrimaryButton>
    </>
  ),
};

// being executed
const beingExecutedOrdersCustomer = {
  title: "Журнал перевозок",
  inputs: defaultInputs,
  textActions: (
    <>
      <CompleteOrder {...textActionProps} />
      <CancelOrder variant="text" {...textActionProps} />
      <UnpublishOrder {...textActionProps} />
    </>
  ),
};

const beingExecutedOrdersTransporter = {
  title: "Журнал перевозок",
  inputs: defaultInputs,
  textActions: (
    <>
      <PrimaryButton {...textActionProps}>Подать данные</PrimaryButton>
    </>
  ),
};

const forbidden = { title: 403 };

export const getPageData = (
  order_status: Exclude<TOrderStatus, "completed">,
  role: "customer" | "transporter"
) => {
  const _or = (first: any, second: any) =>
    role === "customer" ? first : second;
  switch (order_status) {
    case "unpublished":
      return _or(unpublishedOrdersCustomer, forbidden);
    case "cancelled":
      return cancelledOrders;
    case "in_auction":
      return _or(inAuctionOrdersCustomer, inAuctionOrdersTransporter);
    case "in_bidding":
      return _or(inBiddingOrdersCustomer, inBiddingOrdersTransporter);
    case "in_direct":
      return _or(inDirectOrdersCustomer, inDirectOrdersTransporter);
    case "being_executed":
      return _or(beingExecutedOrdersCustomer, beingExecutedOrdersTransporter);
  }
};
