import {
  CurrencyIcon,
  FormattedDate,
} from "@ya.praktikum/react-developer-burger-ui-components";

import styles from "./order-information.module.css";

import { FeedOrder } from "@src/api/order/types";
import { useAppSelector } from "@src/hooks";
import { ingredientsSelectors } from "@src/services/ingredients";
import { getOrderStatusText } from "@src/utils";
import { Ingredient } from "@src/api/ingredients/types";
import { feedSelectors } from "@src/services/feed";
import { orderHistorySelectors } from "@src/services/order-history";

interface OrderInformationProps {
  order?: FeedOrder;
  className?: string;
  hideOrderNumber?: boolean;
}

export function OrderInformation({
  order,
  className,
  hideOrderNumber = false,
}: OrderInformationProps) {
  const ingredientsSlice = useAppSelector(
    ingredientsSelectors.ingredientsSelector
  );

  // TODO: Пофиксить блик с "Не удалось найти заказ"
  const statusOfFeed = useAppSelector(feedSelectors.getStatus);
  const statusOfOrderHistory = useAppSelector(orderHistorySelectors.getStatus);

  const isLoading =
    ingredientsSlice.isLoading ||
    statusOfFeed === "pending" ||
    statusOfOrderHistory === "pending";
  const isError =
    ingredientsSlice.error ||
    statusOfFeed === "error" ||
    statusOfOrderHistory === "error";

  const orderIngredients = ingredientsSlice.ingredients
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

  // TODO: Привести код к консистентному виду

  if (isLoading) {
    return "Loading...";
  }

  if (isError) {
    return "Ошибка, попробуйте позже";
  }

  if (!order) {
    return "Не удалось найти заказ";
  }

  return (
    <div className={`${styles.wrapper} ${className}`}>
      <div className={styles.header}>
        <p
          className={styles.orderNumber}
          style={{ display: hideOrderNumber ? "none" : "block" }}
        >
          #{order.number}
        </p>
        <div className={styles.orderNameAndStatusWrapper}>
          <h1 className={styles.orderName}>{order.name}</h1>
          <p className={styles.orderStatus}>
            {getOrderStatusText(order.status)}
          </p>
        </div>
      </div>
      <div className={styles.content}>
        <div className={styles.orderStructure}>
          <h2 className="text text_type_main-medium">Состав</h2>
          <div className={styles.orderStructureList}>
            {orderIngredients.map((ingredient) => {
              return (
                <div key={ingredient._id} className={styles.orderItem}>
                  <div key={ingredient._id} className={styles.orderItemContent}>
                    <img
                      src={ingredient.image}
                      className={styles.orderItemImage}
                      loading="lazy"
                    />
                    <p>{ingredient.name}</p>
                  </div>
                  <div className={styles.orderItemCount}>
                    {ingredient.count} x {ingredient.price}{" "}
                    <CurrencyIcon type="primary" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className={styles.footer}>
          <p className={styles.time}>
            <FormattedDate date={new Date(order.createdAt)} />
          </p>
          <p className={styles.total}>
            {total} <CurrencyIcon type="primary" />
          </p>
        </div>
      </div>
    </div>
  );
}
