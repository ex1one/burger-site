import { ReactNode } from 'react';

import styles from './container.module.css';

interface ContainerProps {
	children: ReactNode;
}

export function Container({ children }: ContainerProps) {
	return <div className={styles.container}>{children}</div>;
}
