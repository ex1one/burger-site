import { TInitialState } from "./slice";

import { TSliceSelectors } from "@src/types";

export const selectors = {
  getOrders: (state) => state.orders,
  getError: (state) => state.error,
  getStatus: (state) => state.status,
  getSlice: (state) => state,
} satisfies TSliceSelectors<TInitialState>;
