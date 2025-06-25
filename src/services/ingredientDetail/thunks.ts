import API from "@src/api";
import { ERROR_MESSAGE } from "@src/consts";
import { createAppAsyncThunk } from "@src/store/shared";
import { isEmpty } from "@src/utils";

const getIngredient = createAppAsyncThunk(
  "ingredientDetail/getIngredient",
  async (ingredientId: string) => {
    const { data } = await API.ingredients.getIngredients();
    const ingredient = data.find(
      (ingredient) => ingredient._id === ingredientId
    );

    if (isEmpty(ingredient)) {
      throw new Error(ERROR_MESSAGE);
    }

    return ingredient!;
  }
);

export const thunks = {
  getIngredient,
};
