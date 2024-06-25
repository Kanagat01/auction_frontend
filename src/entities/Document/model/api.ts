import { Effect, attach } from "effector";
import { DeleteDocumentRequest } from "./api_types";
import { OrderModel } from "~/entities/Order";
import { RequestParams, apiRequestFx } from "~/shared/api";

// add document
export const addDocumentFx: Effect<FormData, OrderModel> = attach({
  effect: apiRequestFx,
  mapParams: (data: FormData): RequestParams => ({
    method: "post",
    url: "/auction/customer/add_document/",
    data,
  }),
});

// delete document
export const deleteDocumentFx: Effect<DeleteDocumentRequest, string> = attach({
  effect: apiRequestFx,
  mapParams: (data: DeleteDocumentRequest): RequestParams => ({
    method: "post",
    url: "/auction/customer/delete_document/",
    data,
  }),
});
