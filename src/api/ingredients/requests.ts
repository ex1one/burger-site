import { YandexApi } from "../config/urls";

import { Ingredients } from "./types";

import myFetch, { OptionsWithoutMethod } from "@src/api/my-fetch";

const BASE_URL = YandexApi;

// TODO: Создать обертку над запросом, чтобы автоматически все запросы принимали options.
// Чтобы не надо было постоянно прокидывать options
export const getIngredients = (options: OptionsWithoutMethod) => {
  return myFetch.get<{ success: boolean; data: Ingredients }>(
    BASE_URL + "/ingredients",
    options
  );
};
