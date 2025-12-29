import API from "@src/api";
import { createAppAsyncThunk } from "@src/store/shared";

// TODO: В будущем написать тесты на thunk. https://www.youtube.com/watch?v=qb7xVPVfPlQ&t=1029s
const fetchIngredients = createAppAsyncThunk(
  "ingredients/fetchIngredients",
  async (_, { signal }) => {
    const { data } = await API.ingredients.getIngredients({ signal });

    return data;
  }
);

export const thunks = {
  fetchIngredients,
};
