import { useAppDispatch } from '@src/hooks';
import { userThunks } from '@src/services/user';

import { Link } from '@src/components';
import { PAGES, schemas } from '@src/consts';

import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './forgot-password.module.css';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

const defaultValues = {
	email: '',
};

export function ForgotPassword() {
	const dispatch = useAppDispatch();

	const form = useForm({ defaultValues, resolver: yupResolver(schemas.auth.forgotPassword) });

	const handleSubmit = ({ email }: typeof defaultValues) => {
		dispatch(userThunks.forgotPassword({ email }));
	};

	return (
		<div className={styles.container}>
			<div className={styles.contentWrapper}>
				<form
					className={styles.contentBody}
					onSubmit={form.handleSubmit(handleSubmit)}
				>
					<h2 className='text text_type_main-medium'>Восстановление пароля</h2>
					<Controller
						name='email'
						control={form.control}
						render={({ field, formState }) => {
							return (
								<Input
									placeholder='E-mail'
									error={Boolean(formState.errors.email)}
									errorText={formState.errors.email?.message}
									{...field}
								/>
							);
						}}
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
