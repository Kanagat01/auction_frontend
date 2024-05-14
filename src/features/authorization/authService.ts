import axios from "axios";
import { API_URL } from "~/shared/config";
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
    console.error(error);
    if (axios.isAxiosError(error)) {
      switch (error.response?.status) {
        case 400:
          return "Неверный запрос";
        case 401:
          return "Неверные учетные данные";
        case 403:
          return "Доступ запрещен";
        case 404:
          return "Пользователь не найден";
        case 500:
          return "Внутренняя ошибка сервера";
        default:
          return "Неизвестная ошибка";
      }
    }
    return "Неизвестная ошибка";
  }
};

export const logout = () => {
  localStorage.removeItem("token");
  setAuth(false);
};
