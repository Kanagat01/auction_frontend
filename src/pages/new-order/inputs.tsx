import { Col } from "react-bootstrap";
import { useUnit } from "effector-react";
import { $mainData } from "~/entities/User";
import { PreCreateOrderResponse } from "~/entities/OrderStage/";
import { InputContainer, InputProps, TextAreaProps } from "~/shared/ui";
import styles from "./styles.module.scss";

export function useCustomerInputs() {
  const mainData = useUnit($mainData);
  const customerInputs: InputProps[] = [
    {
      variant: "input",
      name: "customer_manager",
      label: "Заказчик",
      //@ts-expect-error   TODO
      value: mainData?.company.company_name,
      readOnly: true,
    },
    {
      variant: "input",
      name: "contact_person",
      label: "Контактное лицо",
      value: mainData?.user.full_name,
      readOnly: true,
    },
    {
      variant: "input",
      name: "start_price",
      label: "Стартовая цена",
      placeholder: "10000",
      required: true,
    },
    {
      variant: "input",
      name: "price_step",
      label: "Шаг цены",
      placeholder: "1000",
      required: true,
    },
    {
      variant: "input",
      name: "transportation_number",
      label: "№ Транспортировки",
      value: Date.now().toString(),
      onChange: () => {},
      placeholder: "00000000",
      required: true,
    },
  ];
  const customerInputsComp = customerInputs.map(
    (props: InputProps, key: number) => (
      <InputContainer
        key={key}
        {...props}
        label_style={{ color: "var(--default-font-color)" }}
        className={`${styles.input} w-100 mb-3`}
      />
    )
  );
  return customerInputsComp;
}

export function useAdditionalInputs() {
  const additionalInputs: Omit<TextAreaProps, "variant">[] = [
    {
      name: "comments_for_transporter",
      label: "Комментарий для перевозчиков",
      required: true,
    },
    {
      name: "additional_requirements",
      label: "Доп. требования",
      required: true,
    },
  ];
  const additionalInputsComp = additionalInputs.map((props, key) => (
    <InputContainer
      key={key}
      {...props}
      variant="textarea"
      className={`${styles.textarea} w-100 mb-0`}
    />
  ));
  return additionalInputsComp;
}

export function useTransportInputs() {
  const transportInputs: Omit<InputProps, "variant">[] = [
    { name: "transport_volume", label: "ТС, м3" },
    { name: "temp_mode", label: "Темп. режим" },
    { name: "adr", label: "ADR [шт.]" },
    { name: "transport_body_width", label: "Ширина кузова" },
    { name: "transport_body_length", label: "Длина кузова" },
    { name: "transport_body_height", label: "Высота кузова" },
  ];
  const transportInputsComp = transportInputs.map((props, idx) => (
    <Col key={idx} md={4} className="p-0 mt-4">
      <InputContainer
        variant="input"
        label_style={{ color: "var(--default-font-color)" }}
        className={`${styles.input} mb-0`}
        required
        {...props}
      />
    </Col>
  ));
  return transportInputsComp;
}

export function getSelects(response: PreCreateOrderResponse) {
  function mapResponseToOptions(responseProperty: any[]): [string, string][] {
    return responseProperty.map((el) => [el.id.toString(), el.name]);
  }
  return [
    {
      name: "transport_body_type",
      label: "Тип кузова",
      options: mapResponseToOptions(response.transport_body_types),
    },
    {
      name: "transport_load_type",
      label: "Загрузка",
      options: mapResponseToOptions(response.transport_load_types),
    },
    {
      name: "transport_unload_type",
      label: "Выгрузка",
      options: mapResponseToOptions(response.transport_unload_types),
    },
  ].map((props, idx) => (
    <Col key={idx} md={4} className="p-0">
      <InputContainer
        variant="select"
        label_style={{ color: "var(--default-font-color)" }}
        className={styles.select}
        multiple={true}
        size={5}
        required
        {...props}
      />
    </Col>
  ));
}
