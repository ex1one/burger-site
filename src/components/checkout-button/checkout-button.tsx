import { useAppDispatch, useAppSelector } from '@src/hooks';
import { constructorIngredientsSelector } from '@src/services/constructorIngredients/constructorIngredientsSlice';
import { openModal } from '@src/services/modals/modalsSlice';
import { createOrderThunk } from '@src/services/order/orderSlice';
import { CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useMemo } from 'react';

import styles from './checkout-button.module.css';

export const CheckoutButton = () => {
	const dispatch = useAppDispatch();

	const { ingredients } = useAppSelector(constructorIngredientsSelector);

	const totalPrice = useMemo(() => {
		return ingredients.reduce((acc, el) => acc + el.price, 0);
	}, [ingredients]);

	const handleClick = () => {
		dispatch(createOrderThunk(ingredients.map((el) => el._id)));
		dispatch(openModal('ORDER_DETAIL_MODAL'));
	};

	return (
		<div className={styles.wrapper}>
			<div className={styles.price}>
				<p className='text text_type_digits-medium'>{totalPrice}</p>
				<CurrencyIcon
					type='primary'
					className={styles.priceIcon}
				/>
			</div>
			<Button
				htmlType='button'
				type='primary'
				size='large'
				onClick={handleClick}
			>
				Оформить заказ
			</Button>
		</div>
	);
};
