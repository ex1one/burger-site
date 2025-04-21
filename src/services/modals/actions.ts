import { PayloadAction } from '@reduxjs/toolkit';
import { TSliceReducerActions } from '@src/types';
import { NAMES_OF_MODALS } from '@src/consts';

import { TInitialState } from './slice';

export const actions = {
	openModal: (state, action: PayloadAction<keyof typeof NAMES_OF_MODALS>) => {
		state[action.payload] = true;
	},
	closeModal: (state, action: PayloadAction<keyof typeof NAMES_OF_MODALS>) => {
		state[action.payload] = false;
	},
	toggleModal: (state, action: PayloadAction<keyof typeof NAMES_OF_MODALS>) => {
		state[action.payload] = !state[action.payload];
	},
} satisfies TSliceReducerActions<TInitialState>;
