import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import { Ingredient, Ingredients } from '@src/api/ingredients/types';

import styles from './menu-items.module.css';

interface MenuItemsProps {
	title: string;
	items: Ingredients;
	onClickItem?: (ingredient: Ingredient) => void;
}
// TODO: Переименовать этот компонент
export function MenuItems({ title, items, onClickItem }: MenuItemsProps) {
	const handleClick = (ingredient: Ingredient) => {
		onClickItem?.(ingredient);
	};

	return (
		<div className={styles.wrapper}>
			<h4 className='text text_type_main-medium'>{title}</h4>
			<div className={styles.list}>
				{items.map((el) => {
					return (
						<div
							key={el._id}
							className={styles.item}
							onClick={() => handleClick(el)}
							style={{ cursor: 'pointer' }}
						>
							<img
								loading='lazy'
								src={el.image}
								className={styles.image}
							/>
							<div className={styles.itemContentWrapper}>
								<div className={styles.itemContentHeader}>
									<p className='text text_type_digits-default'>{el.price}</p>
									<CurrencyIcon type='primary' />
								</div>
								<p className='text text_type_main-default'>{el.name}</p>
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
}
