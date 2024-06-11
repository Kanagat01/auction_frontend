export type TInputs = {
  customer_manager: string;
  start_price: number;
  price_step: number;
  transportation_number: number;
  comments_for_transporter: string;
  additional_requirements: string;
  transport_volume: number;
  temp_mode: string;
  adr: number;
  transport_body_width: number;
  transport_body_length: number;
  transport_body_height: number;

  transport_body_type: number;
  transport_load_type: number;
  transport_unload_type: number;
};

export type FieldUpdatePayload = {
  key: keyof TInputs;
  value: string | number;
};

export type SelectFieldProps = {
  name: keyof TInputs;
  options: [string, string][];
};

export type FieldProps = {
  name: keyof TInputs;
  colNum: 1 | 2 | 3;
  type?: "number" | "string";
};
