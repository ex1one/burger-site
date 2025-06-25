import { configureStore } from "@reduxjs/toolkit";
import { compose } from "redux";

import { history } from "@src/router";
import { rootReducer } from "@src/services";
import {
  errorHandlingMiddleware,
  socketMiddleware,
} from "@src/services/middlewares";
import { feedActions } from "@src/services/feed";
import { orderHistoryActions } from "@src/services/order-history";

const composeEnhancers =
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

export const extraArgument = {
  history,
};

const feedMiddleware = socketMiddleware({
  connect: feedActions.connect,
  disconnect: feedActions.disconnect,
  onOpen: feedActions.onOpen,
  onClose: feedActions.onClose,
  onError: feedActions.onError,
  onMessage: feedActions.onMessage,
});

const ordersHistoryMiddleware = socketMiddleware({
  connect: orderHistoryActions.connect,
  disconnect: orderHistoryActions.disconnect,
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
      ordersHistoryMiddleware,
      errorHandlingMiddleware
    ),
  devTools: composeEnhancers(),
});
