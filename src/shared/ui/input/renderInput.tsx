import { ReactNode, useState } from "react";
import { Form } from "react-bootstrap";
import {
  BootstrapSelectProps,
  InputProps,
  SelectProps,
  TextAreaProps,
} from "./types";
import styles from "./styles.module.scss";
import { BsEye, BsEyeSlash } from "react-icons/bs";

export const renderInput = (
  props: InputProps | TextAreaProps | SelectProps | BootstrapSelectProps
): ReactNode => {
  switch (props.variant) {
    case "password-input":
      const [showPassword, setShowPassword] = useState<boolean>(false);
      return (
        <div className={styles["password-input"]}>
          <input
            id={props.name}
            {...props}
            type={showPassword ? "text" : "password"}
          />
          <span
            className={styles.hidePasswordBtn}
            onClick={() => {
              setShowPassword(!showPassword);
            }}
          >
            {showPassword ? <BsEyeSlash /> : <BsEye />}
          </span>
        </div>
      );
    case "input":
      return <input id={props.name} {...props} />;
    case "textarea":
      return <textarea id={props.name} {...props}></textarea>;
    case "select":
      return (
        <select id={props.name} {...props}>
          <option hidden disabled></option>
          {props.options.map(([value, option]) => (
            <option key={value} value={value}>
              {option}
            </option>
          ))}
        </select>
      );
    case "bootstrap-select":
      return (
        <Form.Select id={props.name} {...props}>
          {props.options.map(([value, option]) => (
            <option key={value} value={value}>
              {option}
            </option>
          ))}
        </Form.Select>
      );
  }
};
