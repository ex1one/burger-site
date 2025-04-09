import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { getIngredients } from '@src/api/ingredients';
import { Ingredients } from '@src/api/ingredients/types';

export const fetchIngredients = createAsyncThunk('ingredients/fetchIngredients', async () => {
	const response = await getIngredients();

	if (!response.success) {
		throw new Error('Error while request ingredients');
	}

	return response.data;
});

interface IngredientsSliceState {
	ingredients: Ingredients;
	isLoading: boolean;
	status: 'pending' | 'success' | 'error';
	error: any;
}

const initialState: IngredientsSliceState = {
	ingredients: [],
	status: 'pending',
	isLoading: false,
	error: null,
};

const ingredientsSlice = createSlice({
	name: 'ingredients',
	initialState,
	reducers: {
		setIngredients: (state, action: PayloadAction<Ingredients>) => {
			state.ingredients = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchIngredients.fulfilled, (state, action) => {
				state.ingredients = action.payload;
				state.isLoading = false;
				state.status = 'success';
			})
			.addCase(fetchIngredients.rejected, (state, action) => {
				state.isLoading = false;
				state.status = 'error';
				state.error = action.error.message;
			})
			.addCase(fetchIngredients.pending, (state) => {
				state.isLoading = true;
				state.status = 'pending';
			});
	},
	selectors: {
		ingredientsSelector: (state) => state,
	},
});

export const {} = ingredientsSlice.actions;

export const { ingredientsSelector } = ingredientsSlice.selectors;

export default ingredientsSlice.reducer;
