import { CSSProperties, ChangeEvent, useState, ReactNode } from "react";
import { useLocation } from "react-router";
import { useUnit } from "effector-react";
import { DriverProfileTranslations } from "~/entities/User";
import { $preCreateOrder, TGetOrder } from "~/entities/Order";
import { copyOnClickWrapper, handleClick } from "~/features/copyOnClick";
import { InputContainer, RoundedTable, TitleSm } from "~/shared/ui";
import Routes from "~/shared/routes";
import { dateToString } from "~/shared/lib";

const gridContainer: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(2, 1fr)",
  gridAutoRows: "max-content",
  columnGap: "10px",
  marginBottom: "1rem",
};

export function DataSection({ order }: { order: TGetOrder }) {
  const preCreateOrder = useUnit($preCreateOrder);
  const transport_body_type = preCreateOrder?.transport_body_types.find(
    (el) => el.id === order.transport_body_type
  );
  const transport_load_type = preCreateOrder?.transport_load_types.find(
    (el) => el.id === order.transport_load_type
  );
  const transport_unload_type = preCreateOrder?.transport_unload_types.find(
    (el) => el.id === order.transport_unload_type
  );
  const [stageIdx, setStageIdx] = useState(0);
  const {
    load_stage,
    unload_stage,
    order_stage_number,
    cargo,
    volume,
    weight,
  } = order.stages[stageIdx];
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
    ["Тип кузова", transport_body_type?.name],
    ["Способ погрузки", transport_load_type?.name],
    ["Способ выгрузки", transport_unload_type?.name],
    ["ТС, м3", order.transport_volume],
    ["Темп. режим", order.temp_mode],
    ["ADR", order.adr],
  ];
  if (order.driver) {
    tableData.push(
      ...([
        [DriverProfileTranslations.phone_number, order.driver.phone_number],
        [DriverProfileTranslations.full_name, order.driver.user.full_name],
        [
          DriverProfileTranslations.passport_number,
          order.driver.passport_number,
        ],
        [DriverProfileTranslations.machine_data, order.driver.machine_data],
        [DriverProfileTranslations.machine_number, order.driver.machine_number],
      ] as [ReactNode, ReactNode][])
    );
  }
  tableData = tableData.map(([field, value]) => [
    field,
    value ? copyOnClickWrapper(value) : "-",
  ]);
  if (Routes.FIND_CARGO === useLocation().pathname) {
    tableData.splice(0, 2);
  }
  return (
    <>
      {inputs.map((arr, key) => (
        <div
          key={key}
          className="d-flex align-items-end"
          style={{ gap: "1rem" }}
        >
          {arr.map(({ name, label, defaultValue }) => (
            <InputContainer
              {...{ key: name, name, label, defaultValue: defaultValue ?? "-" }}
              variant={key === 1 ? "textarea" : "input"}
              labelStyle={{
                color: "var(--default-font-color)",
              }}
              containerStyle={{
                width: "100%",
                marginBottom: "1rem",
              }}
              className="w-100"
              onClick={defaultValue ? handleClick : undefined}
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
                      {dateToString(stage.date)} <br />
                      {stage.time_start.slice(0, 5)}-
                      {stage.time_end.slice(0, 5)}
                    </>
                  ),
                ],
              ]}
            />
          ))}
          {[1, 2].map((key) => (
            <div
              key={key}
              className="d-flex flex-column justify-content-between"
            >
              <TitleSm className="mt-4 mb-2" style={{ fontWeight: 600 }}>
                Параметры груза - {copyOnClickWrapper(cargo)}
              </TitleSm>
              <div className="gray-line" />
            </div>
          ))}
          {[1, 2].map((key) => (
            <div key={key}>
              <div className="d-flex justify-content-between mt-2">
                <TitleSm className="gray-text">Вес</TitleSm>
                <TitleSm>{copyOnClickWrapper(`${weight} kg`)}</TitleSm>
              </div>
              <div className="d-flex justify-content-between mt-1">
                <TitleSm className="gray-text">Обьем</TitleSm>
                <TitleSm>{copyOnClickWrapper(`${volume} cbm`)}</TitleSm>
              </div>
            </div>
          ))}
          {[load_stage, unload_stage].map((stage, key) => (
            <div key={key}>
              <TitleSm className="mt-4 mb-2" style={{ fontWeight: 600 }}>
                Комментарии к поставке
              </TitleSm>
              <div className="gray-line mb-2" />
              <TitleSm>
                {stage.comments ? copyOnClickWrapper(stage.comments) : "—"}
              </TitleSm>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
