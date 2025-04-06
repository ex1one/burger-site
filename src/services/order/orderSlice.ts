import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createOrder } from '@src/api/order';

// TODO: Вынести
export const createOrderThunk = createAsyncThunk('order/createOrder', async (ingredients: string[]) => {
	const response = await createOrder(ingredients);

	if (!response.success) {
		throw new Error('Error while request ingredients');
	}

	return response;
});

interface OrderState {
	status: string;
	order: { number: number; name: string } | null;
	isLoading: boolean;
	error: any;
}

const initialState: OrderState = {
	status: 'pending',
	order: null,
	isLoading: false,
	error: null,
};

const orderSlice = createSlice({
	name: 'order',
	initialState,
	reducers: {
		clearOrder: () => {
			return initialState;
		},
	},
	selectors: {
		orderSelector: (state) => state,
	},
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
});

export const { clearOrder } = orderSlice.actions;

export const { orderSelector } = orderSlice.selectors;

export default orderSlice.reducer;
