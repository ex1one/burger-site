import { thunks } from "./thunks";

import { TInitialState } from ".";

import { TExtraReducers } from "@src/types";
import { ERROR_MESSAGE, Status } from "@src/consts";

export const extraReducers: TExtraReducers<TInitialState> = (builder) => {
  builder
    .addCase(thunks.fetchIngredients.pending, (state) => {
      state.status = Status.Pending;
    })
    .addCase(thunks.fetchIngredients.fulfilled, (state, action) => {
      state.ingredients = action.payload;
      state.status = Status.Success;
      state.error = null;
    })
    .addCase(thunks.fetchIngredients.rejected, (state, action) => {
      if (action.meta.aborted) {
        return;
      }

      state.status = Status.Error;
      state.error = action.error.message || ERROR_MESSAGE;
    });
};
