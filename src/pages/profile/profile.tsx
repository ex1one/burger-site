import { ChangeEvent, FormEvent, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@src/hooks';

import { Layout } from '@src/features';
import { Link } from '@src/components';
import { PAGES } from '@src/consts';
import { userActions, userSelectors } from '@src/services/user';

import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './profile.module.css';
import API from '@src/api';
import { deleteCookie } from '@src/api/utils';

export function Profile() {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();

	const user = useAppSelector(userSelectors.userSelector);
	const accessToken = useAppSelector(userSelectors.accessTokenSelector);

	const [name, setName] = useState('');
	const [login, setLogin] = useState('');
	const [password, setPassword] = useState('');

	const [isEdited, setIsEdited] = useState(false);

	const refInputName = useRef<HTMLInputElement>(null);
	const refInputLogin = useRef<HTMLInputElement>(null);
	const refInputPassword = useRef<HTMLInputElement>(null);

	useEffect(() => {
		setName(user?.name || '');
	}, [user]);

	const handleChangeName = (event: ChangeEvent<HTMLInputElement>) => {
		const value = event.target.value;

		setName(value);
	};

	const handleChangeLogin = (event: ChangeEvent<HTMLInputElement>) => {
		const value = event.target.value;

		setLogin(value);
	};

	const handleChangePassword = (event: ChangeEvent<HTMLInputElement>) => {
		const value = event.target.value;

		setPassword(value);
	};

	// TODO: Переписать на thunk
	const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		// TODO: Поправить
		// @ts-expect-error
		const response = await API.user.updateUser({ name }, accessToken);

		if (response.success) {
			dispatch(userActions.setUser(response.user));
		}
	};

	const handleClickEdit = () => {
		setIsEdited(true);
		refInputName.current?.focus();
	};

	const handleClickCancelEdit = () => {
		setIsEdited(false);

		setName(user?.name || '');
		setLogin('');
		setPassword('');
	};

	const handleClickLogout = async () => {
		const response = await API.user.logout();

		if (response.success) {
			dispatch(userActions.clearState());
			deleteCookie('token');
			navigate(PAGES.HOME);
		} else {
			alert('Произошла ошибка');
		}
	};

	return (
		<Layout>
			<div className={styles.container}>
				<div className={styles.navigationMenu}>
					<div className={styles.navigationMenuList}>
						<Link
							to={PAGES.PROFILE}
							isNavLink
							className={styles.navigationMenuLink}
						>
							Профиль
						</Link>
						<Link
							to={PAGES.PROFILE_ORDERS}
							isNavLink
							className={styles.navigationMenuLink}
						>
							История заказов
						</Link>
						{/* TODO: Это вообще должна кнопка */}
						<Link
							to='/'
							isNavLink
							className={styles.navigationMenuLink}
							onClick={handleClickLogout}
						>
							Выход
						</Link>
					</div>
					<div className={styles.navigationMenuDescription}>
						В этом разделе вы можете изменить свои персональные данные
					</div>
				</div>
				<form
					className={styles.content}
					onSubmit={handleSubmit}
				>
					<Input
						ref={refInputName}
						type='text'
						placeholder='Имя'
						onChange={handleChangeName}
						value={name}
						name='name'
						disabled={!isEdited}
					/>
					<Input
						ref={refInputLogin}
						type='text'
						placeholder='Логин'
						onChange={handleChangeLogin}
						value={login}
						name='login'
						disabled={!isEdited}
					/>
					<Input
						ref={refInputPassword}
						type='password'
						placeholder='Пароль'
						onChange={handleChangePassword}
						value={password}
						name='password'
						disabled={!isEdited}
					/>
					<div className={styles.contentFooter}>
						<Button
							htmlType='button'
							type='primary'
							size='medium'
							onClick={handleClickEdit}
						>
							Редактировать
						</Button>
						<Button
							htmlType='submit'
							type='primary'
							size='medium'
						>
							Сохранить
						</Button>
						<Button
							htmlType='button'
							type='primary'
							size='medium'
							onClick={handleClickCancelEdit}
						>
							Отменить
						</Button>
					</div>
				</form>
			</div>
		</Layout>
	);
}
