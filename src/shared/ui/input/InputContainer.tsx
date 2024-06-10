import { FC } from "react";
import { renderInput } from "./renderInput";
import {
  BootstrapSelectProps,
  InputProps,
  SelectProps,
  TextAreaProps,
} from ".";
import styles from "./styles.module.scss";

export const InputContainer: FC<
  InputProps | TextAreaProps | SelectProps | BootstrapSelectProps
> = ({ container_style, label_style, ...props }) => {
  return (
    <div className={styles["input-container"]} style={container_style}>
      <label htmlFor={props.name} style={label_style}>
        {props.label}
      </label>
      {renderInput(props)}
      {props.error && <div className={styles["error-text"]}>{props.error}</div>}
    </div>
  );
};
