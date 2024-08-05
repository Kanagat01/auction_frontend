import toast from "react-hot-toast";
import { attach, createEvent, Effect } from "effector";
import { apiRequestFx, RequestParams } from "~/shared/api";
import { isValidEmail } from "~/shared/lib";
import { $mainData, setMainData } from ".";
import { CustomerCompany } from "..";

export type EditUserRequest = {
  full_name: string;
  email: string;
  company_name?: string;
  details?: string;
};

export const editUserFx: Effect<EditUserRequest, string> = attach({
  effect: apiRequestFx,
  mapParams: (data): RequestParams => ({
    method: "post",
    url: "/user/common/edit_user/",
    data,
  }),
});

export const editUser = createEvent<
  EditUserRequest & { setIsEditing: (state: boolean) => void }
>();
editUser.watch(({ setIsEditing, ...data }) => {
  if (!isValidEmail(data.email)) {
    toast.error("Неправильный формат email");
    return;
  }
  const state = $mainData.getState();
  if (
    data.email === state?.user.email &&
    data.full_name === state.user.full_name &&
    (!("company_name" in state) || state.company_name === data.company_name)
  ) {
    toast.error("Вы не изменили ни одно поле");
    return;
  }
  toast.promise(
    editUserFx({ details: (state as CustomerCompany).details ?? "", ...data }),
    {
      loading: "Обновляем данные...",
      success: () => {
        const prevState = $mainData.getState();
        if (prevState) {
          const newState = {
            ...prevState,
            user: {
              ...prevState!.user,
              full_name: data.full_name,
              email: data.email,
            },
          };
          if (data.company_name !== "") {
            //@ts-ignore
            newState["company_name"] = data.company_name;
          }
          setMainData(newState);
        }
        setIsEditing(false);
        return "Данные обновлены";
      },
      error: (err) => {
        if (err?.email) return "Неправильный email";
        return `Произошла ошибка: ${err}`;
      },
    }
  );
});
