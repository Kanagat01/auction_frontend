export enum UserTypes {
  customer_company = "Заказчик (компания)",
  customer_manager = "Заказчик (менеджер)",
  transporter_company = "Перевозчик (компания)",
  transporter_manager = "Перевозчик (менеджер)",
  driver = "Водитель",
  // super_admin = "Супер админ",
}

export type TUserType = keyof typeof UserTypes;

export type TUser = {
  user_id: number;
  email: string;
  user_type: TUserType;
  full_name: string;
};

export const getRole = (userType: TUserType | "") =>
  ["customer_manager", "customer_company"].includes(userType)
    ? "customer"
    : "transporter";
