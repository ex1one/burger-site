import API from '@src/api';
import { PAGES } from '@src/consts';
import { useAppDispatch, useAppSelector } from '@src/hooks';
import { userSelectors, userActions } from '@src/services/user';
import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';

export const ProtectedRouteElement = ({
	element,
	isPublicRoute = false,
}: {
	element: JSX.Element;
	isPublicRoute?: boolean;
}) => {
	const dispatch = useAppDispatch();
	const user = useAppSelector(userSelectors.userSelector);
	const accessToken = useAppSelector(userSelectors.accessTokenSelector);
	const [isUserLoaded, setUserLoaded] = useState(false);

	// TODO: Когда токен просрочился, у нас нет возможности зайти на страницу входа. Потому что ревалидация токена работает
	// неправильно, если поправлю - должно работать ок
	const init = async () => {
		try {
			const response = await API.user.getUser(accessToken);
			if (response.success) {
				dispatch(userActions.setUser(response.user));
			}
			setUserLoaded(true);
		} catch (error) {
			console.error(error);
			setUserLoaded(true);
		}
	};

	useEffect(() => {
		init();
	}, [accessToken]);

	if (!isUserLoaded) {
		return null;
	}

	if (isPublicRoute && user) {
		return (
			<Navigate
				to={PAGES.HOME}
				replace
			/>
		);
	}

	if (!isPublicRoute && !user) {
		return (
			<Navigate
				to={PAGES.SIGN_IN}
				replace
			/>
		);
	}

	return element;
};
