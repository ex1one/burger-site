import { createAsyncThunk } from '@reduxjs/toolkit';

import API from '@src/api';

// TODO: Может быть такое, что запрос на получение вызывается 2 раза из-за strict-mode
// Смотри решение - https://redux-toolkit.js.org/api/createAsyncThunk#cancellation
export const fetchIngredients = createAsyncThunk('ingredients/fetchIngredients', async () => {
	const response = await API.ingredients.getIngredients();

	if (!response.success) {
		throw new Error('Error while request ingredients');
	}

	return response.data;
});
