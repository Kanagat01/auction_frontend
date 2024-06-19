import { FC, InputHTMLAttributes } from "react";
import styles from "./styles.module.scss";

export const Checkbox: FC<
  InputHTMLAttributes<HTMLInputElement> & { label?: string }
> = (props) => {
  return props.label ? (
    <label className="d-flex align-items-center">
      <input
        {...props}
        className={`${styles.checkbox} ${props.className}`}
        type="checkbox"
      />
      {props.label}
    </label>
  ) : (
    <input
      {...props}
      className={`${styles.checkbox} ${props.className}`}
      type="checkbox"
    />
  );
};
