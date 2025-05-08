import API from '@src/api';
import { PAGES } from '@src/consts';

import { deleteCookie, getItemFromLocalStorage, setCookie, setItemToLocalStorage } from '@src/api/utils';
import { createAppAsyncThunk } from '@src/store/shared';

import { selectors } from './selectors';
import { userActions } from './slice';

// TODO: Проблема в том, что отмену запрсов необходимо выполнять вручную. Если мы запустим 2 раза подряд logout, то он вызовется 2 раза подряд.
// Надо как-нибудь обрабатывать этот кейс. В сагах очень хорошо реализована отмена выполнения функции. Сюда мы прикрутить ее + автоматическое отмену запросов в thunk текущем
const logout = createAppAsyncThunk('user/logout', async (_, { dispatch, extra }) => {
	const response = await API.user.logout();

	if (response.success) {
		deleteCookie('token');
		dispatch(userActions.clearState());
		extra.history.push(PAGES.HOME);
	} else {
		alert('Произошла ошибка');
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
		const response = await API.user.signIn({ email, password });

		if (response.success) {
			const { accessToken, refreshToken, user } = response;

			setCookie('token', refreshToken);
			setItemToLocalStorage('accessToken', accessToken);

			dispatch(userActions.changeState({ user }));

			extra.history.push(PAGES.HOME);
		} else {
			alert('Произошла ошибка');
		}
	},
);

const signUp = createAppAsyncThunk(
	'user/signUp',
	async ({ email, name, password }: { email: string; name: string; password: string }, { dispatch, extra }) => {
		const response = await API.user.signUp({ email, name, password });

		if (response.success) {
			const { accessToken, refreshToken, user } = response;

			setCookie('token', refreshToken);
			setItemToLocalStorage('accessToken', accessToken);

			dispatch(userActions.changeState({ user }));

			extra.history.replace(PAGES.HOME);
		} else {
			alert('Произошла ошибка');
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
