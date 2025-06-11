import { createSlice } from "@reduxjs/toolkit";

import { selectors } from "./selectors";
import { actions } from "./actions";

import { FeedOrder } from "@src/api/order/types";
import { APIError } from "@src/api/types/errors";

export interface TInitialState {
  orders: FeedOrder[];
  total: number;
  totalToday: number;
  status: "pending" | "success" | "error" | "idle";
  error: APIError | null;
}

export const initialState: TInitialState = {
  orders: [],
  status: "idle",
  error: null,
  total: 0,
  totalToday: 0,
};

const feedSlice = createSlice({
  name: "feed",
  initialState,
  reducers: actions,
  selectors: selectors,
});

export const {
  reducer: feedReducer,
  actions: feedActions,
  selectors: feedSelectors,
} = feedSlice;
