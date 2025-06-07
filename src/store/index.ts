import { configureStore } from "@reduxjs/toolkit";
import { compose } from "redux";

import { history } from "@src/router";
import { rootReducer } from "@src/services";
import { socketMiddleware } from "@src/services/middlewares";
import { feedActions } from "@src/services/feed";
import { orderHistoryActions } from "@src/services/order-history";

const composeEnhancers =
  // @ts-expect-error
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? // @ts-expect-error
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

export const extraArgument = {
  history,
};

const feedMiddleware = socketMiddleware({
  connect: feedActions.connect,
  disconnect: feedActions.disconnect,
  onConnecting: feedActions.onConnecting,
  onOpen: feedActions.onOpen,
  onClose: feedActions.onClose,
  onError: feedActions.onError,
  onMessage: feedActions.onMessage,
});

const ordersHistoryMiddleware = socketMiddleware({
  connect: orderHistoryActions.connect,
  disconnect: orderHistoryActions.disconnect,
  onConnecting: orderHistoryActions.onConnecting,
  onOpen: orderHistoryActions.onOpen,
  onClose: orderHistoryActions.onClose,
  onError: orderHistoryActions.onError,
  onMessage: orderHistoryActions.onMessage,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: { extraArgument } }).concat(
      feedMiddleware,
      ordersHistoryMiddleware
    ),
  devTools: composeEnhancers(),
});
