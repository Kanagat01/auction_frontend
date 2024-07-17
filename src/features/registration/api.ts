import toast from "react-hot-toast";
import axios, { AxiosError } from "axios";
import { attach, createEffect, createEvent, Effect } from "effector";
import { setAuth } from "~/features/authorization";
import {
  $mainData,
  setMainData,
  CustomerCompany,
  CustomerManager,
} from "~/entities/User";
import { API_URL } from "~/shared/config";
import { apiRequestFx, RequestParams } from "~/shared/api";
import { isValidEmail, validatePassword } from "~/shared/lib";
import {
  RegisterCompanyRequest,
  RegisterManagerRequest,
  RegisterResponse,
} from ".";

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
  if (!isValidEmail(data.email)) errorsList.push("Неправильный формат email");

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
const registerManagerFx: Effect<
  RegisterManagerRequest,
  Omit<CustomerManager, "company">
> = attach({
  effect: apiRequestFx,
  mapParams: (data: RegisterManagerRequest): RequestParams => ({
    method: "post",
    url: "/user/common/register_manager/",
    data,
  }),
});

export const registerManager = createEvent<
  RegisterManagerRequest & { repeat_password: string; onSuccess: () => void }
>();
registerManager.watch(({ repeat_password, onSuccess, ...data }) => {
  const passwordValidation = validatePassword(data.password);
  if (passwordValidation !== "") {
    toast.error(passwordValidation);
    return;
  } else if (data.password !== repeat_password) {
    toast.error("Пароли не совпадают");
    return;
  } else if (!isValidEmail(data.email)) {
    toast.error("Неправильный формат email");
    return;
  }
  toast.promise(registerManagerFx(data), {
    loading: "Регистрируем менеджера",
    success: (manager) => {
      const prevState = $mainData.getState() as CustomerCompany;
      setMainData({ ...prevState, managers: [...prevState.managers, manager] });
      onSuccess();
      return "Менеджер успешно зарегистрирован";
    },
    error: (err) => {
      if (err.email && err.email[0] === "user_already_exists")
        return "Пользователь с таким email уже существует";
      return `Произошла ошибка: ${err}`;
    },
  });
});
