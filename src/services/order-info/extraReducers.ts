import { thunks } from "./thunks";

import { TInitialState } from ".";

import { TExtraReducers } from "@src/types";
import { ERROR_MESSAGE, Status } from "@src/consts";

export const extraReducers: TExtraReducers<TInitialState> = (builder) => {
  builder
    .addCase(thunks.getOrderFeed.pending, (state) => {
      state.status = Status.Pending;
      state.error = null;
    })
    .addCase(thunks.getOrderFeed.fulfilled, (state, { payload }) => {
      state.order = payload.order;
      state.status = Status.Success;
      state.error = null;
    })
    .addCase(thunks.getOrderFeed.rejected, (state, { error }) => {
      state.status = Status.Error;
      state.error = error.message || ERROR_MESSAGE;
    });

  builder
    .addCase(thunks.getOrderFromHistory.pending, (state) => {
      state.status = Status.Pending;
      state.error = null;
    })
    .addCase(thunks.getOrderFromHistory.fulfilled, (state, { payload }) => {
      state.order = payload.order;
      state.status = Status.Success;
      state.error = null;
    })
    .addCase(thunks.getOrderFromHistory.rejected, (state, { error }) => {
      state.status = Status.Error;
      state.error = error.message || ERROR_MESSAGE;
    });
};
