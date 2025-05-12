import { PayloadAction } from "@reduxjs/toolkit";

import { TInitialState, initialState } from "./slice";

import { TSliceReducerActions } from "@src/types";
import { User } from "@src/api/user/types";
import { APIError } from "@src/api/types/errors";

export const actions = {
  setUser: (state, action: PayloadAction<User>) => {
    state.user = action.payload;
  },
  setError: (state, action: PayloadAction<APIError>) => {
    state.error = action.payload;
  },
  changeState: (state, action: PayloadAction<TInitialState>) => {
    state = action.payload;
  },
  clearState: (state) => {
    state = initialState;
  },
} satisfies TSliceReducerActions<TInitialState>;
