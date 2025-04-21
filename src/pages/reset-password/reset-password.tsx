import { ChangeEvent, FormEvent, useState } from 'react';

import { Layout } from '@src/features';
import { Link } from '@src/components';
import { PAGES } from '@src/consts';

import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './reset-password.module.css';
import API from '@src/api';
import { getCookie } from '@src/api/utils';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '@src/hooks';
import { userSelectors } from '@src/services/user';

export function ResetPassword() {
	const navigate = useNavigate();

	const accessToken = useAppSelector(userSelectors.accessTokenSelector);

	const [password, setPassword] = useState('');
	const [code, setCode] = useState('');

	const [typePassword, setTypePassword] = useState<'password' | 'text' | 'email'>('password');

	const handleChangePassword = (event: ChangeEvent<HTMLInputElement>) => {
		const value = event.target.value;

		setPassword(value);
	};

	const handleChangeTypePassword = () => {
		setTypePassword((prev) => (prev === 'password' ? 'text' : 'password'));
	};

	const handleChangeCode = (event: ChangeEvent<HTMLInputElement>) => {
		const value = event.target.value;

		setCode(value);
	};

	// TODO: Переписать на thunk
	const handleSubmit = async (event: FormEvent) => {
		event.preventDefault();

		// TODO: Добавить валидацию
		const response = await API.user.resetPassword({ password, token: code });

		if (response.success) {
			alert(response.message);
			navigate(PAGES.HOME);
		}
	};

	return (
		<Layout>
			<div className={styles.container}>
				<div className={styles.contentWrapper}>
					<form
						className={styles.contentBody}
						onSubmit={handleSubmit}
					>
						<h2 className='text text_type_main-medium'>Восстановление пароля</h2>
						<Input
							type={typePassword}
							placeholder='Введите новый пароль'
							onChange={handleChangePassword}
							value={password}
							icon={typePassword === 'password' ? 'ShowIcon' : 'HideIcon'}
							onIconClick={handleChangeTypePassword}
							name='password'
							error={false}
						/>
						<Input
							type='text'
							placeholder='Введите код из письма'
							onChange={handleChangeCode}
							value={code}
							name='code'
						/>
						<Button
							type='primary'
							htmlType='submit'
						>
							Сохранить
						</Button>
					</form>
					<div className={styles.contentFooter}>
						<div className={styles.wrapperText}>
							Вспомнили пароль? <Link to={PAGES.SIGN_IN}>Войти</Link>
						</div>
					</div>
				</div>
			</div>
		</Layout>
	);
}
