import { userThunks } from '@src/services/user';
import { useAppDispatch } from '@src/hooks';

import { Link, PasswordInput } from '@src/components';
import { PAGES, schemas } from '@src/consts';

import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './sign-up.module.css';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

const defaultValues = {
	name: '',
	email: '',
	password: '',
};

export function SignUp() {
	const dispatch = useAppDispatch();

	const form = useForm({ defaultValues, resolver: yupResolver(schemas.auth.signUp) });

	const handleSubmit = ({ email, name, password }: typeof defaultValues) => {
		dispatch(userThunks.signUp({ email, name, password }));
	};

	return (
		<div className={styles.container}>
			<div className={styles.contentWrapper}>
				<form
					className={styles.contentBody}
					onSubmit={form.handleSubmit(handleSubmit)}
				>
					<h2 className='text text_type_main-medium'>Регистрация</h2>
					<Controller
						name='name'
						control={form.control}
						render={({ field, formState }) => {
							return (
								<Input
									placeholder='Имя'
									error={Boolean(formState.errors.name)}
									errorText={formState.errors.name?.message}
									{...field}
								/>
							);
						}}
					/>
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
					<Controller
						name='password'
						control={form.control}
						render={({ field, formState }) => {
							return (
								<PasswordInput
									error={Boolean(formState.errors.password)}
									errorText={formState.errors.password?.message}
									{...field}
								/>
							);
						}}
					/>
					<Button
						type='primary'
						htmlType='submit'
						disabled={form.formState.isSubmitting}
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
