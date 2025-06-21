import { thunks } from "./thunks";

import { TInitialState } from ".";

import { TExtraReducers } from "@src/types";
import { AuthStatus, Status, UNKNOWN_ERROR_MESSAGE } from "@src/consts";

export const extraReducers: TExtraReducers<TInitialState> = (builder) => {
  builder
    .addCase(thunks.signIn.pending, (state) => {
      state.status = Status.Pending;
    })
    .addCase(thunks.signIn.fulfilled, (state, { payload }) => {
      state.error = null;
      state.user = payload.user;
      state.authStatus = AuthStatus.Authenticated;
      state.status = Status.Success;
    })
    .addCase(thunks.signIn.rejected, (state, { error }) => {
      state.error = error.message || UNKNOWN_ERROR_MESSAGE;
      state.authStatus = AuthStatus.Anonymous;
      state.status = Status.Error;
      state.user = null;
    });

  builder
    .addCase(thunks.signUp.pending, (state) => {
      state.status = Status.Pending;
    })
    .addCase(thunks.signUp.fulfilled, (state, { payload }) => {
      state.error = null;
      state.user = payload.user;
      state.authStatus = AuthStatus.Authenticated;
      state.status = Status.Success;
    })
    .addCase(thunks.signUp.rejected, (state, { error }) => {
      state.error = error.message || UNKNOWN_ERROR_MESSAGE;
      state.authStatus = AuthStatus.Anonymous;
      state.status = Status.Error;
      state.user = null;
    });

  builder
    .addCase(thunks.sessionRequest.pending, (state) => {
      if (state.authStatus === AuthStatus.Initial) {
        state.authStatus = AuthStatus.Pending;
      }
      state.status = Status.Pending;
    })
    .addCase(thunks.sessionRequest.fulfilled, (state, { payload }) => {
      state.error = null;
      state.user = payload.user;
      state.authStatus = AuthStatus.Authenticated;
      state.status = Status.Success;
    })
    .addCase(thunks.sessionRequest.rejected, (state, { error }) => {
      state.error = error.message || UNKNOWN_ERROR_MESSAGE;
      state.authStatus = AuthStatus.Anonymous;
      state.status = Status.Error;
      state.user = null;
    });

  builder
    .addCase(thunks.logout.pending, (state) => {
      state.status = Status.Pending;
    })
    .addCase(thunks.logout.fulfilled, (state) => {
      state.error = null;
      state.authStatus = AuthStatus.Anonymous;
      state.status = Status.Success;
      state.user = null;
    })
    .addCase(thunks.logout.rejected, (state, { error }) => {
      state.error = error.message || UNKNOWN_ERROR_MESSAGE;
      state.authStatus = AuthStatus.Anonymous;
      state.status = Status.Error;
      state.user = null;
    });

  builder
    .addCase(thunks.update.pending, (state) => {
      state.status = Status.Pending;
    })
    .addCase(thunks.update.fulfilled, (state, { payload }) => {
      state.error = null;
      state.user = payload.user;
      state.status = Status.Success;
    })
    .addCase(thunks.update.rejected, (state, { error }) => {
      state.error = error.message || UNKNOWN_ERROR_MESSAGE;
      state.status = Status.Error;
    });
};
