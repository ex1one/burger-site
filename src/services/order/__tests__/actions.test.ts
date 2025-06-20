import { initialState, orderReducer, orderActions } from "../slice";

describe("ingredientsSlice reducers", () => {
  let state = initialState;

  afterEach(() => {
    state = initialState;
  });

  it("Если не вызвался ни один reducer, state не должен изменяться", () => {
    expect(orderReducer(undefined, {})).toEqual(state);
  });

  it("Reducer: clearOrder. Должен вернуть state в начальное состояние", () => {
    state = {
      ...state,
      order: { name: "Order - 1", number: 1 },
    };

    const newState = orderReducer(state, orderActions.clearOrder());

    expect(newState).toEqual(initialState);
  });
});
