import { FC, InputHTMLAttributes } from "react";
import styles from "./styles.module.scss";

export const Checkbox: FC<InputHTMLAttributes<HTMLInputElement>> = (props) => {
  return (
    <input
      {...props}
      className={`${styles.checkbox} ${props.className}`}
      type="checkbox"
    />
  );
};
