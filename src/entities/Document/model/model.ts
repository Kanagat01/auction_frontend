import { createEvent } from "effector";
import { AddDocumentRequest, DeleteDocumentRequest } from "./api_types";
import { addDocumentFx, deleteDocumentFx } from "./api";

export const addDocument = createEvent<AddDocumentRequest>().watch((data) =>
  addDocumentFx(data)
);

export const deleteDocument = createEvent<DeleteDocumentRequest>().watch(
  (data) => deleteDocumentFx(data)
);
