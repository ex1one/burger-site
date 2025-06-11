import { ApiErrorClass } from "../../api/config/api-error";

import { thunks } from "./thunks";

import { TInitialState } from ".";

import { TExtraReducers } from "@src/types";
import { UNKNOWN_ERROR_MESSAGE } from "@src/consts";

export const extraReducers: TExtraReducers<TInitialState> = (builder) => {
  builder
    .addCase(thunks.createOrderThunk.fulfilled, (state, action) => {
      state.order = {
        name: action.payload.name,
        number: action.payload.order.number,
      };
      state.isLoading = false;
      state.status = "success";
    })
    .addCase(thunks.createOrderThunk.rejected, (state, action) => {
      state.isLoading = false;
      state.status = "error";
      state.error = new ApiErrorClass(
        action.error.message ?? UNKNOWN_ERROR_MESSAGE
      );
    })
    .addCase(thunks.createOrderThunk.pending, (state) => {
      state.isLoading = true;
      state.status = "pending";
    });
};
