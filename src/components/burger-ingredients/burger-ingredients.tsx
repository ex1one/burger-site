import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { useState, useRef } from 'react';

import { BurgerIngredientsList } from '..';

import styles from './burger-ingredients.module.css';

export function BurgerIngredients() {
	const [selectedTab, setSelectedTab] = useState('rolls');
	const menuItemsRef = useRef<HTMLDivElement>(null);

	const handleTabClick = (value: string) => {
		setSelectedTab(value);
		const targetItem = menuItemsRef.current?.querySelector(`[data-tab="${value}"]`);
		if (targetItem) {
			targetItem.scrollIntoView({ behavior: 'smooth' });
		}
	};

	return (
		<section className={styles.menuSection}>
			<h1 className='text text_type_main-large'>Соберите бургер</h1>
			<div className={styles.menuList}>
				<div className={styles.tabsList}>
					<Tab
						value='rolls'
						active={selectedTab === 'rolls'}
						onClick={handleTabClick}
					>
						Булки
					</Tab>
					<Tab
						value='sauces'
						active={selectedTab === 'sauces'}
						onClick={handleTabClick}
					>
						Соусы
					</Tab>
					<Tab
						value='toppings'
						active={selectedTab === 'toppings'}
						onClick={handleTabClick}
					>
						Начинки
					</Tab>
				</div>
				<BurgerIngredientsList
					selectedTab={selectedTab}
					setSelectedTab={setSelectedTab}
					menuItemsRef={menuItemsRef}
				/>
			</div>
		</section>
	);
}
