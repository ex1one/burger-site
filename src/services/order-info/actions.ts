import { TInitialState, initialState } from "./slice";

import { TSliceReducerActions } from "@src/types";

export const actions = {
  clear: () => {
    return initialState;
  },
} satisfies TSliceReducerActions<TInitialState>;
