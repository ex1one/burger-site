import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";

import { PAGES } from "../../consts/pages";

import styles from "./order-card.module.css";

import { FeedOrder } from "@src/api/order/types";
import { useAppSelector } from "@src/hooks";
import { ingredientsSelectors } from "@src/services/ingredients";

interface OrderCardProps extends FeedOrder {
  isFeedItem?: boolean;
}

export function OrderCard({
  _id,
  number,
  status,
  createdAt,
  ingredients,
  name,
  isFeedItem = false,
}: OrderCardProps) {
  const { ingredients: allIngredients } = useAppSelector(
    ingredientsSelectors.ingredientsSelector
  );
  const url =
    (isFeedItem ? PAGES.ORDER_FEED : PAGES.PROFILE_ORDERS) + `/${_id}`;

  const selectedIngredients = allIngredients.filter((item) =>
    ingredients.includes(item._id)
  );
  const selectedIngredientsCount = selectedIngredients.length;
  const sliceSelectedIngredients = selectedIngredients.slice(0, 5);

  const totalCount = selectedIngredients.reduce((acc, el) => {
    return acc + el.price;
  }, 0);

  return (
    <Link to={url}>
      <div className={styles.wrapper}>
        <div className={styles.header}>
          <p className={styles.number}>#{number}</p>
          <p className={styles.time}>{createdAt}</p>
        </div>
        <div>
          <h3 className={styles.name}>{name}</h3>
          {/* TODO: Создать функцию для получения текста для заказа исходя из статуса */}
          <p>{status === "done" ? "Выполнен" : "Готовится"}</p>
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
            {totalCount}
            <CurrencyIcon type="primary" />
          </div>
        </div>
      </div>
    </Link>
  );
}
