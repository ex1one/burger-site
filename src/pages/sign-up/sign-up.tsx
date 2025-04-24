import { ChangeEvent, FormEvent, useState } from 'react';
import { userThunks } from '@src/services/user';
import { useAppDispatch } from '@src/hooks';

import { Link } from '@src/components';
import { PAGES } from '@src/consts';

import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './sign-up.module.css';

export function SignUp() {
	const dispatch = useAppDispatch();

	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const [typePassword, setTypePassword] = useState<'password' | 'text' | 'email'>('password');

	const handleChangeEmail = (event: ChangeEvent<HTMLInputElement>) => {
		const value = event.target.value;

		setEmail(value);
	};

	const handleChangeName = (event: ChangeEvent<HTMLInputElement>) => {
		const value = event.target.value;

		setName(value);
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

		// TODO: Добавить валидацию
		dispatch(userThunks.signUp({ email, name, password }));
	};

	return (
		<div className={styles.container}>
			<div className={styles.contentWrapper}>
				<form
					className={styles.contentBody}
					onSubmit={handleSubmit}
				>
					<h2 className='text text_type_main-medium'>Регистрация</h2>
					<Input
						type='text'
						placeholder='Имя'
						onChange={handleChangeName}
						value={name}
						name='name'
					/>
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
						Зарегистрироваться
					</Button>
				</form>
				<div className={styles.contentFooter}>
					<div className={styles.wrapperText}>
						Уже зарегистрированы? <Link to={PAGES.SIGN_IN}>Войти</Link>
					</div>
				</div>
			</div>
		</div>
	);
}
