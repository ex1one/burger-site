import { PayloadAction } from '@reduxjs/toolkit';
import { Ingredients } from '@src/api/ingredients/types';

import { TInitialState } from './slice';
import { TSliceReducerActions } from '@src/types';

export const actions = {
	setIngredients: (state, action: PayloadAction<Ingredients>) => {
		state.ingredients = action.payload;
	},
} satisfies TSliceReducerActions<TInitialState>;
