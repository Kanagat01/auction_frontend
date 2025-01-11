import { t } from "i18next";
import { createEvent, Effect } from "effector";
import toast, { Renderable, ValueOrFunction } from "react-hot-toast";
import { $selectedOrder, setSelectedOrder } from "./store";
import { removeOrder, updateOrder } from "./order_crud_events";
import { OrderModel, OrderStatus } from "../types";
import {
  cancelOrderCompletionFx,
  cancelOrderFx,
  completeOrderFx,
  publishOrderFx,
  unpublishOrderFx,
} from "./api";

function handleOrderAction(
  actionFx: Effect<any, OrderModel>,
  actionMessage: {
    loading: string;
    success: string;
    error?: ValueOrFunction<Renderable, any>;
  },
  actionProps?: Record<string, unknown>,
  onSuccess?: (order_id: number) => void
) {
  const order = $selectedOrder.getState();
  const order_id = order?.id;
  if (order_id) {
    toast.promise(actionFx({ order_id, ...actionProps }), {
      loading: actionMessage.loading,
      success: () => {
        if (onSuccess) onSuccess(order_id);
        else {
          removeOrder(order_id);
          setSelectedOrder(null);
        }
        return actionMessage.success;
      },
      error: actionMessage.error
        ? actionMessage.error
        : (error) => {
            if (error instanceof Array) {
              const statusError = error.find((el) =>
                el.startsWith("order_status_is")
              );
              if (error.includes("order_is_completed"))
                return t("orderModel.orderCompletedError");
              else if (error.includes("order_is_completed_or_unpublished")) {
                removeOrder(order_id);
                return t("orderModel.orderCompletedOrUnpublished");
              } else if (statusError) {
                const orderStatus: OrderStatus = statusError.split(":")[1];
                if (orderStatus !== OrderStatus.completed) {
                  removeOrder(order_id);
                  return t("orders.orderStatusIs", {
                    status: t(`orderStatus.${orderStatus}`),
                  });
                } else {
                  updateOrder({
                    orderId: order_id,
                    newData: { status: orderStatus },
                  });
                  return t("orderModel.orderAlreadyCompleted");
                }
              }
            }
            return t("common.errorMessage", { error });
          },
    });
  } else toast.error(t("orders.selectOrder"));
}

export const cancelOrder = createEvent();
cancelOrder.watch(() =>
  handleOrderAction(cancelOrderFx, {
    loading: t("cancelOrder.loading"),
    success: t("cancelOrder.success"),
  })
);

export const publishOrder = createEvent<
  | { publish_to: "in_auction" | "in_bidding" }
  | { publish_to: "in_direct"; transporter_company_id: number; price: number }
>();
publishOrder.watch(({ publish_to, ...data }) =>
  handleOrderAction(
    publishOrderFx,
    {
      loading: t("publishOrder.loading"),
      success: t("publishOrder.success", {
        status: t(`orderStatus.${publish_to}`),
      }),
      error: (error) => {
        if ("transporter_company_id" in error) {
          if (
            error.transporter_company_id instanceof Array &&
            error.transporter_company_id.includes(
              "TransporterCompany has no manager"
            )
          )
            return t("publishOrder.transporterHasNoManager");
        }
        return t("common.errorMessage", { error });
      },
    },
    { publish_to, ...data }
  )
);

export const unpublishOrder = createEvent();
unpublishOrder.watch(() =>
  handleOrderAction(unpublishOrderFx, {
    loading: t("unpublishOrder.loading"),
    success: t("unpublishOrder.success"),
  })
);

export const completeOrder = createEvent();
completeOrder.watch(() =>
  handleOrderAction(
    completeOrderFx,
    {
      loading: t("completeOrder.loading"),
      success: t("completeOrder.success"),
    },
    {},
    (orderId: number) => {
      updateOrder({ orderId, newData: { status: OrderStatus.completed } });
      setSelectedOrder(null);
    }
  )
);

export const cancelOrderCompletion = createEvent();
cancelOrderCompletion.watch(() =>
  handleOrderAction(
    cancelOrderCompletionFx,
    {
      loading: t("cancelOrderCompletion.loading"),
      success: t("cancelOrderCompletion.success"),
    },
    {},
    (orderId: number) => {
      updateOrder({ orderId, newData: { status: OrderStatus.being_executed } });
      setSelectedOrder(null);
    }
  )
);
