import { useEffect } from "react";

import styles from "./orders-history.module.css";

import { useAppDispatch, useAppSelector } from "@src/hooks";
import { OrderCard } from "@src/components";
import {
  orderHistoryActions,
  orderHistorySelectors,
} from "@src/services/order-history";
import { WS_URL_ORDERS_HISTORY } from "@src/consts";
import {
  ingredientsSelectors,
  ingredientsThunks,
} from "@src/services/ingredients";

export function OrdersHistory() {
  const dispatch = useAppDispatch();

  const ingredientsSlice = useAppSelector(
    ingredientsSelectors.ingredientsSelector
  );
  const { orders, status } = useAppSelector(orderHistorySelectors.getSlice);

  useEffect(() => {
    dispatch(orderHistoryActions.connect(WS_URL_ORDERS_HISTORY));

    return () => {
      dispatch(orderHistoryActions.disconnect());
    };
  }, [dispatch]);

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

  return (
    <div className={styles.wrapper}>
      {orders.map((order) => {
        return <OrderCard key={order._id} order={order} />;
      })}
    </div>
  );
}
