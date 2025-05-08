import { useAppDispatch, useAppSelector } from '@src/hooks';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { useState, useRef, useEffect, RefObject, Dispatch, SetStateAction } from 'react';

import styles from './burger-ingredients.module.css';
import { IngredientsList } from '../ingredients-list';
import { ingredientsSelectors, ingredientsThunks } from '@src/services/ingredients';

const CommonIngredientsList = ({
	menuItemsRef,
	selectedTab,
	setSelectedTab,
}: {
	menuItemsRef: RefObject<HTMLDivElement>;
	selectedTab: string;
	setSelectedTab: Dispatch<SetStateAction<string>>;
}) => {
	const dispatch = useAppDispatch();
	const { ingredients, isLoading, error } = useAppSelector(ingredientsSelectors.ingredientsSelector);

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

	useEffect(() => {
		dispatch(ingredientsThunks.fetchIngredients());
	}, []);

	if (isLoading) {
		const array = new Array(4).fill(1);

		return (
			<div className={styles.loadingWrapper}>
				{array.map(() => {
					return (
						<div className={styles.loading}>
							<div className={styles.imageLoading} />
							<div className={styles.itemContentWrapperLoading} />
						</div>
					);
				})}
			</div>
		);
	}

	if (error) {
		return error;
	}

	const burgers = ingredients.filter((el) => el.type === 'bun');
	const sauces = ingredients.filter((el) => el.type === 'sauce');
	const toppings = ingredients.filter((el) => el.type === 'main');

	return (
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
	);
};

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
				<CommonIngredientsList
					selectedTab={selectedTab}
					setSelectedTab={setSelectedTab}
					menuItemsRef={menuItemsRef}
				/>
			</div>
		</section>
	);
}
