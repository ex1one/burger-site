import { YandexApi } from "../config/urls";
import { getItemFromLocalStorage } from "../utils";

import { Order } from "./types";

import myFetch from "@src/api/my-fetch";

const BASE_URL = YandexApi;

export const createOrder = (ingredientsIds: string[]) => {
  const accessToken = getItemFromLocalStorage("accessToken");

  return myFetch.post<{ success: boolean; order: Order; name: string }>(
    BASE_URL + "/orders",
    {
      data: { ingredients: ingredientsIds },
      headers: {
        Authorization: accessToken,
      },
    }
  );
};
