import { OptionsWithoutMethodAndData } from "../my-fetch";

import { Order } from "./types";

import { getAccessToken } from "@src/utils";
import myFetch from "@src/api/my-fetch";

export const createOrder = (
  ingredientsIds: string[],
  options?: OptionsWithoutMethodAndData
) => {
  return myFetch.post<{ success: boolean; order: Order; name: string }>(
    "orders",
    {
      ...options,
      data: { ingredients: ingredientsIds },
      headers: {
        Authorization: getAccessToken(),
        ...options?.headers,
      },
    }
  );
};
