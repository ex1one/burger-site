import { CheckMarkIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import { Modal } from '../modal';

import styles from './order-details-modal.module.css';
import { useAppDispatch, useAppSelector } from '@src/hooks';
import { clearOrder, orderSelector } from '@src/services/order/orderSlice';
import { closeModal, modalSelector } from '@src/services/modals/modalsSlice';
import { useMemo } from 'react';
import { clearConstructor } from '@src/services/constructorIngredients/constructorIngredientsSlice';

export function OrderDetailModal() {
	const dispatch = useAppDispatch();

	const { order, isLoading, error } = useAppSelector(orderSelector);
	const isOpen = useAppSelector((state) => modalSelector(state, 'ORDER_DETAIL_MODAL'));

	const handleClose = () => {
		dispatch(clearOrder());
		dispatch(clearConstructor());
		dispatch(closeModal('ORDER_DETAIL_MODAL'));
	};

	const content = useMemo(() => {
		if (isLoading) {
			return 'Формирование заказа...';
		}

		if (error) {
			return 'Ошибка формирования заказа...';
		}

		if (!order) return 'Произошла непредвиденная ошибка...';

		return (
			<div className={styles.content}>
				<div className={styles.header}>
					<h4 className='text text_type_digits-large'>{order.number}</h4>
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
		);
	}, [order, isLoading, error]);

	return (
		<Modal
			isOpen={isOpen}
			onClose={handleClose}
		>
			{content}
		</Modal>
	);
}
