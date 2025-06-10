import { createSlice } from "@reduxjs/toolkit";

import { selectors } from "./selectors";
import { actions } from "./actions";
import { extraReducers } from "./extraReducers";
import { thunks } from "./thunks";

import { APIError } from "@src/api/types/errors";

export interface TInitialState {
  status: string;
  order: { number: number; name: string } | null;
  isLoading: boolean;
  error?: APIError | null;
}

export const initialState: TInitialState = {
  status: "pending",
  order: null,
  isLoading: false,
  error: null,
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: actions,
  extraReducers,
  selectors,
});

export const {
  reducer: orderReducer,
  actions: orderActions,
  selectors: orderSelectors,
} = orderSlice;

export const orderThunks = thunks;
