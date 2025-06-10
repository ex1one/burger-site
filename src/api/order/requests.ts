import { YandexApi } from "../config/urls";

import { Order } from "./types";

import { getAccessToken } from "@src/utils";
import myFetch from "@src/api/my-fetch";

const BASE_URL = YandexApi;

export const createOrder = (ingredientsIds: string[]) => {
  return myFetch.post<{ success: boolean; order: Order; name: string }>(
    BASE_URL + "/orders",
    {
      data: { ingredients: ingredientsIds },
      headers: {
        Authorization: getAccessToken(),
      },
    }
  );
};
