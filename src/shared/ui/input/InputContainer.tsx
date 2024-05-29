import { FC } from "react";
import { InputProps, SelectProps, TextAreaProps, renderInput } from ".";
import styles from "./styles.module.scss";

export const InputContainer: FC<InputProps | TextAreaProps | SelectProps> = ({
  container_style,
  label_style,
  ...props
}) => {
  return (
    <div className={styles["input-container"]} style={container_style}>
      <label htmlFor={props.name} style={label_style}>
        {props.label}
      </label>
      {renderInput(props)}
    </div>
  );
};
