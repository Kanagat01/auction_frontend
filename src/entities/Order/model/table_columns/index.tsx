import { useUnit } from "effector-react";
import { createColumnHelper } from "@tanstack/react-table";
import { OrderOfferStatus } from "~/entities/Offer";
import {
  $selectedOrder,
  setSelectedOrder,
  orderTranslations,
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
        const order = row.original;
        const earliestLoadStage = findEarliestLoadStage(order.stages);
        const latestUnloadStage = findLatestUnloadStage(order.stages);
        const value = getOrderColumnValue(
          key,
          role,
          order,
          earliestLoadStage,
          latestUnloadStage
        );
        if (key === "transportation_number") {
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
              <span className="ms-3">{value}</span>
              <span
                className="blue-circle"
                style={{ top: "0.25rem", right: "-1.5rem" }}
              />
            </div>
          );
        } else if (key === "transporter") {
          if (role === "transporter") return value;
          return (
            <span
              style={
                order?.offers?.[0]?.status == OrderOfferStatus.rejected
                  ? { color: "var(--danger)" }
                  : {}
              }
            >
              {value}
            </span>
          );
        } else if (key === "offer_price") {
          return (
            <span
              style={
                "is_best_offer" in order.price_data!
                  ? {
                      color: order.price_data.is_best_offer
                        ? "var(--success)"
                        : "var(--danger)",
                      textDecoration: "underline",
                    }
                  : {}
              }
            >
              {value}
            </span>
          );
        }
        return value;
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

export const getExportData = (
  orders: TGetOrder[],
  route: Routes,
  role: "transporter" | "customer"
) => {
  const keys =
    role === "customer" ? keysCustomer[route] : keysTransporter[route];
  if (!keys) throw "This route not in the dict";
  const headers = keys.map((key) => {
    if (!(key in orderTranslations)) throw `Add ${key} to orderTranslations`;
    return orderTranslations[key as keyof typeof orderTranslations];
  });
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
