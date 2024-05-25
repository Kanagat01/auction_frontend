import { createEvent } from "effector";
import { AddOrderStageRequest, EditOrderStageRequest } from "./api_types";
import { addOrderStageFx, editOrderStageFx } from "./api";

export const addOrderStage = createEvent<AddOrderStageRequest>();
addOrderStage.watch((data) => addOrderStageFx(data));

export const editOrderStage = createEvent<EditOrderStageRequest>();
editOrderStage.watch((data) => editOrderStageFx(data));
