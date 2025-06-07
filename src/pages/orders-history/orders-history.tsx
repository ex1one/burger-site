import { useEffect } from "react";

import styles from "./orders-history.module.css";

import { useAppDispatch, useAppSelector } from "@src/hooks";
import { OrderCard } from "@src/components";
import {
  orderHistoryActions,
  orderHistorySelectors,
} from "@src/services/order-history";

const WS_URL = "wss://norma.nomoreparties.space/orders/all";

export function OrdersHistory() {
  const dispatch = useAppDispatch();

  const { orders, status } = useAppSelector(orderHistorySelectors.getSlice);

  useEffect(() => {
    dispatch(orderHistoryActions.connect(WS_URL));

    return () => {
      dispatch(orderHistoryActions.disconnect());
    };
  }, []);

  if (status === "pending") {
    return <div>Loading...</div>;
  }

  if (status === "error") {
    return <div>Error while getting feed</div>;
  }

  return (
    <div className={styles.wrapper}>
      {orders.map((order) => {
        return <OrderCard {...order} />;
      })}
    </div>
  );
}
