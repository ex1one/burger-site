import {
  CurrencyIcon,
  FormattedDate,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useLocation } from "react-router-dom";

import { PAGES } from "../../consts/pages";

import styles from "./order-card.module.css";

import { FeedOrder } from "@src/api/order/types";
import { useAppSelector } from "@src/hooks";
import { ingredientsSelectors } from "@src/services/ingredients";
import { getOrderStatusText } from "@src/utils";
import { Ingredient } from "@src/api/ingredients/types";

interface OrderCardProps {
  order: FeedOrder;
}

export function OrderCard({ order }: OrderCardProps) {
  const location = useLocation();
  const { ingredients } = useAppSelector(
    ingredientsSelectors.ingredientsSelector
  );
  const url =
    (location.pathname === "/feed" ? PAGES.ORDERS_FEED : PAGES.PROFILE_ORDERS) +
    `/${order.number}`;

  const orderIngredients = ingredients
    .filter((ingredient) => order?.ingredients.includes(ingredient._id))
    .reduce((acc, ingredient, _, array) => {
      const similarIngredients = array.filter(
        (el) => el._id === ingredient._id
      );

      return [...acc, { ...ingredient, count: similarIngredients.length }];
    }, [] as (Ingredient & { count: number })[]);

  const total = orderIngredients.reduce(
    (acc, ingredient) => acc + ingredient.price * ingredient.count,
    0
  );

  const selectedIngredientsCount = orderIngredients.length;
  const sliceSelectedIngredients = orderIngredients.slice(0, 5);

  return (
    <Link to={url} state={{ background: location }}>
      <div className={styles.wrapper}>
        <div className={styles.header}>
          <p className={styles.number}>#{order.number}</p>
          <p className={styles.time}>
            <FormattedDate date={new Date(order.createdAt)} />
          </p>
        </div>
        <div>
          <h3 className={styles.name}>{order.name}</h3>
          <p>{getOrderStatusText(order.status)}</p>
        </div>
        <div className={styles.footer}>
          <div className={styles.icons}>
            {sliceSelectedIngredients.map((ingredient, index) => {
              const isVisible =
                index === sliceSelectedIngredients.length - 1
                  ? selectedIngredientsCount > sliceSelectedIngredients.length
                  : false;
              const countVisible =
                selectedIngredientsCount - sliceSelectedIngredients.length;

              return (
                <span key={ingredient._id}>
                  <img
                    className={styles.icon}
                    loading="lazy"
                    src={ingredient.image}
                  />
                  {isVisible ? (
                    <span className={styles.iconsMoreCount}>
                      +{countVisible}
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
      </div>
    </Link>
  );
}
