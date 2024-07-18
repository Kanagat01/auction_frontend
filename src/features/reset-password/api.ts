import toast from "react-hot-toast";
import axios, { AxiosError } from "axios";
import { createEffect, createEvent } from "effector";
import { setAuth } from "~/features/authorization";
import { isValidEmail, validatePassword } from "~/shared/lib";
import Routes from "~/shared/routes";
import { API_URL } from "~/shared/config";
import {
  ForgotPasswordRequest,
  ResetPasswordConfirmRequest,
  ResetPasswordConfirmResponse,
} from ".";

const forgotPasswordFx = createEffect<ForgotPasswordRequest, string>(
  async (data) => {
    try {
      const response = await axios.post(
        `${API_URL}/user/auth/reset_password/`,
        data
      );
      return response.data.message;
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.status! > 499) throw "Ошибка на сервере";

        const { message } = error.response?.data;
        if (message) {
          if (typeof message === "object" && message.email)
            throw "Введите правильный адрес электронной почты";
          else if (typeof message === "string" && message === "user_not_found")
            throw "Пользователь с таким email не найден";
          throw message;
        }
      }
      throw "Неизвестная ошибка";
    }
  }
);

export const forgotPassword = createEvent<
  ForgotPasswordRequest & { setSuccess: (state: boolean) => void }
>();
forgotPassword.watch(({ email, setSuccess }) => {
  if (!isValidEmail(email)) {
    toast.error("Неправильный формат email");
    return;
  }
  toast.promise(forgotPasswordFx({ email }), {
    loading: "Отправляем запрос...",
    success: () => {
      setSuccess(true);
      return "Письмо для сброса пароля отправлено";
    },
    error: (err) => `Произошла ошибка: ${err}`,
  });
});

const resetPasswordConfirmFx = createEffect<
  ResetPasswordConfirmRequest,
  ResetPasswordConfirmResponse
>(async ({ token, setIsValidToken, ...data }) => {
  try {
    const response = await axios.post(
      `${API_URL}/user/auth/reset_password_confirm/${token}/`,
      data
    );
    return response.data.message;
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response?.status! > 499) throw "Ошибка на сервере";

      const { message } = error.response?.data;
      if (message) {
        if (typeof message === "string") {
          switch (message) {
            case "passwords_do_not_match":
              throw "Пароли не совпадают";
            case "invalid_token":
              setIsValidToken(false);
              throw "Адрес не существует";
            case "token_expired":
              setIsValidToken(false);
              throw "Ссылка истекла";
            case "user_not_found":
              throw "Пользователь не найден";
          }
        }
        throw message;
      }
    }
    throw "Неизвестная ошибка";
  }
});

export const resetPasswordConfirm = createEvent<
  ResetPasswordConfirmRequest & { navigate: (to: string) => void }
>();
resetPasswordConfirm.watch(({ navigate, ...data }) => {
  if (data.new_password !== data.confirm_password) {
    toast.error("Пароли не совпадают");
    return;
  }

  const passwordError = validatePassword(data.new_password);
  if (passwordError !== "") {
    toast.error(passwordError);
    return;
  }

  toast.promise(resetPasswordConfirmFx(data), {
    loading: "Сбрасываем пароль...",
    success: ({ token }) => {
      localStorage.setItem("token", token);
      setAuth(true);
      navigate(Routes.HOME);
      return "Ваш пароль обновлен";
    },
    error: (err) => `Произошла ошибка: ${err}`,
  });
});
