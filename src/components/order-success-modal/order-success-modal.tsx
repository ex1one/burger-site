import { CheckMarkIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useMemo } from "react";

import { Modal } from "../modal";
import { Loader } from "../loader";

import styles from "./order-success-modal.module.css";

import { useAppDispatch, useAppSelector } from "@src/hooks";
import { ERROR_MESSAGE, NAMES_OF_MODALS } from "@src/consts";
import { orderActions, orderSelectors } from "@src/services/order/slice";
import { constructorIngredientsActions } from "@src/services/constructorIngredients";
import { modalsActions, modalsSelectors } from "@src/services/modals";
import { isErrorByStatus, isPendingByStatus } from "@src/utils";

export function OrderSuccessModal() {
  const dispatch = useAppDispatch();

  const { order, status, error } = useAppSelector(orderSelectors.sliceSelector);
  const isPending = isPendingByStatus(status);
  const isError = isErrorByStatus(status);

  const titleOfPendingStatus = "Формирование заказа";
  const titleOfErrorStatus = "Ошибка";

  // TODO: Не очень красиво
  const title = isPending
    ? titleOfPendingStatus
    : isError
    ? titleOfErrorStatus
    : undefined;

  const isOpen = useAppSelector((state) =>
    modalsSelectors.modalSelector(state, NAMES_OF_MODALS.ORDER_SUCCESS_MODAL)
  );

  const handleClose = () => {
    if (!isError) {
      dispatch(orderActions.clearOrder());
      dispatch(constructorIngredientsActions.clearConstructor());
      dispatch(modalsActions.closeModal(NAMES_OF_MODALS.ORDER_SUCCESS_MODAL));
    }

    dispatch(modalsActions.closeModal(NAMES_OF_MODALS.ORDER_SUCCESS_MODAL));
  };

  const content = useMemo(() => {
    if (isPending) {
      return (
        <div className={styles.wrapperCentered}>
          <Loader />
        </div>
      );
    }

    if (isError || !order) {
      return (
        <div className={styles.wrapperCentered}>{error || ERROR_MESSAGE}</div>
      );
    }

    return (
      <div className={styles.content}>
        <div className={styles.header}>
          <h4 className="text text_type_digits-large">{order.number}</h4>
          <p className="text text_type_main-medium">идентификатор заказа</p>
        </div>
        <div className={styles.accept}>
          <CheckMarkIcon type="primary" className={styles.image} />
        </div>
        <div className={styles.footer}>
          <p className="text text_type_main-default">
            Ваш заказ начали готовить
          </p>
          <p className="text text_type_main-default text_color_inactive">
            Дождитесь готовности на орбитальной станции
          </p>
        </div>
      </div>
    );
  }, [isPending, isError, order, error]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={isPending ? undefined : handleClose}
      data-cy="order-success-modal"
      title={title}
    >
      {content}
    </Modal>
  );
}
