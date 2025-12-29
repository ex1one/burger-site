import { createSlice } from "@reduxjs/toolkit";

import { actions } from "./actions";
import { selectors } from "./selectors";
import { thunks } from "./thunks";
import { extraReducers } from "./extraReducers";

import { Ingredient } from "@src/api/ingredients/types";
import { Status } from "@src/consts";

export type TInitialState = {
  ingredient: Ingredient | null;
  status: Status;
  error: string | null;
};

export const initialState: TInitialState = {
  ingredient: null,
  status: Status.Initial,
  error: null,
};

const ingredientDetailSlice = createSlice({
  name: "ingredientDetail",
  initialState,
  reducers: actions,
  extraReducers,
  selectors,
});

export const {
  reducer: ingredientDetailReducer,
  actions: ingredientDetailActions,
  selectors: ingredientDetailSelectors,
} = ingredientDetailSlice;

export const ingredientDetailThunks = thunks;
