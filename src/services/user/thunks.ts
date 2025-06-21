import API from "@src/api";
import { PAGES } from "@src/consts";
import {
  deleteCookie,
  deleteItemFromLocalStorage,
  setCookie,
  setItemToLocalStorage,
} from "@src/api/utils";
import { createAppAsyncThunk } from "@src/store/shared";
import { User } from "@src/api/user/types";
import { getAccessToken } from "@src/utils";

/*

    TODO: Сделать по примеру отсюда. Thunks выполняют 1 задачу. Обработка в extraReducers.

*/

// TODO: Проблема в том, что отмену запрсов необходимо выполнять вручную. Если мы запустим 2 раза подряд logout, то он вызовется 2 раза подряд.
// Надо как-нибудь обрабатывать этот кейс. В сагах очень хорошо реализована отмена выполнения функции. Сюда мы прикрутить ее + автоматическое отмену запросов в thunk текущем
const logout = createAppAsyncThunk("user/logout", async () => {
  const response = await API.user.logout();

  deleteCookie("token");
  deleteItemFromLocalStorage("accessToken");

  return response;
});

const update = createAppAsyncThunk(
  "user/update",
  async (updatedFields: Partial<User>) => {
    const accessToken = getAccessToken();

    const response = await API.user.updateUser(updatedFields, accessToken);

    return response;
  }
);

const changePassword = createAppAsyncThunk(
  "user/resetPassword",
  async ({ password, code }: { password: string; code: string }, { extra }) => {
    const response = await API.user.changePassword({ password, token: code });

    extra.history.push(PAGES.HOME);

    return response;
  }
);

const signIn = createAppAsyncThunk(
  "user/signIn",
  async (
    { email, password }: { email: string; password: string },
    { extra }
  ) => {
    const response = await API.user.signIn({
      email,
      password,
    });

    // TODO: Вынести в функцию, которая работает с куками браузера. Туда передавать данные accessToken, refreshToken
    setCookie("token", response.refreshToken);
    setItemToLocalStorage(
      "accessToken",
      JSON.stringify({ token: response.accessToken })
    );

    extra.history.push(PAGES.HOME);

    return response;
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
    { extra }
  ) => {
    const response = await API.user.signUp({
      email,
      name,
      password,
    });

    setCookie("token", response.refreshToken);
    setItemToLocalStorage(
      "accessToken",
      JSON.stringify({ token: response.accessToken })
    );

    extra.history.replace(PAGES.HOME);

    return response;
  }
);

// TODO: Доделать эту логику. С изменением пароля
const forgotPassword = createAppAsyncThunk(
  "user/forgotPassword",
  async ({ email }: { email: string }, { extra }) => {
    const response = await API.user.forgotPassword(email);

    extra.history.push(PAGES.RESET_PASSWORD);

    return response;
  }
);

const sessionRequest = createAppAsyncThunk("user/sessionRequest", () => {
  const accessToken = getAccessToken();

  return API.user.getUser(accessToken);
});

export const thunks = {
  changePassword,
  forgotPassword,
  signIn,
  signUp,
  update,
  logout,
  sessionRequest,
};
