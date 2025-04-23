import { configureStore } from '@reduxjs/toolkit';
import { history } from '@src/router';
import { rootReducer } from '@src/services';
import { compose } from 'redux';

const composeEnhancers =
	// @ts-expect-error
	typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
		? // @ts-expect-error
		  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
		: compose;

export const extraArgument = {
	history,
};

export const store = configureStore({
	reducer: rootReducer,
	middleware: (getDefaultMiddleware) => getDefaultMiddleware({ thunk: { extraArgument } }),
	devTools: composeEnhancers(),
});
