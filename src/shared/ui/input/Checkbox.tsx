import { FC, HTMLProps, InputHTMLAttributes, useEffect, useRef } from "react";
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
export function IndeterminateCheckbox({
  indeterminate,
  text,
  ...rest
}: { indeterminate?: boolean; text?: string } & HTMLProps<HTMLInputElement>) {
  const ref = useRef<HTMLInputElement>(null!);

  useEffect(() => {
    if (ref.current && typeof indeterminate === "boolean") {
      ref.current.indeterminate = !rest.checked && indeterminate;
    }
  }, [ref, indeterminate]);

  return text ? (
    <label className="d-flex align-items-center">
      <Checkbox ref={ref} {...rest} />
      {text}
    </label>
  ) : (
    <Checkbox ref={ref} {...rest} />
  );
}
