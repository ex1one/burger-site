import { Ingredient } from '@src/api/ingredients/types';
import { DragIcon, ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDrag, useDrop } from 'react-dnd';

import styles from './burger-constructor-ingredient.module.css';

interface BurgerConstructorIngredientProps {
	ingredient: Ingredient;
	position: number;
	move: (dragIndex: number, hoverIndex: number) => void;
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
		item: { position },
		collect: (monitor) => ({
			isDragging: monitor.isDragging(),
		}),
	}));

	const [, drop] = useDrop(() => ({
		accept: ['main', 'sauce'],
		drop: (item: { position: number }) => {
			if (!item.position) return;

			if (item.position !== position) {
				move(item.position, position);
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
					text={ingredient.name}
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
