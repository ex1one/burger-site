import { createSlice } from "@reduxjs/toolkit";

import { selectors } from "./selectors";
import { actions } from "./actions";
import { extraReducers } from "./extraReducers";
import { thunks } from "./thunks";

import { Status } from "@src/consts";

export interface TInitialState {
  status: Status;
  order: { number: number; name: string } | null;
  error: string | null;
}

export const initialState: TInitialState = {
  status: Status.Initial,
  order: null,
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
