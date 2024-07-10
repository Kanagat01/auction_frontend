import toast from "react-hot-toast";
import axios, { AxiosError } from "axios";
import { createEffect, createEvent } from "effector";
import { apiInstance } from "~/shared/api";
import { setAuth } from "../authorization";
import { API_URL } from "~/shared/config";

export type RegisterCompanyRequest = {
  email: string;
  password: string;
  full_name: string;
  company_name: string;
  user_type: "customer" | "transporter";
};

export type RegisterManagerRequest = Omit<
  RegisterCompanyRequest,
  "company_name" | "user_type"
>;

export type RegisterResponse = { token: string };

const validatePassword = (password: string): string => {
  if (password.length < 8) return "Пароль должен быть не менее 8 символов";
  if (!/[a-z]/.test(password) || !/[A-Z]/.test(password)) {
    return "Пароль должен состоять из больших и маленьких букв";
  }
  if (!/\d/.test(password) || !/[@$!%*?&]/.test(password))
    return "Пароль должен содержать хотя бы одну цифру и специальный знак";
  return "";
};

// register company
const registerCompanyFx = createEffect<
  RegisterCompanyRequest,
  RegisterResponse
>(async ({ user_type, ...data }) => {
  try {
    const response = await axios.post(
      `${API_URL}/user/auth/register_${user_type}/`,
      data
    );
    return response.data.message;
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response?.status! > 499) throw "Ошибка на сервере";

      const { message } = error.response?.data;
      if (message) {
        if (message.email && message.email[0] === "user_already_exists")
          throw "Пользователь с таким email уже существует";
        throw message;
      }
    }
    throw "Неизвестная ошибка";
  }
});

export const registerCompany = createEvent<
  RegisterCompanyRequest & { navigateFunc: () => void }
>();
registerCompany.watch(({ navigateFunc, ...data }) => {
  const errorsList: string[] = [];
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))
    errorsList.push("Неправильный email");

  const passwordError = validatePassword(data.password);
  if (passwordError !== "") errorsList.push(passwordError);

  if (errorsList.length > 0) {
    toast.error(errorsList.join("\n"));
    return;
  }
  toast.promise(registerCompanyFx(data), {
    loading: "Регистрируем аккаунт...",
    success: (message) => {
      localStorage.setItem("token", message.token);
      setAuth(true);
      navigateFunc();
      return "Вы успешно зарегистрированы";
    },
    error: (err) => `Произошла ошибка: ${err}`,
  });
});

// register manager
export const registerManagerFx = createEffect<
  RegisterManagerRequest,
  RegisterResponse,
  AxiosError
>(async (data: RegisterManagerRequest) => {
  const response = await apiInstance.post(
    "/user/common/register_manager/",
    data
  );
  return response.data.token;
});
