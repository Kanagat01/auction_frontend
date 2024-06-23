import {
  CSSProperties,
  InputHTMLAttributes,
  SelectHTMLAttributes,
  TextareaHTMLAttributes,
} from "react";
import { FormSelectProps } from "react-bootstrap";

export type BaseProp = {
  name: string;
  label: string;
  label_style?: CSSProperties;
  container_style?: CSSProperties;
  error?: string;
};

export type InputProps = BaseProp &
  InputHTMLAttributes<HTMLInputElement> & {
    variant: "input";
  };

export type TextAreaProps = BaseProp &
  TextareaHTMLAttributes<HTMLTextAreaElement> & {
    variant: "textarea";
  };

export type SelectProps = BaseProp &
  SelectHTMLAttributes<HTMLSelectElement> & {
    options: Array<[string | number, string | number]>;
    variant: "select";
  };

export type BootstrapSelectProps = BaseProp &
  FormSelectProps & {
    options: Array<[string | number, string | number]>;
    variant: "bootstrap-select";
  };
