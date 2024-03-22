import React from "react";
import { Button } from "~/shared/ui";
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
        <Button type="submit">{buttonText}</Button>
        {isLoginPage ? <a href="/forgot-password">Забыли пароль?</a> : ""}
      </form>
    </div>
  );
};
