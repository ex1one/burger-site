import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Ingredient } from '@src/api/ingredients/types';

const initialState: { ingredient: Ingredient | null } = {
	ingredient: null,
};

const ingredientDetailSlice = createSlice({
	name: 'ingredientDetail',
	initialState,
	reducers: {
		setIngredientDetail(state, action: PayloadAction<Ingredient>) {
			state.ingredient = action.payload;
		},
		clearIngredientDetail(state) {
			state.ingredient = null;
		},
	},
	selectors: {
		ingredientDetailSelector: (state) => state.ingredient,
	},
});

export const { setIngredientDetail, clearIngredientDetail } = ingredientDetailSlice.actions;

export const { ingredientDetailSelector } = ingredientDetailSlice.selectors;

export default ingredientDetailSlice.reducer;
