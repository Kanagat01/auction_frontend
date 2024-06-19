import { createColumnHelper } from "@tanstack/react-table";
import { Modal } from "react-bootstrap";
import { Checkbox } from "~/shared/ui";
import { unixDateToString, useModalState } from "~/shared/lib";
import {
  OrderModel,
  OrderStatus,
  TGetOrder,
  TOrderStatus,
  orderTranslations,
} from "../types";
import { OrderSections, deselectOrder, selectOrder } from "..";

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
          const [modal, changeModal] = useModalState(false);
          const canSelect = row.getCanSelect(),
            checked = row.getIsSelected();
          const tr_number = row.original.transportation_number;
          return (
            <>
              <div className="d-flex align-items-center">
                <Checkbox
                  className="mr-3"
                  {...{
                    checked: checked,
                    disabled: !canSelect,
                    indeterminate: row.getIsSomeSelected()
                      ? row.getIsSomeSelected()
                      : undefined,
                    onChange: row.getToggleSelectedHandler(),
                  }}
                  onClick={() =>
                    !checked ? selectOrder(tr_number) : deselectOrder(tr_number)
                  }
                />
                <button onClick={changeModal}>
                  {value ? value.toString() : "-"}
                </button>
              </div>
              <Modal
                show={modal}
                onHide={changeModal}
                className="rounded-modal"
              >
                <Modal.Body>
                  <OrderSections order={row.original} />
                </Modal.Body>
              </Modal>
            </>
          );
        } else if (["updated_at", "created_at"].includes(key)) {
          return value ? unixDateToString(value as Date | string) : "-";
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
