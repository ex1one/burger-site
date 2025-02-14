import ReactDOM from 'react-dom';
import { ReactNode, useEffect } from 'react';

import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import { ModalOverlay } from './components';

import styles from './modal.module.css';

interface ModalProps {
	isOpen: boolean;
	title?: string;
	children: ReactNode;
	onClose?: VoidFunction;
}

const parent = document.getElementById('modal-root') as HTMLElement;

export function Modal({ isOpen, title, children, onClose }: ModalProps) {
	const handleKeyDown = (event: KeyboardEvent) => {
		if (event.key === 'Escape') {
			onClose?.();
		}
	};

	useEffect(() => {
		if (isOpen) {
			document.addEventListener('keydown', handleKeyDown);

			return () => {
				document.removeEventListener('keydown', handleKeyDown);
			};
		}
	}, [isOpen]);

	if (!isOpen) return null;

	return ReactDOM.createPortal(
		<>
			<ModalOverlay onClose={onClose} />
			<div className={styles.modal}>
				<div className={styles.header}>
					{title && <h3 className='text text_type_main-large'>{title}</h3>}
					<button
						className={styles.close}
						onClick={onClose}
					>
						<CloseIcon type='primary' />
					</button>
				</div>
				<div>{children}</div>
			</div>
		</>,
		parent,
	);
}
