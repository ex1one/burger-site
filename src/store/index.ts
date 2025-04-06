import type { Action, ThunkAction } from '@reduxjs/toolkit';
import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from '@src/services';
import { compose } from 'redux';

const composeEnhancers =
	// @ts-expect-error
	typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
		? // @ts-expect-error
		  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
		: compose;

export const store = configureStore({
	reducer: rootReducer,
	devTools: composeEnhancers(),
});

export type AppStore = typeof store;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
export type AppThunk<ThunkReturnType = void> = ThunkAction<ThunkReturnType, RootState, unknown, Action>;
