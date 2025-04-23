import { createSlice } from '@reduxjs/toolkit';
import { Ingredients } from '@src/api/ingredients/types';

import { selectors } from './selectors';
import { actions } from './actions';
import { thunks } from './thunks';

export interface TInitialState {
	ingredients: Ingredients;
	isLoading: boolean;
	status: 'pending' | 'success' | 'error';
	error: any;
}

export const initialState: TInitialState = {
	ingredients: [],
	status: 'pending',
	isLoading: false,
	error: null,
};

const ingredientsSlice = createSlice({
	name: 'ingredients',
	initialState,
	reducers: actions,
	extraReducers: (builder) => {
		builder
			.addCase(thunks.fetchIngredients.fulfilled, (state, action) => {
				state.ingredients = action.payload;
				state.isLoading = false;
				state.status = 'success';
			})
			.addCase(thunks.fetchIngredients.rejected, (state, action) => {
				state.isLoading = false;
				state.status = 'error';
				state.error = action.error.message;
			})
			.addCase(thunks.fetchIngredients.pending, (state) => {
				state.isLoading = true;
				state.status = 'pending';
			});
	},
	selectors: selectors,
});

export const {
	reducer: ingredientsReducer,
	actions: ingredientsActions,
	selectors: ingredientsSelectors,
} = ingredientsSlice;

export const ingredientsThunks = thunks;
