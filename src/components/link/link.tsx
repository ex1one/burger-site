import { icons } from '@src/consts';
import { ReactNode, Fragment } from 'react';
import { NavLink } from 'react-router-dom';

import styles from './link.module.css';

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
			className={styles.link}
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
