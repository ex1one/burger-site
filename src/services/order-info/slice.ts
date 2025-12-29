import { createSlice } from "@reduxjs/toolkit";

import { selectors } from "./selectors";
import { actions } from "./actions";
import { extraReducers } from "./extraReducers";
import { thunks } from "./thunks";

import { Status } from "@src/consts";
import { OrderInfo } from "@src/api/order/types";

export interface TInitialState {
  status: Status;
  order: OrderInfo | null;
  error: string | null;
}

export const initialState: TInitialState = {
  status: Status.Initial,
  order: null,
  error: null,
};

const orderSlice = createSlice({
  name: "orderInfo",
  initialState,
  reducers: actions,
  extraReducers,
  selectors,
});

export const {
  reducer: orderInfoReducer,
  actions: orderInfoActions,
  selectors: orderInfoSelectors,
} = orderSlice;

export const orderInfoThunks = thunks;
