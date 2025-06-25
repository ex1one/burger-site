import { RootState } from "@src/types";
import API from "@src/api";
import { Status } from "@src/consts";
import { createAppAsyncThunk } from "@src/store/shared";

// TODO: В будущем написать тесты на thunk. https://www.youtube.com/watch?v=qb7xVPVfPlQ&t=1029s
const fetchIngredients = createAppAsyncThunk(
  "ingredients/fetchIngredients",
  async () => {
    const { data } = await API.ingredients.getIngredients();

    return data;
  },
  {
    condition: (_, { getState }) => {
      const {
        ingredients: { status },
      } = getState() as RootState;

      if (status === Status.Pending) return false;

      return true;
    },
  }
);

export const thunks = {
  fetchIngredients,
};
