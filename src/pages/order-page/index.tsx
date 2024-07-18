import { useUnit } from "effector-react";
import { Col, Row } from "react-bootstrap";
import { Navigate } from "react-router-dom";
import { OrderStageForm } from "~/widgets";
import {
  $orderForm,
  Field,
  SelectField,
  TInputs,
  clearForm,
  orderFormSubmitted,
} from "~/entities/Order";
import { getOrderStagesFx, OrderStagesTable } from "~/entities/OrderStage";
import { RoundedWhiteBox, TitleLg } from "~/shared/ui";
import { renderPromise } from "~/shared/api";
import { logger } from "~/shared/config";
import Routes from "~/shared/routes";
import styles from "./styles.module.scss";

function mapResponseToOptions(
  responseProperty: { id: number; name: string }[]
): [string, string][] {
  return responseProperty.map((el) => [el.id.toString(), el.name]);
}

const inputNamesCol1: (keyof TInputs)[] = [
  "customer_manager",
  "transportation_number",
  "start_price",
  "price_step",
];

const inputNamesCol3: (keyof TInputs)[] = [
  "transport_volume",
  "temp_mode",
  "adr",
  "transport_body_width",
  "transport_body_length",
  "transport_body_height",
];

export default function OrderPage() {
  const order = useUnit($orderForm);
  return order ? (
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
            <form
              onSubmit={orderFormSubmitted}
              onReset={clearForm as () => void}
            >
              <Row className="p-4">
                <Col md={6} lg={3} className="mb-4">
                  <div className={styles.title}>Заказчик</div>
                  {inputNamesCol1.map((name) => (
                    <Field
                      key={name}
                      name={name}
                      value={order[name] as string | number}
                      colNum={1}
                    />
                  ))}
                </Col>
                <Col md={6} lg={4} className="mb-4">
                  <div className={styles.title}>Дополнительно</div>
                  <div className={styles.secondCol}>
                    <Field
                      name="comments_for_transporter"
                      value={order.comments_for_transporter}
                      colNum={2}
                    />
                    <Field
                      name="additional_requirements"
                      value={order.additional_requirements}
                      colNum={2}
                    />
                  </div>
                </Col>
                <Col md={12} lg={5} className="mb-4">
                  <div className={styles.title}>Транспорт</div>
                  <Row>
                    <SelectField
                      name="transport_body_type"
                      value={order.transport_body_type as number}
                      options={mapResponseToOptions(
                        response.transport_body_types
                      )}
                    />
                    <SelectField
                      name="transport_load_type"
                      value={order.transport_load_type as number}
                      options={mapResponseToOptions(
                        response.transport_load_types
                      )}
                    />
                    <SelectField
                      name="transport_unload_type"
                      value={order.transport_unload_type as number}
                      options={mapResponseToOptions(
                        response.transport_unload_types
                      )}
                    />
                  </Row>
                  <Row>
                    {inputNamesCol3.map((name) => (
                      <Field
                        key={name}
                        name={name}
                        value={order[name] as string | number}
                        colNum={3}
                      />
                    ))}
                  </Row>
                </Col>
                <Col md={12} lg={8}>
                  <OrderStagesTable orderStages={order.stages} />
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
  ) : (
    <Navigate to={Routes.ORDERS_BEING_EXECUTED} replace />
  );
}
