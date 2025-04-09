import { useEffect } from 'react';
import { Header } from '@src/features';
import {
	Container,
	IngredientDetailsModal,
	BurgerIngredients,
	OrderDetailModal,
	BurgerConstructor,
	CheckoutButton,
} from '@src/components';
import { useAppDispatch } from '@src/hooks';
// TODO: Не нравится импорты selectors. Их наверное стоит хранить в отдельной директории.
import { fetchIngredients } from '@src/services/ingredients/ingredientsSlice';

import styles from './home.module.css';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

export function Home() {
	const dispatch = useAppDispatch();

	// TODO: Убрать после интеграции с react-router-dom
	useEffect(() => {
		dispatch(fetchIngredients());
	}, []);

	return (
		<>
			<DndProvider backend={HTML5Backend}>
				<div className={styles.container}>
					<Header />
					<main role={styles.mainContent}>
						<Container>
							<div className={styles.wrapperSections}>
								<BurgerIngredients />
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
