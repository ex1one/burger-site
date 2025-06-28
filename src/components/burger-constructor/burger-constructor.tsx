import { useDrop } from "react-dnd";
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";

import { BurgerConstructorIngredient } from "./components";
import styles from "./burger-constructor.module.css";

import { Ingredient } from "@src/api/ingredients/types";
import { useActionCreator, useAppSelector } from "@src/hooks";
import {
  constructorIngredientsActions,
  constructorIngredientsSelectors,
} from "@src/services/constructorIngredients";

export const BurgerConstructor = () => {
  const ingredients = useAppSelector(
    constructorIngredientsSelectors.ingredientsSelector
  );
  const actions = useActionCreator(constructorIngredientsActions);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, drop] = useDrop(() => ({
    accept: ["bun", "main", "sauce"],
    drop: ({ ingredient }: { ingredient: Ingredient }) => {
      if (!ingredient) return;

      if (ingredient.type === "bun") {
        actions.addBun(ingredient);
        return;
      }

      actions.addIngredient(ingredient);
    },
    collect: (monitor) => ({
      canDrop: monitor.canDrop(),
    }),
  }));

  const handleRemoveClick = (ingredientIndex: string) => () => {
    actions.removeIngredient(ingredientIndex);
  };

  const moveIngredient = (
    dragIngredientId: string,
    hoverIngredientId: string
  ) => {
    actions.reorderIngredients({ dragIngredientId, hoverIngredientId });
  };

  const buns = ingredients.filter((ingredient) => ingredient.type === "bun");
  const ingredientsWithoutBuns = ingredients.filter(
    (ingredient) => ingredient.type !== "bun"
  );

  const [topBun, downBun] = buns;

  return (
    <div className={styles.wrapper} ref={drop} data-cy="burger-constructor">
      {topBun ? (
        <div data-cy="burger-constructor-top-bun">
          <ConstructorElement
            type="top"
            text={`${topBun.name} "(верх)"`}
            price={topBun.price}
            thumbnail={topBun.image}
            isLocked
            extraClass={styles.top}
          />
        </div>
      ) : (
        <div className={styles.topBun}>Выберите верхнюю булку</div>
      )}
      {ingredientsWithoutBuns.length === 0 ? (
        <div className={styles.middle}>Выберите ингредиенты</div>
      ) : (
        <div className={styles.list}>
          {ingredientsWithoutBuns.map((ingredient, index) => {
            return (
              <BurgerConstructorIngredient
                position={index}
                key={ingredient.uniqueId}
                ingredient={ingredient}
                onClick={handleRemoveClick(ingredient.uniqueId)}
                move={moveIngredient}
              />
            );
          })}
        </div>
      )}
      {downBun ? (
        <div data-cy="burger-constructor-down-bun">
          <ConstructorElement
            type="bottom"
            text={`${downBun.name} "(низ)"`}
            price={downBun.price}
            thumbnail={downBun.image}
            isLocked
          />
        </div>
      ) : (
        <div className={styles.downBun}>Выберите нижнюю булку</div>
      )}
    </div>
  );
};
