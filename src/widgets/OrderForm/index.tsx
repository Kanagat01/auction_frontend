import { Col, Row } from "react-bootstrap";
import { useUnit } from "effector-react";
import {
  $orderForm,
  clearForm,
  orderFormSubmitted,
  OrderStagesTable,
  TInputs,
  OrderStageForm,
} from "~/features/create-order";
import { PreCreateOrderResponse } from "~/entities/OrderStage";
import { Field, SelectField } from "./inputs";
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

export function OrderForm(preCreateOrder: PreCreateOrderResponse) {
  const order = useUnit($orderForm);
  return (
    <form
      className="p-4"
      onSubmit={orderFormSubmitted}
      onReset={clearForm as () => void}
    >
      <Row>
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
              value={order.comments_for_transporter ?? ""}
              colNum={2}
            />
            <Field
              name="additional_requirements"
              value={order.additional_requirements ?? ""}
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
                preCreateOrder.transport_body_types
              )}
            />
            <SelectField
              name="transport_load_type"
              value={order.transport_load_type as number}
              options={mapResponseToOptions(
                preCreateOrder.transport_load_types
              )}
            />
            <SelectField
              name="transport_unload_type"
              value={order.transport_unload_type as number}
              options={mapResponseToOptions(
                preCreateOrder.transport_unload_types
              )}
            />
          </Row>
          <Row>
            {inputNamesCol3.map((name) => (
              <Field
                key={name}
                name={name}
                value={order[name] ?? ""}
                colNum={3}
              />
            ))}
          </Row>
        </Col>
        <Col lg={8} md={12}>
          <OrderStagesTable orderStages={order.stages} />
        </Col>
        <Col lg={4} md={12}>
          <div className="ms-3">
            <OrderStageForm />
          </div>
        </Col>
      </Row>
    </form>
  );
}
