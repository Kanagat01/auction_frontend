import { ChangeEvent, FormEvent } from "react";
import { useStoreMap } from "effector-react";
import { createStore, createEvent, sample } from "effector";
import { Col } from "react-bootstrap";
import { $mainData } from "~/entities/User";
import { createOrderFx, orderTranslations } from "~/entities/Order";
import { InputContainer } from "~/shared/ui";
import styles from "./styles.module.scss";
import { TStages } from "~/entities/OrderStage";
import toast from "react-hot-toast";

export type TInputs = {
  customer_manager: string;
  start_price: number;
  price_step: number;
  transportation_number: number;
  comments_for_transporter: string;
  additional_requirements: string;
  transport_volume: number;
  temp_mode: string;
  adr: number;
  transport_body_width: number;
  transport_body_length: number;
  transport_body_height: number;

  transport_body_type: number;
  transport_load_type: number;
  transport_unload_type: number;
};

const fieldTypes: { [K in keyof TInputs]: "number" | "text" } = {
  customer_manager: "text",
  start_price: "number",
  price_step: "number",
  transportation_number: "number",
  comments_for_transporter: "text",
  additional_requirements: "text",
  transport_volume: "number",
  temp_mode: "text",
  adr: "number",
  transport_body_width: "number",
  transport_body_length: "number",
  transport_body_height: "number",
  transport_body_type: "number",
  transport_load_type: "number",
  transport_unload_type: "number",
};

const mainData = $mainData.getState();

const $form = createStore<TInputs & { stages: TStages[] }>({
  //@ts-ignore TODO change data
  customer_manager: mainData.company.company_name ?? "",
  start_price: 0,
  price_step: 0,
  transportation_number: Number(Date.now()),
  comments_for_transporter: "",
  additional_requirements: "",
  transport_volume: 0,
  temp_mode: "",
  adr: 0,
  transport_body_width: 0,
  transport_body_length: 0,
  transport_body_height: 0,

  transport_body_type: 0,
  transport_load_type: 0,
  transport_unload_type: 0,
  stages: [],
});

type FieldUpdatePayload = {
  key: keyof TInputs;
  value: string | number;
};
const fieldUpdate = createEvent<FieldUpdatePayload>();

$form.on(fieldUpdate, (form, { key, value }) => ({
  ...form,
  [key]: value,
}));

export const formSubmitted = createEvent<FormEvent>();
formSubmitted.watch((e: FormEvent) => {
  e.preventDefault();
  const formValues = $form.getState();
  let notFilledIn = [];

  for (const key in formValues) {
    if (
      !formValues[key as keyof typeof formValues] ||
      (key === "stages" && formValues.stages.length === 0)
    ) {
      notFilledIn.push(
        orderTranslations[key as keyof typeof orderTranslations]
      );
    }
  }
  if (notFilledIn.length > 0) {
    toast(<span>Заполните обязательные поля: {notFilledIn.join(", ")}</span>, {
      position: "top-right",
      duration: 3000,
      icon: <button onClick={() => toast.dismiss()}>❌</button>,
      style: { fontSize: "1.4rem" },
    });
    return;
  }
});

sample({
  clock: formSubmitted,
  source: $form,
  target: createOrderFx,
});

const handleChange = fieldUpdate.prepend(
  (
    event: ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) =>
    ({
      key: event.target.name,
      value: event.target.value,
    } as FieldUpdatePayload)
);

type SelectFieldProps = {
  name: keyof TInputs;
  label: string;
  options: [string, string][];
};

export const SelectField = ({ name, label, options }: SelectFieldProps) => {
  const value = useStoreMap({
    store: $form,
    keys: [name],
    fn: (values) => values[name] || "",
  });
  return (
    <Col md={4} className="p-0">
      <InputContainer
        {...{ name, label, options, value, onChange: handleChange }}
        variant="select"
        label_style={{
          color: "var(--default-font-color)",
        }}
        className={styles.select}
        size={5}
      />
    </Col>
  );
};

type FieldProps = {
  name: keyof TInputs;
  label: string;
  colNum: 1 | 2 | 3;
  type?: "number" | "string";
};

export const Field = ({ name, label, colNum }: FieldProps) => {
  const value = useStoreMap({
    store: $form,
    keys: [name],
    fn: (values) => values[name] || "",
  });
  switch (colNum) {
    case 1:
      return (
        <InputContainer
          {...{ name, label, value, onChange: handleChange }}
          type={fieldTypes[name]}
          variant="input"
          className={`${styles.input} w-100 mb-3`}
          label_style={{ color: "var(--default-font-color)" }}
          disabled={name === "customer_manager"}
        />
      );
    case 2:
      return (
        <InputContainer
          {...{ name, label, value, onChange: handleChange }}
          variant="textarea"
          className={`${styles.textarea} w-100 mb-0`}
        />
      );
    case 3:
      return (
        <Col md={4} className="p-0 mt-4">
          <InputContainer
            {...{ name, label, value, onChange: handleChange }}
            type={fieldTypes[name]}
            variant="input"
            label_style={{
              color: "var(--default-font-color)",
            }}
            className={`${styles.input} mb-0`}
          />
        </Col>
      );
  }
};
