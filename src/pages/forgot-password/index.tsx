import FormPage from "~/shared/ui/FormPage";
import RoundedInput from "~/shared/ui/RoundedInput";
import styles from "./styles.module.scss";

const ForgotPasswordPage: React.FC = () => {
  return (
    <FormPage
      title="Название"
      buttonText="Войти"
      inputGroup={<RoundedInput placeholder="Номер телефона" />}
    >
      <span className={styles["forgot-password-text"]}>
        Для восстановления пароля введите Ваш адрес электронной почты.
      </span>
    </FormPage>
  );
};

export default ForgotPasswordPage;
