import { ActionReducerMapBuilder } from '@reduxjs/toolkit';

export type TExtraReducers<S> = (builder: ActionReducerMapBuilder<S>) => void;
