import { t } from "i18next";
import saveAs from "file-saver";
import toast from "react-hot-toast";
import { ResponseType } from "axios";
import { createEffect } from "effector";
import { useUnit } from "effector-react";
import { LuPrinter } from "react-icons/lu";
import { ButtonHTMLAttributes } from "react";
import {
  $selectedOrder,
  isOrderSelected,
  OrderIDRequest,
} from "~/entities/Order";
import { apiInstance } from "~/shared/api";

const getOrderPdfFx = createEffect<OrderIDRequest, string>(
  async ({ order_id }) => {
    const response = await apiInstance({
      method: "get",
      url: `auction/get_order_pdf/?order_id=${order_id}`,
      responseType: "blob" as ResponseType,
    });
    const filename = `order_${order_id}.pdf`;
    saveAs(new Blob([response.data]), filename);
    return "ok";
  }
);

export function GetOrderPdf(props: ButtonHTMLAttributes<HTMLButtonElement>) {
  const order = useUnit($selectedOrder);
  const getOrderPdf = () => {
    if (!order) return;
    toast.promise(getOrderPdfFx({ order_id: order.id }), {
      loading: t("getOrderPdf.loading"),
      success: t("getOrderPdf.success"),
      error: (err) => t("common.errorMessage", { err }),
    });
  };
  return (
    <button {...props} onClick={() => isOrderSelected(getOrderPdf)}>
      <LuPrinter />
    </button>
  );
}
