import { PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuid4 } from "uuid";

import { isEmpty } from "../../utils/is-empty";

import { initialState, TInitialState } from "./slice";

import { Ingredient, IngredientWithUniqueId } from "@src/api/ingredients/types";
import { TSliceReducerActions } from "@src/types";

// TODO: Переписать по этому примеру - https://redux.js.org/usage/structuring-reducers/refactoring-reducer-example
export const actions = {
  addIngredient: {
    reducer(state, action: PayloadAction<IngredientWithUniqueId>) {
      state.ingredients.splice(state.ingredients.length - 1, 0, action.payload);
    },
    prepare(payload: Ingredient) {
      return { payload: { ...payload, uniqueId: uuid4() } };
    },
  },
  removeIngredient(state, action: PayloadAction<string>) {
    state.ingredients = state.ingredients.filter(
      (ingredient) => ingredient.uniqueId !== action.payload
    );
  },
  addBun: {
    reducer(state, action: PayloadAction<IngredientWithUniqueId>) {
      const existingBun = state.ingredients.find((el) => el.type === "bun");

      if (existingBun) {
        const newEl = state.ingredients.filter((el) => el.type !== "bun");
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
  reorderIngredients(
    state,
    action: PayloadAction<{
      dragIngredientId: string;
      hoverIngredientId: string;
    }>
  ) {
    const dragIngredientIndex = state.ingredients.findIndex(
      (el) => el.uniqueId === action.payload.dragIngredientId
    );
    const hoverIngredientIndex = state.ingredients.findIndex(
      (el) => el.uniqueId === action.payload.hoverIngredientId
    );

    if (isEmpty(dragIngredientIndex) || isEmpty(hoverIngredientIndex)) return;

    const dragIngredient = state.ingredients[dragIngredientIndex];
    const hoverIngredient = state.ingredients[hoverIngredientIndex];

    if (isEmpty(dragIngredient) || isEmpty(hoverIngredient)) return;

    if (hoverIngredient.type === "bun") return;

    const arr = [...state.ingredients];
    arr[dragIngredientIndex] = hoverIngredient;
    arr[hoverIngredientIndex] = dragIngredient;

    state.ingredients = arr;
  },
  clearConstructor() {
    return initialState;
  },
} satisfies TSliceReducerActions<TInitialState>;
