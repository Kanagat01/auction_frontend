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
> = ({ label, label_style, container_style, ...props }) => {
  return (
    <div
      className={`${styles["input-container"]} position-relative`}
      style={container_style}
    >
      {label && (
        <label htmlFor={props.id ? props.id : props.name} style={label_style}>
          {label}
        </label>
      )}
      {renderInput(props)}
    </div>
  );
};
