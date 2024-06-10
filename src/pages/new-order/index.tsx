import { Col, Row } from "react-bootstrap";
import {
  getOrderStagesFx,
  OrderStageForm,
  OrderStagesTable,
} from "~/entities/OrderStage";
import { RoundedWhiteBox, TitleLg } from "~/shared/ui";
import { renderPromise } from "~/shared/api";
import { logger } from "~/shared/config";
import styles from "./styles.module.scss";
import { Field, SelectField, TInputs, formSubmitted } from "./form";

function mapResponseToOptions(responseProperty: any[]): [string, string][] {
  return responseProperty.map((el) => [el.id.toString(), el.name]);
}

export default function NewOrder() {
  return (
    <RoundedWhiteBox>
      {renderPromise(getOrderStagesFx, {
        error: (err) => {
          logger.error(err);
          return (
            <TitleLg>
              {err.name} {err.message}
            </TitleLg>
          );
        },
        success: (response) => {
          return (
            <form onSubmit={formSubmitted}>
              <Row className="p-4">
                <Col md={6} lg={3} className="mb-4">
                  <div className={styles.title}>Заказчик</div>
                  {[
                    ["customer_manager", "Заказчик"],
                    ["start_price", "Стартовая цена"],
                    ["price_step", "Шаг цены"],
                    ["transportation_number", "№ Транспортировки"],
                  ].map(([name, label], idx) => (
                    <Field
                      key={idx}
                      name={name as keyof TInputs}
                      label={label}
                      colNum={1}
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
                    ].map(([name, label], idx) => (
                      <Field
                        key={idx}
                        name={name as keyof TInputs}
                        label={label}
                        colNum={2}
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
                        options: mapResponseToOptions(
                          response.transport_body_types
                        ),
                      },
                      {
                        name: "transport_load_type",
                        label: "Загрузка",
                        options: mapResponseToOptions(
                          response.transport_load_types
                        ),
                      },
                      {
                        name: "transport_unload_type",
                        label: "Выгрузка",
                        options: mapResponseToOptions(
                          response.transport_unload_types
                        ),
                      },
                    ].map(({ name, ...props }, idx) => (
                      <SelectField
                        key={idx}
                        name={name as keyof TInputs}
                        {...props}
                      />
                    ))}
                  </Row>
                  <Row>
                    {[
                      ["transport_volume", "ТС, м3"],
                      ["temp_mode", "Темп. режим"],
                      ["adr", "ADR [шт.]"],
                      ["transport_body_width", "Ширина кузова"],
                      ["transport_body_length", "Длина кузова"],
                      ["transport_body_height", "Высота кузова"],
                    ].map(([name, label], idx) => (
                      <Field
                        key={idx}
                        name={name as keyof TInputs}
                        label={label}
                        colNum={3}
                      />
                    ))}
                  </Row>
                </Col>
                <Col md={12} lg={8}>
                  <OrderStagesTable />
                </Col>
                <Col md={12} lg={4}>
                  <OrderStageForm />
                </Col>
              </Row>
            </form>
          );
        },
      })}
    </RoundedWhiteBox>
  );
}
