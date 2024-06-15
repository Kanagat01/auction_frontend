import { ChangeEvent } from "react";
import { Col } from "react-bootstrap";
import { useStoreMap } from "effector-react";
import {
  $newOrder,
  FieldProps,
  FieldUpdatePayload,
  SelectFieldProps,
  fieldUpdate,
  initialOrder,
  orderTranslations,
} from "~/entities/Order";
import { InputContainer } from "~/shared/ui";
import styles from "./styles.module.scss";

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
    store: $newOrder,
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
    store: $newOrder,
    keys: [name],
    fn: (values) => values[name] || "",
  });
  const label = orderTranslations[name];
  switch (colNum) {
    case 1:
      return (
        <InputContainer
          {...{ name, label, value, onChange: handleChange }}
          type={typeof initialOrder[name] === "number" ? "number" : "string"}
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
            type={typeof initialOrder[name] === "number" ? "number" : "string"}
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
