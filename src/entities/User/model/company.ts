import toast from "react-hot-toast";
import { attach, createEvent, Effect } from "effector";
import { apiRequestFx, RequestParams } from "~/shared/api";
import { isValidEmail } from "~/shared/lib";
import {
  CustomerCompany,
  CustomerManager,
  getRole,
  TransporterCompany,
  TransporterManager,
} from "..";
import { $mainData, editUserFx, setMainData, TMainData } from ".";

export const editDetails = createEvent<{ details: string }>();
editDetails.watch(({ details }) => {
  const state = $mainData.getState();
  if (!(state && "company_name" in state)) return;
  const data = {
    email: state?.user.email,
    full_name: state?.user.full_name,
    company_name: state?.company_name,
    details,
  };
  toast.promise(editUserFx(data), {
    loading: "Сохраняем реквизиты...",
    success: () => {
      const prevState = $mainData.getState();
      setMainData({ ...prevState, details } as TMainData);
      return "Реквизиты обновлены";
    },
    error: (err) => `Произошла ошибка: ${err}`,
  });
});

type EditManagerRequest = {
  manager_id: number;
  email: string;
  full_name: string;
};

const editManagerFx: Effect<
  EditManagerRequest,
  TransporterManager | CustomerManager
> = attach({
  effect: apiRequestFx,
  mapParams: (data): RequestParams => ({
    method: "post",
    url: "/user/common/edit_manager/",
    data,
  }),
});

export const editManager = createEvent<EditManagerRequest>();
editManager.watch((data) => {
  if (!isValidEmail(data.email)) {
    toast.error("Неправильный формат email");
    return;
  }
  const state = $mainData.getState();
  let manager;
  if (getRole(state?.user.user_type ?? "") === "customer")
    manager = (state as CustomerCompany).managers.find(
      (m) => m.customer_manager_id === data.manager_id
    );
  else
    manager = (state as TransporterCompany).managers.find(
      (m) => m.transporter_manager_id === data.manager_id
    );
  if (!manager) {
    toast.error("Менеджер не найден");
    return;
  }
  if (
    data.email === manager.user.email &&
    data.full_name === manager.user.full_name
  ) {
    toast.error("Вы не изменили ни одно поле");
    return;
  }
  toast.promise(editManagerFx(data), {
    loading: "Обновляем данные менеджера...",
    success: (newManager) => {
      const prevState = $mainData.getState() as
        | CustomerCompany
        | TransporterCompany;
      if (prevState) {
        const managers = prevState.managers.map((m) => {
          if ("customer_manager_id" in m)
            return m.customer_manager_id === data.manager_id ? newManager : m;
          else
            return m.transporter_manager_id === data.manager_id
              ? newManager
              : m;
        });
        const newState = { ...prevState, managers } as TMainData;
        setMainData(newState);
      }
      return "Данные менеджера обновлены";
    },
    error: (err) => {
      if (err?.email) return "Неправильный email";
      if (
        err?.manager_id &&
        err.manager_id ===
          "Manager with this id does not exist or does not belong to you"
      )
        return "Менеджер с таким id не существует или он не принадлежит вам";
      return `Произошла ошибка: ${err}`;
    },
  });
});
