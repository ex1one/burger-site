import { ChangeEvent, FormEvent, useState } from 'react';

import { useAppDispatch } from '@src/hooks';
import { userThunks } from '@src/services/user';

import { Link } from '@src/components';
import { PAGES } from '@src/consts';

import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './forgot-password.module.css';

export function ForgotPassword() {
	const dispatch = useAppDispatch();

	const [email, setEmail] = useState('');

	const handleChangeEmail = (event: ChangeEvent<HTMLInputElement>) => {
		const value = event.target.value;

		setEmail(value);
	};

	const handleSubmit = (event: FormEvent) => {
		event.preventDefault();

		// TODO: Добавить валидацию
		dispatch(userThunks.forgotPassword({ email }));
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
						type='email'
						placeholder='E-mail'
						onChange={handleChangeEmail}
						value={email}
						name='email'
					/>
					<Button
						type='primary'
						htmlType='submit'
					>
						Восстановить
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
