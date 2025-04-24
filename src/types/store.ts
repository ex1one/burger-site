import { ThunkAction, Action } from '@reduxjs/toolkit';
import { extraArgument, store } from '@src/store';

export type AppStore = typeof store;
export type RootState = ReturnType<AppStore['getState']>;

export type AppDispatch = AppStore['dispatch'];
export type AppThunk<ThunkReturnType = void> = ThunkAction<
	ThunkReturnType,
	RootState,
	typeof extraArgument,
	Action
>;
