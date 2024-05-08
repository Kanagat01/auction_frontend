import { FC } from "react";
import { InputProps, SelectProps, TextAreaProps } from "./types";
import { renderInput } from ".";
import styles from "./styles.module.scss";

export const InputContainer: FC<InputProps | TextAreaProps | SelectProps> = (
  props
) => {
  return (
    <div className={styles["input-container"]} style={props.container_style}>
      <label htmlFor={props.name} style={props.label_style}>
        {props.label}
      </label>
      {renderInput(props)}
    </div>
  );
};
