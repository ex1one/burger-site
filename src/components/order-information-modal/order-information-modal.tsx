import { useEffect, useMemo } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import { Modal } from "../modal";
import { OrderInformation } from "../order-information";

import styles from "./order-information-modal.module.css";

import { useAppDispatch, useAppSelector } from "@src/hooks";
import { feedActions, feedSelectors } from "@src/services/feed";
import {
  orderHistoryActions,
  orderHistorySelectors,
} from "@src/services/order-history";
import {
  ingredientsSelectors,
  ingredientsThunks,
} from "@src/services/ingredients";
import { WS_URL_FEED, WS_URL_ORDERS_HISTORY } from "@src/consts";

export function OrderInformationModal() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const location = useLocation();
  const { orderId } = useParams();

  const isOpen = Boolean(orderId);

  const ingredientsSlice = useAppSelector(
    ingredientsSelectors.ingredientsSelector
  );

  const statusOfFeed = useAppSelector(feedSelectors.getStatus);
  const statusOfOrderHistory = useAppSelector(orderHistorySelectors.getStatus);

  const orders =
    location.pathname === `/feed/${orderId}`
      ? useAppSelector(feedSelectors.getOrders)
      : useAppSelector(orderHistorySelectors.getOrders);

  const order = orders.find((el) => el.number === Number(orderId));

  useEffect(() => {
    if (ingredientsSlice.status === "idle") {
      dispatch(ingredientsThunks.fetchIngredients());
    }
  }, [dispatch, ingredientsSlice.status]);

  useEffect(() => {
    if (statusOfFeed === "idle" || statusOfOrderHistory === "idle") {
      if (location.pathname === `/feed/${orderId}`) {
        dispatch(feedActions.connect(WS_URL_FEED));
      } else {
        dispatch(orderHistoryActions.connect(WS_URL_ORDERS_HISTORY));
      }
    }
  }, [
    dispatch,
    location.pathname,
    orderId,
    statusOfFeed,
    statusOfOrderHistory,
  ]);

  // useEffect(() => {
  //   if (isEmpty(order)) {
  //     // TODO: Тут запрос на получение заказа по его номеру. Только не понимаю, где взять этот url
  //   }
  // }, [order]);

  const handleClose = () => {
    navigate(-1);
  };

  const content = useMemo(() => {
    return <OrderInformation hideOrderNumber order={order} />;
  }, [order]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title={{ title: "#034533", size: "md" }}
      className={styles.content}
    >
      {content}
    </Modal>
  );
}
