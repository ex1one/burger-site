import { PayloadAction } from "@reduxjs/toolkit";

import { TInitialState } from "./slice";

import { Ingredients } from "@src/api/ingredients/types";
import { TSliceReducerActions } from "@src/types";
import { Status } from "@src/consts";

export const actions = {
  setIngredients: (state, action: PayloadAction<Ingredients>) => {
    state.ingredients = action.payload;
  },
  setStatus: (state, action: PayloadAction<Status>) => {
    state.status = action.payload;
  },
  setError: (state, action: PayloadAction<string>) => {
    state.error = action.payload;
  },
  setSlice: (_, action: PayloadAction<TInitialState>) => {
    return action.payload;
  },
} satisfies TSliceReducerActions<TInitialState>;
