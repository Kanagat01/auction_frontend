import { CSSProperties, ChangeEvent, useState, ReactNode } from "react";
import { TGetOrder } from "~/entities/Order";
import { copyOnClickWrapper, handleClick } from "~/features/copyOnClick";
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
        defaultValue: order.transportation_number,
      },
      {
        name: "customer_manager",
        label: "Заказчик",
        defaultValue: order.customer_manager.user.full_name,
      },
    ],
    [
      {
        name: "comments_for_transporter",
        label: "Комментарий для перевозчиков",
        defaultValue: order.comments_for_transporter,
      },
      {
        name: "additional_requirements",
        label: "Доп. требования",
        defaultValue: order.additional_requirements,
      },
    ],
    [
      {
        name: "transport_body_height",
        label: "Высота кузова",
        defaultValue: order.transport_body_height,
      },
      {
        name: "transport_body_length",
        label: "Длина кузова",
        defaultValue: order.transport_body_length,
      },
      {
        name: "transport_body_width",
        label: "Ширина кузова",
        defaultValue: order.transport_body_width,
      },
    ],
  ];
  let tableData: [ReactNode, ReactNode][] = [
    ["Стартовая цена", order.start_price],
    ["Шаг цены", order.price_step],
    ["Способ погрузки", order.transport_load_type],
    ["Способ выгрузки", order.transport_unload_type],
    ["ТС, м3", order.transport_volume],
    ["Темп. режим", order.temp_mode],
    ["ADR [шт.]", order.adr],
  ];
  if (order.driver) {
    tableData.push(
      ...([
        ["Телефон", order.driver.phone_number],
        ["ФИО водителя", order.driver.user_or_fullname.full_name],
        ["Номер паспорта", order.driver.passport_number],
        ["Данные авто", order.driver.machine_data],
        ["Номер авто", order.driver.machine_number],
      ] as [ReactNode, ReactNode][])
    );
  }
  tableData = tableData.map(([field, value]) => [
    field,
    copyOnClickWrapper(value),
  ]);
  return (
    <>
      {inputs.map((arr, key) => (
        <div
          key={key}
          className="d-flex align-items-end"
          style={{ gap: "1rem" }}
        >
          {arr.map((props) => (
            <InputContainer
              key={props.name}
              {...props}
              variant={key === 1 ? "textarea" : "input"}
              label_style={{
                color: "var(--default-font-color)",
              }}
              container_style={{
                width: "100%",
                marginBottom: "1rem",
              }}
              className="w-100"
              onClick={handleClick}
              readOnly
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
            № Поставки:{" "}
            <span className="gray-text">
              {copyOnClickWrapper(order_stage_number)}
            </span>
          </TitleSm>
          {["Погрузка", "Выгрузка"].map((text) => (
            <TitleSm
              key={text}
              className="position-relative ms-2 mb-2"
              style={{ fontWeight: 600 }}
            >
              {text}
            </TitleSm>
          ))}
          {[load_stage, unload_stage].map((stage, key) => (
            <RoundedTable
              key={key}
              data={[
                [
                  copyOnClickWrapper(
                    <>
                      {stage.company}
                      <br />
                      {stage.city}, {stage.postal_code}
                      <br />
                      {stage.address}
                    </>
                  ),
                ],
                [copyOnClickWrapper(stage.contact_person)],
                [
                  copyOnClickWrapper(
                    <>
                      {new Date(stage.date).toLocaleDateString("ru", {
                        year: "numeric",
                        month: "numeric",
                        day: "numeric",
                      })}{" "}
                      <br />
                      {stage.time_start.slice(0, 5)}-
                      {stage.time_end.slice(0, 5)}
                    </>
                  ),
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
                Параметры груза - {copyOnClickWrapper(stage.cargo)}
              </TitleSm>
              <div className="gray-line" />
            </div>
          ))}
          {[load_stage, unload_stage].map((stage, key) => (
            <div key={key}>
              <div className="d-flex justify-content-between mt-2">
                <TitleSm className="gray-text">Вес</TitleSm>
                <TitleSm>{copyOnClickWrapper(`${stage.weight} kg`)}</TitleSm>
              </div>
              <div className="d-flex justify-content-between mt-1">
                <TitleSm className="gray-text">Обьем</TitleSm>
                <TitleSm>{copyOnClickWrapper(`${stage.volume} cbm`)}</TitleSm>
              </div>
            </div>
          ))}
          {[load_stage, unload_stage].map((stage, key) => (
            <div key={key}>
              <TitleSm className="mt-4 mb-2" style={{ fontWeight: 600 }}>
                Комментарии к поставке
              </TitleSm>
              <div className="gray-line mb-2" />
              <TitleSm>{copyOnClickWrapper(stage.comments)}</TitleSm>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
