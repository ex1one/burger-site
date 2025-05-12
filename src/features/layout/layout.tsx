import { Outlet } from 'react-router-dom';

import { Header } from '../header';

import styles from './layout.module.css';

import { Container } from '@src/components';

export function Layout() {
	return (
		<div className={styles.container}>
			<Header />
			<main role={styles.main}>
				<Container>
					<Outlet />
				</Container>
			</main>
		</div>
	);
}
