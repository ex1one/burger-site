import { useAppDispatch, useAppSelector } from '@src/hooks';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { useState, useRef, useEffect } from 'react';

import styles from './burger-ingredients.module.css';
import { IngredientsList } from '../ingredients-list';
import { ingredientsSelectors, ingredientsThunks } from '@src/services/ingredients';

export function BurgerIngredients() {
	const dispatch = useAppDispatch();
	const { ingredients, isLoading, error } = useAppSelector(ingredientsSelectors.ingredientsSelector);

	const [selectedTab, setSelectedTab] = useState('rolls');
	const menuItemsRef = useRef<HTMLDivElement>(null);

	// TODO: Переписать
	const handleScroll = () => {
		const wrapperRect = menuItemsRef.current?.getBoundingClientRect();
		// @ts-expect-error
		const itemElements = Array.from(menuItemsRef.current?.children);

		let closestTab = undefined;
		let closestDistance = Infinity;
		const wrapperTop = wrapperRect?.top || 0;

		itemElements.forEach((item) => {
			const rect = item.getBoundingClientRect();
			const itemTop = rect.top;
			const distance = Math.abs(itemTop - wrapperTop);

			if (distance < closestDistance) {
				closestDistance = distance;
				// @ts-expect-error
				closestTab = item.dataset.tab;
			}
		});

		if (closestTab && closestTab !== selectedTab) {
			setSelectedTab(closestTab);
		}
	};

	const handleTabClick = (value: string) => {
		setSelectedTab(value);
		const targetItem = menuItemsRef.current?.querySelector(`[data-tab="${value}"]`);
		if (targetItem) {
			targetItem.scrollIntoView({ behavior: 'smooth' });
		}
	};

	useEffect(() => {
		dispatch(ingredientsThunks.fetchIngredients());
	}, []);

	if (isLoading) {
		return 'Загрузка...';
	}

	if (error) {
		return error;
	}

	const burgers = ingredients.filter((el) => el.type === 'bun');
	const sauces = ingredients.filter((el) => el.type === 'sauce');
	const toppings = ingredients.filter((el) => el.type === 'main');

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
				<div
					className={styles.burgerIngredientsWrapper}
					ref={menuItemsRef}
					onScroll={handleScroll}
				>
					<IngredientsList
						key='rolls'
						name='rolls'
						title='Булки'
						items={burgers}
					/>
					<IngredientsList
						key='sauces'
						name='sauces'
						title='Соусы'
						items={sauces}
					/>
					<IngredientsList
						key='toppings'
						name='toppings'
						title='Начинки'
						items={toppings}
					/>
				</div>
			</div>
		</section>
	);
}
