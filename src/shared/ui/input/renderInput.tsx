import { ReactNode } from "react";
import { Form } from "react-bootstrap";
import {
  BootstrapSelectProps,
  InputProps,
  SelectProps,
  TextAreaProps,
} from "./types";

export const renderInput = (
  props: InputProps | TextAreaProps | SelectProps | BootstrapSelectProps
): ReactNode => {
  switch (props.variant) {
    case "input":
      return <input {...props} />;
    case "textarea":
      return <textarea {...props}></textarea>;
    case "select":
      return (
        <select {...props}>
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
        <Form.Select {...props}>
          {props.options.map(([value, option]) => (
            <option key={value} value={value}>
              {option}
            </option>
          ))}
        </Form.Select>
      );
  }
};
