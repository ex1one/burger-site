import { Ingredient } from '@src/api/ingredients/types';
import { useActionCreator, useAppSelector } from '@src/hooks';
import { useDrop } from 'react-dnd';
import { BurgerConstructorIngredient } from './components';
import {
	constructorIngredientsActions,
	constructorIngredientsSelectors,
} from '@src/services/constructorIngredients';

import styles from './burger-constructor.module.css';

export const BurgerConstructor = () => {
	const { ingredients } = useAppSelector(constructorIngredientsSelectors.constructorIngredientsSelector);
	const actions = useActionCreator(constructorIngredientsActions);

	const [{ canDrop }, drop] = useDrop(() => ({
		accept: ['bun', 'main', 'sauce'],
		drop: ({ ingredient }: { ingredient: Ingredient }) => {
			if (!ingredient) return;

			if (ingredient.type === 'bun') {
				actions.addBun(ingredient);
				return;
			}

			actions.addIngredient(ingredient);
		},
		collect: (monitor) => ({
			canDrop: monitor.canDrop(),
		}),
	}));

	const handleRemoveClick = (ingredientIndex: string) => () => {
		actions.removeIngredient(ingredientIndex);
	};

	const moveIngredient = (dragIngredientId: string, hoverIngredientId: string) => {
		actions.reorderIngredients({ dragIngredientId, hoverIngredientId });
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
