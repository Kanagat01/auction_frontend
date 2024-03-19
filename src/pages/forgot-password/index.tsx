import { FormPage } from "~/widgets";
import { RoundedInputGroup } from "~/shared/ui";
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
