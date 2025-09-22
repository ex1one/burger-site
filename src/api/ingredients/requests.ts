import { OptionsWithoutMethodAndData } from "../my-fetch";

import { Ingredients } from "./types";

import myFetch from "@src/api/my-fetch";

export const getIngredients = (options?: OptionsWithoutMethodAndData) => {
  return myFetch.get<{ success: boolean; data: Ingredients }>(
    "ingredients",
    options
  );
};
