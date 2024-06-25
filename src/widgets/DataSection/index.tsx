import { CSSProperties, ChangeEvent, useState } from "react";
import { TGetOrder } from "~/entities/Order";
import { InputContainer, RoundedTable, TitleSm } from "~/shared/ui";

const gridContainer: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(2, 1fr)",
  gridAutoRows: "max-content",
  columnGap: "10px",
  marginBottom: "1rem",
};

export function DataSection({ order }: { order: TGetOrder }) {
  const [stageIdx, setStageIdx] = useState(0);
  const { load_stage, unload_stage, order_stage_number } =
    order.stages[stageIdx];
  const inputs = [
    [
      {
        name: "transportation_number",
        label: "№ Транспортировки",
      },
      {
        name: "customer_manager",
        label: "Заказчик",
      },
    ],
    [
      {
        name: "comments_for_transporter",
        label: "Комментарий для перевозчиков",
      },
      {
        name: "additional_requirements",
        label: "Доп. требования",
      },
    ],
    [
      {
        name: "transport_body_height",
        label: "Высота кузова",
      },
      {
        name: "transport_body_length",
        label: "Длина кузова",
      },
      {
        name: "transport_body_width",
        label: "Ширина кузова",
      },
    ],
  ];
  const tableData = [
    ["Стартовая цена", order.start_price],
    ["Шаг цены", order.price_step],
    [
      "Способ погрузки",
      typeof order.transport_load_type === "number"
        ? order.transport_load_type
        : order.transport_load_type.name,
    ],
    [
      "Способ выгрузки",
      typeof order.transport_unload_type === "number"
        ? order.transport_unload_type
        : order.transport_unload_type.name,
    ],
    ["ТС, м3", order.transport_volume],
    ["Темп. режим", order.temp_mode],
    ["ADR [шт.]", order.adr],
  ];
  return (
    <>
      {inputs.map((arr, key) => (
        <div
          key={key}
          className="d-flex align-items-end"
          style={{ gap: "1rem" }}
        >
          {arr.map(({ name, label }) => (
            <InputContainer
              key={name}
              name={name}
              label={label}
              defaultValue={order[name as keyof TGetOrder] as string | number}
              variant={key === 1 ? "textarea" : "input"}
              label_style={{
                color: "var(--default-font-color)",
              }}
              container_style={{
                width: "100%",
                marginBottom: "1rem",
              }}
              className="w-100"
              disabled
            />
          ))}
        </div>
      ))}
      <TitleSm>Таблица</TitleSm>
      <RoundedTable data={tableData} />
      <div className="gray-bg">
        <div style={gridContainer}>
          <TitleSm className="ms-2 mb-2" style={{ fontWeight: 600 }}>
            <div className="d-flex align-items-center justify-content-between">
              Поставка{" "}
              <span className="gray-text">
                <InputContainer
                  variant="select"
                  label=""
                  name=""
                  value={stageIdx}
                  onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                    setStageIdx(Number(e.target.value))
                  }
                  options={order.stages.map((_, idx) => [
                    idx,
                    `${idx + 1}/${order.stages.length}`,
                  ])}
                  style={{ width: "fit-content", padding: "2px" }}
                />
              </span>
            </div>
          </TitleSm>
          <TitleSm className="ms-2 mb-2" style={{ fontWeight: 600 }}>
            № Поставки: <span className="gray-text">{order_stage_number}</span>
          </TitleSm>
          {["Погрузка", "Выгрузка"].map((text) => (
            <TitleSm
              key={text}
              className="ms-2 mb-2"
              style={{ fontWeight: 600 }}
            >
              {text}
            </TitleSm>
          ))}
          {[load_stage, unload_stage].map((stage, key) => (
            <RoundedTable
              key={key}
              data={[
                [`${stage.company}\n${stage.address}`],
                [stage.contact_person],
                [
                  <>
                    {new Date(stage.date).toLocaleDateString("ru", {
                      year: "numeric",
                      month: "numeric",
                      day: "numeric",
                    })}{" "}
                    <br />
                    {stage.time_start.slice(0, 5)}-{stage.time_end.slice(0, 5)}
                  </>,
                ],
              ]}
            />
          ))}
          {[load_stage, unload_stage].map((stage, key) => (
            <div
              key={key}
              className="d-flex flex-column justify-content-between"
            >
              <TitleSm className="mt-4 mb-2" style={{ fontWeight: 600 }}>
                Параметры груза - {stage.cargo}
              </TitleSm>
              <div className="gray-line" />
            </div>
          ))}
          {[load_stage, unload_stage].map((stage, key) => (
            <div key={key}>
              <div className="d-flex justify-content-between mt-2">
                <TitleSm className="gray-text">Вес</TitleSm>
                <TitleSm>{stage.weight} kg</TitleSm>
              </div>
              <div className="d-flex justify-content-between mt-1">
                <TitleSm className="gray-text">Обьем</TitleSm>
                <TitleSm>{stage.volume} cbm</TitleSm>
              </div>
            </div>
          ))}
          {[load_stage, unload_stage].map((stage, key) => (
            <div key={key}>
              <TitleSm className="mt-4 mb-2" style={{ fontWeight: 600 }}>
                Комментарии к поставке
              </TitleSm>
              <div className="gray-line mb-2" />
              <TitleSm>{stage.comments}</TitleSm>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
