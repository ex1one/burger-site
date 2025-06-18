import { PayloadAction } from "@reduxjs/toolkit";

import { initialState, TInitialState } from "./slice";

import { TSliceReducerActions } from "@src/types";
import { ApiErrorClass } from "@src/api/config/api-error";
import { FeedOrderResponse } from "@src/api/order/types";

export const actions = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  connect: (state, _: PayloadAction<string>) => state,
  disconnect: () => {
    return initialState;
  },
  onConnecting: (state) => {
    state.status = "pending";
  },
  onOpen: (state) => {
    state.status = "success";
  },
  onClose: () => {
    return initialState;
  },
  onError: (state, { payload }: PayloadAction<ApiErrorClass>) => {
    state.error = payload;
  },
  onMessage: (state, { payload }: PayloadAction<FeedOrderResponse>) => {
    return { ...state, ...payload };
  },
} satisfies TSliceReducerActions<TInitialState>;
