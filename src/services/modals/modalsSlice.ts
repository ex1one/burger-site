import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { NAMES_OF_MODALS } from '@src/consts';

const initialState: Record<keyof typeof NAMES_OF_MODALS, boolean> = {
	ORDER_DETAIL_MODAL: false,
	INGREDIENT_DETAIL_MODAL: false,
};

const modalsSlice = createSlice({
	name: 'modals',
	initialState,
	reducers: {
		openModal: (state, action: PayloadAction<keyof typeof NAMES_OF_MODALS>) => {
			state[action.payload] = true;
		},
		closeModal: (state, action: PayloadAction<keyof typeof NAMES_OF_MODALS>) => {
			state[action.payload] = false;
		},
		toggleModal: (state, action: PayloadAction<keyof typeof NAMES_OF_MODALS>) => {
			state[action.payload] = !state[action.payload];
		},
	},
	selectors: {
		modalSelector: (state, modal: keyof typeof NAMES_OF_MODALS) => state[modal],
	},
});

export const { openModal, closeModal, toggleModal } = modalsSlice.actions;

export const { modalSelector } = modalsSlice.selectors;

export default modalsSlice.reducer;
