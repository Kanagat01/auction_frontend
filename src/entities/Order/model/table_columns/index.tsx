import { t } from "i18next";
import { useUnit } from "effector-react";
import { createColumnHelper } from "@tanstack/react-table";
import { OrderOfferStatus } from "~/entities/Offer";
import {
  $selectedOrder,
  setSelectedOrder,
  TColumn,
  TGetOrder,
} from "~/entities/Order";
import {
  findEarliestLoadStage,
  findLatestUnloadStage,
} from "~/entities/OrderStage";
import { Checkbox } from "~/shared/ui";
import Routes from "~/shared/routes";
import { keysCustomer, keysTransporter } from "./keys";
import { getOrderColumnValue } from "./getOrderColumnValue";
import { dateTimeToString, dateToLongMonthString } from "~/shared/lib";

export const getColumns = (route: Routes, role: "transporter" | "customer") => {
  const columnHelper = createColumnHelper<TColumn>();
  const keys =
    role === "customer" ? keysCustomer[route] : keysTransporter[route];
  if (!keys) throw "This route not in the dict";
  return keys.map((key) =>
    columnHelper.accessor(key, {
      id: key,
      cell: (info) => {
        const row = info.row;
        const order = row.original;
        const earliestLoadStage = findEarliestLoadStage(order.stages);
        const latestUnloadStage = findLatestUnloadStage(order.stages);
        const value =
          getOrderColumnValue(
            key,
            role,
            order,
            earliestLoadStage,
            latestUnloadStage
          ) ?? "-";
        switch (key) {
          case "transportation_number":
            const selectedOrder = useUnit($selectedOrder);
            const orderId = order.id;
            const checked = selectedOrder?.id === orderId;
            return (
              <div
                className="d-flex align-items-center position-relative"
                style={{ wordBreak: "break-word", width: "fit-content" }}
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
                    onChange: () => setSelectedOrder(!checked ? order : null),
                  }}
                />
                <span className="ms-3">{value?.toString() ?? "-"}</span>
                {order.isNewOrder && (
                  <span
                    className="blue-circle"
                    style={{ top: "0.25rem", right: "-1.5rem" }}
                  />
                )}
              </div>
            );
          case "transporter":
            if (role === "transporter") return value;
            return (
              <span
                style={
                  order?.offers?.[0]?.status == OrderOfferStatus.rejected
                    ? { color: "var(--danger)" }
                    : {}
                }
              >
                {value?.toString() ?? "-"}
              </span>
            );
          case "offer_price":
            const priceData = order.price_data;
            return (
              <span
                style={
                  priceData && "is_best_offer" in priceData
                    ? {
                        color: priceData.is_best_offer
                          ? "var(--success)"
                          : "var(--danger)",
                        textDecoration: "underline",
                      }
                    : {}
                }
              >
                {value?.toString()}
              </span>
            );
          case "updated_at":
          case "created_at":
            return value !== "-" ? dateTimeToString(value as string) : value;
          case "loading_date":
          case "unloading_date":
            return value !== "-"
              ? dateToLongMonthString(value as string)
              : value;
          default:
            return value;
        }
      },
      header: () => t(`orderTranslations.${key}`),
      enableSorting: key !== "status",
      enableMultiSort: false,
      sortingFn: (a, b, columnId) => {
        const order1 = a.original;
        const value1 = getOrderColumnValue(
          columnId as keyof TColumn,
          role,
          order1,
          findEarliestLoadStage(order1.stages),
          findLatestUnloadStage(order1.stages)
        );

        const order2 = b.original;
        const value2 = getOrderColumnValue(
          columnId as keyof TColumn,
          role,
          order2,
          findEarliestLoadStage(order2.stages),
          findLatestUnloadStage(order2.stages)
        );
        return defaultSortingFn(value1, value2);
      },
    })
  );
};

export const defaultSortingFn = (valueA: unknown, valueB: unknown) => {
  if (typeof valueA === "string" && typeof valueB === "string") {
    return valueA.localeCompare(valueB);
  }

  if (typeof valueA === "number" && typeof valueB === "number") {
    return valueA - valueB;
  }

  if (valueA instanceof Date && valueB instanceof Date) {
    return valueA.getTime() - valueB.getTime();
  }

  if (
    typeof valueA === "string" &&
    typeof valueB === "string" &&
    !isNaN(Date.parse(valueA)) &&
    !isNaN(Date.parse(valueB))
  ) {
    return new Date(valueA).getTime() - new Date(valueB).getTime();
  }

  if (typeof valueA === "boolean" && typeof valueB === "boolean") {
    return valueA === valueB ? 0 : valueA ? 1 : -1;
  }

  if (valueA === valueB) {
    return 0;
  }
  if (valueA === null || valueA === undefined) {
    return 1;
  }
  if (valueB === null || valueB === undefined) {
    return -1;
  }

  return 0;
};

export const getExportData = (
  orders: TGetOrder[],
  route: Routes,
  role: "transporter" | "customer"
) => {
  const keys =
    role === "customer" ? keysCustomer[route] : keysTransporter[route];
  if (!keys) throw "This route not in the dict";
  const headers = keys.map((key) => t(`orderTranslations.${key}`));
  const data = orders.map((order) => {
    const earliestLoadStage = findEarliestLoadStage(order.stages);
    const latestUnloadStage = findLatestUnloadStage(order.stages);
    return keys.map((key) => {
      return getOrderColumnValue(
        key,
        role,
        order,
        earliestLoadStage,
        latestUnloadStage
      );
    });
  });
  return [headers, ...data];
};
