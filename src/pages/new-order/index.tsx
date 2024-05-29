import { Col, Row } from "react-bootstrap";
import { LuCopyPlus, LuPenSquare } from "react-icons/lu";
import { FaRegTrashCan } from "react-icons/fa6";

import { CreateDelivery } from "~/widgets";
import { OrderStagesTable, TStages } from "~/entities/OrderStage";
import { InputContainer, OutlineButton, RoundedWhiteBox } from "~/shared/ui";
import styles from "./styles.module.scss";

export default function NewOrder() {
  const options1: Array<[string, string]> = [
    ["1", "Тентовый"],
    ["2", "Контейнер"],
    ["3", "Фургон"],
    ["4", "Решрижератор"],
  ];
  const options2: Array<[string, string]> = [
    ["1", "Верхняя"],
    ["2", "Боковая"],
    ["3", "Задняя"],
    ["4", "С полной растен.."],
  ];
  const orderStageCouples: TStages[] = [
    {
      load_stage: {
        date: "09.09.2022",
        time_start: "15:00",
        time_end: "16:00",
        company: "Москва РОКВУП ООО",
        address: "some adress",
        contact_person: "Иван Иваныч",
        cargo: "Товар какой то",
        weight: 156,
        volume: 157,
        comments: "",
      },
      unload_stage: {
        date: "09.09.2022",
        time_start: "15:00",
        time_end: "16:00",
        company: "Москва РОКВУП ООО",
        address: "some adress",
        contact_person: "Иван Иваныч",
        cargo: "Товар какой то",
        weight: 156,
        volume: 157,
        comments: "",
      },
    },
  ];
  return (
    <RoundedWhiteBox>
      <Row className="p-4">
        <Col md={6} lg={3} className="mb-4">
          <div className={styles.title}>Заказчик</div>
          {[
            ["customer_manager", "Заказчик", "Поиск"],
            ["contact_person", "Контактное лицо", "Поиск"],
            ["start_price", "Стартовая цена", "10000"],
            ["price_step", "Шаг цены", "1000"],
            ["transportation_number", "№ Транспортировки", "00000000"],
          ].map(([name, label, placeholder]) => (
            <InputContainer
              key={name}
              name={name}
              label={label}
              placeholder={placeholder}
              variant="input"
              label_style={{ color: "var(--default-font-color)" }}
              className={`${styles.input} w-100 mb-3`}
            />
          ))}
        </Col>
        <Col md={6} lg={4} className="mb-4">
          <div className={styles.title}>Дополнительно</div>
          <div className={styles.secondCol}>
            {[
              ["comments_for_transporter", "Комментарий для перевозчиков"],
              ["additional_requirements", "Доп. требования"],
            ].map(([name, label]) => (
              <InputContainer
                key={label}
                variant="textarea"
                name={name}
                label={label}
                label_style={{ color: "var(--default-font-color)" }}
                className={`${styles.textarea} w-100 mb-0`}
                rows={7}
              />
            ))}
          </div>
        </Col>
        <Col md={12} lg={5} className="mb-4">
          <div className={styles.title}>Транспорт</div>
          <Row>
            {[
              {
                name: "transport_body_type",
                label: "Тип кузова",
                options: options1,
              },
              {
                name: "transport_load_type",
                label: "Загрузка",
                options: options2,
              },
              {
                name: "transport_unload_type",
                label: "Выгрузка",
                options: options2,
              },
            ].map((props, idx) => (
              <Col key={idx} md={4} className="p-0">
                <InputContainer
                  variant="select"
                  label_style={{ color: "var(--default-font-color)" }}
                  className={styles.select}
                  multiple={true}
                  size={5}
                  {...props}
                />
              </Col>
            ))}
            {[
              { name: "transport_volume", label: "ТС, м3" },
              { name: "temp_mode", label: "Темп. режим" },
              { name: "adr", label: "ADR [шт.]" },
              { name: "transport_body_width", label: "Ширина кузова" },
              { name: "transport_body_length", label: "Длина кузова" },
              { name: "transport_body_height", label: "Высота кузова" },
            ].map((props, idx) => (
              <Col key={idx} md={4} className="p-0 mt-4">
                <InputContainer
                  variant="input"
                  label_style={{ color: "var(--default-font-color)" }}
                  className={`${styles.input} mb-0`}
                  {...props}
                />
              </Col>
            ))}
          </Row>
        </Col>
        <Col md={12} lg={8}>
          <OrderStagesTable orderStageCouples={orderStageCouples} />
        </Col>
        <Col className="d-flex justify-content-between" md={12} lg={4}>
          <div className="d-flex flex-column align-items-start">
            <InputContainer
              name=""
              label="№ Поставки"
              variant="input"
              label_style={{ color: "var(--default-font-color)" }}
              className={styles.input}
            />
            <div className="d-flex">
              {[CreateDelivery, LuCopyPlus, LuPenSquare, FaRegTrashCan].map(
                (Icon, idx) => (
                  <OutlineButton
                    key={idx}
                    className="px-2 py-0 me-2"
                    style={{
                      fontSize: "2rem",
                      border: "1px solid gray",
                    }}
                  >
                    <Icon color="gray" />
                  </OutlineButton>
                )
              )}
            </div>
          </div>
          <div
            className="d-flex flex-column align-items-end"
            style={{ width: "10rem" }}
          >
            {["Сохранить", "Отмена"].map((text, idx) => (
              <OutlineButton
                className={styles.button}
                type={idx === 0 ? "submit" : "button"}
              >
                {text}
              </OutlineButton>
            ))}
          </div>
        </Col>
      </Row>
    </RoundedWhiteBox>
  );
}
