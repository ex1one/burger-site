import {
  initialState,
  constructorIngredientsReducer,
  constructorIngredientsActions,
} from "../slice";

import { Ingredient, IngredientWithUniqueId } from "@src/api/ingredients/types";

describe("ingredientSlice reducers", () => {
  let state = initialState;

  afterEach(() => {
    state = initialState;
  });

  it("Если не вызвался ни один reducer, state не должен изменяться", () => {
    expect(constructorIngredientsReducer(undefined, {})).toEqual(state);
  });

  it("Reducer: addIngredient. Должен добавить ингредиент в конец массива", () => {
    const ingredient = { name: "Летучая рыба", type: "sauce" };
    const { payload } = constructorIngredientsActions.addIngredient(
      ingredient as Ingredient
    );

    const newState = constructorIngredientsReducer(
      state,
      constructorIngredientsActions.addIngredient(payload)
    );

    expect(newState.ingredients.length).toBe(1);
    expect(newState.ingredients[0]).toEqual(
      expect.objectContaining({ uniqueId: expect.any(String), ...ingredient })
    );
  });

  it("Reducer: removeIngredient. Должен удалить ингредиент по уникальному идентификатору", () => {
    const ingredient1 = {
      name: "Летучая рыба",
      type: "sauce",
      uniqueId: "1",
    } as IngredientWithUniqueId;
    const ingredient2 = {
      name: "Бекон",
      type: "meat",
      uniqueId: "2",
    } as IngredientWithUniqueId;

    state = {
      ingredients: [ingredient1, ingredient2],
    };

    const newState = constructorIngredientsReducer(
      state,
      constructorIngredientsActions.removeIngredient("1")
    );

    expect(newState.ingredients.length).toBe(1);
    expect(newState.ingredients).toEqual([ingredient2]);
  });

  it("Reducer: addBun. Должен добавить булку и удалить остальные булки", () => {
    const bun1 = { name: "Булка", type: "bun" } as IngredientWithUniqueId;
    const bun2 = {
      name: "Булка с кунжутом",
      type: "bun",
    } as IngredientWithUniqueId;

    let newState = constructorIngredientsReducer(
      state,
      constructorIngredientsActions.addBun(bun1)
    );

    expect(newState.ingredients.length).toBe(2);
    expect(newState.ingredients[0]).toEqual(
      expect.objectContaining({ ...bun1, uniqueId: expect.any(String) })
    );
    expect(newState.ingredients[newState.ingredients.length - 1]).toEqual(
      expect.objectContaining({ ...bun1, uniqueId: expect.any(String) })
    );

    newState = constructorIngredientsReducer(
      newState,
      constructorIngredientsActions.addBun(bun2)
    );

    expect(newState.ingredients.length).toBe(2);
    expect(newState.ingredients[0]).toEqual(
      expect.objectContaining({ ...bun2, uniqueId: expect.any(String) })
    );
    expect(newState.ingredients[newState.ingredients.length - 1]).toEqual(
      expect.objectContaining({ ...bun2, uniqueId: expect.any(String) })
    );
  });

  it("Reducer: reorderIngredients. Должен корректно менять местами ингредиенты", () => {
    const ingredient1 = {
      name: "Капуста",
      type: "vegetable",
      uniqueId: "1",
    } as IngredientWithUniqueId;
    const ingredient2 = {
      name: "Помидор",
      type: "vegetable",
      uniqueId: "2",
    } as IngredientWithUniqueId;

    state = {
      ingredients: [ingredient1, ingredient2],
    };

    const newState = constructorIngredientsReducer(
      state,
      constructorIngredientsActions.reorderIngredients({
        dragIngredientId: "1",
        hoverIngredientId: "2",
      })
    );

    expect(newState.ingredients[0]).toEqual(ingredient2);
    expect(newState.ingredients[1]).toEqual(ingredient1);
  });

  it("Reducer: clearConstructor. Должен очистить состояние state до начального состояния", () => {
    state = {
      ingredients: [
        { name: "Летучая рыба", type: "sauce", uniqueId: "1" },
        { name: "Бекон", type: "meat", uniqueId: "2" },
      ] as IngredientWithUniqueId[],
    };

    const newState = constructorIngredientsReducer(
      state,
      constructorIngredientsActions.clearConstructor()
    );

    expect(newState).toEqual(initialState);
  });
});
