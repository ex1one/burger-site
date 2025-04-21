import { Ingredients } from '@src/api/ingredients/types';
import { IngredientItem } from './components';

import styles from './ingredients-list.module.css';

interface IngredientsListProps {
	title: string;
	name: string;
	items: Ingredients;
}

export function IngredientsList({ title, name, items }: IngredientsListProps) {
	return (
		<div
			className={styles.wrapper}
			data-tab={name}
		>
			<h4 className='text text_type_main-medium'>{title}</h4>
			<div className={styles.list}>
				{items.map((el) => (
					<IngredientItem
						key={el._id}
						ingredient={el}
					/>
				))}
			</div>
		</div>
	);
}
