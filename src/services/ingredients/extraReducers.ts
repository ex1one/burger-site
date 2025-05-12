import { thunks } from './thunks';

import { TInitialState } from '.';

import { TExtraReducers } from '@src/types';

export const extraReducers: TExtraReducers<TInitialState> = (builder) => {
	builder
		.addCase(thunks.fetchIngredients.fulfilled, (state, action) => {
			state.ingredients = action.payload;
			state.isLoading = false;
			state.status = 'success';
		})
		.addCase(thunks.fetchIngredients.rejected, (state, action) => {
			if (action.meta.aborted) {
				return;
			}

			state.isLoading = false;
			state.status = 'error';
			state.error = action.error.message;
		})
		.addCase(thunks.fetchIngredients.pending, (state) => {
			state.isLoading = true;
			state.status = 'pending';
		});
};
