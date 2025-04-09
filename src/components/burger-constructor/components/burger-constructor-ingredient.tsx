import { IngredientWithUniqueId } from '@src/api/ingredients/types';
import { DragIcon, ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDrag, useDrop } from 'react-dnd';

import styles from './burger-constructor-ingredient.module.css';

interface BurgerConstructorIngredientProps {
	ingredient: IngredientWithUniqueId;
	position: number;
	move: (dragIngredientId: string, hoverIngredientId: string) => void;
	onClick: VoidFunction;
}

export const BurgerConstructorIngredient = ({
	ingredient,
	position,
	move,
	onClick,
}: BurgerConstructorIngredientProps) => {
	const isBun = ingredient.type === 'bun';

	const [{ isDragging }, drag] = useDrag(() => ({
		type: ingredient.type,
		item: { uniqueId: ingredient.uniqueId },
		collect: (monitor) => ({
			isDragging: monitor.isDragging(),
		}),
	}));

	const [, drop] = useDrop(() => ({
		accept: ['main', 'sauce'],
		drop: (item: { uniqueId: string }) => {
			if (!item.uniqueId) return;

			if (item.uniqueId !== ingredient.uniqueId) {
				move(item.uniqueId, ingredient.uniqueId);
			}
		},
	}));

	return (
		<div
			className={styles.wrapper}
			ref={(node) => drag(drop(node))}
			style={{ opacity: isDragging ? 0.5 : 1 }}
		>
			{isBun ? (
				<ConstructorElement
					type={position === 0 ? 'top' : 'bottom'}
					text={`${ingredient.name} ${position === 0 ? '(верх)' : '(низ)'}`}
					price={ingredient.price}
					thumbnail={ingredient.image}
					isLocked
				/>
			) : (
				<>
					<DragIcon
						type='primary'
						className={styles.dragIcon}
					/>
					<ConstructorElement
						text={ingredient.name}
						price={ingredient.price}
						thumbnail={ingredient.image}
						handleClose={onClick}
					/>
				</>
			)}
		</div>
	);
};
