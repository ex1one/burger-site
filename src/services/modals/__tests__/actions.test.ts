import { initialState, modalsReducer, modalsActions } from "../slice";

import { NAMES_OF_MODALS } from "@src/consts";

describe("modalSlice reducers", () => {
  let state = initialState;

  afterEach(() => {
    state = initialState;
  });

  it("Если не вызвался ни один reducer, state не должен изменяться", () => {
    expect(modalsReducer(undefined, {})).toEqual(state);
  });

  it("Reducer: openModal. Должен открыть модальное окно", () => {
    const modalName = NAMES_OF_MODALS.INGREDIENT_DETAIL_MODAL;

    const newState = modalsReducer(state, modalsActions.openModal(modalName));

    expect(newState[modalName]).toBe(true);
    expect(newState).toEqual({ ...state, [modalName]: true });
  });

  it("Reducer: closeModal. Должен закрыть модальное окно", () => {
    const modalName = NAMES_OF_MODALS.INGREDIENT_DETAIL_MODAL;

    state = { ...state, [modalName]: true };

    const newState = modalsReducer(state, modalsActions.closeModal(modalName));

    expect(newState[modalName]).toBe(false);
    expect(newState).toEqual({ ...state, [modalName]: false });
  });

  it("Reducer: toggleModal. Должен переключить состояние модального окна", () => {
    const modalName = NAMES_OF_MODALS.INGREDIENT_DETAIL_MODAL;

    state = { ...state, [modalName]: false };

    const newState = modalsReducer(state, modalsActions.toggleModal(modalName));

    expect(newState[modalName]).toBe(true);

    const newStateAgain = modalsReducer(
      newState,
      modalsActions.toggleModal(modalName)
    );

    expect(newStateAgain[modalName]).toBe(false);
  });

  it("Reducer: закрытие модального окна не должно влиять на другие модальные окна", () => {
    const modal1 = NAMES_OF_MODALS.INGREDIENT_DETAIL_MODAL;
    const modal2 = NAMES_OF_MODALS.ORDER_DETAIL_MODAL;

    state = { ...state, [modal1]: true, [modal2]: true };

    const newState = modalsReducer(state, modalsActions.closeModal(modal1));

    expect(newState[modal1]).toBe(false);
    expect(newState[modal2]).toBe(true);
  });
});
