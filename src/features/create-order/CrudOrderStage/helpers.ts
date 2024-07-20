import toast from "react-hot-toast";
import { createEvent, createStore } from "effector";
import { getStage, setStageType } from "..";

export const handleStageNotFound = (orderStageNumber: number | "") => {
  if (orderStageNumber === "") {
    toast.error("Введите номер поставки");
    return null;
  }
  const stage = getStage(orderStageNumber);
  if (!stage) {
    toast.error("Поставка не найдена");
    return null;
  }
  return stage;
};

export const resetStageTypeAndCloseModal = (changeShow: () => void) => {
  setStageType("load_stage");
  changeShow();
};

type TMode = "create" | "copy" | "edit";
export const setMode = createEvent<TMode>();
export const $mode = createStore<TMode>("create");
$mode.on(setMode, (_, newState) => newState);

export const changeShowStageFormModal = createEvent();
export const $showStageFormModal = createStore<boolean>(false);
$showStageFormModal.on(changeShowStageFormModal, (state) => !state);
