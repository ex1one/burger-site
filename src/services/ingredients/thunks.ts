import { createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '@src/types';

import API from '@src/api';

const fetchIngredients = createAsyncThunk(
	'ingredients/fetchIngredients',
	async () => {
		const response = await API.ingredients.getIngredients();

		if (!response.success) {
			throw new Error('Error while request ingredients');
		}

		return response.data;
	},
	{
		condition: (_, { getState }) => {
			const {
				ingredients: { status },
			} = getState() as RootState;

			if (status === 'pending') return false;

			return true;
		},
	},
);

export const thunks = {
	fetchIngredients,
};
