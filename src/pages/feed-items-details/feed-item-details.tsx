import { useLocation, useParams } from "react-router-dom";
import { useEffect, useMemo } from "react";

import styles from "./feed-item-details.module.css";

import { OrderInformation } from "@src/components";
import { useAppDispatch, useAppSelector } from "@src/hooks";
import {
  ingredientsSelectors,
  ingredientsThunks,
} from "@src/services/ingredients";
import {
  orderHistoryActions,
  orderHistorySelectors,
} from "@src/services/order-history";
import { feedActions, feedSelectors } from "@src/services/feed";
import { WS_URL_FEED, WS_URL_ORDERS_HISTORY } from "@src/consts";

export function FeedItemsDetails() {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const { orderId } = useParams();

  const { status } = useAppSelector(ingredientsSelectors.ingredientsSelector);

  const orders =
    location.pathname === `/feed/${orderId}`
      ? useAppSelector(feedSelectors.getOrders)
      : useAppSelector(orderHistorySelectors.getOrders);

  const order = orders.find((el) => el.number === Number(orderId));

  useEffect(() => {
    if (status === "idle") {
      dispatch(ingredientsThunks.fetchIngredients());
    }
  }, [status]);

  useEffect(() => {
    if (location.pathname === `/feed/${orderId}`) {
      dispatch(feedActions.connect(WS_URL_FEED));
    } else {
      dispatch(orderHistoryActions.connect(WS_URL_ORDERS_HISTORY));
    }

    return () => {
      dispatch(feedActions.disconnect());
      dispatch(orderHistoryActions.disconnect());
    };
  }, [dispatch, location.pathname, orderId]);

  const content = useMemo(() => {
    return <OrderInformation order={order} />;
  }, [order]);

  return <div className={styles.wrapper}>{content}</div>;
}
