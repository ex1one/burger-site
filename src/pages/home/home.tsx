import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { useEffect, useRef, useState } from 'react';
import { Header } from '@src/features';
import {
	Container,
	IngredientDetailsModal,
	BurgerIngredients,
	OrderDetailModal,
	BurgerConstructor,
	CheckoutButton,
} from '@src/components';
import { Ingredient } from '@src/api/ingredients/types';
import { useAppDispatch, useAppSelector } from '@src/hooks';
// TODO: Не нравится импорты selectors. Их наверное стоит хранить в отдельной директории.
import { fetchIngredients, ingredientsSelector } from '@src/services/ingredients/ingredientsSlice';

import styles from './home.module.css';
import { openModal } from '@src/services/modals/modalsSlice';
import { setIngredientDetail } from '@src/services/ingredientDetail/ingredientDetailSlice';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

export function Home() {
	const dispatch = useAppDispatch();
	const { ingredients, isLoading, error } = useAppSelector(ingredientsSelector);

	const [selectedTab, setSelectedTab] = useState('rolls');
	const menuItemsRef = useRef<HTMLDivElement>(null);

	const handleIngredientClick = (ingredient: Ingredient) => {
		dispatch(setIngredientDetail(ingredient));
		dispatch(openModal('INGREDIENT_DETAIL_MODAL'));
	};

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

	// TODO: Убрать после интеграции с react-router-dom
	useEffect(() => {
		dispatch(fetchIngredients());
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
		<>
			<DndProvider backend={HTML5Backend}>
				<div className={styles.container}>
					<Header />
					<main role={styles.mainContent}>
						<Container>
							<div className={styles.wrapperSections}>
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
											<BurgerIngredients
												key='rolls'
												name='rolls'
												title='Булки'
												items={burgers}
												onClickItem={handleIngredientClick}
											/>
											<BurgerIngredients
												key='sauces'
												name='sauces'
												title='Соусы'
												items={sauces}
												onClickItem={handleIngredientClick}
											/>
											<BurgerIngredients
												key='toppings'
												name='toppings'
												title='Начинки'
												items={toppings}
												onClickItem={handleIngredientClick}
											/>
										</div>
									</div>
								</section>
								<section className={styles.constructorSection}>
									<BurgerConstructor />
									<CheckoutButton />
								</section>
							</div>
						</Container>
					</main>
				</div>
			</DndProvider>

			<IngredientDetailsModal />
			<OrderDetailModal />
		</>
	);
}
