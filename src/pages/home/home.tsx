import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Layout } from '@src/features';
import { BurgerIngredients, BurgerConstructor, CheckoutButton } from '@src/components';

import styles from './home.module.css';

export function Home() {
	return (
		<DndProvider backend={HTML5Backend}>
			<Layout>
				<div className={styles.wrapperSections}>
					<BurgerIngredients />
					<section className={styles.constructorSection}>
						<BurgerConstructor />
						<CheckoutButton />
					</section>
				</div>
			</Layout>
		</DndProvider>
	);
}
