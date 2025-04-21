import { ReactNode } from 'react';
import { Container } from '@src/components';
import { Header } from '../header';

import styles from './layout.module.css';

interface LayoutProps {
	children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
	return (
		<div className={styles.container}>
			<Header />
			<main role={styles.main}>
				<Container>{children}</Container>
			</main>
		</div>
	);
}
