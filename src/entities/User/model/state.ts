import toast from "react-hot-toast";
import {
  createStore,
  createEffect,
  createEvent,
  attach,
  Effect,
} from "effector";
import { fieldUpdate as orderFormFieldUpdate } from "~/entities/Order";
import { apiInstance, apiRequestFx, RequestParams } from "~/shared/api";
import { logger } from "~/shared/config";
import { isValidEmail } from "~/shared/lib";
import {
  CustomerCompany,
  CustomerManager,
  TUserType,
  TransporterCompany,
  TransporterManager,
} from "../types";

type TMainData =
  | CustomerCompany
  | CustomerManager
  | TransporterCompany
  | TransporterManager;

export const getMainDataFx = createEffect<void, TMainData>(async () => {
  try {
    const response = await apiInstance.get("/user/common/get_user/");
    return response.data.message;
  } catch (error) {
    logger.error(error);
  }
});

export const $userType = createStore<TUserType | "">("");
export const setUserType = createEvent<TUserType | "">();
$userType.on(setUserType, (_, newState) => newState);

export const $mainData = createStore<TMainData | null>(null).on(
  getMainDataFx.doneData,
  (_, payload) => payload
);

export const setMainData = createEvent<TMainData | null>();
$mainData.on(setMainData, (_, newState) => newState);

$mainData.watch((mainData) => {
  if (!mainData) return null;

  orderFormFieldUpdate({
    key: "customer_manager",
    value: mainData.user.full_name,
  });
  setUserType(mainData.user.user_type);
});

export type EditUserRequest = {
  full_name: string;
  email: string;
  company_name?: string;
};

const editUserFx: Effect<EditUserRequest, string> = attach({
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
  toast.promise(editUserFx(data), {
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
      if (err.email) return "Неправильный email";
      return `Произошла ошибка: ${err}`;
    },
  });
});
