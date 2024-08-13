import toast from "react-hot-toast";
import { FormEvent, MouseEvent } from "react";
import { createEvent, sample } from "effector";
import {
  $selectedOrder,
  createOrderFx,
  deselectOrder,
  editOrderFx,
  orderTranslations,
  updateOrder,
} from "~/entities/Order";
import { $mainData } from "~/entities/User";
import {
  $orderForm,
  initialOrder,
  setMaxOrderStageNumber,
  $maxTransportationNumber,
  setMaxTransportationNumber,
  setNotValidStageNumber,
  setOrderForm,
  TNewOrder,
  $maxOrderStageNumber,
  orderToOrderForm,
} from ".";

export const clearForm = createEvent();
clearForm.watch(() => {
  setOrderForm({
    ...initialOrder,
    customer_manager: $orderForm.getState().customer_manager,
    transportation_number: $maxTransportationNumber.getState(),
  } as TNewOrder);
});

export const CopyOrder = createEvent<MouseEvent<HTMLAnchorElement>>();
CopyOrder.watch((event) => {
  const order = $selectedOrder.getState();
  if (!order) {
    event.preventDefault();
    toast.error("Выберите заказ для копирования");
    return;
  }
  const newTrNumber = $maxTransportationNumber.getState() + 1;
  setMaxTransportationNumber(newTrNumber);
  let newState: Partial<TNewOrder> = {
    transportation_number: newTrNumber,
    customer_manager: $mainData.getState()?.user.full_name ?? "",
  };
  Object.keys(initialOrder).map((key) => {
    if (key === "stages") {
      const newOrderStageNum = $maxOrderStageNumber.getState();
      console.log("m", newOrderStageNum);

      newState.stages = order.stages.map((stage, idx) => ({
        ...stage,
        order_stage_number: newOrderStageNum + idx,
      }));
      setMaxOrderStageNumber(newOrderStageNum + order.stages.length - 1);
    } else if (["transportation_number", "customer_manager"].includes(key)) {
    } else {
      // @ts-ignore
      newState[key] = order[key];
    }
  });
  sample({
    clock: $orderForm,
    target: deselectOrder,
  });
  setOrderForm(newState as TNewOrder);
});

export const orderFormSubmitted = createEvent<FormEvent>();
orderFormSubmitted.watch((e: FormEvent) => {
  e.preventDefault();
  const orderForm = $orderForm.getState();
  const notRequired = [
    "comments_for_transporter",
    "additional_requirements",
    "adr",
    "temp_mode",
    "transport_body_width",
    "transport_body_height",
    "transport_body_length",
  ];
  let notFilledIn = [];
  for (const key in orderForm) {
    //@ts-ignore
    if (!orderForm[key] && notRequired.includes(key)) {
      //@ts-ignore
      orderForm[key] = null;
    } else if (
      !orderForm[key as keyof typeof orderForm] ||
      (key === "stages" && orderForm.stages.length === 0)
    ) {
      notFilledIn.push(
        orderTranslations[key as keyof typeof orderTranslations]
      );
    }
  }
  if (notFilledIn.length > 0) {
    toast(<span>Заполните обязательные поля: {notFilledIn.join(", ")}</span>, {
      position: "top-right",
      duration: 3000,
      icon: <button onClick={() => toast.dismiss()}>❌</button>,
      style: { fontSize: "1.4rem" },
    });
  } else {
    const handleError = (err: string | Record<string, string[]>) => {
      if (typeof err === "string") {
        if (err === "transportation_number_must_be_unique")
          return "№ Транспортировки должен быть уникальным";
        else if (err === "add_at_least_one_stage")
          return "Добавьте хотя бы 1 поставку";
        else if (err.startsWith("order_stage_number_must_be_unique")) {
          const stageNum = Number(err.split(":")[1]);
          setNotValidStageNumber(stageNum);
          return `№ Поставки должен быть уникальным: ${stageNum}`;
        } else if (err === "You can edit only unpublished orders.")
          return "Вы можете редактировать только неопубликованные заказы";
        return `Произошла ошибка: ${err}`;
      }
      return `Неизвестная ошибка: ${err}`;
    };
    if (orderForm.id) {
      const { id, ...data } = orderForm;
      toast.promise(editOrderFx({ order_id: id, ...data }), {
        loading: `Обновляем заказ #${data.transportation_number}...`,
        success: (order) => {
          updateOrder({ orderId: id, newData: order });
          return `Заказ #${data.transportation_number} успешно обновлен`;
        },
        error: handleError,
      });
    } else {
      toast.promise(createOrderFx(orderForm), {
        loading: "Создаем заказ...",
        success: () => {
          clearForm();
          setMaxTransportationNumber($maxTransportationNumber.getState() + 1);
          setMaxOrderStageNumber($maxOrderStageNumber.getState() + 1);
          return "Заказ успешно создан";
        },
        error: handleError,
      });
    }
  }
});

export const EditOrder = createEvent<MouseEvent<HTMLAnchorElement>>();
EditOrder.watch((event) => {
  const order = $selectedOrder.getState();
  if (!order) {
    event.preventDefault();
    toast.error("Выберите заказ для редактирования");
    return;
  }
  toast.remove();
  sample({
    clock: $orderForm,
    target: deselectOrder,
  });

  const newOrderForm = orderToOrderForm(order);
  setOrderForm({
    customer_manager: $mainData.getState()?.user.full_name ?? "",
    ...newOrderForm,
  });
});
