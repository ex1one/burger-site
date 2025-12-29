import { createSlice } from "@reduxjs/toolkit";

import { selectors } from "./selectors";
import { actions } from "./actions";

import { FeedOrder } from "@src/api/order/types";
import { Status } from "@src/consts";

export interface TInitialState {
  orders: FeedOrder[];
  total: number;
  totalToday: number;
  status: Status;
  error: string | null;
}

export const initialState: TInitialState = {
  orders: [],
  status: Status.Initial,
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
