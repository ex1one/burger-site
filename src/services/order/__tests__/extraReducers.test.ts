import { initialState, orderReducer, orderThunks } from "../slice";

import { ApiErrorClass } from "@src/api/config/api-error";

describe("extraReducers for orders", () => {
  let state = initialState;

  beforeEach(() => {
    state = initialState;
  });

  it("Должен устанавливать статус в 'pending' при вызове createOrderThunk", () => {
    const newState = orderReducer(
      state,
      orderThunks.createOrderThunk.pending()
    );

    expect(newState.isLoading).toBe(true);
    expect(newState.status).toBe("pending");
    expect(newState.order).toBe(null);
    expect(newState.error).toBe(null);
  });

  it("Должен устанавливать состояние в success при успешном создании заказа", () => {
    const orderPayload = {
      name: "Test Order",
      order: {
        number: 12345,
      },
    };

    const newState = orderReducer(
      state,
      orderThunks.createOrderThunk.fulfilled(orderPayload)
    );

    expect(newState).toEqual({
      order: {
        name: orderPayload.name,
        number: orderPayload.order.number,
      },
      isLoading: false,
      status: "success",
      error: null,
    });
  });

  it("Должен устанавливать состояние в error при неудачном создании заказа", () => {
    const errorMessage = "Ошибка при создании заказа";

    const newState = orderReducer(
      state,
      orderThunks.createOrderThunk.rejected(errorMessage)
    );

    expect(newState).toEqual({
      order: null,
      isLoading: false,
      status: "error",
      error: new ApiErrorClass(errorMessage),
    });
  });
});
