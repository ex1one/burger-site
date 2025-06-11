import { PayloadAction } from "@reduxjs/toolkit";

import { TInitialState, initialState, AuthStatus } from "./slice";

import { TSliceReducerActions } from "@src/types";
import { User } from "@src/api/user/types";
import { APIError } from "@src/api/types/errors";

export const actions = {
  setUser: (state, action: PayloadAction<User>) => {
    state.user = action.payload;
  },
  setStatus: (state, action: PayloadAction<AuthStatus>) => {
    state.status = action.payload;
  },
  setError: (state, action: PayloadAction<APIError>) => {
    state.error = action.payload;
  },
  changeState: (state, action: PayloadAction<TInitialState>) => {
    state.user = action.payload.user;
    state.error = action.payload.error;
    state.status = action.payload.status;
  },
  clearState: (state) => {
    state.error = initialState.error;
    state.user = initialState.user;
    state.status = initialState.status;
  },
} satisfies TSliceReducerActions<TInitialState>;
