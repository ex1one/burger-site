import { PayloadAction } from "@reduxjs/toolkit";

import { TInitialState, initialState } from "./slice";

import { TSliceReducerActions } from "@src/types";
import { User } from "@src/api/user/types";
import { AuthStatus, Status } from "@src/consts";
import { ApiErrorClass } from "@src/api/config/api-error";

export const actions = {
  setUser: (state, action: PayloadAction<User>) => {
    state.user = action.payload;
  },
  setAuthStatus: (state, action: PayloadAction<AuthStatus>) => {
    state.authStatus = action.payload;
  },
  setStatus: (state, action: PayloadAction<Status>) => {
    state.status = action.payload;
  },

  setError: (state, action: PayloadAction<ApiErrorClass>) => {
    state.error = action.payload.message;
  },
  changeState: (_, action: PayloadAction<TInitialState>) => {
    return action.payload;
  },
  clearState: () => {
    return initialState;
  },
} satisfies TSliceReducerActions<TInitialState>;
