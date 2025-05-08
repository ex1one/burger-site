import { PayloadAction } from '@reduxjs/toolkit';

import { TInitialState } from './slice';
import { TSliceReducerActions } from '@src/types';
import { User } from '@src/api/user/types';

export const actions = {
	setUser: (state, action: PayloadAction<User>) => {
		state.user = action.payload;
	},
	changeState: (state, action: PayloadAction<TInitialState>) => {
		state.user = action.payload.user;
	},
	clearState: (state) => {
		state.user = null;
	},
} satisfies TSliceReducerActions<TInitialState>;
