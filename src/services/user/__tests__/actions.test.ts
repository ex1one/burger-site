import { initialState, userActions, userReducer, AuthStatus } from "../slice"; // Импортируйте ваш slice и actions

import { ApiErrorClass } from "@src/api/config/api-error";
import { UNKNOWN_ERROR_MESSAGE } from "@src/consts";

describe("userSlice reducers", () => {
  let state = initialState;

  afterEach(() => {
    state = initialState;
  });

  it("Если не вызвался ни один reducer, state не должен изменяться", () => {
    expect(userReducer(undefined, {})).toEqual(state);
  });

  it("Reducer: setUser. Должен обновить пользователя и не изменять другие поля", () => {
    const user = { name: "John", email: "john@mail.com" };

    const newState = userReducer(state, userActions.setUser(user));

    expect(newState.user).toEqual(user);

    expect(newState.status).toEqual(state.status);
    expect(newState.error).toEqual(state.error);
  });

  it("Reducer: setStatus. Должен обновить статус и не изменять другие поля", () => {
    const newState = userReducer(
      state,
      userActions.setStatus(AuthStatus.Pending)
    );

    expect(newState.status).toEqual(AuthStatus.Pending);

    expect(newState.user).toEqual(state.user);
    expect(newState.error).toEqual(state.error);
  });

  it("Reducer: setError. Должен обновить ошибку и не изменять другие поля", () => {
    const error = new ApiErrorClass(UNKNOWN_ERROR_MESSAGE);

    const newState = userReducer(state, userActions.setError(error));

    expect(newState.error).toEqual(error);

    expect(newState.user).toEqual(state.user);
    expect(newState.status).toEqual(state.status);
  });

  it("Reducer: changeState. Должен изменить state", () => {
    const payload = {
      user: { name: "John", email: "john@mail.com" },
      error: null,
      status: AuthStatus.Authenticated,
    };

    const newState = userReducer(state, userActions.changeState(payload));

    expect(newState).toEqual(payload);
  });

  it("Reducer: clearState. Должен очистить state до начального состояния", () => {
    const modifiedState = {
      user: { name: "John", email: "john@mail.com" },
      error: null,
      status: AuthStatus.Authenticated,
    };

    userReducer(state, userActions.changeState(modifiedState));
    const newState = userReducer(state, userActions.clearState());

    expect(newState).toEqual(initialState);
  });
});
