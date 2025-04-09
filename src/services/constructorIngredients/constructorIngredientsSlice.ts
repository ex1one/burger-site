import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Ingredient, IngredientWithUniqueId } from '@src/api/ingredients/types';
import { v4 as uuid4 } from 'uuid';

const initialState: { ingredients: IngredientWithUniqueId[] } = {
	ingredients: [],
};

const constructorIngredientsSlice = createSlice({
	name: 'constructorIngredients',
	initialState,
	reducers: {
		addIngredient: {
			reducer(state, action: PayloadAction<IngredientWithUniqueId>) {
				state.ingredients.splice(state.ingredients.length - 1, 0, action.payload);
			},
			prepare(payload: Ingredient) {
				return { payload: { ...payload, uniqueId: uuid4() } };
			},
		},
		removeIngredient(state, action: PayloadAction<string>) {
			state.ingredients = state.ingredients.filter((ingredient) => ingredient.uniqueId !== action.payload);
		},
		addBun: {
			reducer(state, action: PayloadAction<IngredientWithUniqueId>) {
				const existingBun = state.ingredients.find((el) => el.type === 'bun');

				if (existingBun) {
					const newEl = state.ingredients.filter((el) => el.type !== 'bun');
					newEl.unshift(action.payload);
					newEl.push({ ...action.payload, uniqueId: uuid4() });
					state.ingredients = newEl;
					return;
				}

				state.ingredients.unshift(action.payload);
				state.ingredients.push({ ...action.payload, uniqueId: uuid4() });
			},
			prepare(payload: Ingredient) {
				return { payload: { ...payload, uniqueId: uuid4() } };
			},
		},
		reorderIngredients(state, action: PayloadAction<{ dragIngredientId: string; hoverIngredientId: string }>) {
			const dragIngredientIndex = state.ingredients.findIndex(
				(el) => el.uniqueId === action.payload.dragIngredientId,
			);
			const hoverIngredientIndex = state.ingredients.findIndex(
				(el) => el.uniqueId === action.payload.hoverIngredientId,
			);

			if (!dragIngredientIndex || !hoverIngredientIndex) return;

			const dragIngredient = state.ingredients[dragIngredientIndex];
			const hoverIngredient = state.ingredients[hoverIngredientIndex];

			if (!dragIngredient || !hoverIngredient) return;

			if (hoverIngredient.type === 'bun') return;

			const arr = [...state.ingredients];
			arr[dragIngredientIndex] = hoverIngredient;
			arr[hoverIngredientIndex] = dragIngredient;

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
