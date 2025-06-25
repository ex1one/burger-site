import { TInitialState } from "./slice";

import { TSliceSelectors } from "@src/types";

export const selectors = {
  errorSelector: (state) => state.error,
  statusSelector: (state) => state.status,
  ingredientsSelector: (state) => state.ingredients,
  sliceSelector: (state) => state,
} satisfies TSliceSelectors<TInitialState>;
