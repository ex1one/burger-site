import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './menu-items.module.css';

interface Item {
	_id: string;
	name: string;
	type: string;
	proteins: number;
	fat: number;
	carbohydrates: number;
	calories: number;
	price: number;
	image: string;
	image_mobile: string;
	image_large: string;
}

interface MenuItemsProps {
	title: string;
	items: Item[];
}
// TODO: Переименовать этот компонент
export function MenuItems({ title, items }: MenuItemsProps) {
	return (
		<div className={styles.wrapper}>
			<h4 className='text text_type_main-medium'>{title}</h4>
			<div className={styles.list}>
				{items.map((el) => {
					return (
						<div className={styles.item}>
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
