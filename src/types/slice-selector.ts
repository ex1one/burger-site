import { SliceSelectors } from "@reduxjs/toolkit";

export type TSliceSelectors<State = Record<string, any>> =
  SliceSelectors<State>;

export type TSliceSelector = TSliceSelectors[keyof TSliceSelectors];
