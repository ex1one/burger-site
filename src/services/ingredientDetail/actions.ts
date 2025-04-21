import { PayloadAction } from '@reduxjs/toolkit';
import { Ingredient } from '@src/api/ingredients/types';
import { TSliceReducerActions } from '@src/types';

import { TInitialState } from './slice';

export const actions = {
	setIngredientDetail(state, action: PayloadAction<Ingredient>) {
		state.ingredient = action.payload;
	},
	clearIngredientDetail(state) {
		state.ingredient = null;
	},
} satisfies TSliceReducerActions<TInitialState>;
