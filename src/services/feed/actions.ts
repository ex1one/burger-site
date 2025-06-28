import { PayloadAction } from "@reduxjs/toolkit";

import { initialState, TInitialState } from "./slice";

import { TSliceReducerActions } from "@src/types";
import { ApiErrorClass } from "@src/api/config/api-error";
import { FeedOrderResponse } from "@src/api/order/types";
import { ERROR_MESSAGE, Status } from "@src/consts";

export const actions = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  connect: (state, _: PayloadAction<string>) => {
    state.status = Status.Pending;
  },
  disconnect: () => {
    return initialState;
  },
  onOpen: (state) => {
    state.status = Status.Success;
  },
  onClose: () => {
    return initialState;
  },
  onError: (state, { payload }: PayloadAction<ApiErrorClass>) => {
    state.error = payload.message || ERROR_MESSAGE;
  },
  onMessage: (state, { payload }: PayloadAction<FeedOrderResponse>) => {
    return { ...state, ...payload };
  },
} satisfies TSliceReducerActions<TInitialState>;
