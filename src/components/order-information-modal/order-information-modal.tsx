import { useEffect, useMemo } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import { Modal } from "../modal";
import { OrderInformation } from "../order-information";
import { Loader } from "../loader";

import styles from "./order-information-modal.module.css";

import { useAppDispatch, useAppSelector } from "@src/hooks";
import { ERROR_MESSAGE } from "@src/consts";
import {
  orderInfoActions,
  orderInfoSelectors,
  orderInfoThunks,
} from "@src/services/order-info";
import {
  isErrorByStatus,
  isInitialByStatus,
  isPendingByStatus,
} from "@src/utils";

export function OrderInformationModal() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const location = useLocation();
  const { orderNumber } = useParams();

  const isOpen = Boolean(orderNumber);

  const { order, status, error } = useAppSelector(
    orderInfoSelectors.sliceSelector
  );
  const isPending = isPendingByStatus(status) || isInitialByStatus(status);
  const isError = isErrorByStatus(status);

  const titleForPending = "Загрузка...";
  const titleForError = "Ошибка";
  const title = isPending
    ? titleForPending
    : isError
    ? titleForError
    : // eslint-disable-next-line no-constant-binary-expression
      `#${orderNumber}` || "Заказ не найден";

  const handleClose = () => {
    navigate(-1);

    dispatch(orderInfoActions.clear());
  };

  useEffect(() => {
    if (orderNumber) {
      if (location.pathname === `/feed/${orderNumber}`) {
        dispatch(orderInfoThunks.getOrderFeed(orderNumber));
      } else {
        dispatch(orderInfoThunks.getOrderFromHistory(orderNumber));
      }
    }
  }, [dispatch, location.pathname, orderNumber]);

  const content = useMemo(() => {
    if (isPending) {
      return (
        <div className={styles.wrapperCentered}>
          <Loader />
        </div>
      );
    }

    if (isError) {
      return (
        <div className={styles.wrapperCentered}>{error || ERROR_MESSAGE}</div>
      );
    }

    if (!order) {
      return <div className={styles.wrapperCentered}>Заказ не найден</div>;
    }

    return <OrderInformation hideOrderNumber order={order} />;
  }, [error, isError, isPending, order]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title={{ title, size: "md" }}
      className={styles.content}
    >
      {content}
    </Modal>
  );
}
