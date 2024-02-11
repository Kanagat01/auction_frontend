import React, { InputHTMLAttributes } from "react";
import styles from "./styles.module.scss";

interface Props extends InputHTMLAttributes<HTMLInputElement> {}

export default function RoundedInput(props: Props): React.ReactElement {
  return <input type="text" className={styles["rounded-input"]} {...props} />;
}
