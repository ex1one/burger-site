import API from '@src/api';
import { ERROR_MESSAGE, PAGES } from '@src/consts';

import {
	deleteCookie,
	deleteItemFromLocalStorage,
	getItemFromLocalStorage,
	setCookie,
	setItemToLocalStorage,
} from '@src/api/utils';
import { createAppAsyncThunk } from '@src/store/shared';

import { selectors } from './selectors';
import { userActions } from './slice';
import { toast } from 'react-toastify';
import { ApiErrorClass } from '@src/api/types/errors';

// TODO: Проблема в том, что отмену запрсов необходимо выполнять вручную. Если мы запустим 2 раза подряд logout, то он вызовется 2 раза подряд.
// Надо как-нибудь обрабатывать этот кейс. В сагах очень хорошо реализована отмена выполнения функции. Сюда мы прикрутить ее + автоматическое отмену запросов в thunk текущем
const logout = createAppAsyncThunk('user/logout', async (_, { dispatch, extra }) => {
	try {
		await API.user.logout();

		deleteCookie('token');
		deleteItemFromLocalStorage('accessToken');
		dispatch(userActions.clearState());

		extra.history.push(PAGES.HOME);
	} catch (error) {
		if (error instanceof ApiErrorClass) {
			toast.error(`${error.message}`);
			return;
		}

		toast.error(ERROR_MESSAGE);
	}
});

const update = createAppAsyncThunk('user/update', async (_, { dispatch, getState }) => {
	const user = selectors.userSelector(getState().user);
	const accessToken = getItemFromLocalStorage('accessToken');

	if (!user || !accessToken) return;

	const response = await API.user.updateUser({ name: user.name }, accessToken);

	if (response.success) {
		dispatch(userActions.setUser(response.user));
	}
});

const changePassword = createAppAsyncThunk(
	'user/resetPassword',
	async ({ password, code }: { password: string; code: string }, { extra }) => {
		const response = await API.user.changePassword({ password, token: code });

		if (response.success) {
			alert(response.message);
			extra.history.push(PAGES.HOME);
		}
	},
);

const signIn = createAppAsyncThunk(
	'user/signIn',
	async ({ email, password }: { email: string; password: string }, { dispatch, extra }) => {
		try {
			const { accessToken, refreshToken, user } = await API.user.signIn({ email, password });

			setCookie('token', refreshToken);
			setItemToLocalStorage('accessToken', accessToken);
			dispatch(userActions.changeState({ user, error: null }));

			extra.history.push(PAGES.HOME);
		} catch (error) {
			if (error instanceof ApiErrorClass) {
				toast.error(`${error.message}`);
				return;
			}

			toast.error(ERROR_MESSAGE);
		}
	},
);

const signUp = createAppAsyncThunk(
	'user/signUp',
	async ({ email, name, password }: { email: string; name: string; password: string }, { dispatch, extra }) => {
		try {
			const { accessToken, refreshToken, user } = await API.user.signUp({ email, name, password });

			setCookie('token', refreshToken);
			setItemToLocalStorage('accessToken', accessToken);

			dispatch(userActions.changeState({ user, error: null }));

			extra.history.replace(PAGES.HOME);
		} catch (error) {
			if (error instanceof ApiErrorClass) {
				toast.error(`${error.message}`);
				return;
			}

			toast.error(ERROR_MESSAGE);
		}
	},
);

const forgotPassword = createAppAsyncThunk(
	'user/forgotPassword',
	async ({ email }: { email: string }, { extra }) => {
		const response = await API.user.forgotPassword(email);

		if (response.success) {
			alert(response.message);
			extra.history.push(PAGES.RESET_PASSWORD);
		}
	},
);

export const thunks = {
	changePassword,
	forgotPassword,
	signIn,
	signUp,
	update,
	logout,
};
