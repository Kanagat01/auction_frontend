import { createEvent } from "effector";
import { AddDocumentRequest, DeleteDocumentRequest } from "./api_types";
import { addDocumentFx, deleteDocumentFx } from "./api";

export const addDocument = createEvent<AddDocumentRequest>();
addDocument.watch((data) => addDocumentFx(data));

export const deleteDocument = createEvent<DeleteDocumentRequest>();
deleteDocument.watch((data) => deleteDocumentFx(data));
