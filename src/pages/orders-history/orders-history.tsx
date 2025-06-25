import { useEffect } from "react";

import styles from "./orders-history.module.css";

import { useAppDispatch, useAppSelector } from "@src/hooks";
import { Loader, OrderCard } from "@src/components";
import {
  orderHistoryActions,
  orderHistorySelectors,
} from "@src/services/order-history";
import { ERROR_MESSAGE, Status, WS_URL_ORDERS_HISTORY } from "@src/consts";
import {
  ingredientsSelectors,
  ingredientsThunks,
} from "@src/services/ingredients";

export function OrdersHistory() {
  const dispatch = useAppDispatch();

  const ingredientsStatus = useAppSelector(ingredientsSelectors.statusSelector);
  const { orders, status, error } = useAppSelector(
    orderHistorySelectors.getSlice
  );

  useEffect(() => {
    dispatch(orderHistoryActions.connect(WS_URL_ORDERS_HISTORY));

    return () => {
      dispatch(orderHistoryActions.disconnect());
    };
  }, [dispatch]);

  useEffect(() => {
    if (ingredientsStatus === Status.Initial) {
      dispatch(ingredientsThunks.fetchIngredients());
    }
  }, [dispatch, ingredientsStatus]);

  if (status === Status.Pending) {
    return <Loader />;
  }

  if (status === Status.Error) {
    return <div>{error || ERROR_MESSAGE}</div>;
  }

  return (
    <div className={styles.wrapper}>
      {orders.map((order) => {
        return <OrderCard key={order._id} order={order} />;
      })}
    </div>
  );
}
