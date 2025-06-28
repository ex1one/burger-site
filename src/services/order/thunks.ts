import { createAppAsyncThunk } from "@src/store/shared";
import API from "@src/api";

const createOrderThunk = createAppAsyncThunk(
  "order/createOrder",
  (ingredients: string[]) => API.order.createOrder(ingredients)
);

export const thunks = {
  createOrderThunk,
};
