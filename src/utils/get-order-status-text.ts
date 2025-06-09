import { FeedOrder } from "@src/api/order/types";

export const getOrderStatusText = (status: FeedOrder["status"]) => {
  switch (status) {
    case "created":
      return "Создан";
    case "pending":
      return "Готовится";
    case "done":
      return "Выполнен";
    default:
      return "-";
  }
};
