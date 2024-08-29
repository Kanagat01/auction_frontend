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
export const removeNotification = createEvent<number>();
removeNotification.watch((notification_id) =>
  removeNotificationFx({ notification_id })
);

export const $notifications = createStore<TNotification[]>([])
  .on(getNotificationsFx.doneData, (_, data) => data)
  .on(addNotification, (state, notification) => [...state, notification])
  .on(removeNotification, (state, notification_id) => {
    return state.filter((el) => el.id !== notification_id);
  });
