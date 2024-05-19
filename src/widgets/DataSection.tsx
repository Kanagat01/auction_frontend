import { Col, Row } from "react-bootstrap";
import { InputContainer, RoundedTable, TitleSm } from "~/shared/ui";

export function DataSection({ selectedOrder }: { selectedOrder: any }) {
  const inputs = [
    [
      [
        "id",
        "№ Транспортировки",
        selectedOrder ? selectedOrder.id.toString() : "",
      ],
      ["contact_person", "Контактное лицо", "Имя"],
    ],
    [
      ["weight", "Вес", "000000"],
      ["volume", "Обьем", "000000"],
      ["ts", "ТС, м3", "000000"],
    ],
    [
      ["length", "Длина", "000000"],
      ["width", "Ширина", "000000"],
      ["height", "Высота", "000000"],
    ],
  ];
  return (
    <>
      {inputs.map((arr, key) => (
        <div
          key={key}
          className="d-flex align-items-center"
          style={{ gap: "1rem" }}
        >
          {arr.map(([name, label, value]) => (
            <InputContainer
              key={name}
              {...{ name, label, value }}
              variant="input"
              label_style={{
                color: "var(--default-font-color)",
              }}
              container_style={{ width: "100%" }}
              className="w-100 mb-2"
            />
          ))}
        </div>
      ))}
      <TitleSm>Таблица</TitleSm>
      <RoundedTable
        data={[
          ["Стартовая цена", "10000"],
          ["Шаг цены", "0000"],
          ["Способ погрузки", "0000"],
          ["Способ выгрузки", "0000"],
          ["Темп.режим", "0000"],
          ["ADR", "0000"],
        ]}
      />
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
            <TitleSm className="mt-2 mb-2" style={{ fontWeight: 600 }}>
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
            <TitleSm className="mt-2 mb-2" style={{ fontWeight: 600 }}>
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
