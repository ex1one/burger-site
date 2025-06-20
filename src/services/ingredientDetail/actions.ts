import { PayloadAction } from "@reduxjs/toolkit";

import { initialState, TInitialState } from "./slice";

import { Ingredient } from "@src/api/ingredients/types";
import { TSliceReducerActions } from "@src/types";

export const actions = {
  setIngredientDetail(state, action: PayloadAction<Ingredient>) {
    state.ingredient = action.payload;
  },
  clearIngredientDetail() {
    return initialState;
  },
} satisfies TSliceReducerActions<TInitialState>;
