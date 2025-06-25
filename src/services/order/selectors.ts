import { TInitialState } from "./slice";

import { TSliceSelectors } from "@src/types";

export const selectors = {
  statusSelector: (state) => state.status,
  orderSelector: (state) => state.order,
  errorSelector: (state) => state.error,
  sliceSelector: (state) => state,
} satisfies TSliceSelectors<TInitialState>;
