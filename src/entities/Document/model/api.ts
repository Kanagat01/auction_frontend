import { Effect, attach } from "effector";
import { AddDocumentRequest, DeleteDocumentRequest } from "./api_types";
import { OrderModel } from "~/entities/Order";
import { RequestParams, apiRequestFx } from "~/shared/api";

// add document
export const addDocumentFx: Effect<AddDocumentRequest, OrderModel> = attach({
  effect: apiRequestFx,
  mapParams: (data): RequestParams => ({
    method: "post",
    url: "/auction/customer/add_document/",
    data,
  }),
});

// delete document
export const deleteDocumentFx: Effect<DeleteDocumentRequest, string> = attach({
  effect: apiRequestFx,
  mapParams: (data): RequestParams => ({
    method: "post",
    url: "/auction/customer/delete_document/",
    data,
  }),
});
