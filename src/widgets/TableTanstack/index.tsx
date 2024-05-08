import { useState } from "react";
import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Modal } from "react-bootstrap";

import { DataSection, DocumentsSection, MapSection } from "~/widgets";
import { TOrder } from "~/entities/Order";
import { MainTable, OutlineButton } from "~/shared/ui";
import { useModalState } from "~/shared/lib";

export function TableTanstack() {
  const [modal, changeModal] = useModalState(false);
  const [currentSection, setCurrentSection] = useState<string>("data");
  const renderSection = () => {
    switch (currentSection) {
      case "documents":
        return <DocumentsSection />;
      case "map":
        return <MapSection />;
      default:
        return selectedOrder ? (
          <DataSection selectedOrder={selectedOrder} />
        ) : null;
    }
  };

  const [selectedOrder, setSelectedOrder] = useState<TOrder | null>(null);

  const defaultData: TOrder[] = [];
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
  const columnHelper = createColumnHelper<TOrder>();

  const columns = [
    columnHelper.accessor("id", {
      cell: (info) => (
        <button
          onClick={() => {
            setSelectedOrder(info.row.original);
            changeModal();
          }}
        >
          {info.getValue().toString().padStart(13, "0")}
        </button>
      ),
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
  // @ts-ignore
  const [data, setData] = useState(() => [...defaultData]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <>
      <MainTable table={table} />
      <Modal show={modal} onHide={changeModal} className="rounded-modal">
        <Modal.Body>
          <div className="d-flex align-items-center justify-content-between my-4">
            {[
              ["Данные", "data"],
              ["Трекинг", "map"],
              ["Документы", "documents"],
            ].map(([text, section], key) => (
              <OutlineButton
                key={key}
                style={{
                  padding: "0.5rem 2rem",
                  fontSize: "1.4rem",
                }}
                onClick={() => setCurrentSection(section)}
                className={currentSection === section ? "active" : ""}
              >
                {text}
              </OutlineButton>
            ))}
          </div>
          {renderSection()}
        </Modal.Body>
      </Modal>
    </>
  );
}
