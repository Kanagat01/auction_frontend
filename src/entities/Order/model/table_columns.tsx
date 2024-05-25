import { createColumnHelper } from "@tanstack/react-table";
import { Dispatch, SetStateAction } from "react";
import {
  OrderModel,
  OrderStatus,
  TOrderStatus,
  orderTranslations,
} from "../types";
import { IndeterminateCheckbox } from "~/shared/ui";

type TgetColumns = {
  setSelectedOrder: Dispatch<SetStateAction<OrderModel | null>>;
  changeModal: () => void;
};

export const getColumns = ({ setSelectedOrder, changeModal }: TgetColumns) => {
  const columnHelper = createColumnHelper<OrderModel>();
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
  ] as Array<Partial<Exclude<keyof OrderModel, "id">>>;

  return keys.map((key) =>
    columnHelper.accessor(key, {
      cell: (info) => {
        const row = info.row;
        const value = info.getValue();
        if (key === "transportation_number")
          return (
            <div className="d-flex align-items-center">
              <IndeterminateCheckbox
                className="mr-3"
                {...{
                  checked: row.getIsSelected(),
                  disabled: !row.getCanSelect(),
                  indeterminate: row.getIsSomeSelected(),
                  onChange: row.getToggleSelectedHandler(),
                }}
              />
              <button
                onClick={() => {
                  setSelectedOrder(info.row.original);
                  changeModal();
                }}
              >
                {value ? value.toString() : "-"}
              </button>
            </div>
          );
        else if (["updated_at", "created_at"].includes(key)) {
          if (value) {
            const parts = value
              .toString()
              .replace("T", " ")
              .replace("Z", "")
              .split(":");
            return parts && parts[0] + ":" + parts[1];
          }
          return "-";
        } else if (key === "status") {
          const value = info.getValue()?.toString() as TOrderStatus;
          return OrderStatus[value];
        }
        return value ? value.toString() : "-";
      },
      header: () => orderTranslations[key],
    })
  );
};
