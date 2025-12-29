import {
  ActionCreatorWithoutPayload,
  ActionCreatorWithPayload,
  Middleware,
} from "@reduxjs/toolkit";

import { ApiErrorClass } from "@src/api/config/api-error";
import { refreshAccessToken } from "@src/api/user";
import { getCookie } from "@src/api/utils";
import { ERROR_MESSAGE } from "@src/consts";

export type TWsActions<R, S> = {
  connect: ActionCreatorWithPayload<string>;
  disconnect: ActionCreatorWithoutPayload;
  onOpen?: ActionCreatorWithoutPayload;
  onClose?: ActionCreatorWithoutPayload;
  onError: ActionCreatorWithPayload<ApiErrorClass>;
  sendMessage?: ActionCreatorWithPayload<S>;
  onMessage: ActionCreatorWithPayload<R>;
};

const RECONNECT_PERIOD = 3000;

export const socketMiddleware = <R, S>(
  wsActions: TWsActions<R, S>,
  withTokenRefresh: boolean = false
): Middleware => {
  return (store) => {
    let socket: WebSocket | null = null;
    const {
      connect,
      sendMessage,
      onOpen,
      onClose,
      onError,
      onMessage,
      disconnect,
    } = wsActions;
    const { dispatch } = store;
    let isConnected = false;
    let url = "";
    let reconnectId: NodeJS.Timeout | undefined;

    return (next) => (action) => {
      if (connect.match(action)) {
        if (isConnected) {
          return;
        }

        socket = new WebSocket(action.payload);
        url = action.payload;
        isConnected = true;

        socket.onopen = () => {
          if (onOpen) {
            dispatch(onOpen());
          }
        };

        socket.onerror = () => {
          dispatch(onError(new ApiErrorClass(ERROR_MESSAGE)));
        };

        socket.onclose = () => {
          if (onClose) {
            dispatch(onClose());
          }

          if (isConnected) {
            reconnectId = setTimeout(() => {
              dispatch(connect(url));
            }, RECONNECT_PERIOD);
          }
        };

        socket.onmessage = (event) => {
          const { data } = event;
          try {
            const refreshToken = getCookie("token");
            const parsedData = JSON.parse(data);

            if (
              withTokenRefresh &&
              refreshToken &&
              parsedData.message === "Invalid or missing token"
            ) {
              refreshAccessToken(refreshToken)
                .then((refreshedData) => {
                  const wssUrl = new URL(url);
                  wssUrl.searchParams.set(
                    "token",
                    refreshedData.accessToken.replace("Bearer ", "")
                  );
                  dispatch(connect(wssUrl.toString()));
                })
                .catch((error) => {
                  dispatch(
                    onError(new ApiErrorClass(error.message || ERROR_MESSAGE))
                  );
                });

              dispatch(disconnect());
              return;
            }

            dispatch(onMessage(parsedData));
          } catch (error) {
            dispatch(onError(new ApiErrorClass((error as Error)?.message)));
          }
        };

        return;
      }

      if (sendMessage?.match(action) && socket) {
        try {
          socket.send(JSON.stringify(action.payload));
        } catch (error) {
          dispatch(onError(new ApiErrorClass((error as Error)?.message)));
        }

        return;
      }

      if (disconnect.match(action)) {
        clearTimeout(reconnectId);
        reconnectId = undefined;
        isConnected = false;
        socket?.close();
        socket = null;

        return;
      }

      next(action);
    };
  };
};
