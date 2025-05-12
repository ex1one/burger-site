import { createSlice } from '@reduxjs/toolkit';


import { selectors } from './selectors';
import { actions } from './actions';
import { thunks } from './thunks';

import { User } from '@src/api/user/types';
import { APIError } from '@src/api/types/errors';

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
