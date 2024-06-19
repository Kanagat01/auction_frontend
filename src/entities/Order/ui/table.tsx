import { useEffect, useState } from "react";
import {
  SortingState,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { TGetOrder, getColumns } from "~/entities/Order";
import { MainTable } from "~/shared/ui";

export function OrdersList({ orders }: { orders: TGetOrder[] }) {
  const [data, setData] = useState(orders);
  useEffect(() => setData(orders), [orders]);

  const [sorting, setSorting] = useState<SortingState>([]);
  const columns = getColumns();
  const table = useReactTable({
    data,
    columns,
    state: { sorting },
    columnResizeMode: "onChange",
    columnResizeDirection: "ltr",
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    isMultiSortEvent: (_e) => true,
  });
  const paginator = { size: 11, currentPage: 2 };
  return <MainTable table={table} paginator={paginator} />;
}
