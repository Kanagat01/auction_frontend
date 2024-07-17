type NotificationType =
  | "info"
  | "new_order_in_auction"
  | "new_order_in_bidding"
  | "new_order_in_direct"
  | "new_order_being_executed";

export type TNotification = {
  id: number;
  title: string;
  description: string;
  created_at: string;
  type: NotificationType;
};
