import { useEffect, RefObject, Dispatch, SetStateAction } from "react";
import { v4 as uuid4 } from "uuid";

import { IngredientsList } from "../ingredients-list";

import styles from "./burger-ingredients-list.module.css";

import { useAppDispatch, useAppSelector } from "@src/hooks";
import {
  ingredientsSelectors,
  ingredientsThunks,
} from "@src/services/ingredients";
import { isPendingByStatus } from "@src/utils";

interface BurgerIngredientsListProps {
  menuItemsRef: RefObject<HTMLDivElement>;
  selectedTab: string;
  setSelectedTab: Dispatch<SetStateAction<string>>;
}

export function BurgerIngredientsList({
  menuItemsRef,
  selectedTab,
  setSelectedTab,
}: BurgerIngredientsListProps) {
  const dispatch = useAppDispatch();
  const { ingredients, status, error } = useAppSelector(
    ingredientsSelectors.sliceSelector
  );
  const isPending = isPendingByStatus(status);

  // TODO: Переписать
  const handleScroll = () => {
    const wrapperRect = menuItemsRef.current?.getBoundingClientRect();
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
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
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        closestTab = item.dataset.tab;
      }
    });

    if (closestTab && closestTab !== selectedTab) {
      setSelectedTab(closestTab);
    }
  };

  useEffect(() => {
    const abort = dispatch(ingredientsThunks.fetchIngredients());

    return () => {
      abort.abort();
    };
  }, [dispatch]);

  if (isPending) {
    const array = new Array(4).fill(1);

    return (
      <div className={styles.skeletonsWrapper}>
        {array.map(() => {
          return (
            <div key={uuid4()} className={styles.skeletonCard}>
              <div className={styles.skeletonCardImage} />
              <div className={styles.skeletonCardContent} />
            </div>
          );
        })}
      </div>
    );
  }

  if (error) {
    return error;
  }

  const burgers = ingredients.filter((el) => el.type === "bun");
  const sauces = ingredients.filter((el) => el.type === "sauce");
  const toppings = ingredients.filter((el) => el.type === "main");

  return (
    <div className={styles.wrapper} ref={menuItemsRef} onScroll={handleScroll}>
      <IngredientsList key="rolls" name="rolls" title="Булки" items={burgers} />
      <IngredientsList
        key="sauces"
        name="sauces"
        title="Соусы"
        items={sauces}
      />
      <IngredientsList
        key="toppings"
        name="toppings"
        title="Начинки"
        items={toppings}
      />
    </div>
  );
}
