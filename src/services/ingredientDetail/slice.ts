import { createSlice } from '@reduxjs/toolkit';
import { Ingredient } from '@src/api/ingredients/types';

import { actions } from './actions';
import { selectors } from './selectors';

export interface TInitialState {
	ingredient: Ingredient | null;
}

const initialState: TInitialState = {
	ingredient: null,
};

const ingredientDetailSlice = createSlice({
	name: 'ingredientDetail',
	initialState,
	reducers: actions,
	selectors,
});

export const {
	reducer: ingredientDetailReducer,
	actions: ingredientDetailActions,
	selectors: ingredientDetailSelectors,
} = ingredientDetailSlice;
