import { useAppDispatch, useAppSelector } from '@src/hooks';
import { Modal } from '../modal';

import styles from './ingredient-details-modal.module.css';
import {
	clearIngredientDetail,
	ingredientDetailSelector,
} from '@src/services/ingredientDetail/ingredientDetailSlice';
import { closeModal, modalSelector } from '@src/services/modals/modalsSlice';
import { NAMES_OF_MODALS } from '@src/consts';

export function IngredientDetailsModal() {
	const dispatch = useAppDispatch();

	const ingredientDetail = useAppSelector(ingredientDetailSelector);
	const isOpen = useAppSelector((state) => modalSelector(state, NAMES_OF_MODALS.INGREDIENT_DETAIL_MODAL));

	const handleClose = () => {
		dispatch(closeModal(NAMES_OF_MODALS.INGREDIENT_DETAIL_MODAL));
		dispatch(clearIngredientDetail());
	};

	if (!ingredientDetail) {
		return null;
	}

	const ingredient = ingredientDetail;

	return (
		<Modal
			isOpen={isOpen}
			onClose={handleClose}
			title='Детали ингредиента'
		>
			<div className={styles.content}>
				{ingredient ? (
					<>
						<img
							src={ingredient.image}
							loading='lazy'
							className={styles.image}
						/>
						<div className={styles.info}>
							<h4 className={styles.ingredientName}>{ingredient.name}</h4>
							<div className={styles.nutrientsInfo}>
								<div className={styles.nutrient}>
									<p className='text text_type_main-default'>Калории, ккал</p>
									<p className='text text_type_digits-default'>{ingredient.calories}</p>
								</div>
								<div className={styles.nutrient}>
									<p className='text text_type_main-default'>Белки, г</p>
									<p className='text text_type_digits-default'>{ingredient.proteins}</p>
								</div>
								<div className={styles.nutrient}>
									<p className='text text_type_main-default'>Жиры, г</p>
									<p className='text text_type_digits-default'>{ingredient.fat}</p>
								</div>
								<div className={styles.nutrient}>
									<p className='text text_type_main-default'>Углеводы, г</p>
									<p className='text text_type_digits-default'>{ingredient.carbohydrates}</p>
								</div>
							</div>
						</div>
					</>
				) : (
					'Выберите ингредиент'
				)}
			</div>
		</Modal>
	);
}
