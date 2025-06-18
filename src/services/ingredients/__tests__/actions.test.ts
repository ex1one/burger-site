import { ingredientsReducer, ingredientsActions, initialState } from "../slice";

import { Ingredients } from "@src/api/ingredients/types";

describe("ingredientsSlice reducers", () => {
  let state = initialState;

  afterEach(() => {
    state = initialState;
  });

  it("Если не вызвался ни один reducer, state не должен изменяться", () => {
    expect(ingredientsReducer(undefined, {})).toEqual(state);
  });

  it("Reducer: setIngredients. Должен установить список ингредиентов", () => {
    const ingredients = [
      { name: "Летучая рыба", type: "sauce" },
      { name: "Бекон", type: "meat" },
    ] as Ingredients;

    const newState = ingredientsReducer(
      state,
      ingredientsActions.setIngredients(ingredients)
    );

    expect(newState.ingredients).toEqual(ingredients);
    expect(newState).toEqual({ ...state, ingredients });
  });
});
