import { createAppAsyncThunk } from '@src/store/shared';

import API from '@src/api';

const createOrderThunk = createAppAsyncThunk('order/createOrder', async (ingredients: string[]) => {
	const response = await API.order.createOrder(ingredients);

	if (!response.success) {
		throw new Error('Error while request ingredients');
	}

	return response;
});

export const thunks = {
	createOrderThunk,
};
