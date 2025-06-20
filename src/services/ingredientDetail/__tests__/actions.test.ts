import {
  ingredientDetailReducer,
  ingredientDetailActions,
  initialState,
} from "../slice";

import { Ingredient } from "@src/api/ingredients/types";

describe("ingredientDetailSlice reducers", () => {
  let state = initialState;

  afterEach(() => {
    state = initialState;
  });

  it("Если не вызвался ни один reducer, state не должен изменяться", () => {
    expect(ingredientDetailReducer(undefined, {})).toEqual(state);
  });

  it("Reducer: setIngredientDetail. Должен установить детали ингредиента", () => {
    const ingredient = {
      name: "Летучая рыба",
      type: "sauce",
    } as Ingredient;

    const newState = ingredientDetailReducer(
      state,
      ingredientDetailActions.setIngredientDetail(ingredient)
    );

    expect(newState.ingredient).toEqual(ingredient);
    expect(newState).toEqual({ ...state, ingredient });
  });

  it("Reducer: clearIngredientDetail. Должен очистить детали ингредиента до начального состояния", () => {
    const ingredient = {
      name: "Летучая рыба",
      type: "sauce",
    } as Ingredient;

    state = { ...state, ingredient };

    const newState = ingredientDetailReducer(
      state,
      ingredientDetailActions.clearIngredientDetail()
    );

    expect(newState).toEqual(initialState);
  });
});
