import { CheckMarkIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useMemo } from 'react';

import { Modal } from '../modal';

import styles from './order-details-modal.module.css';

import { useAppDispatch, useAppSelector } from '@src/hooks';
import { NAMES_OF_MODALS } from '@src/consts';
import { orderActions, orderSelectors } from '@src/services/order/slice';
import { constructorIngredientsActions } from '@src/services/constructorIngredients';
import { modalsActions, modalsSelectors } from '@src/services/modals';

export function OrderDetailModal() {
	const dispatch = useAppDispatch();
	const { order, isLoading, error } = useAppSelector(orderSelectors.orderSelector);
	const isOpen = useAppSelector((state) =>
		modalsSelectors.modalSelector(state, NAMES_OF_MODALS.ORDER_DETAIL_MODAL),
	);

	const handleClose = () => {
		dispatch(orderActions.clearOrder());
		dispatch(constructorIngredientsActions.clearConstructor());
		dispatch(modalsActions.closeModal(NAMES_OF_MODALS.ORDER_DETAIL_MODAL));
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
