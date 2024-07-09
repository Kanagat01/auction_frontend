import toast from "react-hot-toast";
import { createEvent } from "effector";
import { $orders, removeOrder, updateOrder } from "~/entities/Order";
import {
  AcceptOfferRequest,
  CreateOfferRequest,
  RejectOfferRequest,
} from "./api_types";
import {
  acceptOfferFx,
  acceptOfferTransporterFx,
  createOfferFx,
  getOffersFx,
  rejectOfferFx,
  rejectOfferTransporterFx,
} from "./api";

// get offers
export const getOffers = createEvent();
getOffers.watch(() => getOffersFx());

// create offer
export const createOffer = createEvent<
  CreateOfferRequest & { onReset: () => void }
>();
createOffer.watch(({ onReset, ...data }) =>
  toast.promise(createOfferFx(data), {
    loading: "Создаем предложение...",
    success: () => {
      onReset();
      return "Предложение успешно создано";
    },
    error: (err) => {
      if (err.response.status > 499)
        return "Серверная ошибка. Код " + err.response.status;

      const err_message = err.response.data.message;
      if (
        typeof err_message === "string" &&
        err_message.startsWith("not_valid_price. Price must be less than")
      )
        return "Цена должна быть меньше чем " + err_message.split(" ")[6];

      if (
        err_message.price &&
        err_message.price[0] === "Price must be greater than 0"
      )
        return "Цена должна быть больше нуля";
      else if (
        err_message.order_id &&
        err_message.order_id[0] === "You have already offered"
      )
        return "Вы уже сделали предложение";
      return "Неизвестная ошибка: " + err_message;
    },
  })
);

type TransportationNumber = { transportation_number: number };

// accept offer
export const acceptOffer = createEvent<
  AcceptOfferRequest & TransportationNumber & { isBestOffer: boolean }
>();
acceptOffer.watch(({ isBestOffer, transportation_number, ...data }) =>
  toast.promise(acceptOfferFx(data), {
    loading: isBestOffer
      ? "Принимаем лучшее предложение..."
      : `Принимаем предложение #${data.order_offer_id}...`,
    success: () => {
      const order = $orders
        .getState()
        .find((order) => order.transportation_number === transportation_number);
      if (order) removeOrder(order.id);
      return `Предложение #${data.order_offer_id} принят \nЗаказ №${transportation_number} принят`;
    },
    error: (err) => `Произошла ошибка: ${err.response.data.message}`,
  })
);

// reject offer
export const rejectOffer = createEvent<
  RejectOfferRequest & { orderId: number }
>();
rejectOffer.watch(({ orderId, order_offer_id, ...data }) =>
  toast.promise(rejectOfferFx({ order_offer_id, ...data }), {
    loading: "Отклоняем заказ...",
    success: () => {
      const order = $orders.getState().find((order) => order.id === orderId);
      if (order) {
        const newData = {
          offers: order.offers?.filter((offer) => offer.id !== order_offer_id),
        };
        updateOrder({ orderId, newData });
      }
      return `Предложение #${order_offer_id} отклонен`;
    },
    error: (err) => `Произошла ошибка: ${err.response.data.message}`,
  })
);

// accept offer
export const acceptOfferTransporter = createEvent<
  AcceptOfferRequest & TransportationNumber
>();
acceptOfferTransporter.watch(({ transportation_number, ...data }) =>
  toast.promise(acceptOfferTransporterFx(data), {
    loading: "Принимаем заказ...",
    success: () => {
      const order = $orders
        .getState()
        .find((order) => order.transportation_number === transportation_number);
      if (order) removeOrder(order.id);
      return `Заказ №${transportation_number} принят`;
    },
    error: (err) => `Произошла ошибка: ${err.response.data.message}`,
  })
);

// reject offer
export const rejectOfferTransporter = createEvent<
  RejectOfferRequest & TransportationNumber
>();
rejectOfferTransporter.watch(({ transportation_number, ...data }) =>
  toast.promise(rejectOfferTransporterFx(data), {
    loading: "Отклоняем заказ...",
    success: () => {
      const order = $orders
        .getState()
        .find((order) => order.transportation_number === transportation_number);
      if (order) removeOrder(order.id);
      return `Заказ №${transportation_number} отклонен`;
    },
    error: (err) => `Произошла ошибка: ${err.response.data.message}`,
  })
);
