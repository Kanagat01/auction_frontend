export enum UserTypes {
  customer_company = "Заказчик (компания)",
  customer_manager = "Заказчик (менеджер)",
  transporter_company = "Перевозчик (компания)",
  transporter_manager = "Перевозчик (менеджер)",
  order_viewer = "Просмотрщик заказов",
  driver = "Водитель",
  super_admin = "Супер админ",
}

export type TUserType = keyof typeof UserTypes;

export type TUser = {
  id: number;
  email: string;
  full_name: string;
  user_type: TUserType;
  blocked?: boolean;
};
