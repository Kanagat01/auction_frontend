import FormPage from "~/shared/ui/FormPage";
import RoundedInputGroup from "~/shared/ui/RoundedInputGroup";
import styles from "./styles.module.scss";

function ForgotPassword() {
  return (
    <FormPage title="Название" buttonText="Войти">
      <span className={styles["forgot-password-text"]}>
        Для восстановления пароля введите <br /> Ваш адрес электронной почты
      </span>
      <RoundedInputGroup>
        <RoundedInputGroup.Input placeholder="Номер телефона" />
      </RoundedInputGroup>
    </FormPage>
  );
}
export default ForgotPassword;
