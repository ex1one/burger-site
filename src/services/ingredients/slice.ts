import { createSlice } from "@reduxjs/toolkit";

import { selectors } from "./selectors";
import { actions } from "./actions";
import { thunks } from "./thunks";
import { extraReducers } from "./extraReducers";

import { Ingredients } from "@src/api/ingredients/types";
import { Status } from "@src/consts";

export interface TInitialState {
  ingredients: Ingredients;
  status: Status;
  error: string | null;
}

export const initialState: TInitialState = {
  ingredients: [],
  status: Status.Initial,
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
