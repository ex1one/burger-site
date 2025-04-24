import { createAsyncThunk } from '@reduxjs/toolkit';

import API from '@src/api';

export const createOrderThunk = createAsyncThunk('order/createOrder', async (ingredients: string[]) => {
	const response = await API.order.createOrder(ingredients);

	if (!response.success) {
		throw new Error('Error while request ingredients');
	}

	return response;
});
