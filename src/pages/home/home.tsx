import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";

import styles from "./home.module.css";

import {
  BurgerIngredients,
  BurgerConstructor,
  CheckoutButton,
} from "@src/components";
import { useAppDispatch } from "@src/hooks";
import { modalsActions } from "@src/services/modals";
import { NAMES_OF_MODALS } from "@src/consts";

export function Home() {
  const dispatch = useAppDispatch();

  return (
    <DndProvider backend={HTML5Backend}>
      <div className={styles.wrapperSections}>
        <BurgerIngredients />
        <section className={styles.constructorSection}>
          <BurgerConstructor />
          <CheckoutButton />
        </section>
      </div>
      <button
        onClick={() =>
          dispatch(modalsActions.openModal(NAMES_OF_MODALS.ORDER_DETAIL_MODAL))
        }
      >
        Открыть модалку
      </button>
    </DndProvider>
  );
}
