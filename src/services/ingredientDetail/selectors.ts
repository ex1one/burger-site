import { TInitialState } from "./slice";

import { TSliceSelectors } from "@src/types";

export const selectors = {
  ingredientSelector: (state) => state.ingredient,
  statusSelector: (state) => state.status,
  errorSelector: (state) => state.error,
  sliceSelector: (state) => state,
} satisfies TSliceSelectors<TInitialState>;
