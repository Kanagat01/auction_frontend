import { createEvent, createStore } from "effector";
import { useUnit } from "effector-react";
import { createColumnHelper } from "@tanstack/react-table";
import { Checkbox } from "~/shared/ui";
import {
  OrderModel,
  OrderStatus,
  TGetOrder,
  TOrderStatus,
  orderTranslations,
} from "../types";
import { $selectedOrder, deselectOrder, selectOrder, updateOrder } from "..";

export const changeOrderModal = createEvent();
export const $orderModal = createStore<boolean>(false).on(
  changeOrderModal,
  (state) => !state
);
export const setCurrentOrder = createEvent<TGetOrder>();
export const $currentOrder = createStore<TGetOrder | null>(null).on(
  setCurrentOrder,
  (_, newState) => newState
);
$currentOrder.on(updateOrder, (state, { newData }) => {
  return state ? { ...state, ...newData } : null;
});

export const getColumns = () => {
  const columnHelper = createColumnHelper<TGetOrder>();
  const keys = [
    "transportation_number",
    "customer_manager",
    "transporter_manager",
    "status",
    "start_price",
    "price_step",
    "comments_for_transporter",
    "additional_requirements",
    "created_at",
    "updated_at",
  ] as Exclude<keyof OrderModel, "id">[];

  return keys.map((key) =>
    columnHelper.accessor(key, {
      cell: (info) => {
        const row = info.row;
        const value = info.getValue();
        if (key === "transportation_number") {
          const selectedOrder = useUnit($selectedOrder);
          const orderId = row.original.id;
          const checked = selectedOrder === orderId;
          const onClick = () => {
            changeOrderModal();
            setCurrentOrder(row.original);
          };
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
              <button onClick={onClick}>
                {value ? value.toString() : "-"}
              </button>
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
        }
        return value ? value.toString() : "-";
      },
      header: () => orderTranslations[key],
      sortDescFirst: false,
      enableSorting: key !== "status",
    })
  );
};
