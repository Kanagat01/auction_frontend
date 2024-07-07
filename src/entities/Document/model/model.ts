import toast from "react-hot-toast";
import { createEvent } from "effector";
import { $selectedOrder, TGetOrder, updateOrder } from "~/entities/Order";
import { AddDocumentRequest, DeleteDocumentRequest } from "./api_types";
import { addDocumentFx, deleteDocumentFx } from "./api";

export const addDocument = createEvent<
  Omit<AddDocumentRequest, "order_id"> & { reset: () => void }
>();
addDocument.watch(({ reset, file }) => {
  const order_id = $selectedOrder.getState()?.id;
  if (!order_id) return;
  let data = new FormData();
  data.append("order_id", order_id.toString());
  data.append("file", file);

  toast.promise(addDocumentFx(data), {
    loading: "Добавляем документ...",
    success: (newData) => {
      updateOrder({ orderId: order_id, newData });
      reset();
      return `Документ ${file.name} успешно добавлен`;
    },
    error: (err) => `Произошла ошибка при добавлении документа: ${err}`,
  });
});

export const deleteDocument = createEvent<
  DeleteDocumentRequest & { reset: () => void }
>();
deleteDocument.watch(({ reset, document_id }) =>
  toast.promise(deleteDocumentFx({ document_id }), {
    loading: "Удаляем документ...",
    success: () => {
      const order = $selectedOrder.getState() as TGetOrder;
      const file =
        order.documents.find((doc) => doc.id === document_id)?.file ?? "";
      const newData = {
        documents: order.documents.filter((doc) => doc.id !== document_id),
      };
      updateOrder({ orderId: order.id, newData });
      reset();
      return `Документ #${document_id} ${decodeURIComponent(file).replace(
        "/media/documents/",
        ""
      )} удален`;
    },
    error: (err) => `Произошла ошибка при удалении документа: ${err}`,
  })
);
