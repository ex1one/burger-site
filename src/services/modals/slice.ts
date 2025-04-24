import { createSlice } from '@reduxjs/toolkit';
import { NAMES_OF_MODALS } from '@src/consts';

import { selectors } from './selectors';
import { actions } from './actions';

export type TInitialState = Record<keyof typeof NAMES_OF_MODALS, boolean>;

export const initialState: TInitialState = {
	ORDER_DETAIL_MODAL: false,
	INGREDIENT_DETAIL_MODAL: false,
};

const modalsSlice = createSlice({
	name: 'modals',
	initialState,
	reducers: actions,
	selectors: selectors,
});

export const { reducer: modalsReducer, actions: modalsActions, selectors: modalsSelectors } = modalsSlice;
