import { CheckMarkIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import { Modal } from '../modal';

import styles from './order-details-modal.module.css';

interface OrderDetailModalProps {
	isOpen: boolean;
	onClose?: VoidFunction;
}

export function OrderDetailModal({ isOpen, onClose }: OrderDetailModalProps) {
	return (
		<Modal
			isOpen={isOpen}
			onClose={onClose}
		>
			<div className={styles.content}>
				<div className={styles.header}>
					<h4 className='text text_type_digits-large'>034536</h4>
					<p className='text text_type_main-medium'>идентификатор заказа</p>
				</div>
				<div className={styles.accept}>
					<CheckMarkIcon
						type='primary'
						className={styles.image}
					/>
				</div>
				<div className={styles.footer}>
					<p className='text text_type_main-default'>Ваш заказ начали готовить</p>
					<p className='text text_type_main-default text_color_inactive'>
						Дождитесь готовности на орбитальной станции
					</p>
				</div>
			</div>
		</Modal>
	);
}
