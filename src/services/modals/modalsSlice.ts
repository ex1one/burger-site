import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const initialState = {
	ORDER_DETAIL_MODAL: false,
	INGREDIENT_DETAIL_MODAL: false,
};

const modalsSlice = createSlice({
	name: 'modals',
	initialState,
	reducers: {
		openModal: (state, action: PayloadAction<keyof typeof initialState>) => {
			state[action.payload] = true;
		},
		closeModal: (state, action: PayloadAction<keyof typeof initialState>) => {
			state[action.payload] = false;
		},
		toggleModal: (state, action: PayloadAction<keyof typeof initialState>) => {
			state[action.payload] = !state[action.payload];
		},
	},
	selectors: {
		modalSelector: (state, modal: keyof typeof initialState) => state[modal],
	},
});

export const { openModal, closeModal, toggleModal } = modalsSlice.actions;

export const { modalSelector } = modalsSlice.selectors;

export default modalsSlice.reducer;
