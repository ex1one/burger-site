import { ingredientsReducer, initialState, ingredientsThunks } from "../slice";

import { Ingredient } from "@src/api/ingredients/types";

describe("extraReducers", () => {
  let state = initialState;

  afterEach(() => {
    state = initialState;
  });

  it("Должен устанавливать status в 'pending' при вызове fetchIngredients", () => {
    const newState = ingredientsReducer(
      state,
      ingredientsThunks.fetchIngredients.pending()
    );

    expect(newState.isLoading).toBe(true);
    expect(newState.status).toBe("pending");

    expect(newState.ingredients).toEqual(initialState.ingredients);
    expect(newState.error).toBe(null);
  });

  it("Должен устанавливать состояние в success при успешном получении ингредиентов", async () => {
    const ingredients = [
      { _id: "1", name: "Name 1" },
      { _id: "2", ingredient: "Name 2" },
    ] as Ingredient[];

    const newState = ingredientsReducer(
      state,
      ingredientsThunks.fetchIngredients.fulfilled(ingredients)
    );

    expect(newState).toEqual({
      ingredients,
      isLoading: false,
      status: "success",
      error: null,
    });
  });

  it("Должен устанавливать состояние в error при неудачном получении ингредиентов", async () => {
    const errorMessage = "Error while request ingredients";

    const newState = ingredientsReducer(
      state,
      ingredientsThunks.fetchIngredients.rejected(errorMessage)
    );

    expect(newState).toEqual({
      ingredients: [],
      isLoading: false,
      status: "error",
      error: errorMessage,
    });
  });

  it("Должен корректно обрабатывать последовательное состояние {pending} -> {fulfilled}", () => {
    let newState = ingredientsReducer(
      state,
      ingredientsThunks.fetchIngredients.pending()
    );

    expect(newState).toEqual({
      ingredients: initialState.ingredients,
      isLoading: true,
      status: "pending",
      error: null,
    });

    const ingredients = [
      { _id: "1", name: "Name 1" },
      { _id: "2", name: "Name 2" },
    ] as Ingredient[];

    newState = ingredientsReducer(
      newState,
      ingredientsThunks.fetchIngredients.fulfilled(ingredients)
    );

    expect(newState).toEqual({
      ingredients,
      isLoading: false,
      status: "success",
      error: null,
    });
  });

  it("Должен корректно обрабатывать последовательное состояние {pending} -> {rejected}", () => {
    let newState = ingredientsReducer(
      state,
      ingredientsThunks.fetchIngredients.pending()
    );

    expect(newState).toEqual({
      ingredients: initialState.ingredients,
      isLoading: true,
      status: "pending",
      error: null,
    });

    const errorMessage = "Error while request ingredients";
    const action = ingredientsThunks.fetchIngredients.rejected({
      message: errorMessage,
    });

    newState = ingredientsReducer(newState, action);

    expect(newState).toEqual({
      ingredients: [],
      isLoading: false,
      status: "error",
      error: errorMessage,
    });
  });
});
