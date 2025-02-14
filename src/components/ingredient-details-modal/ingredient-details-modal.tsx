import { Ingredient } from '@src/api/ingredients/types';

import { Modal } from '../modal';

import styles from './ingredient-details-modal.module.css';

interface IngredientDetailsModalProps {
	isOpen: boolean;
	ingredient?: Ingredient;
	onClose?: VoidFunction;
}

export function IngredientDetailsModal({ isOpen, ingredient, onClose }: IngredientDetailsModalProps) {
	return (
		<Modal
			isOpen={isOpen}
			onClose={onClose}
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
