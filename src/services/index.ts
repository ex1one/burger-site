import { combineReducers } from "@reduxjs/toolkit";

import { constructorIngredientsReducer } from "./constructorIngredients";
import { ingredientDetailReducer } from "./ingredientDetail";
import { ingredientsReducer } from "./ingredients";
import { orderReducer } from "./order/slice";
import { modalsReducer } from "./modals";
import { userReducer } from "./user";
import { feedReducer } from "./feed";
import { orderHistoryReducer } from "./order-history";

export const rootReducer = combineReducers({
  constructorIngredients: constructorIngredientsReducer,
  ingredientDetail: ingredientDetailReducer,
  ingredients: ingredientsReducer,
  order: orderReducer,
  modals: modalsReducer,
  user: userReducer,
  feed: feedReducer,
  orderHistory: orderHistoryReducer,
});
