import { TInitialState, initialState } from "./slice";

import { TSliceReducerActions } from "@src/types";

export const actions = {
  clearOrder: () => {
    return initialState;
  },
} satisfies TSliceReducerActions<TInitialState>;
