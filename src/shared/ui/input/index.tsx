import { ReactNode } from "react";
import { InputProps, SelectProps, TextAreaProps } from "./types";

export * from "./EditField";
export * from "./InputContainer";
export * from "./RoundedInputGroup";
export * from "./SearchInput";
export * from "./Checkbox";

export const renderInput = (
  props: InputProps | TextAreaProps | SelectProps
): ReactNode => {
  switch (props.variant) {
    case "input":
      return <input type="text" {...props} />;
    case "textarea":
      return <textarea {...props}></textarea>;
    case "select":
      return (
        <select {...props}>
          {props.options.map(([value, option]) => (
            <option value={value} key={value}>
              {option}
            </option>
          ))}
        </select>
      );
  }
};
