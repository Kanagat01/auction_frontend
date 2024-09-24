import { createEffect, createStore } from "effector";
import { addNotification } from "~/entities/Notification";
import {
  $orders,
  addOrder,
  removeOrder,
  TGetOrder,
  updateOrder,
} from "~/entities/Order";
import { updateBalance } from "~/entities/User";
import { API_URL } from "~/shared/config";

const token = localStorage.getItem("token");
const WS_URL = API_URL.replace("http", "ws");
const socketUrl = `${WS_URL}/api/ws/general/?token=${token}`;

export const connectToSocketFx = createEffect(async () => {
  const socket = new WebSocket(socketUrl);
  socket.onerror = (err) => console.log(err);
  socket.onclose = () => connectToSocketFx();

  socket.onmessage = (ev) => {
    const data = JSON.parse(ev.data);
    if ("add_or_update_order" in data) {
      const order: TGetOrder = data.add_or_update_order;
      const idx = $orders.getState().findIndex((o) => o.id === order.id);
      if (idx === -1) addOrder(order);
      else updateOrder({ orderId: order.id, newData: order });
    } else if ("remove_order" in data) {
      removeOrder(data.remove_order);
    } else if ("new_notification" in data) {
      addNotification(data.new_notification);
    } else if ("update_balance" in data) {
      updateBalance(data.update_balance);
    }
  };
  return socket;
});

connectToSocketFx();
export const $websocket = createStore<WebSocket | null>(null).on(
  connectToSocketFx.doneData,
  (_, state) => state
);
