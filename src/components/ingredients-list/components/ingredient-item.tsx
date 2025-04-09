import { Ingredient } from '@src/api/ingredients/types';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDrag } from 'react-dnd';
import { useAppSelector } from '@src/hooks';
import { constructorIngredientsSelector } from '@src/services/constructorIngredients/constructorIngredientsSlice';

import styles from '../ingredients-list.module.css';

interface IngredientItemProps {
	ingredient: Ingredient;
	onClick?: (ingredient: Ingredient) => void;
}

export const IngredientItem = ({ ingredient, onClick }: IngredientItemProps) => {
	const { ingredients } = useAppSelector(constructorIngredientsSelector);

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

	const handleClick = () => onClick?.(ingredient);

	return (
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
	);
};
