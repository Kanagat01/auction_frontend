import { Table, flexRender } from "@tanstack/react-table";
import { RxTriangleUp, RxTriangleDown } from "react-icons/rx";
import { RiArrowRightSLine } from "react-icons/ri";
import { TextCenter, TitleMd } from "~/shared/ui";
import styles from "./styles.module.scss";
import { NavLink } from "react-router-dom";

type MainTableProps = {
  table: Table<any>;
  paginator?: { size: number; currentPage: number };
};

export function MainTable({ table, paginator }: MainTableProps) {
  const headerGroups = table.getHeaderGroups();
  const rows = table.getRowModel().rows;

  let pages = [];
  if (paginator) {
    const { size, currentPage } = paginator;
    if (size <= 10) {
      for (let i = 1; i <= size; i++) pages.push(i);
    } else if (currentPage - 5 <= 0) {
      for (let i = 1; i <= 10; i++) pages.push(i);
    } else if (size - currentPage <= 5) {
      for (let i = size - 10; i <= size; i++) pages.push(i);
    } else {
      for (let i = currentPage - 5; i <= currentPage + 5; i++) pages.push(i);
    }
  }
  return (
    <table className={styles.table}>
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <th
                key={header.id}
                className={
                  header.column.getCanSort() ? styles.cursorPointer : ""
                }
                onClick={header.column.getToggleSortingHandler()}
              >
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                {{
                  asc: <RxTriangleUp className={styles.sortingIcon} />,
                  desc: <RxTriangleDown className={styles.sortingIcon} />,
                }[header.column.getIsSorted() as string] ??
                  (header.column.getCanSort() ? (
                    <div className={styles.columnCanSort}>
                      <RxTriangleUp />
                      <RxTriangleDown />
                    </div>
                  ) : null)}
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
      {paginator && (
        <tfoot>
          <tr>
            <td colSpan={headerGroups[0].headers.length}>
              <div className={styles.pagination}>
                {pages.map((page) => (
                  <NavLink
                    to="#"
                    key={page}
                    className={
                      paginator.currentPage === page ? styles.activePage : ""
                    }
                    onClick={(e) => {
                      if (paginator.currentPage === page) {
                        e.preventDefault();
                      }
                    }}
                  >
                    {page}
                  </NavLink>
                ))}
                <NavLink to="#">
                  <RiArrowRightSLine />
                </NavLink>
              </div>
            </td>
          </tr>
        </tfoot>
      )}
    </table>
  );
}
