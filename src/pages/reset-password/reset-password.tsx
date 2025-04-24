import { ChangeEvent, FormEvent, useState } from 'react';

import { Link } from '@src/components';
import { PAGES } from '@src/consts';
import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './reset-password.module.css';
import { useAppDispatch } from '@src/hooks';
import { userThunks } from '@src/services/user';

export function ResetPassword() {
	const dispatch = useAppDispatch();

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

	const handleSubmit = (event: FormEvent) => {
		event.preventDefault();

		dispatch(userThunks.changePassword({ password, code }));
	};

	return (
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
	);
}
