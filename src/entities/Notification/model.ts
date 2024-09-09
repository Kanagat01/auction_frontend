import { attach, createEvent, createStore, Effect } from "effector";
import { apiRequestFx, RequestParams } from "~/shared/api";
import { NotificationType, TNotification } from "./types";
import { $mainData } from "../User";

export const getNotificationsFx: Effect<void, TNotification[]> = attach({
  effect: apiRequestFx,
  mapParams: (): RequestParams => ({
    method: "get",
    url: "notifications/get_notifications/",
  }),
});

const removeNotificationFx: Effect<{ notification_id: number }, string> =
  attach({
    effect: apiRequestFx,
    mapParams: (data): RequestParams => ({
      method: "post",
      url: "notifications/delete_notification/",
      data,
    }),
  });

export const addNotification = createEvent<TNotification>();
export const removeNotification = createEvent<number>();
removeNotification.watch(
  (notification_id) =>
    notification_id !== 0 ? removeNotificationFx({ notification_id }) : {} // если 0, значит уведомление добавлено во фронте
);

export const $notifications = createStore<TNotification[]>([])
  .on(getNotificationsFx.doneData, (_, data) => {
    const mainData = $mainData.getState();
    if (!mainData) return data;

    const defaultNotificationProp = {
      id: 0,
      created_at: "",
      type: NotificationType.POPUP_NOTIFICATION,
    };

    if ("subscription" in mainData && !mainData.subscription) {
      data.push({
        ...defaultNotificationProp,
        title: "Выберите тариф",
        description:
          'Для того, чтобы получить доступ ко всему функционалу сайта, выберите тариф и внесите абонентскую плату. Для этого вам нужно перейти в \n "Настройки > Тарифы"',
      });
    } else if ("transporter_company_id" in mainData) {
      if (mainData.balance <= 0) {
        data.push({
          ...defaultNotificationProp,
          title: "Пополните баланс",
          description:
            "Ваш баланс равен нулю или отрицателен. Функционал будет ограничен просмотром информации и переходом по разделам. Пожалуйста, пополните баланс.",
        });
      }
      if (mainData.managers.length === 0) {
        data.push({
          ...defaultNotificationProp,
          title: "Добавьте менеджера",
          description:
            'Вам нужно добавить менеджера, чтобы работать с заказами. Для этого вам нужно перейти в \n "Настройки > Добавить менеджера"',
        });
      }
    }
    return data;
  })
  .on(addNotification, (state, notification) => [...state, notification])
  .on(removeNotification, (state, notification_id) => {
    if (notification_id === 0) {
      // Все уведомления добавленные во фронте, имеют id = 0, чтобы не удалить их всех, удаляем лишь самый первый
      const index = state.findIndex((el) => el.id === 0);
      if (index !== -1) {
        state.splice(index, 1);
      }
      return state;
    }
    return state.filter((el) => el.id !== notification_id);
  });
