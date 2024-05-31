import { FC } from "react";
import { InputProps, TextAreaProps } from "./types";
import { renderInput } from "./renderInput";
import styles from "./styles.module.scss";

export const EditField: FC<InputProps | TextAreaProps> = (props) => {
  return (
    <div className={styles["edit-field"]}>
      <label htmlFor={props.name} style={props.label_style}>
        {props.label}
      </label>
      {renderInput(props)}
    </div>
  );
};
