import { useUnit } from "effector-react";
import { createColumnHelper } from "@tanstack/react-table";
import { DriverProfile, TUser } from "~/entities/User";
import { OrderOfferStatus } from "~/entities/Offer";
import {
  findEarliestLoadStage,
  findLatestUnloadStage,
} from "~/entities/OrderStage";
import { Checkbox } from "~/shared/ui";
import Routes from "~/shared/routes";
import {
  $selectedOrder,
  setSelectedOrder,
  OrderStatusTranslation,
  TOrderStatus,
  orderTranslations,
  TColumn,
} from "..";

const defaultKeys = [
  "transportation_number",
  "customer_manager",
  "stages_cnt",
  "city_from",
  "postal_code",
  "loading_date",
  "loading_time",
  "city_to",
  "unloading_date",
  "volume",
  "weight",
] as (keyof TColumn)[];

const keysCustomer: Partial<Record<Routes, (keyof TColumn)[]>> = {
  [Routes.ORDERS_BEING_EXECUTED]: [
    ...defaultKeys,
    "final_price",
    "transporter",
    "driver",
    "application_type",
    "comments_for_transporter",
  ],
  [Routes.UNPUBLISHED_ORDERS]: [...defaultKeys, "comments_for_transporter"],
  [Routes.ORDERS_IN_AUCTION]: [
    ...defaultKeys,
    "start_price",
    "best_offer_price",
    "best_offer_company",
    "comments_for_transporter",
  ],
  [Routes.ORDERS_IN_BIDDING]: [
    ...defaultKeys,
    "start_price",
    "best_offer_price",
    "best_offer_company",
    "comments_for_transporter",
  ],
  [Routes.ORDERS_IN_DIRECT]: [
    ...defaultKeys,
    "comments_for_transporter",
    "transporter",
  ],
  [Routes.CANCELLED_ORDERS]: [
    ...defaultKeys,
    "start_price",
    "best_offer_price",
    "transporter",
    "driver",
    "application_type",
    "comments_for_transporter",
  ],
};

const keysTransporter: Partial<Record<Routes, (keyof TColumn)[]>> = {
  [Routes.ORDERS_BEING_EXECUTED]: [
    ...defaultKeys,
    "final_price",
    "transporter",
    "driver",
    "application_type",
  ],
  [Routes.ORDERS_IN_AUCTION]: [...defaultKeys, "offer_price"],
  [Routes.ORDERS_IN_BIDDING]: [...defaultKeys, "offer_price"],
  [Routes.ORDERS_IN_DIRECT]: [...defaultKeys, "comments_for_transporter"],
  [Routes.CANCELLED_ORDERS]: [
    ...defaultKeys,
    "start_price",
    "best_offer_price",
    "transporter",
    "driver",
    "application_type",
  ],
};

export const getColumns = (route: Routes, role: "transporter" | "customer") => {
  const columnHelper = createColumnHelper<TColumn>();
  const keys =
    role === "customer" ? keysCustomer[route] : keysTransporter[route];
  if (!keys) throw "This route not in the dict";
  return keys.map((key, index) =>
    columnHelper.accessor(key, {
      id: `column_${index}`,
      cell: (info) => {
        const row = info.row;
        const value = info.getValue();
        if (key === "transportation_number") {
          const selectedOrder = useUnit($selectedOrder);
          const orderId = row.original.id;
          const checked = selectedOrder?.id === orderId;
          return (
            <div
              className="d-flex align-items-center"
              style={{ wordBreak: "break-word" }}
            >
              <Checkbox
                className="mr-3"
                {...{
                  name: orderId.toString(),
                  checked: checked,
                  disabled: !row.getCanSelect(),
                  indeterminate: row.getIsSomeSelected()
                    ? row.getIsSomeSelected()
                    : undefined,
                  onChange: () =>
                    setSelectedOrder(!checked ? row.original : null),
                }}
              />
              <span className="ms-3">{value?.toString() ?? "-"}</span>
            </div>
          );
        } else if (["volume", "weight"].includes(key)) {
          let result = 0;
          const typedKey = key as "volume" | "weight";
          row.original.stages.map((stage) => {
            result += stage[typedKey];
            return;
          });
          return result;
        } else if (["updated_at", "created_at"].includes(key)) {
          if (!value) return "-";
          return new Date(value as string | Date).toLocaleDateString("ru", {
            year: "numeric",
            month: "numeric",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
          });
        } else if (key === "status") {
          if (!value) return "-";
          return OrderStatusTranslation[value.toString() as TOrderStatus];
        } else if (["transporter_manager", "customer_manager"].includes(key)) {
          return value ? (value as { user: TUser }).user.full_name : "-";
        } else if (key === "driver") {
          return value
            ? (value as DriverProfile).user_or_fullname.full_name
            : "-";
        } else if (
          [
            "final_price",
            "best_offer_price",
            "best_offer_company",
            "transporter",
          ].includes(key)
        ) {
          if (role === "transporter") {
            switch (key) {
              case "final_price":
              case "best_offer_price":
                const priceData = row.original.price_data;
                return priceData && "current_price" in priceData
                  ? priceData.current_price
                  : "-";
              case "transporter":
                return (
                  row.original.transporter_manager?.company.company_name ?? "-"
                );
            }
          }
          if (key === "final_price") {
            return (
              row.original?.offers?.find(
                (el) => el.status === OrderOfferStatus.accepted
              )?.price ?? "-"
            );
          }
          const bestOffer = row.original?.offers?.[0];
          if (!bestOffer) return "-";
          switch (key) {
            case "best_offer_price":
              return bestOffer.price;
            case "best_offer_company":
              return bestOffer.transporter_manager.company.company_name;
            case "transporter":
              return (
                <span
                  style={
                    bestOffer.status == OrderOfferStatus.rejected
                      ? { color: "#F40D0D" }
                      : {}
                  }
                >
                  {bestOffer.transporter_manager.company.company_name}
                </span>
              );
          }
        } else if (key === "offer_price") {
          const priceData = row.original.price_data;
          return priceData && "price" in priceData ? (
            <span
              style={
                "is_best_offer" in priceData
                  ? priceData.is_best_offer
                    ? { color: "#1ED900", textDecoration: "underline" }
                    : { color: "#F40D0D", textDecoration: "underline" }
                  : {}
              }
            >
              {priceData.price}
            </span>
          ) : (
            "-"
          );
        } else if (key === "stages_cnt") return row.original.stages.length;
        else if (
          ["city_from", "postal_code", "loading_date", "loading_time"].includes(
            key
          )
        ) {
          const stage = findEarliestLoadStage(row.original.stages);
          if (!stage) return "-";
          switch (key) {
            case "city_from":
              return stage.city;
            case "postal_code":
              return stage.postal_code;
            case "loading_date":
              return new Date(stage.date).toLocaleDateString("ru", {
                year: "numeric",
                month: "long",
                day: "numeric",
              });
            case "loading_time":
              return new Date(`${stage.date}T${stage.time_start}`)
                .toLocaleDateString("ru", {
                  hour: "numeric",
                  minute: "numeric",
                })
                .split(" ")[1];
          }
        } else if (["city_to", "unloading_date"].includes(key)) {
          const stage = findLatestUnloadStage(row.original.stages);
          if (!stage) return "-";
          return key === "city_to"
            ? stage.city
            : new Date(stage.date).toLocaleDateString("ru", {
                year: "numeric",
                month: "long",
                day: "numeric",
              });
        } else if (key === "application_type") {
          const value = row.original.application_type;
          switch (value) {
            case "in_auction":
              return "Аукцион";
            case "in_bidding":
              return "Торги";
            case "in_direct":
              return "Прямой заказ";
            default:
              return "-";
          }
        }
        return value?.toString() ?? "-";
      },
      header: () => {
        if (!(key in orderTranslations))
          throw `Add ${key} to orderTranslations`;
        return orderTranslations[key as keyof typeof orderTranslations];
      },
      sortDescFirst: false,
      enableSorting: key !== "status",
    })
  );
};
