import myFetch from '@src/api/my-fetch';

import { YandexApi } from '../config/urls';
import { User } from './types';
import { getCookie } from '../utils';

const BASE_URL = YandexApi;

export const forgotPassword = (email: string) => {
	return myFetch.post<{ success: boolean; message: string }>(BASE_URL + '/password-reset', { data: { email } });
};

export const resetPassword = ({ password, token }: { password: string; token: string }) => {
	return myFetch.post<{ success: boolean; message: string }>(BASE_URL + '/password-reset/reset', {
		data: { password, token },
	});
};

export const signUp = ({ name, email, password }: { name: string; email: string; password: string }) => {
	// TODO: Будет ли в ответе при неуспешном запросе поле message? Проверить
	return myFetch.post<{ success: boolean; user: User; accessToken: string; refreshToken: string }>(
		BASE_URL + '/auth/register',
		{
			data: { name, email, password },
		},
	);
};

export const signIn = ({ email, password }: { email: string; password: string }) => {
	return myFetch.post<{ success: boolean; user: User; accessToken: string; refreshToken: string }>(
		BASE_URL + '/auth/login',
		{
			data: { email, password },
		},
	);
};

export const logout = () => {
	const refreshToken = getCookie('token');

	return myFetch.post<{ success: boolean; message: string }>(BASE_URL + '/auth/logout', {
		data: { token: refreshToken },
	});
};

export const refreshAccessToken = (refreshToken: string) => {
	return myFetch.post<{ success: boolean; accessToken: string; refreshToken: string }>(BASE_URL + '/auth/token', {
		data: { token: refreshToken },
	});
};

// TODO: Функция не сможет получить например другого пользователя, правильно ли это?
// Если мы передаем туда token, то по идее да. Это как бы защита
export const getUser = (accessToken: string) => {
	return myFetch.get<{ success: boolean; user: User }>(BASE_URL + '/auth/user', {
		headers: { Authorization: accessToken, 'Content-Type': 'application/json; charset=utf-8' },
	});
};

export const updateUser = (user: Partial<User>, accessToken: string) => {
	return myFetch.patch<{ success: boolean; user: User }>(BASE_URL + '/auth/user', {
		data: user,
		headers: { Authorization: accessToken, 'Content-Type': 'application/json; charset=utf-8' },
	});
};
