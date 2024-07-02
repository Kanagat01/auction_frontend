import axios from "axios";
import { API_URL, logger } from "~/shared/config";
import { setAuth } from "./authStore";

export const login = async (
  email: string,
  password: string
): Promise<string> => {
  try {
    const response = await axios.post(`${API_URL}/user/auth/login/`, {
      email,
      password,
    });
    localStorage.setItem("token", response.data.message.token);
    setAuth(true);
    return response.data.status;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      switch (error.response?.status) {
        case 401:
          throw "Неверные учетные данные";
        case 403:
          throw "Доступ запрещен";
        case 404:
          throw "Пользователь не найден";
        case 500:
          throw "Внутренняя ошибка сервера";
      }
      switch (error.response?.data.message) {
        case "invalid_credentials":
          throw "Неверный логин или пароль";
        case "user_blocked":
          throw "Пользователь заблокирован";
      }
    }
    logger.error(error);
    throw "Неизвестная ошибка";
  }
};

export const logout = () => {
  localStorage.removeItem("token");
  setAuth(false);
};
