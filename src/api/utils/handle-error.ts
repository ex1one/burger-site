import { ApiErrorClass } from "../config/api-error";

import { UNKNOWN_ERROR_MESSAGE } from "@src/consts";

export const handleError = (error: any) => {
  if (
    error &&
    typeof error === "object" &&
    "success" in error &&
    "message" in error
  ) {
    return new ApiErrorClass(error.message);
  }

  return new ApiErrorClass(UNKNOWN_ERROR_MESSAGE);
};
