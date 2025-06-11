import { toast } from "react-toastify";

import { AuthStatus, userActions } from "./slice";

import API from "@src/api";
import { ERROR_MESSAGE, PAGES, UNKNOWN_ERROR_MESSAGE } from "@src/consts";
import {
  deleteCookie,
  deleteItemFromLocalStorage,
  setCookie,
  setItemToLocalStorage,
} from "@src/api/utils";
import { createAppAsyncThunk } from "@src/store/shared";
import { User } from "@src/api/user/types";
import { ApiErrorClass } from "@src/api/config/api-error";
import { getAccessToken } from "@src/utils";

const handleError = (error: unknown) => {
  if (error instanceof ApiErrorClass) {
    toast.error(`${error.message}`);
    return;
  }

  toast.error(ERROR_MESSAGE);
};

// TODO: Проблема в том, что отмену запрсов необходимо выполнять вручную. Если мы запустим 2 раза подряд logout, то он вызовется 2 раза подряд.
// Надо как-нибудь обрабатывать этот кейс. В сагах очень хорошо реализована отмена выполнения функции. Сюда мы прикрутить ее + автоматическое отмену запросов в thunk текущем
const logout = createAppAsyncThunk("user/logout", async (_, { dispatch }) => {
  try {
    deleteCookie("token");
    deleteItemFromLocalStorage("accessToken");
    dispatch(
      userActions.changeState({
        user: null,
        error: null,
        status: AuthStatus.Anonymous,
      })
    );

    await API.user.logout();
  } catch (error) {
    handleError(error);
  }
});

const update = createAppAsyncThunk(
  "user/update",
  async (updatedFields: Partial<User>, { dispatch }) => {
    const accessToken = getAccessToken();

    if (!accessToken) return;

    try {
      const response = await API.user.updateUser(updatedFields, accessToken);

      dispatch(userActions.setUser(response.user));
    } catch (error) {
      handleError(error);
    }
  }
);

const changePassword = createAppAsyncThunk(
  "user/resetPassword",
  async ({ password, code }: { password: string; code: string }, { extra }) => {
    try {
      await API.user.changePassword({ password, token: code });

      extra.history.push(PAGES.HOME);
    } catch (error) {
      handleError(error);
    }
  }
);

const signIn = createAppAsyncThunk(
  "user/signIn",
  async (
    { email, password }: { email: string; password: string },
    { dispatch, extra, getState }
  ) => {
    const store = getState();
    const userSlice = store.user;

    if (userSlice.status === AuthStatus.Initial) {
      dispatch(userActions.setStatus(AuthStatus.Pending));
    }

    try {
      const { accessToken, refreshToken, user } = await API.user.signIn({
        email,
        password,
      });

      setCookie("token", refreshToken);
      setItemToLocalStorage(
        "accessToken",
        JSON.stringify({ token: accessToken })
      );

      dispatch(
        userActions.changeState({
          user,
          error: null,
          status: AuthStatus.Authenticated,
        })
      );

      extra.history.push(PAGES.HOME);
    } catch (error) {
      dispatch(
        userActions.changeState({
          user: null,
          error:
            error instanceof ApiErrorClass
              ? error
              : new ApiErrorClass(UNKNOWN_ERROR_MESSAGE),
          status: AuthStatus.Anonymous,
        })
      );

      handleError(error);
    }
  }
);

const signUp = createAppAsyncThunk(
  "user/signUp",
  async (
    {
      email,
      name,
      password,
    }: { email: string; name: string; password: string },
    { dispatch, extra, getState }
  ) => {
    const store = getState();
    const userSlice = store.user;

    if (userSlice.status === AuthStatus.Initial) {
      dispatch(userActions.setStatus(AuthStatus.Pending));
    }

    try {
      const { accessToken, refreshToken, user } = await API.user.signUp({
        email,
        name,
        password,
      });

      setCookie("token", refreshToken);
      setItemToLocalStorage(
        "accessToken",
        JSON.stringify({ token: accessToken })
      );

      dispatch(
        userActions.changeState({
          user,
          error: null,
          status: AuthStatus.Authenticated,
        })
      );

      extra.history.replace(PAGES.HOME);
    } catch (error) {
      dispatch(
        userActions.changeState({
          user: null,
          error:
            error instanceof ApiErrorClass
              ? error
              : new ApiErrorClass(UNKNOWN_ERROR_MESSAGE),
          status: AuthStatus.Anonymous,
        })
      );

      handleError(error);
    }
  }
);

const forgotPassword = createAppAsyncThunk(
  "user/forgotPassword",
  async ({ email }: { email: string }, { extra }) => {
    try {
      await API.user.forgotPassword(email);

      extra.history.push(PAGES.RESET_PASSWORD);
    } catch (error) {
      handleError(error);
    }
  }
);

const sessionRequest = createAppAsyncThunk(
  "user/sessionRequest",
  async (_, { dispatch, getState }) => {
    const store = getState();
    const userSlice = store.user;

    if (userSlice.status === AuthStatus.Initial) {
      dispatch(userActions.setStatus(AuthStatus.Pending));
    }

    try {
      const accessToken = getAccessToken();

      const { user } = await API.user.getUser(accessToken);

      dispatch(
        userActions.changeState({
          user,
          error: null,
          status: AuthStatus.Authenticated,
        })
      );
    } catch (error) {
      dispatch(
        userActions.changeState({
          user: null,
          error:
            error instanceof ApiErrorClass
              ? error
              : new ApiErrorClass(UNKNOWN_ERROR_MESSAGE),
          status: AuthStatus.Anonymous,
        })
      );

      handleError(error);
    }
  }
);

export const thunks = {
  changePassword,
  forgotPassword,
  signIn,
  signUp,
  update,
  logout,
  sessionRequest,
};
