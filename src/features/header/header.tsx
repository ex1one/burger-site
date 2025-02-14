import { Container, Link } from '@src/components';
import { Logo } from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './header.module.css';

interface HeaderProps {}

export function Header({}: HeaderProps) {
	return (
		<header className={styles.header}>
			<Container>
				<nav>
					<ul className={styles.nav}>
						<div className={styles.navList}>
							<li>
								<Link
									to='/'
									leftIcon='burger'
								>
									Конструктор
								</Link>
							</li>
							<li>
								<Link
									to='/orders'
									leftIcon='list'
								>
									Лента заказов
								</Link>
							</li>
						</div>
						<div className={styles.logoContainer}>
							<li>
								<Link to='/'>
									<Logo />
								</Link>
							</li>
						</div>
						<div>
							<li>
								<Link
									to='/profile'
									leftIcon='profile'
								>
									Личный кабинет
								</Link>
							</li>
						</div>
					</ul>
				</nav>
			</Container>
		</header>
	);
}
