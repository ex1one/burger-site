import { PayloadAction } from "@reduxjs/toolkit";

import { initialState, TInitialState } from "./slice";

import { TSliceReducerActions } from "@src/types";
import { ApiErrorClass } from "@src/api/config/api-error";
import { FeedOrderResponse } from "@src/api/order/types";
import { Status } from "@src/consts";

export const actions = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  connect: (state, _: PayloadAction<string>) => state,
  disconnect: () => {
    return initialState;
  },
  onConnecting: (state) => {
    state.status = Status.Pending;
  },
  onOpen: (state) => {
    state.status = Status.Success;
  },
  onClose: () => {
    return initialState;
  },
  onError: (state, { payload }: PayloadAction<ApiErrorClass>) => {
    state.error = payload.message;
  },
  onMessage: (state, { payload }: PayloadAction<FeedOrderResponse>) => {
    return { ...state, ...payload };
  },
} satisfies TSliceReducerActions<TInitialState>;
