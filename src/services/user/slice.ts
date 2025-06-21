import { createSlice } from "@reduxjs/toolkit";

import { selectors } from "./selectors";
import { actions } from "./actions";
import { thunks } from "./thunks";
import { extraReducers } from "./extraReducers";

import { User } from "@src/api/user/types";
import { Status, AuthStatus } from "@src/consts";

export interface TInitialState {
  user: User | null;
  error: string | null;
  status: Status;
  authStatus: AuthStatus;
}

export const initialState: TInitialState = {
  user: null,
  error: null,
  status: Status.Initial,
  authStatus: AuthStatus.Initial,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: actions,
  selectors: selectors,
  extraReducers,
});

export const {
  reducer: userReducer,
  actions: userActions,
  selectors: userSelectors,
} = userSlice;

export const userThunks = thunks;
