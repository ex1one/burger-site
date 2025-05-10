import { createSlice } from '@reduxjs/toolkit';
import { APIError } from '@src/api/types/errors';
import { User } from '@src/api/user/types';

import { selectors } from './selectors';
import { actions } from './actions';
import { thunks } from './thunks';

export interface TInitialState {
	user: User | null;
	error: APIError | null;
}

export const initialState: TInitialState = {
	user: null,
	error: null,
};

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: actions,
	selectors: selectors,
});

export const { reducer: userReducer, actions: userActions, selectors: userSelectors } = userSlice;

export const userThunks = thunks;
