import { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import {
  SortingState,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { OrderModel, OrderSections, getColumns } from "~/entities/Order";
import { MainTable } from "~/shared/ui";
import { useModalState } from "~/shared/lib";

export function OrdersList({ orders }: { orders: OrderModel[] }) {
  const paginator = { size: 11, currentPage: 2 };

  const [modal, changeModal] = useModalState(false);
  const [selectedOrder, setSelectedOrder] = useState<OrderModel | null>(null);
  const [rowSelection, setRowSelection] = useState({});
  const [sorting, setSorting] = useState<SortingState>([]);

  const [data, setData] = useState(orders);
  useEffect(() => setData(orders), [orders]);

  const columns = getColumns({ setSelectedOrder, changeModal });
  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      rowSelection,
    },
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    // @ts-ignore
    isMultiSortEvent: (e) => true,
  });
  return (
    <>
      <MainTable table={table} paginator={paginator} />
      <Modal show={modal} onHide={changeModal} className="rounded-modal">
        <Modal.Body>
          {selectedOrder ? <OrderSections order={selectedOrder} /> : ""}
        </Modal.Body>
      </Modal>
    </>
  );
}
