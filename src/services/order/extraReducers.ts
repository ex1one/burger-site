import { thunks } from './thunks';

import { TInitialState } from '.';

import { TExtraReducers } from '@src/types';

export const extraReducers: TExtraReducers<TInitialState> = (builder) => {
	builder
		.addCase(thunks.createOrderThunk.fulfilled, (state, action) => {
			state.order = { name: action.payload.name, number: action.payload.order.number };
			state.isLoading = false;
			state.status = 'success';
		})
		.addCase(thunks.createOrderThunk.rejected, (state, action) => {
			state.isLoading = false;
			state.status = 'error';
			state.error = action.error.message;
		})
		.addCase(thunks.createOrderThunk.pending, (state) => {
			state.isLoading = true;
			state.status = 'pending';
		});
};
