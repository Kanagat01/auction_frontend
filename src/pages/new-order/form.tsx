import { ChangeEvent, FormEvent } from "react";
import toast from "react-hot-toast";
import { Col } from "react-bootstrap";
import { useStoreMap } from "effector-react";
import { createStore, createEvent, sample } from "effector";

import { $mainData } from "~/entities/User";
import { createOrderFx, orderTranslations } from "~/entities/Order";
import { TStages } from "~/entities/OrderStage";
import { InputContainer } from "~/shared/ui";

import styles from "./styles.module.scss";
import {
  FieldProps,
  FieldUpdatePayload,
  SelectFieldProps,
  TInputs,
} from "./types";

const mainData = $mainData.getState();
const initialState = {
  customer_manager: mainData?.user.full_name ?? "",
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
};

export const $form = createStore<TInputs & { stages: TStages[] }>(initialState);

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

const fieldUpdate = createEvent<FieldUpdatePayload>();

$form.on(fieldUpdate, (form, { key, value }) => ({
  ...form,
  [key]: value,
}));

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

export const SelectField = ({ name, options }: SelectFieldProps) => {
  const value = useStoreMap({
    store: $form,
    keys: [name],
    fn: (values) => values[name] || "",
  });
  const label = orderTranslations[name];
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

export const Field = ({ name, colNum }: FieldProps) => {
  const value = useStoreMap({
    store: $form,
    keys: [name],
    fn: (values) => values[name] || "",
  });
  const label = orderTranslations[name];
  switch (colNum) {
    case 1:
      return (
        <InputContainer
          {...{ name, label, value, onChange: handleChange }}
          type={typeof initialState[name] === "number" ? "number" : "string"}
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
            type={typeof initialState[name] === "number" ? "number" : "string"}
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
