import { thunks } from "./thunks";

import { TInitialState } from ".";

import { TExtraReducers } from "@src/types";
import { ERROR_MESSAGE, Status } from "@src/consts";

export const extraReducers: TExtraReducers<TInitialState> = (builder) => {
  builder
    .addCase(thunks.createOrderThunk.pending, (state) => {
      state.status = Status.Pending;
    })
    .addCase(thunks.createOrderThunk.fulfilled, (state, { payload }) => {
      state.order = {
        name: payload.name,
        number: payload.order.number,
      };
      state.status = Status.Success;
    })
    .addCase(thunks.createOrderThunk.rejected, (state, { error }) => {
      state.status = Status.Error;
      state.error = error.message || ERROR_MESSAGE;
    });
};
