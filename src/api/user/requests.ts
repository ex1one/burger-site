import { getCookie } from "../utils";
import { OptionsWithoutMethodAndData } from "../my-fetch";

import { User } from "./types";

import myFetch from "@src/api/my-fetch";

export const forgotPassword = (
  email: string,
  options?: OptionsWithoutMethodAndData
) => {
  return myFetch.post<{ success: boolean; message: string }>("password-reset", {
    ...options,
    data: { email },
  });
};

export const changePassword = (
  {
    password,
    token,
  }: {
    password: string;
    token: string;
  },
  options?: OptionsWithoutMethodAndData
) => {
  return myFetch.post<{ success: boolean; message: string }>(
    "password-reset/reset",
    {
      ...options,
      data: { password, token },
    }
  );
};

export const signUp = (
  {
    name,
    email,
    password,
  }: {
    name: string;
    email: string;
    password: string;
  },
  options?: OptionsWithoutMethodAndData
) => {
  return myFetch.post<{
    success: boolean;
    user: User;
    accessToken: string;
    refreshToken: string;
  }>("auth/register", {
    ...options,
    data: { name, email, password },
  });
};

export const signIn = (
  {
    email,
    password,
  }: {
    email: string;
    password: string;
  },
  options?: OptionsWithoutMethodAndData
) => {
  return myFetch.post<{
    success: boolean;
    user: User;
    accessToken: string;
    refreshToken: string;
  }>("auth/login", {
    ...options,
    data: { email, password },
  });
};

export const logout = (options?: OptionsWithoutMethodAndData) => {
  const refreshToken = getCookie("token");

  return myFetch.post<{ success: boolean; message: string }>("auth/logout", {
    ...options,
    data: { token: refreshToken },
  });
};

export const refreshAccessToken = (
  refreshToken: string,
  options?: OptionsWithoutMethodAndData
) => {
  return myFetch.post<{
    success: boolean;
    accessToken: string;
    refreshToken: string;
  }>("auth/token", {
    ...options,
    data: { token: refreshToken },
  });
};

export const getUser = (
  accessToken: string,
  options?: OptionsWithoutMethodAndData
) => {
  return myFetch.get<{ success: boolean; user: User }>("auth/user", {
    ...options,
    headers: {
      Authorization: accessToken,
      "Content-Type": "application/json; charset=utf-8",
      ...options?.headers,
    },
  });
};

export const updateUser = (
  user: Partial<User>,
  accessToken: string,
  options?: OptionsWithoutMethodAndData
) => {
  return myFetch.patch<{ success: boolean; user: User }>("auth/user", {
    ...options,
    data: user,
    headers: {
      Authorization: accessToken,
      "Content-Type": "application/json; charset=utf-8",
      ...options?.headers,
    },
  });
};
