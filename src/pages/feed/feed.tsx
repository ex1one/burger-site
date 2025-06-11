import { useEffect } from "react";

import styles from "./feed.module.css";

import { OrderCard } from "@src/components";
import { useAppDispatch, useAppSelector } from "@src/hooks";
import { feedActions, feedSelectors } from "@src/services/feed";
import { WS_URL_FEED } from "@src/consts";
import {
  ingredientsSelectors,
  ingredientsThunks,
} from "@src/services/ingredients";
import { splitArrayToChunks } from "@src/utils";

export function Feed() {
  const dispatch = useAppDispatch();

  const ingredientsSlice = useAppSelector(
    ingredientsSelectors.ingredientsSelector
  );
  const { orders, total, totalToday, status } = useAppSelector(
    feedSelectors.getSlice
  );

  useEffect(() => {
    dispatch(feedActions.connect(WS_URL_FEED));

    return () => {
      dispatch(feedActions.disconnect());
    };
  }, []);

  useEffect(() => {
    if (ingredientsSlice.status === "idle") {
      dispatch(ingredientsThunks.fetchIngredients());
    }
  }, [dispatch, ingredientsSlice.status]);

  if (status === "pending") {
    return <div>Loading...</div>;
  }

  if (status === "error") {
    return <div>Error while getting feed</div>;
  }

  const activeOrdersIds = splitArrayToChunks(
    orders
      .filter((order) => order.status !== "done")
      .map((order) => order.number),
    10
  );

  const completedOrdersIds = splitArrayToChunks(
    orders
      .filter((order) => order.status === "done")
      .map((order) => order.number),
    10
  );

  return (
    <div className={styles.wrapper}>
      <h1 className="text text_type_main-large">Лента заказов</h1>
      <div className={styles.content}>
        <div className={styles.feedList}>
          {orders.map((order) => {
            return <OrderCard key={order._id} order={order} />;
          })}
        </div>
        <div className={styles.infoAboutOrdersWrapper}>
          <div className={styles.activeAndCompletedOrdersWrapper}>
            <div className={styles.completedOrdersWrapper}>
              <h4 className="text text_type_main-medium">Готовы:</h4>
              <div className={styles.completedOrdersList}>
                {completedOrdersIds.map((orderIds, index) => {
                  return (
                    <div key={index}>
                      {orderIds.map((id) => (
                        <p key={id}>{id}</p>
                      ))}
                    </div>
                  );
                })}
              </div>
            </div>
            <div className={styles.activeOrdersWrapper}>
              <h4 className="text text_type_main-medium">В работе:</h4>
              <div className={styles.activeOrdersList}>
                {activeOrdersIds.map((orderIds, index) => {
                  return (
                    <div key={index}>
                      {orderIds.map((id) => (
                        <p key={id}>{id}</p>
                      ))}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <div>
            <h4 className="text text_type_main-medium">
              Выполнено за все время:
            </h4>
            <p className="text text_type_digits-large">{total}</p>
          </div>
          <div>
            <h4 className="text text_type_main-medium">
              Выполнено за сегодня:
            </h4>
            <p className="text text_type_digits-large">{totalToday}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
