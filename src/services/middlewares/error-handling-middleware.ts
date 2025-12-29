// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { Middleware } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

import { ERROR_MESSAGE } from "@src/consts";

export const errorHandlingMiddleware: Middleware = () => (next) => (action) => {
  if (
    action.type &&
    typeof action.type === "string" &&
    action.type.endsWith("/rejected")
  ) {
    const error = action.error;

    toast.error(error.message || ERROR_MESSAGE);
  }

  return next(action);
};
