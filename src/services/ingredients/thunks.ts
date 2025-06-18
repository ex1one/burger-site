import { createAppAsyncThunk } from "@src/store/shared";
import { RootState } from "@src/types";
import API from "@src/api";

// TODO: В будущем написать тесты на thunk. https://www.youtube.com/watch?v=qb7xVPVfPlQ&t=1029s
const fetchIngredients = createAppAsyncThunk(
  "ingredients/fetchIngredients",
  async () => {
    const response = await API.ingredients.getIngredients();

    if (!response.success) {
      throw new Error("Error while request ingredients");
    }

    return response.data;
  },
  {
    condition: (_, { getState }) => {
      const {
        ingredients: { status },
      } = getState() as RootState;

      if (status === "pending") return false;

      return true;
    },
  }
);

export const thunks = {
  fetchIngredients,
};
