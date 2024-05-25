import { Table, flexRender } from "@tanstack/react-table";
import styles from "./styles.module.scss";
import { TextCenter, TitleMd } from "~/shared/ui";

type MainTableProps = {
  table: Table<any>;
  showFooter?: boolean;
  paginator?: { size: number; currentPage: number };
};

export function MainTable({ table, showFooter }: MainTableProps) {
  const headerGroups = table.getHeaderGroups();
  const rows = table.getRowModel().rows;
  return (
    <table className={styles.table}>
      <thead>
        {headerGroups.map((headerGroup) => (
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
        {rows.length !== 0 ? (
          rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={headerGroups[0].headers.length}>
              <TitleMd className="p-4">
                <TextCenter>Нет данных для отображения</TextCenter>
              </TitleMd>
            </td>
          </tr>
        )}
      </tbody>
      {showFooter && (
        <tfoot>
          <tr>
            <td colSpan={headerGroups[0].headers.length}>
              Тут будет пагинация {/* TODO: pagination */}
            </td>
          </tr>
        </tfoot>
      )}
    </table>
  );
}
