import { Col, Row } from "react-bootstrap";
import { createOrder } from "~/entities/Order";
import {
  getOrderStagesFx,
  OrderStageForm,
  OrderStagesTable,
} from "~/entities/OrderStage";
import { RoundedWhiteBox, TitleLg } from "~/shared/ui";
import { renderPromise } from "~/shared/api";
import { logger } from "~/shared/config";
import {
  getSelects,
  useAdditionalInputs,
  useCustomerInputs,
  useTransportInputs,
} from "./inputs";
import styles from "./styles.module.scss";

export default function NewOrder() {
  const customerInputs = useCustomerInputs();
  const additionalInputs = useAdditionalInputs();
  const transportInputs = useTransportInputs();
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
            <form onSubmit={createOrder}>
              <Row className="p-4">
                <Col md={6} lg={3} className="mb-4">
                  <div className={styles.title}>Заказчик</div>
                  {customerInputs}
                </Col>
                <Col md={6} lg={4} className="mb-4">
                  <div className={styles.title}>Дополнительно</div>
                  <div className={styles.secondCol}>{additionalInputs}</div>
                </Col>
                <Col md={12} lg={5} className="mb-4">
                  <div className={styles.title}>Транспорт</div>
                  <Row>
                    {getSelects(response)}
                    {transportInputs}
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
      })}{" "}
    </RoundedWhiteBox>
  );
}
