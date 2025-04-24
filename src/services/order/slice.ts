import { createSlice } from '@reduxjs/toolkit';

import { selectors } from './selectors';
import { actions } from './actions';
import { createOrderThunk } from './thunks';

export interface TInitialState {
	status: string;
	order: { number: number; name: string } | null;
	isLoading: boolean;
	error: any;
}

export const initialState: TInitialState = {
	status: 'pending',
	order: null,
	isLoading: false,
	error: null,
};

const orderSlice = createSlice({
	name: 'order',
	initialState,
	reducers: actions,
	// TODO: Разобраться с extraReducers. Их тоже вынести
	extraReducers: (builder) => {
		builder
			.addCase(createOrderThunk.fulfilled, (state, action) => {
				state.order = { name: action.payload.name, number: action.payload.order.number };
				state.isLoading = false;
				state.status = 'success';
			})
			.addCase(createOrderThunk.rejected, (state, action) => {
				state.isLoading = false;
				state.status = 'error';
				state.error = action.error.message;
			})
			.addCase(createOrderThunk.pending, (state) => {
				state.isLoading = true;
				state.status = 'pending';
			});
	},
	selectors,
});

export const { reducer: orderReducer, actions: orderActions, selectors: orderSelectors } = orderSlice;
