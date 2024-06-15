import { useUnit } from "effector-react";
import { Col, Row } from "react-bootstrap";
import { OrderStageForm } from "~/widgets";
import {
  $newOrder,
  Field,
  SelectField,
  clearForm,
  formSubmitted,
} from "~/entities/Order";
import { getOrderStagesFx, OrderStagesTable } from "~/entities/OrderStage";
import { RoundedWhiteBox, TitleLg } from "~/shared/ui";
import { renderPromise } from "~/shared/api";
import { logger } from "~/shared/config";
import styles from "./styles.module.scss";

function mapResponseToOptions(responseProperty: any[]): [string, string][] {
  return responseProperty.map((el) => [el.id.toString(), el.name]);
}

export default function NewOrder() {
  const newOrder = useUnit($newOrder);
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
            <form onSubmit={formSubmitted} onReset={clearForm}>
              <Row className="p-4">
                <Col md={6} lg={3} className="mb-4">
                  <div className={styles.title}>Заказчик</div>
                  <Field name="customer_manager" colNum={1} />
                  <Field name="start_price" colNum={1} />
                  <Field name="price_step" colNum={1} />
                  <Field name="transportation_number" colNum={1} />
                </Col>
                <Col md={6} lg={4} className="mb-4">
                  <div className={styles.title}>Дополнительно</div>
                  <div className={styles.secondCol}>
                    <Field name="comments_for_transporter" colNum={2} />
                    <Field name="additional_requirements" colNum={2} />
                  </div>
                </Col>
                <Col md={12} lg={5} className="mb-4">
                  <div className={styles.title}>Транспорт</div>
                  <Row>
                    <SelectField
                      name="transport_body_type"
                      options={mapResponseToOptions(
                        response.transport_body_types
                      )}
                    />
                    <SelectField
                      name="transport_load_type"
                      options={mapResponseToOptions(
                        response.transport_load_types
                      )}
                    />
                    <SelectField
                      name="transport_unload_type"
                      options={mapResponseToOptions(
                        response.transport_unload_types
                      )}
                    />
                  </Row>
                  <Row>
                    <Field name="transport_volume" colNum={3} />
                    <Field name="temp_mode" colNum={3} />
                    <Field name="adr" colNum={3} />
                    <Field name="transport_body_width" colNum={3} />
                    <Field name="transport_body_length" colNum={3} />
                    <Field name="transport_body_height" colNum={3} />
                  </Row>
                </Col>
                <Col md={12} lg={8}>
                  <OrderStagesTable orderStages={newOrder.stages} />
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
