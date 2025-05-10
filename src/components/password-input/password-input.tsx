import { Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { ComponentProps, forwardRef, useState } from 'react';

interface PasswordInputProps extends ComponentProps<typeof Input> {}

export const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>((props, ref) => {
	const [typePassword, setTypePassword] = useState<'password' | 'text'>('password');

	const handleChangeTypePassword = () => {
		setTypePassword((prev) => (prev === 'password' ? 'text' : 'password'));
	};

	return (
		<Input
			ref={ref}
			placeholder='Пароль'
			type={typePassword}
			icon={typePassword === 'password' ? 'ShowIcon' : 'HideIcon'}
			onIconClick={handleChangeTypePassword}
			{...props}
		/>
	);
});
