import { Ingredient } from '@src/api/ingredients/types';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDrag } from 'react-dnd';
import { useAppDispatch, useAppSelector } from '@src/hooks';
import { constructorIngredientsSelectors } from '@src/services/constructorIngredients';

import styles from '../ingredients-list.module.css';
import { ingredientDetailActions } from '@src/services/ingredientDetail';
import { modalsActions } from '@src/services/modals';
import { NAMES_OF_MODALS } from '@src/consts';
import { Link, useLocation } from 'react-router-dom';

interface IngredientItemProps {
	ingredient: Ingredient;
}

export const IngredientItem = ({ ingredient }: IngredientItemProps) => {
	const location = useLocation();

	const dispatch = useAppDispatch();
	const { ingredients } = useAppSelector(constructorIngredientsSelectors.constructorIngredientsSelector);

	const countOfSelectedIngredient = ingredients.reduce((acc, el) => {
		return acc + (ingredient._id === el._id ? 1 : 0);
	}, 0);

	const [{ isDragging }, drag] = useDrag(() => ({
		type: ingredient.type,
		item: { ingredient },
		collect: (monitor) => ({
			isDragging: !!monitor.isDragging(),
		}),
	}));

	const handleClick = () => {
		dispatch(ingredientDetailActions.setIngredientDetail(ingredient));
		dispatch(modalsActions.openModal(NAMES_OF_MODALS.INGREDIENT_DETAIL_MODAL));
	};

	return (
		<Link
			to={`/ingredients/${ingredient._id}`}
			state={{ background: location }}
		>
			<div
				ref={drag}
				className={styles.item}
				onClick={handleClick}
				style={{ cursor: 'pointer', opacity: isDragging ? 0.5 : 1 }}
			>
				<img
					loading='lazy'
					src={ingredient.image}
					className={styles.image}
				/>
				<div className={styles.itemContentWrapper}>
					<div className={styles.itemContentHeader}>
						{countOfSelectedIngredient ? (
							<span className={styles.countOfSelectedIngredient}>{countOfSelectedIngredient}</span>
						) : null}
						<p className='text text_type_digits-default'>{ingredient.price}</p>
						<CurrencyIcon type='primary' />
					</div>
					<p className='text text_type_main-default'>{ingredient.name}</p>
				</div>
			</div>
		</Link>
	);
};
