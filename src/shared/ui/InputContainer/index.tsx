import { FC, InputHTMLAttributes } from "react";
import styles from "./styles.module.scss";

type InputContainerProps = {
  name: string;
  label: string;
} & InputHTMLAttributes<HTMLInputElement>;

export const InputContainer: FC<InputContainerProps> = (props) => (
  <div className={styles["input-container"]}>
    <label htmlFor={props.name}>{props.label}</label>
    <input type="text" {...props} />
  </div>
);
