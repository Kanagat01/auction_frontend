import { createStore } from "effector";
import { API_URL } from "../config";

const token = localStorage.getItem("token");
const WS_URL = API_URL.replace("http", "ws");

const socket = new WebSocket(`${WS_URL}/api/ws/notifications/?token=${token}`);
socket.onopen = () => console.log("connected");
socket.onerror = (err) => console.log(err);
export const $websocket = createStore<WebSocket>(socket);
