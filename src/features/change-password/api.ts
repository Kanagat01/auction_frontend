import { attach, createEvent, Effect } from "effector";
import { ChangePasswordRequest, ChangePasswordResponse } from "./types";
import { apiRequestFx, RequestParams } from "~/shared/api";
import { validatePassword } from "~/shared/lib";
import toast from "react-hot-toast";

const changePasswordFx: Effect<ChangePasswordRequest, ChangePasswordResponse> =
  attach({
    effect: apiRequestFx,
    mapParams: (data: ChangePasswordRequest): RequestParams => ({
      method: "post",
      url: "/user/common/change_password/",
      data,
    }),
  });

export const changePassword = createEvent<
  ChangePasswordRequest & { onSuccess: () => void }
>();
changePassword.watch(({ onSuccess, ...data }) => {
  const passwordValidation = validatePassword(data.new_password);
  if (passwordValidation !== "") {
    toast.error(passwordValidation);
    return;
  } else if (data.new_password !== data.repeat_password) {
    toast.error("Пароли не совпадают");
    return;
  }
  toast.promise(changePasswordFx(data), {
    loading: "Обновляем пароль...",
    success: ({ token }) => {
      localStorage.setItem("token", token);
      onSuccess();
      return "Пароль успешно обновлен";
    },
    error: (err) => {
      if (err === "wrong_password") return "Неправильный текущий пароль";
      else if (err === "passwords_do_not_match") return "Пароли не совпадают";
      return `Произошла ошибка: ${err}`;
    },
  });
});
