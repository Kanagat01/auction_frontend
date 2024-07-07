import { HTMLAttributes } from "react";
import { Table } from "@tanstack/react-table";

import {
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  closestCenter,
  useSensor,
  useSensors,
} from "@dnd-kit/core";

import { TextCenter, TitleMd } from "~/shared/ui";
import { Paginator } from "./Paginator";
import styles from "./styles.module.scss";
import {
  horizontalListSortingStrategy,
  SortableContext,
} from "@dnd-kit/sortable";
import {
  DragAlongCell,
  DraggableTableHeader,
  handleDragEnd,
} from "./dragFunctions";
import { restrictToHorizontalAxis } from "@dnd-kit/modifiers";

type MainTableProps = {
  table: Table<any>;
  paginator?: { size: number; currentPage: number };
  getRowProps?: (id: number) => HTMLAttributes<HTMLTableRowElement>;
  columnOrder: string[];
  setColumnOrder: (order: string[]) => void;
};

export function MainTable({
  table,
  paginator,
  getRowProps = (_id: number) => ({}),
  columnOrder,
  setColumnOrder,
}: MainTableProps) {
  const headerGroups = table.getHeaderGroups();
  const rows = table.getRowModel().rows;

  const sensors = useSensors(
    useSensor(MouseSensor, {}),
    useSensor(TouchSensor, {}),
    useSensor(KeyboardSensor, {})
  );
  return (
    <DndContext
      collisionDetection={closestCenter}
      modifiers={[restrictToHorizontalAxis]}
      onDragEnd={(event: DragEndEvent) => handleDragEnd(event, setColumnOrder)}
      sensors={sensors}
    >
      <div style={{ overflowX: "auto" }}>
        <table className={styles.table}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr key={headerGroup.id}>
                <SortableContext
                  items={columnOrder}
                  strategy={horizontalListSortingStrategy}
                >
                  {headerGroup.headers.map((header) => (
                    <DraggableTableHeader key={header.id} header={header} />
                  ))}
                </SortableContext>
              </tr>
            ))}
          </thead>
          <tbody>
            {rows.length !== 0 ? (
              rows.map((row) => (
                <tr key={row.id} {...getRowProps(row.original.id)}>
                  {row.getVisibleCells().map((cell) => (
                    <SortableContext
                      key={cell.id}
                      items={columnOrder}
                      strategy={horizontalListSortingStrategy}
                    >
                      <DragAlongCell key={cell.id} cell={cell} />
                    </SortableContext>
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
        </table>
      </div>
      {paginator && <Paginator {...paginator} />}
    </DndContext>
  );
}
