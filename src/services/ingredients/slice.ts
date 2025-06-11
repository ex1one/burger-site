import { createSlice } from "@reduxjs/toolkit";

import { selectors } from "./selectors";
import { actions } from "./actions";
import { thunks } from "./thunks";
import { extraReducers } from "./extraReducers";

import { Ingredients } from "@src/api/ingredients/types";

export interface TInitialState {
  ingredients: Ingredients;
  isLoading: boolean;
  status: "pending" | "success" | "error" | "idle";
  error: any;
}

export const initialState: TInitialState = {
  ingredients: [],
  status: "idle",
  isLoading: false,
  error: null,
};

const ingredientsSlice = createSlice({
  name: "ingredients",
  initialState,
  reducers: actions,
  extraReducers,
  selectors: selectors,
});

export const {
  reducer: ingredientsReducer,
  actions: ingredientsActions,
  selectors: ingredientsSelectors,
} = ingredientsSlice;

export const ingredientsThunks = thunks;
