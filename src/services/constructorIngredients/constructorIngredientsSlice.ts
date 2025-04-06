import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Ingredient, Ingredients } from '@src/api/ingredients/types';

const initialState: { ingredients: Ingredients } = {
	ingredients: [],
};

const constructorIngredientsSlice = createSlice({
	name: 'constructorIngredients',
	initialState,
	reducers: {
		addIngredient(state, action: PayloadAction<Ingredient>) {
			state.ingredients.splice(state.ingredients.length - 1, 0, action.payload);
		},
		removeIngredient(state, action: PayloadAction<number>) {
			state.ingredients = state.ingredients.filter((_, index) => index !== action.payload);
		},
		addBun(state, action: PayloadAction<Ingredient>) {
			const existingBun = state.ingredients.find((el) => el.type === 'bun');

			if (existingBun) {
				const newEl = state.ingredients.filter((el) => el.type !== 'bun');
				newEl.unshift(action.payload);
				newEl.push(action.payload);
				state.ingredients = newEl;
				return;
			}

			state.ingredients.unshift(action.payload);
			state.ingredients.push(action.payload);
		},
		reorderIngredients(state, action: PayloadAction<{ dragIndex: number; hoverIndex: number }>) {
			const index1 = action.payload.dragIndex;
			const index2 = action.payload.hoverIndex;
			const arr = [...state.ingredients];
			if (index1 < 0 || index1 >= arr.length || index2 < 0 || index2 >= arr.length) {
				return;
			}
			const temp = arr[index1];
			arr[index1] = arr[index2];
			arr[index2] = temp;
			state.ingredients = arr;
		},
		clearConstructor(state) {
			state.ingredients = [];
		},
	},
	selectors: {
		constructorIngredientsSelector: (state) => state,
	},
});

export const { addIngredient, removeIngredient, addBun, reorderIngredients, clearConstructor } =
	constructorIngredientsSlice.actions;

export const { constructorIngredientsSelector } = constructorIngredientsSlice.selectors;

export default constructorIngredientsSlice.reducer;
