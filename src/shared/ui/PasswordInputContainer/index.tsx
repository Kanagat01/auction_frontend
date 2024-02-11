import React from "react";
import RoundedInput from "~/shared/ui/RoundedInput";
import styles from "./styles.module.scss";

export default function PasswordInputContainer(): React.ReactElement {
  return (
    <div className={styles["password-input-container"]}>
      <RoundedInput placeholder="Пароль" />
      <span className={styles["hide-btn"]}></span>
    </div>
  );
}
