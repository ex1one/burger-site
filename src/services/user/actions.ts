import { PayloadAction } from '@reduxjs/toolkit';

import { TInitialState, initialState } from './slice';
import { TSliceReducerActions } from '@src/types';
import { User } from '@src/api/user/types';

export const actions = {
	setUser: (state, action: PayloadAction<User>) => {
		state.user = action.payload;
	},
	setAccessToken: (state, action: PayloadAction<string>) => {
		state.accessToken = action.payload;
	},
	changeState: (state, action: PayloadAction<TInitialState>) => {
		state.accessToken = action.payload.accessToken;
		state.user = action.payload.user;
	},
	clearState: (state) => {
		state = initialState;
	},
} satisfies TSliceReducerActions<TInitialState>;
