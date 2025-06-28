import { feedActions, feedSelectors } from "../feed";
import { orderHistoryActions, orderHistorySelectors } from "../order-history";
import { Status } from "../../consts/status";

import { createAppAsyncThunk } from "@src/store/shared";
import API from "@src/api";
import { delay, isErrorByStatus, isSuccessByStatus } from "@src/utils";
import { ERROR_MESSAGE, WS_URL_FEED, WS_URL_ORDERS_HISTORY } from "@src/consts";
import { Ingredient } from "@src/api/ingredients/types";
import { FeedOrder } from "@src/api/order/types";

// TODO: Вынести от сюда, стоит ли тут хранить логику по обработке order?
// Мне кажется лучше вынести в компонент.
export const prepareOrder = (ingredients: Ingredient[], order: FeedOrder) => {
  const orderIngredients = ingredients
    .filter((ingredient) => order?.ingredients.includes(ingredient._id))
    .reduce((acc, ingredient, _, array) => {
      const similarIngredients = array.filter(
        (el) => el._id === ingredient._id
      );

      return [...acc, { ...ingredient, count: similarIngredients.length }];
    }, [] as (Ingredient & { count: number })[]);

  const total = orderIngredients.reduce(
    (acc, ingredient) => acc + ingredient.price * ingredient.count,
    0
  );

  return { order: { ...order, ingredients: orderIngredients, total } };
};

const getOrderFeed = createAppAsyncThunk(
  "orderInfo/getOrder",
  async (orderNumber: string, { dispatch, getState }) => {
    const feedStatus = feedSelectors.statusSelector(getState());

    if (feedStatus !== Status.Success) {
      dispatch(feedActions.connect(WS_URL_FEED));

      // TODO: Костыль, пока хз как по другому делать
      await delay(2000);
    }

    const feedSlice = feedSelectors.sliceSelector(getState());
    const isSuccess = isSuccessByStatus(feedSlice.status);
    const isError = isErrorByStatus(feedSlice.status);

    if (isError) {
      throw feedSlice.error;
    }

    if (!isSuccess) {
      throw new Error(ERROR_MESSAGE);
    }

    const order = feedSlice.orders.find(
      (order) => order.number === Number(orderNumber)
    );

    if (!order) {
      throw new Error("Заказ не найден!");
    }

    const { data: ingredients } = await API.ingredients.getIngredients();

    return prepareOrder(ingredients, order);
  }
);

const getOrderFromHistory = createAppAsyncThunk(
  "orderInfo/getOrderFromHistory",
  async (orderNumber: string, { dispatch, getState }) => {
    dispatch(orderHistoryActions.connect(WS_URL_ORDERS_HISTORY));

    // TODO: Костыль, пока хз как по другому делать
    await delay(2000);

    const orderHistorySlice = orderHistorySelectors.sliceSelector(getState());
    const isSuccess = isSuccessByStatus(orderHistorySlice.status);
    const isError = isErrorByStatus(orderHistorySlice.status);

    if (isError) {
      throw orderHistorySlice.error;
    }

    if (!isSuccess) {
      throw new Error(ERROR_MESSAGE);
    }

    const order = orderHistorySlice.orders.find(
      (order) => order.number === Number(orderNumber)
    );

    if (!order) {
      throw new Error("Заказ не найден!");
    }

    const { data: ingredients } = await API.ingredients.getIngredients();

    return prepareOrder(ingredients, order);
  }
);

export const thunks = {
  getOrderFeed,
  getOrderFromHistory,
};
