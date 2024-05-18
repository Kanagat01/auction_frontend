import { createEffect, createStore } from "effector";
import { apiInstance } from "~/shared/api";
import { logger } from "~/shared/config";
import { TUser } from ".";

export const getUserFx = createEffect(async () => {
  try {
    const response = await apiInstance.get("/user/common/get_user/");
    console.log("resp", response);

    return response.data.message;
  } catch (error) {
    logger.error(error);
  }
});

export const $user = createStore<any>(null);
$user.on(getUserFx.doneData, (_, data: { user: TUser }) => data);
getUserFx();
