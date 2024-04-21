import { useState } from "react";
import styles from "./styles.module.scss";

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

type Order = {
  id: number;
  client: string;
  loadingPeriod: string;
  startCity: string;
  O: number;
  op: number;
  loadingDate: Date;
  unloadingDate: Date;
  destinationCity: string;
  postalCode: string;
  volume: number;
  weight: number;
  comments?: string;
};

const defaultData: Order[] = [];
for (let i = 1; i <= 16; i++) {
  defaultData.push({
    id: i,
    client: "Роквул OOO",
    loadingPeriod: "00:00-23:59",
    startCity: "г.Балашиха",
    O: 1,
    op: 1,
    loadingDate: new Date("2023-03-15"),
    unloadingDate: new Date("2023-03-17"),
    destinationCity: "г.Уфа",
    postalCode: "641083",
    volume: 116.76,
    weight: 4604.79,
  });
}
const columnHelper = createColumnHelper<Order>();

const columns = [
  columnHelper.accessor("id", {
    cell: (info) => info.getValue().toString().padStart(13, "0"),
    header: () => "№ Транспортировки",
  }),
  columnHelper.accessor("client", {
    header: () => "Заказчик",
  }),
  columnHelper.accessor("loadingPeriod", {
    header: () => "Период загрузки",
  }),
  columnHelper.accessor("startCity", {
    header: () => "Город-старт",
  }),
  columnHelper.accessor("O", {
    header: () => "O...",
  }),
  columnHelper.accessor("op", {
    header: () => "Op...",
  }),
  columnHelper.accessor("loadingDate", {
    header: () => "Дата погрузки",
    cell: (info) => info.getValue().toISOString().split("T")[0],
  }),
  columnHelper.accessor("unloadingDate", {
    header: () => "Дата разгрузки",
    cell: (info) => info.getValue().toISOString().split("T")[0],
  }),
  columnHelper.accessor("destinationCity", {
    header: () => "Город-место назначения",
  }),
  columnHelper.accessor("postalCode", {
    header: () => "Почтовый индекс",
  }),
  columnHelper.accessor("volume", {
    header: () => "Объем",
    cell: (info) => `${info.getValue()}cbm`,
  }),
  columnHelper.accessor("weight", {
    header: () => "Вес",
    cell: (info) => `${info.getValue()} kg`,
  }),
  columnHelper.accessor("comments", {
    header: () => "Комментарии",
    cell: (info) => (info.getValue() ? info.getValue() : "-"),
  }),
];

export function TableTanstack() {
  // @ts-ignore
  const [data, setData] = useState(() => [...defaultData]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <table className={styles.table}>
      <thead>
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <th key={header.id}>
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {table.getRowModel().rows.map((row) => (
          <tr key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <td key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
