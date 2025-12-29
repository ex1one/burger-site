import { TInitialState } from "./slice";

import { TSliceSelectors } from "@src/types";

export const selectors = {
  ordersSelector: (state) => state.orders,
  errorSelector: (state) => state.error,
  statusSelector: (state) => state.status,
  sliceSelector: (state) => state,
} satisfies TSliceSelectors<TInitialState>;
