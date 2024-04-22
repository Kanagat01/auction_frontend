import { FC, ReactNode } from "react";
import { InputContainerProps, SelectProps, TextAreaProps } from "./types";
import styles from "./styles.module.scss";

const renderInput = (
  props: InputContainerProps | TextAreaProps | SelectProps
): ReactNode => {
  switch (props.variant) {
    case "input":
      return <input type="text" {...props} />;
    case "textarea":
      return <textarea {...props}></textarea>;
    case "select":
      return (
        <select {...props}>
          {props.options.map(([value, option]) => (
            <option value={value} key={value}>
              {option}
            </option>
          ))}
        </select>
      );
  }
};

export const InputContainer: FC<
  InputContainerProps | TextAreaProps | SelectProps
> = (props) => {
  return (
    <div className={styles["input-container"]}>
      <label htmlFor={props.name} style={props.label_style}>
        {props.label}
      </label>
      {renderInput(props)}
    </div>
  );
};

export const EditField: FC<InputContainerProps | TextAreaProps> = (props) => {
  return (
    <div className={styles["edit-field"]}>
      <label htmlFor={props.name} style={props.label_style}>
        {props.label}
      </label>
      {renderInput(props)}
    </div>
  );
};
