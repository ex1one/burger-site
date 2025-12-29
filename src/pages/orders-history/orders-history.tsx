import { useEffect } from "react";

import styles from "./orders-history.module.css";

import { useAppDispatch, useAppSelector } from "@src/hooks";
import { Loader, OrderCard } from "@src/components";
import {
  orderHistoryActions,
  orderHistorySelectors,
} from "@src/services/order-history";
import { ERROR_MESSAGE, WS_URL_ORDERS_HISTORY } from "@src/consts";
import { ingredientsThunks } from "@src/services/ingredients";
import { isErrorByStatus, isPendingByStatus } from "@src/utils";

export function OrdersHistory() {
  const dispatch = useAppDispatch();

  const { orders, status, error } = useAppSelector(
    orderHistorySelectors.sliceSelector
  );
  const isPending = isPendingByStatus(status);
  const isError = isErrorByStatus(status);

  useEffect(() => {
    dispatch(orderHistoryActions.connect(WS_URL_ORDERS_HISTORY));

    return () => {
      dispatch(orderHistoryActions.disconnect());
    };
  }, [dispatch]);

  useEffect(() => {
    dispatch(ingredientsThunks.fetchIngredients());
  }, [dispatch]);

  if (isPending) {
    return <Loader />;
  }

  if (isError) {
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
