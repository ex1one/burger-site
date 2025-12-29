import { thunks } from "./thunks";

import { TInitialState } from ".";

import { TExtraReducers } from "@src/types";
import { ERROR_MESSAGE, Status } from "@src/consts";

export const extraReducers: TExtraReducers<TInitialState> = (builder) => {
  builder
    .addCase(thunks.getIngredient.pending, (state) => {
      state.status = Status.Pending;
      state.error = null;
    })
    .addCase(thunks.getIngredient.fulfilled, (state, action) => {
      state.ingredient = action.payload;
      state.status = Status.Success;
      state.error = null;
    })
    .addCase(thunks.getIngredient.rejected, (state, action) => {
      state.status = Status.Error;
      state.error = action.error.message || ERROR_MESSAGE;
      state.ingredient = null;
    });
};
