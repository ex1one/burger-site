import { ChangeEvent, FormEvent, useState } from 'react';
import { useAppDispatch } from '@src/hooks';
import { userThunks } from '@src/services/user';

import { Link } from '@src/components';
import { PAGES } from '@src/consts';

import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './sign-in.module.css';

export function SignIn() {
	const dispatch = useAppDispatch();

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const [typePassword, setTypePassword] = useState<'password' | 'text' | 'email'>('password');

	const handleChangeEmail = (event: ChangeEvent<HTMLInputElement>) => {
		const value = event.target.value;

		setEmail(value);
	};

	const handleChangePassword = (event: ChangeEvent<HTMLInputElement>) => {
		const value = event.target.value;

		setPassword(value);
	};

	const handleChangeTypePassword = () => {
		setTypePassword((prev) => (prev === 'password' ? 'text' : 'password'));
	};

	const handleSubmit = (event: FormEvent) => {
		event.preventDefault();

		dispatch(userThunks.signIn({ email, password }));
	};

	return (
		<div className={styles.container}>
			<div className={styles.contentWrapper}>
				<form
					className={styles.contentBody}
					onSubmit={handleSubmit}
				>
					<h2 className='text text_type_main-medium'>Вход</h2>
					<Input
						type='email'
						placeholder='E-mail'
						onChange={handleChangeEmail}
						value={email}
						name='email'
					/>
					<Input
						type={typePassword}
						placeholder='Пароль'
						onChange={handleChangePassword}
						value={password}
						icon={typePassword === 'password' ? 'ShowIcon' : 'HideIcon'}
						onIconClick={handleChangeTypePassword}
						name='password'
						error={false}
					/>
					<Button
						type='primary'
						htmlType='submit'
					>
						Войти
					</Button>
				</form>
				<div className={styles.contentFooter}>
					<div className={styles.wrapperText}>
						Вы — новый пользователь? <Link to={PAGES.SIGN_UP}>Зарегистрироваться</Link>
					</div>
					<div className={styles.wrapperText}>
						Забыли пароль? <Link to={PAGES.FORGOT_PASSWORD}>Восстановить пароль</Link>
					</div>
				</div>
			</div>
		</div>
	);
}
