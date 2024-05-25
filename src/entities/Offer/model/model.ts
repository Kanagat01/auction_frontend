import { Effect, attach, createEvent } from "effector";
import { OrderModel } from "~/entities/Order";
import { RequestParams, apiRequestFx } from "~/shared/api";
import { AcceptOfferRequest, RejectOfferRequest } from "./api_types";

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
