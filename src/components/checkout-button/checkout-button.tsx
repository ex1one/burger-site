import { useAppDispatch, useAppSelector } from '@src/hooks';
import { CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useMemo } from 'react';

import styles from './checkout-button.module.css';
import { NAMES_OF_MODALS } from '@src/consts';
import { constructorIngredientsSelectors } from '@src/services/constructorIngredients';
import { createOrderThunk } from '@src/services/order/thunks';
import { modalsActions } from '@src/services/modals';
import { userSelectors } from '@src/services/user';
import { useNavigate } from 'react-router-dom';
import { PAGES } from '../../consts/pages';

export const CheckoutButton = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const { ingredients } = useAppSelector(constructorIngredientsSelectors.constructorIngredientsSelector);
	const user = useAppSelector(userSelectors.userSelector);

	const totalPrice = useMemo(() => {
		return ingredients.reduce((acc, el) => acc + el.price, 0);
	}, [ingredients]);

	const handleClick = () => {
		if (!user) {
			navigate(PAGES.SIGN_IN);
			return;
		}

		dispatch(createOrderThunk(ingredients.map((el) => el._id)));
		dispatch(modalsActions.openModal(NAMES_OF_MODALS.ORDER_DETAIL_MODAL));
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
