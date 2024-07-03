import { Effect, attach, createEvent } from "effector";
import { OrderModel } from "~/entities/Order";
import { RequestParams, apiRequestFx } from "~/shared/api";
import {
  AcceptOfferRequest,
  CreateOfferRequest,
  RejectOfferRequest,
} from "./api_types";
import toast from "react-hot-toast";

// get offers
const getOffersFx: Effect<void, OrderModel> = attach({
  effect: apiRequestFx,
  mapParams: (data): RequestParams => ({
    method: "post",
    url: "/auction/transporter/get_offers/",
    data,
  }),
});
export const getOffers = createEvent();
getOffers.watch(() => getOffersFx());

// create offer
const createOfferFx: Effect<CreateOfferRequest, OrderModel> = attach({
  effect: apiRequestFx,
  mapParams: (data): RequestParams => ({
    method: "post",
    url: "/auction/transporter/add_order_offer/",
    data,
  }),
});
export const createOffer = createEvent<
  CreateOfferRequest & { changeShow: () => void }
>();
createOffer.watch(({ changeShow, ...data }) =>
  toast.promise(createOfferFx(data), {
    loading: "Создаем предложение...",
    success: () => {
      changeShow();
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

// accept offer
const acceptOfferFx: Effect<AcceptOfferRequest, OrderModel> = attach({
  effect: apiRequestFx,
  mapParams: (data): RequestParams => ({
    method: "post",
    url: "/auction/customer/accept_offer/",
    data,
  }),
});
export const acceptOffer = createEvent<AcceptOfferRequest>();
acceptOffer.watch((data) => acceptOfferFx(data));

// reject offer
const rejectOfferFx: Effect<RejectOfferRequest, OrderModel> = attach({
  effect: apiRequestFx,
  mapParams: (data): RequestParams => ({
    method: "post",
    url: "/auction/customer/reject_offer/",
    data,
  }),
});
export const rejectOffer = createEvent<RejectOfferRequest>();
rejectOffer.watch((data) => rejectOfferFx(data));
