import { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { getCoreRowModel, useReactTable } from "@tanstack/react-table";

import { OrderModel, OrderSections, getColumns } from "~/entities/Order";
import { MainTable } from "~/shared/ui";
import { useModalState } from "~/shared/lib";

export function OrdersList({ orders }: { orders: OrderModel[] }) {
  const [modal, changeModal] = useModalState(false);
  const [selectedOrder, setSelectedOrder] = useState<OrderModel | null>(null);

  const columns = getColumns({ setSelectedOrder, changeModal });
  const [data, setData] = useState([...orders]);
  useEffect(() => setData([...orders]), [orders]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <>
      <MainTable table={table} showFooter />
      <Modal show={modal} onHide={changeModal} className="rounded-modal">
        <Modal.Body>
          {selectedOrder ? <OrderSections order={selectedOrder} /> : ""}
        </Modal.Body>
      </Modal>
    </>
  );
}
