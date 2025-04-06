import { Ingredient, Ingredients } from '@src/api/ingredients/types';
import { BurgerIngredient } from './components';

import styles from './burger-ingredients.module.css';

interface BurgerIngredientsProps {
	title: string;
	name: string;
	items: Ingredients;
	onClickItem?: (ingredient: Ingredient) => void;
}

export function BurgerIngredients({ title, name, items, onClickItem }: BurgerIngredientsProps) {
	const handleClick = (ingredient: Ingredient) => {
		onClickItem?.(ingredient);
	};

	return (
		<div
			className={styles.wrapper}
			data-tab={name}
		>
			<h4 className='text text_type_main-medium'>{title}</h4>
			<div className={styles.list}>
				{items.map((el) => (
					<BurgerIngredient
						key={el._id}
						ingredient={el}
						onClick={handleClick}
					/>
				))}
			</div>
		</div>
	);
}
