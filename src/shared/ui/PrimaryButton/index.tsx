import React, { ButtonHTMLAttributes } from "react";
import styles from "./styles.module.scss";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {}

export default function PrimaryButton({
  children,
  ...props
}: Props): React.ReactElement {
  return (
    <button className={styles["primary-btn"]} {...props}>
      {children}
    </button>
  );
}
