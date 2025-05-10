import { TExtraReducers } from '@src/types';
import { TInitialState } from '.';
import { thunks } from './thunks';

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
