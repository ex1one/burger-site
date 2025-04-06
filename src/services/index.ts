import { combineReducers } from '@reduxjs/toolkit';

import constructorIngredientsReducer from './constructorIngredients/constructorIngredientsSlice';
import ingredientDetailReducer from './ingredientDetail/ingredientDetailSlice';
import ingredientsReducer from './ingredients/ingredientsSlice';
import orderReducer from './order/orderSlice';
import modalsReducer from './modals/modalsSlice';

export const rootReducer = combineReducers({
	constructorIngredients: constructorIngredientsReducer,
	ingredientDetail: ingredientDetailReducer,
	ingredients: ingredientsReducer,
	order: orderReducer,
	modals: modalsReducer,
});
