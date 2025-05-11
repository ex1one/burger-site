import API from '@src/api';
import { getCookie, getItemFromLocalStorage, setCookie, setItemToLocalStorage } from '@src/api/utils';
import { PAGES } from '@src/consts';
import { useAppDispatch, useAppSelector } from '@src/hooks';
import { userSelectors, userActions } from '@src/services/user';
import { useState, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

export const ProtectedRoute = ({
	element,
	isAnonymous = false,
}: {
	element: JSX.Element;
	isAnonymous?: boolean;
}) => {
	const dispatch = useAppDispatch();
	const user = useAppSelector(userSelectors.userSelector);
	const [isUserLoaded, setUserLoaded] = useState(false);

	const location = useLocation();
	const from = location.state?.from || '/';

	const init = async () => {
		try {
			if (user) {
				setUserLoaded(true);
				return;
			}

			let accessToken = getItemFromLocalStorage('accessToken');
			let refreshToken = getCookie('token');

			if (refreshToken) {
				if (!accessToken) {
					const { accessToken: refreshedAccessToken, refreshToken: refreshedRefreshToken } =
						await API.user.refreshAccessToken(refreshToken);

					accessToken = refreshedAccessToken;
					refreshToken = refreshedRefreshToken;

					setCookie('token', refreshedRefreshToken);
					setItemToLocalStorage('accessToken', refreshedAccessToken);
				}

				const response = await API.user.getUser(accessToken);

				if (response.success) {
					dispatch(userActions.setUser(response.user));
				}
				setUserLoaded(true);
			}
		} finally {
			setUserLoaded(true);
		}
	};

	useEffect(() => {
		init();
	}, []);

	if (!isUserLoaded) {
		return null;
	}

	// Чтобы у авторизованного пользователя не было доступа к /sign-in и другим таким маршрутам.
	// Мы его перенаправляем обратно на тот маршрут откуда он пришел. Сценарий такой:
	// 1. Пользователь авторизовался. И чтобы потом у него не было возможности вернуться на страницу входа.
	if (isAnonymous && user) {
		return <Navigate to={from} />;
	}

	if (!isAnonymous && !user) {
		return (
			<Navigate
				to={PAGES.SIGN_IN}
				state={{ from: location }}
			/>
		);
	}

	return element;
};
