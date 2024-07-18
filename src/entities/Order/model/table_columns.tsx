import { useUnit } from "effector-react";
import { createColumnHelper } from "@tanstack/react-table";
import { DriverProfile, TUser } from "~/entities/User";
import { Checkbox } from "~/shared/ui";
import Routes from "~/shared/routes";
import {
  OrderModel,
  OrderStatus,
  TGetOrder,
  TOrderStatus,
  orderTranslations,
} from "../types";
import { $selectedOrder, deselectOrder, selectOrder } from "..";

const defaultKeys = [
  "transportation_number",
  "customer_manager",
  "transporter_manager",
  "driver",
  "status",
  "start_price",
  "price_step",
  "comments_for_transporter",
  "additional_requirements",
  "created_at",
  "updated_at",
] as Exclude<keyof OrderModel, "id">[];

const keysCustomer: Partial<Record<Routes, Exclude<keyof OrderModel, "id">[]>> =
  {
    [Routes.ORDERS_BEING_EXECUTED]: defaultKeys,
    [Routes.UNPUBLISHED_ORDERS]: defaultKeys,
    [Routes.ORDERS_IN_AUCTION]: defaultKeys,
    [Routes.ORDERS_IN_BIDDING]: defaultKeys,
    [Routes.ORDERS_IN_DIRECT]: defaultKeys,
    [Routes.CANCELLED_ORDERS]: defaultKeys,
  };

const keysTransporter: Partial<
  Record<Routes, Exclude<keyof OrderModel, "id">[]>
> = {
  [Routes.ORDERS_BEING_EXECUTED]: defaultKeys,
  [Routes.ORDERS_IN_AUCTION]: defaultKeys,
  [Routes.ORDERS_IN_BIDDING]: defaultKeys,
  [Routes.ORDERS_IN_DIRECT]: defaultKeys,
  [Routes.CANCELLED_ORDERS]: defaultKeys,
};

export const getColumns = (route: Routes, role: "transporter" | "customer") => {
  const keys =
    role === "customer" ? keysCustomer[route] : keysTransporter[route];
  const columnHelper = createColumnHelper<TGetOrder>();
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
            <div className="d-flex align-items-center">
              <Checkbox
                className="mr-3"
                {...{
                  checked: checked,
                  disabled: !row.getCanSelect(),
                  indeterminate: row.getIsSomeSelected()
                    ? row.getIsSomeSelected()
                    : undefined,
                  onChange: () =>
                    !checked ? selectOrder(orderId) : deselectOrder(),
                }}
              />
              <span className="ms-3">{value ? value.toString() : "-"}</span>
            </div>
          );
        } else if (["updated_at", "created_at"].includes(key)) {
          return value
            ? new Date(value as string | Date).toLocaleDateString("ru", {
                year: "numeric",
                month: "numeric",
                day: "numeric",
                hour: "numeric",
                minute: "numeric",
              })
            : "-";
        } else if (key === "status") {
          const value = info.getValue()?.toString() as TOrderStatus;
          return OrderStatus[value];
        } else if (["transporter_manager", "customer_manager"].includes(key))
          return value ? (value as { user: TUser }).user.full_name : "-";
        else if (key === "driver")
          return value
            ? (value as DriverProfile).user_or_fullname.full_name
            : "-";
        else return value ? value.toString() : "-";
      },
      header: () => orderTranslations[key],
      sortDescFirst: false,
      enableSorting: key !== "status",
    })
  );
};
