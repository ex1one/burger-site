import {
	Tab,
	CurrencyIcon,
	ConstructorElement,
	Button,
	DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useState } from 'react';
import { mockData } from '@src/consts';
import { Header } from '@src/features';
import { Container, MenuItems } from '@src/components';

import styles from './home.module.css';

export function Home() {
	const [selectedTab, setSelectedTab] = useState('rolls');

	const [burgers] = useState(() => mockData.filter((el) => el.type === 'bun'));
	const [sauces] = useState(() => mockData.filter((el) => el.type === 'sauce'));
	const [toppings] = useState(() => mockData.filter((el) => el.type === 'main'));

	return (
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
										title='Булки'
										items={burgers}
									/>
									<MenuItems
										title='Соусы'
										items={sauces}
									/>
									<MenuItems
										title='Начинки'
										items={toppings}
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
								>
									Оформить заказ
								</Button>
							</div>
						</section>
					</div>
				</Container>
			</main>
		</div>
	);
}
