import { useEffect, useState } from "react";
import { useUnit } from "effector-react";
import {
  SortingState,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  $selectedOrder,
  TGetOrder,
  deselectOrder,
  getColumns,
  selectOrder,
} from "~/entities/Order";
import { MainTable, TPaginator } from "~/shared/ui";

export function OrdersList({
  orders,
  paginator,
}: {
  orders: TGetOrder[];
  paginator?: TPaginator;
}) {
  const [data, setData] = useState(orders);
  useEffect(() => setData(orders), [orders]);

  const [sorting, setSorting] = useState<SortingState>([]);
  const columns = getColumns();
  const [columnOrder, setColumnOrder] = useState<string[]>(
    columns.map((c) => c.id!)
  );

  const table = useReactTable({
    data,
    columns,
    state: { sorting, columnOrder },
    columnResizeMode: "onChange",
    columnResizeDirection: "ltr",
    onColumnOrderChange: setColumnOrder,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    isMultiSortEvent: (_e) => true,
  });

  const selectedOrder = useUnit($selectedOrder);
  const getRowProps = (id: number) => ({
    className: id === selectedOrder?.id ? "selected-row" : "",
    onClick:
      id === selectedOrder?.id
        ? (deselectOrder as () => void)
        : () => selectOrder(id),
  });
  return (
    <MainTable
      table={table}
      paginator={paginator}
      getRowProps={getRowProps}
      columnOrder={columnOrder}
      setColumnOrder={setColumnOrder}
    />
  );
}
