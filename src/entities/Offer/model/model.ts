import toast from "react-hot-toast";
import { createEvent } from "effector";
import {
  $orders,
  removeOrder,
  TPriceData,
  updateOrder,
} from "~/entities/Order";
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
  CreateOfferRequest & { inAuction: boolean; onReset: () => void }
>();
createOffer.watch(({ inAuction, onReset, ...data }) =>
  toast.promise(createOfferFx(data), {
    loading: "Создаем предложение...",
    success: () => {
      let price_data: TPriceData;
      if (inAuction)
        price_data = {
          offer_id: 0,
          current_price: data.price,
          price: data.price,
          is_best_offer: true,
        };
      else
        price_data = {
          offer_id: 0,
          price: data.price,
        };
      updateOrder({ orderId: data.order_id, newData: { price_data } });
      onReset();
      return "Предложение успешно создано";
    },
    error: (err) => {
      const status = err?.response?.status;
      const message = err?.response?.data?.message;
      const priceError = err?.response?.data?.price?.[0];

      if (status > 499) return `Серверная ошибка. Код ${status}`;
      if (
        typeof message === "string" &&
        message.startsWith("not_valid_price. Price must be less than")
      )
        return `Цена должна быть меньше чем ${message.split(" ")[6]}`;
      if (priceError === "Price must be greater than 0")
        return "Цена должна быть больше нуля";
      return `Неизвестная ошибка: ${message}`;
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
    error: (err) => `Произошла ошибка: ${err}`,
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
    error: (err) => `Произошла ошибка: ${err}`,
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
    error: (err) => `Произошла ошибка: ${err}`,
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
    error: (err) => `Произошла ошибка: ${err}`,
  })
);
