import { Ingredient } from '@src/api/ingredients/types';
import { useAppDispatch, useAppSelector } from '@src/hooks';
import {
	constructorIngredientsSelector,
	addBun,
	addIngredient,
	removeIngredient,
	reorderIngredients,
} from '@src/services/constructorIngredients/constructorIngredientsSlice';
import { useDrop } from 'react-dnd';
import { BurgerConstructorIngredient } from './components';

import styles from './burger-constructor.module.css';

export const BurgerConstructor = () => {
	const dispatch = useAppDispatch();

	const { ingredients } = useAppSelector(constructorIngredientsSelector);

	const [{ canDrop }, drop] = useDrop(() => ({
		accept: ['bun', 'main', 'sauce'],
		drop: ({ ingredient }: { ingredient: Ingredient }) => {
			if (!ingredient) return;

			if (ingredient.type === 'bun') {
				dispatch(addBun(ingredient));
				return;
			}

			dispatch(addIngredient(ingredient));
		},
		collect: (monitor) => ({
			canDrop: monitor.canDrop(),
		}),
	}));

	const handleRemoveClick = (ingredientIndex: string) => () => {
		dispatch(removeIngredient(ingredientIndex));
	};

	const moveIngredient = (dragIngredientId: string, hoverIngredientId: string) => {
		dispatch(reorderIngredients({ dragIngredientId, hoverIngredientId }));
	};

	return (
		<div
			className={styles.wrapper}
			ref={drop}
			style={{ border: canDrop ? '2px dashed green' : '2px dashed gray' }}
		>
			<div className={styles.list}>
				{ingredients.map((ingredient, index) => {
					return (
						<BurgerConstructorIngredient
							position={index}
							key={ingredient.uniqueId}
							ingredient={ingredient}
							onClick={handleRemoveClick(ingredient.uniqueId)}
							move={moveIngredient}
						/>
					);
				})}
			</div>
		</div>
	);
};
