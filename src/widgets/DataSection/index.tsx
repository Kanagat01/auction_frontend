import { Col, Row } from "react-bootstrap";
import { OrderModel } from "~/entities/Order";
import { logger } from "~/shared/config";
import { InputContainer, RoundedTable, TitleSm } from "~/shared/ui";

export function DataSection({ order }: { order: OrderModel }) {
  logger.log(order);
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
              //@ts-ignore
              value={order[name]}
              variant={key === 1 ? "textarea" : "input"}
              label_style={{
                color: "var(--default-font-color)",
              }}
              container_style={{
                width: "100%",
                marginBottom: "1rem",
              }}
              className="w-100"
            />
          ))}
        </div>
      ))}
      <TitleSm>Таблица</TitleSm>
      <RoundedTable data={tableData} />
      <div className="gray-bg">
        <Row>
          <Col>
            <TitleSm className="ms-2 mb-2" style={{ fontWeight: 600 }}>
              Поставка <span className="gray-text">1/1</span>
            </TitleSm>
            <TitleSm className="ms-2 mb-2" style={{ fontWeight: 600 }}>
              Место загрузки
            </TitleSm>
            <RoundedTable
              data={[
                [
                  "ООО “ТрансКомпани” \nИНН 1649020481 \nтер.промплощ. “Алабуга” ул.13 \nRU-423600 Елабуга г",
                ],
                ["+7-987-410-59-05"],
                ["2023-03-15"],
              ]}
            />
            <TitleSm className="mt-4 mb-2" style={{ fontWeight: 600 }}>
              Параметры груза
            </TitleSm>
            <div className="gray-line"></div>
            <div className="d-flex justify-content-between mt-2">
              <TitleSm className="gray-text">Вес</TitleSm>
              <TitleSm>4 604,79kg</TitleSm>
            </div>
            <div className="d-flex justify-content-between mt-1">
              <TitleSm className="gray-text">Обьем</TitleSm>
              <TitleSm>116,76 cbm</TitleSm>
            </div>
          </Col>
          <Col>
            <TitleSm className="ms-2 mb-2" style={{ fontWeight: 600 }}>
              Пост.: <span className="gray-text">000000</span>
            </TitleSm>
            <TitleSm className="ms-2 mb-2" style={{ fontWeight: 600 }}>
              Место разгрузки
            </TitleSm>
            <RoundedTable
              data={[
                [
                  "ООО “ТрансКомпани” \nИНН 1649020481 \nтер.промплощ. “Алабуга” ул.13 \nRU-423600 Елабуга г",
                ],
                ["+7-987-410-59-05"],
                ["2023-03-15"],
              ]}
            />
            <TitleSm className="mt-4 mb-2" style={{ fontWeight: 600 }}>
              Комментарии к поставке
            </TitleSm>
            <div className="gray-line mb-2"></div>
            <TitleSm>«+7 919 327 83 15-Константин»</TitleSm>
          </Col>
        </Row>
      </div>
    </>
  );
}
