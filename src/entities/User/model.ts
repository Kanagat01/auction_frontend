export type TUser = {
  email: string;
  full_name: string;
  user_type: TUserType;
  blocked?: boolean;
};
