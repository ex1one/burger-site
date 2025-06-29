import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";

import styles from "./home.module.css";

import {
  BurgerIngredients,
  BurgerConstructor,
  CheckoutButton,
} from "@src/components";

export function Home() {
  // TODO: После того как запрос на получение упал. При следующем запросе, который отрабатывает отлично, показывается ошибка.
  // Поправить это
  return (
    <DndProvider backend={HTML5Backend}>
      <div className={styles.wrapperSections}>
        <BurgerIngredients />
        <section className={styles.constructorSection}>
          <BurgerConstructor />
          <CheckoutButton />
        </section>
      </div>
    </DndProvider>
  );
}
