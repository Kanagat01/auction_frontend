import { ReactSVG } from "react-svg";
import { NavLink } from "react-router-dom";
import { LuCopyPlus, LuPenSquare } from "react-icons/lu";
import { FaRegTrashCan } from "react-icons/fa6";

import { Assign } from "~/widgets";
import {
  CopyOrder,
  TOrderStatus,
  cancelOrder,
  unpublishOrder,
} from "~/entities/Order";
import { FolderPlus } from "~/shared/assets";
import { NEW_ORDER_ROUTE } from "~/shared/routes";
import { OutlineButton, PrimaryButton } from "~/shared/ui";

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
      {[
        { icon: <ReactSVG src={FolderPlus} />, onClick: () => {} },
        { icon: <LuCopyPlus />, onClick: CopyOrder },
      ].map(({ icon, onClick }, idx) => (
        <NavLink
          key={idx}
          to={NEW_ORDER_ROUTE}
          onClick={onClick}
          {...iconActionProps}
        >
          {icon}
        </NavLink>
      ))}
      <OutlineButton {...iconActionProps}>
        <LuPenSquare />
      </OutlineButton>
      <OutlineButton {...iconActionProps} onClick={cancelOrder as () => void}>
        <FaRegTrashCan />
      </OutlineButton>
    </>
  ),
  textActions: (
    <>
      {["В аукцион", "На торги"].map((buttonText) => (
        <PrimaryButton key={buttonText} {...textActionProps}>
          {buttonText}
        </PrimaryButton>
      ))}
      <Assign />
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
      {[
        { text: "Принять", onClick: () => {} },
        { text: "Вернуть в заказы", onClick: () => {} },
        { text: "Отменить", onClick: cancelOrder as () => void },
      ].map(({ text, onClick }) => (
        <PrimaryButton key={text} onClick={onClick} {...textActionProps}>
          {text}
        </PrimaryButton>
      ))}
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
      {[
        { text: "Принять", onClick: () => {} },
        { text: "Вернуть в заказы", onClick: () => {} },
        { text: "Отменить", onClick: cancelOrder as () => void },
      ].map(({ text, onClick }) => (
        <PrimaryButton key={text} onClick={onClick} {...textActionProps}>
          {text}
        </PrimaryButton>
      ))}
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
      {[
        { text: "Вернуть в заказы", onClick: () => {} },
        { text: "Отменить", onClick: cancelOrder as () => void },
      ].map(({ text, onClick }) => (
        <PrimaryButton key={text} onClick={onClick} {...textActionProps}>
          {text}
        </PrimaryButton>
      ))}
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
      {[
        { text: "Завершить", onClick: () => {} },
        { text: "Отменить", onClick: cancelOrder as () => void },
        { text: "Вернуть в заказы", onClick: unpublishOrder as () => void },
      ].map(({ text, onClick }) => (
        <PrimaryButton key={text} onClick={onClick} {...textActionProps}>
          {text}
        </PrimaryButton>
      ))}
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
