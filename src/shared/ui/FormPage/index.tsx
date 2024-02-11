import React from "react";
import PrimaryButton from "~/shared/ui/PrimaryButton";
import styles from "./styles.module.scss";

interface Props {
  title: string;
  children: React.ReactNode;
  buttonText: string;
}

const FormPage: React.FC<Props> = ({ title, children, buttonText }) => {
  return (
    <div className={styles["login-page"]}>
      <form className={styles["login-form"]}>
        <span className={styles["login-title"]}>{title}</span>
        {children}
        <PrimaryButton type="submit">{buttonText}</PrimaryButton>
      </form>
    </div>
  );
};

export default FormPage;
