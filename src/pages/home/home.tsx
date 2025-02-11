import {
	Tab,
	CurrencyIcon,
	ConstructorElement,
	Button,
	DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useState } from 'react';
import { mockData } from '@src/consts';
import { useGetIngredients } from '@src/hooks';
import { Header } from '@src/features';
import { Container, IngredientDetailsModal, MenuItems, OrderDetailModal } from '@src/components';
import { Ingredient, Ingredients } from '@src/api/ingredients/types';

import styles from './home.module.css';

export function Home() {
	const { data: ingredients, isLoading, error } = useGetIngredients();
	const [selectedTab, setSelectedTab] = useState('rolls');
	const [open, setOpen] = useState(false);
	const [selectedIngredient, setSelectedIngredient] = useState<Ingredient>();
	const [isOpenOrderDetailModal, setIsOpenOrderDetailModal] = useState(false);

	const [order, setOrder] = useState<Ingredients>([]);

	const handleIngredientClick = (ingredient: Ingredient) => {
		setSelectedIngredient(ingredient);
		setOpen(true);
	};

	const handleIngredientDetailsModalClose = () => {
		setOpen(false);
		setSelectedIngredient(undefined);
	};

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
											onClick={setSelectedTab}
										>
											Булки
										</Tab>
										<Tab
											value='sauce'
											active={selectedTab === 'sauce'}
											onClick={setSelectedTab}
										>
											Соусы
										</Tab>
										<Tab
											value='toppings'
											active={selectedTab === 'toppings'}
											onClick={setSelectedTab}
										>
											Начинки
										</Tab>
									</div>
									<div className={styles.menuItemsWrapper}>
										<MenuItems
											key='burgers'
											title='Булки'
											items={burgers}
											onClickItem={handleIngredientClick}
										/>
										<MenuItems
											key='sauces'
											title='Соусы'
											items={sauces}
											onClickItem={handleIngredientClick}
										/>
										<MenuItems
											key='toppings'
											title='Начинки'
											items={toppings}
											onClickItem={handleIngredientClick}
										/>
									</div>
								</div>
							</section>
							<section className={styles.constructorSection}>
								<div className={styles.constructorList}>
									<ConstructorElement
										type='top'
										price={20}
										text='Краторная булка N-200i (верх)'
										thumbnail={'/images/Краторная булка.png'}
										isLocked
										extraClass={styles.constructorListBurgerItem}
									/>
									<div className={styles.ingredientsList}>
										{mockData.map((ingredient) => (
											<div
												key={ingredient._id}
												className={styles.ingredientsListItem}
											>
												<DragIcon
													type='primary'
													className={styles.dragonIcon}
												/>
												<ConstructorElement
													text={ingredient.name}
													price={ingredient.price}
													thumbnail={ingredient.image}
												/>
											</div>
										))}
									</div>
									<ConstructorElement
										type='bottom'
										price={20}
										text='Краторная булка N-200i (низ)'
										thumbnail={'/images/Краторная булка.png'}
										isLocked
										extraClass={styles.constructorListBurgerItem}
									/>
								</div>
								<div className={styles.constructorSectionFooter}>
									<div className={styles.price}>
										<p className='text text_type_digits-medium'>610</p>
										<CurrencyIcon
											type='primary'
											className={styles.priceIcon}
										/>
									</div>
									<Button
										htmlType='button'
										type='primary'
										size='large'
										onClick={() => setIsOpenOrderDetailModal(true)}
									>
										Оформить заказ
									</Button>
								</div>
							</section>
						</div>
					</Container>
				</main>
			</div>
			<IngredientDetailsModal
				isOpen={open}
				onClose={handleIngredientDetailsModalClose}
				ingredient={selectedIngredient}
			/>
			<OrderDetailModal
				isOpen={isOpenOrderDetailModal}
				onClose={() => setIsOpenOrderDetailModal(false)}
			/>
		</>
	);
}
