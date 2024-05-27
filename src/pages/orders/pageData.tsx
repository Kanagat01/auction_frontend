import { ReactSVG } from "react-svg";
import { NavLink } from "react-router-dom";
import { LuCopyPlus, LuPenSquare } from "react-icons/lu";
import { FaRegTrashCan } from "react-icons/fa6";

import { Assign } from "~/widgets";
import { TOrderStatus } from "~/entities/Order";
import { FolderPlus } from "~/shared/assets";
import { NEW_ORDER_ROUTE } from "~/shared/routes";
import { OutlineButton, PrimaryButton } from "~/shared/ui";

// unpublished
const unpublishedOrdersData = {
  title: "Заказы",
  inputs: [
    { name: "id", label: "№ Транспортировки", placeholder: "00000000" },
    { name: "city_from", label: "Город-старт", placeholder: "Москва" },
    {
      name: "city_to",
      label: "Город-место назначения",
      placeholder: "Балашиха",
    },
  ],
  iconActions: (
    <>
      <NavLink
        to={NEW_ORDER_ROUTE}
        className="outline-btn px-2 py-0 me-2"
        style={{ fontSize: "2rem" }}
      >
        <ReactSVG src={FolderPlus} />
      </NavLink>
      {[LuCopyPlus, LuPenSquare, FaRegTrashCan].map((Icon, idx) => (
        <OutlineButton
          key={idx}
          className="px-2 py-0 me-2"
          style={{ fontSize: "2rem" }}
        >
          <Icon />
        </OutlineButton>
      ))}
    </>
  ),
  textActions: (
    <>
      {["В аукцион", "На торги"].map((buttonText) => (
        <PrimaryButton key={buttonText} className="me-2 px-3 py-2">
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
    { name: "id", label: "№ Транспортировки", placeholder: "00000000" },
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
    { name: "id", label: "№ Транспортировки", placeholder: "00000000" },
    { name: "city_from", label: "Город-старт", placeholder: "Москва" },
    {
      name: "city_to",
      label: "Город-место назначения",
      placeholder: "Балашиха",
    },
  ],
  textActions: (
    <>
      {["Принять", "Вернуть в заказы", "Отменить"].map((buttonText) => (
        <PrimaryButton key={buttonText} className="me-2 px-3 py-2">
          {buttonText}
        </PrimaryButton>
      ))}
    </>
  ),
};

// in bidding
const inBiddingOrdersData = {
  title: "Торги",
  inputs: [
    { name: "id", label: "№ Транспортировки", placeholder: "00000000" },
    { name: "city_from", label: "Город-старт", placeholder: "Москва" },
    {
      name: "city_to",
      label: "Город-место назначения",
      placeholder: "Балашиха",
    },
  ],
  textActions: (
    <>
      {["Принять", "Вернуть в заказы", "Отменить"].map((buttonText) => (
        <PrimaryButton key={buttonText} className="me-2 px-3 py-2">
          {buttonText}
        </PrimaryButton>
      ))}
    </>
  ),
};

// in direct
const inDirectOrdersData = {
  title: "Назначенные",
  inputs: [
    { name: "id", label: "№ Транспортировки", placeholder: "00000000" },
    { name: "city_from", label: "Город-старт", placeholder: "Москва" },
    {
      name: "city_to",
      label: "Город-место назначения",
      placeholder: "Балашиха",
    },
  ],
  textActions: (
    <>
      {["Вернуть в заказы", "Отменить"].map((buttonText) => (
        <PrimaryButton key={buttonText} className="me-2 px-3 py-2">
          {buttonText}
        </PrimaryButton>
      ))}
    </>
  ),
};

// being executed
const beingExecutedOrdersData = {
  title: "Журнал перевозок",
  inputs: [
    { name: "id", label: "№ Транспортировки", placeholder: "00000000" },
    { name: "city_from", label: "Город-старт", placeholder: "Москва" },
    {
      name: "city_to",
      label: "Город-место назначения",
      placeholder: "Балашиха",
    },
  ],
  textActions: (
    <>
      {["Завершить", "Отменить", "Вернуть в заказы"].map((buttonText) => (
        <PrimaryButton key={buttonText} className="me-2 px-3 py-2">
          {buttonText}
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
