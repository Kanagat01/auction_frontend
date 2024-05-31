import { Col, Row } from "react-bootstrap";
import { LuCopyPlus, LuPenSquare } from "react-icons/lu";
import { FaRegTrashCan } from "react-icons/fa6";

import {
  getOrderStagesFx,
  CreateOrderStage,
  OrderStagesTable,
} from "~/entities/OrderStage";
import {
  InputContainer,
  OutlineButton,
  RoundedWhiteBox,
  TitleLg,
} from "~/shared/ui";
import { renderPromise } from "~/shared/api";
import styles from "./styles.module.scss";

export default function NewOrder() {
  return (
    <RoundedWhiteBox>
      {renderPromise(getOrderStagesFx, {
        error: (err) => {
          console.log(err);
          return <TitleLg>error</TitleLg>;
        },
        success: (response) => {
          const bodyTypeOptions: [string, string][] =
            response.transport_body_types.map((el) => [
              el.id.toString(),
              el.name,
            ]);
          const loadTypeOptions: [string, string][] =
            response.transport_load_types.map((el) => [
              el.id.toString(),
              el.name,
            ]);
          const unloadTypeOptions: [string, string][] =
            response.transport_unload_types.map((el) => [
              el.id.toString(),
              el.name,
            ]);
          return (
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
                    [
                      "comments_for_transporter",
                      "Комментарий для перевозчиков",
                    ],
                    ["additional_requirements", "Доп. требования"],
                  ].map(([name, label]) => (
                    <InputContainer
                      key={label}
                      variant="textarea"
                      name={name}
                      label={label}
                      label_style={{ color: "var(--default-font-color)" }}
                      className={`${styles.textarea} w-100 mb-0`}
                      rows={6}
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
                      options: bodyTypeOptions,
                    },
                    {
                      name: "transport_load_type",
                      label: "Загрузка",
                      options: loadTypeOptions,
                    },
                    {
                      name: "transport_unload_type",
                      label: "Выгрузка",
                      options: unloadTypeOptions,
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
                <OrderStagesTable />
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
                    {[
                      CreateOrderStage,
                      LuCopyPlus,
                      LuPenSquare,
                      FaRegTrashCan,
                    ].map((Icon, idx) => (
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
                    ))}
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
          );
        },
      })}{" "}
    </RoundedWhiteBox>
  );
}
