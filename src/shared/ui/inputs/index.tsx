import {
  CSSProperties,
  FC,
  InputHTMLAttributes,
  ReactNode,
  SelectHTMLAttributes,
  TextareaHTMLAttributes,
} from "react";
import styles from "./styles.module.scss";

type BaseProp = {
  name: string;
  label: string;
  label_style?: CSSProperties;
};

type InputContainerProps = BaseProp &
  InputHTMLAttributes<HTMLInputElement> & { variant: "input" };

type TextAreaProps = BaseProp &
  TextareaHTMLAttributes<HTMLTextAreaElement> & { variant: "textarea" };

type SelectProps = BaseProp &
  SelectHTMLAttributes<HTMLSelectElement> & {
    options: Array<[string, string]>;
    variant: "select";
  };

export const InputContainer: FC<
  InputContainerProps | TextAreaProps | SelectProps
> = (props) => {
  const renderInput = (): ReactNode => {
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
  return (
    <div className={styles["input-container"]}>
      <label htmlFor={props.name} style={props.label_style}>
        {props.label}
      </label>
      {renderInput()}
    </div>
  );
};
