import { ReducerCreators, SliceCaseReducers, ValidateSliceCaseReducers } from '@reduxjs/toolkit';

export type TSliceReducerActions<State> =
	| ValidateSliceCaseReducers<State, SliceCaseReducers<State>>
	| ((creators: ReducerCreators<State>) => SliceCaseReducers<State>);
