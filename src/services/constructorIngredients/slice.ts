import { createSlice } from '@reduxjs/toolkit';
import { IngredientWithUniqueId } from '@src/api/ingredients/types';
import { selectors } from './selectors';
import { actions } from './actions';

export interface TInitialState {
	ingredients: IngredientWithUniqueId[];
}

export const initialState: TInitialState = {
	ingredients: [],
};

const constructorIngredientsSlice = createSlice({
	name: 'constructorIngredients',
	initialState,
	reducers: actions,
	selectors: selectors,
});

export const {
	reducer: constructorIngredientsReducer,
	actions: constructorIngredientsActions,
	selectors: constructorIngredientsSelectors,
} = constructorIngredientsSlice;
