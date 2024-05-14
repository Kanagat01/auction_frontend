import { FC, InputHTMLAttributes, ReactNode, useState } from "react";
import styles from "./styles.module.scss";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}

const RoundedInput: FC<InputProps> = ({ error, ...props }) => {
  return (
    <div className={styles["input-container"]}>
      <input
        type="text"
        className={`${styles["rounded-input"]} ${
          error ? styles["input-error"] : ""
        }`}
        {...props}
      />
      {error && <div className={styles["error-message"]}>{error}</div>}
    </div>
  );
};

const PasswordInput: FC<InputProps> = (props) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className={styles["password-input-container"]}>
      <RoundedInput
        placeholder="Пароль"
        type={showPassword ? "text" : "password"}
        {...props}
      />
      <span
        className={styles["hide-btn"]}
        onClick={() => {
          setShowPassword(!showPassword);
        }}
      ></span>
    </div>
  );
};

interface GroupProps {
  children: ReactNode;
}

const Group: FC<GroupProps> = ({ children }) => {
  return <div className={styles["input-group"]}>{children}</div>;
};

export const RoundedInputGroup: FC<GroupProps> & {
  Input: typeof RoundedInput;
  PasswordInput: typeof PasswordInput;
} = ({ children }) => {
  return <Group>{children}</Group>;
};

RoundedInputGroup.Input = RoundedInput;
RoundedInputGroup.PasswordInput = PasswordInput;
