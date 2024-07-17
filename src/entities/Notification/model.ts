import { attach, createEvent, createStore, Effect } from "effector";
import { apiRequestFx, RequestParams } from "~/shared/api";
import { TNotification } from "./types";

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
export const removeNotification = createEvent<TNotification>();
removeNotification.watch((notification) =>
  removeNotificationFx({ notification_id: notification.id })
);

export const $notifications = createStore<TNotification[]>([]);
$notifications.on(getNotificationsFx.doneData, (_, data) => data);
$notifications.on(addNotification, (state, notification) => [
  notification,
  ...state,
]);
$notifications.on(removeNotification, (state, notification) => {
  return state.filter((el) => el.id !== notification.id);
});
