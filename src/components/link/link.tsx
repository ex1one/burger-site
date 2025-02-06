import { icons } from '@src/consts';
import { ReactNode, Fragment } from 'react';
import { NavLink } from 'react-router-dom';

interface LinkProps {
	to: string;
	children: ReactNode;
	leftIcon?: keyof typeof icons;
}

export function Link({ to, children, leftIcon }: LinkProps) {
	const LeftIcon = leftIcon ? icons[leftIcon] : null;

	return (
		<NavLink
			to={to}
			// TODO: Убрать style. После того как создам стили для текста
			style={{ display: 'flex', gap: 8, alignItems: 'center' }}
			className='text text_type_main-small'
		>
			{({ isActive }) => {
				return (
					<Fragment>
						{LeftIcon && <LeftIcon type={isActive ? 'primary' : 'secondary'} />}
						<span className={`text text_type_main-small ${isActive ? '' : 'text_color_inactive'}`}>
							{children}
						</span>
					</Fragment>
				);
			}}
		</NavLink>
	);
}
