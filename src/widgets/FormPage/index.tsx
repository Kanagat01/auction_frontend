import React from "react";
import { PrimaryButton } from "~/shared/ui";
import styles from "./styles.module.scss";

interface Props {
  title: string;
  children: React.ReactNode;
  buttonText: string;
  isLoginPage?: boolean;
}

export const FormPage: React.FC<Props> = ({
  title,
  children,
  buttonText,
  isLoginPage = false,
}) => {
  return (
    <div className={styles["login-page"]}>
      <form className={styles["login-form"]}>
        <span className={styles["login-title"]}>{title}</span>
        {children}
        <PrimaryButton type="submit">{buttonText}</PrimaryButton>
        {isLoginPage ? <a href="/forgot-password">Забыли пароль?</a> : ""}
      </form>
    </div>
  );
};
