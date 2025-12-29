import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useMemo } from "react";

import styles from "./order-card-footer.module.css";

import { useAppSelector } from "@src/hooks";
import { ingredientsSelectors } from "@src/services/ingredients";
import {
  isErrorByStatus,
  isInitialByStatus,
  isPendingByStatus,
} from "@src/utils";
import { Ingredient } from "@src/api/ingredients/types";
import { ERROR_MESSAGE } from "@src/consts";

interface OrderCardFooterProps {
  ingredientsIds: string[];
  maxIcons: number;
}

export function OrderCardFooter({
  ingredientsIds,
  maxIcons,
}: OrderCardFooterProps) {
  const { ingredients, status, error } = useAppSelector(
    ingredientsSelectors.sliceSelector
  );
  const isPending = isPendingByStatus(status) || isInitialByStatus(status);
  const isError = isErrorByStatus(status);

  const orderIngredients = useMemo(
    () =>
      ingredients
        .filter((ingredient) => ingredientsIds.includes(ingredient._id))
        .reduce((acc, ingredient, _, array) => {
          const similarIngredients = array.filter(
            (el) => el._id === ingredient._id
          );

          return [...acc, { ...ingredient, count: similarIngredients.length }];
        }, [] as (Ingredient & { count: number })[]),
    [ingredients, ingredientsIds]
  );

  const total = orderIngredients.reduce(
    (acc, ingredient) => acc + ingredient.price * ingredient.count,
    0
  );

  const orderIngredientsLength = orderIngredients.length;
  const slicedOrderIngredients = orderIngredients.slice(0, maxIcons);

  if (isPending) {
    const array = new Array(4).fill(1);

    return (
      <div className={styles.wrapper}>
        <div className={styles.icons}>
          {array.map((_, index) => {
            return <span key={index} className={styles.skeletonIcon} />;
          })}
        </div>
        <div className={styles.skeletonTotal}>
          <div />
        </div>
      </div>
    );
  }

  if (isError) {
    return <div className={styles.error}>{error || ERROR_MESSAGE}</div>;
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.icons}>
        {slicedOrderIngredients.map((ingredient, index) => {
          const isLast = slicedOrderIngredients.length - 1 === index;
          const isShowIconOfRemainingNumberIngredients = isLast
            ? orderIngredientsLength > slicedOrderIngredients.length
            : false;
          const numberOfRemainingIngredients =
            orderIngredientsLength - slicedOrderIngredients.length;

          return (
            <span key={ingredient._id}>
              <img
                className={styles.icon}
                loading="lazy"
                src={ingredient.image}
              />
              {isShowIconOfRemainingNumberIngredients ? (
                <span className={styles.remainingCount}>
                  +{numberOfRemainingIngredients}
                </span>
              ) : null}
            </span>
          );
        })}
      </div>
      <div className={styles.count}>
        {total}
        <CurrencyIcon type="primary" />
      </div>
    </div>
  );
}
