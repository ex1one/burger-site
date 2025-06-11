import { PayloadAction } from "@reduxjs/toolkit";

import { TInitialState } from "./slice";

import { TSliceReducerActions } from "@src/types";
import { ApiErrorClass } from "@src/api/config/api-error";
import { FeedOrderResponse } from "@src/api/order/types";

export const actions = {
  connect: (state, _: PayloadAction<string>) => state,
  disconnect: (state) => {
    // TODO: Replace to const initialState
    state.error = null;
    state.status = "idle";
    state.orders = [];
  },
  onConnecting: (state) => {
    state.status = "pending";
  },
  onOpen: (state) => {
    state.status = "success";
  },
  onClose: (state) => {
    // TODO: Replace to const initialState
    state.error = null;
    state.status = "idle";
    state.orders = [];
  },
  onError: (state, { payload }: PayloadAction<ApiErrorClass>) => {
    state.error = payload;
  },
  onMessage: (state, { payload }: PayloadAction<FeedOrderResponse>) => {
    state.orders = payload.orders;
    state.total = payload.total;
    state.totalToday = payload.totalToday;
  },
} satisfies TSliceReducerActions<TInitialState>;
